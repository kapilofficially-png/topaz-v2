import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Copy, Download, ExternalLink, FileDown, Layers, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Fold } from "@/components/fold";
import { DraftPaper } from "@/components/draft-paper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuditStore } from "@/lib/drafts/audit-store";
import { downloadDraftDocx } from "@/lib/drafts/docx-export";
import { downloadPaperPdf } from "@/lib/drafts/pdf-export";
import {
  STORE_PAPER_LABEL,
  isStorePaper,
  paperHost,
  useDraftStore,
  type SavedDraft,
} from "@/lib/drafts/store";
import {
  storeReviewToDrafts,
  useStoreArchive,
  type SavedStoreReview,
} from "@/lib/drafts/store-archive";
import { getTemplate } from "@/lib/drafts/templates";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function labelOf(d: SavedDraft) {
  return STORE_PAPER_LABEL[d.slug] ?? getTemplate(d.slug)?.forum ?? d.slug;
}

function preview(text: string) {
  return text
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\n{2,}/g, " ")
    .trim();
}

function stem(d: SavedDraft) {
  const host = paperHost(d) || "draft";
  const kind = (STORE_PAPER_LABEL[d.slug] ?? d.slug).toLowerCase().replace(/\s+/g, "-");
  return `NyayaDraft-${host.replace(/[^\w.-]+/g, "-")}-${kind}`;
}

type StoreSiteGroup = {
  host: string;
  siteIndex: number;
  homeTitle: string;
  items: SavedDraft[];
  updatedAt: number;
};

function HistoryPage() {
  const localDrafts = useDraftStore((s) => s.drafts);
  const hydrated = useDraftStore((s) => s.hydrated);
  const setHydrated = useDraftStore((s) => s.setHydrated);
  const removeDraft = useDraftStore((s) => s.remove);
  const hydratePaper = useAuditStore((s) => s.hydratePaper);
  const loadSavedStore = useAuditStore((s) => s.loadSavedStore);

  const archiveSummaries = useStoreArchive((s) => s.summaries);
  const deleteStoreArchive = useStoreArchive((s) => s.deleteStore);
  const setActiveHost = useStoreArchive((s) => s.setActiveHost);

  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [openHosts, setOpenHosts] = useState<Record<string, boolean>>({});
  const [archivedStores, setArchivedStores] = useState<SavedStoreReview[]>([]);
  const [loadingArchive, setLoadingArchive] = useState(true);

  useEffect(() => {
    if (useDraftStore.persist.hasHydrated()) setHydrated(true);
    const unsub = useDraftStore.persist.onFinishHydration(() => setHydrated(true));
    const t = window.setTimeout(() => setHydrated(true), 900);
    return () => {
      unsub();
      window.clearTimeout(t);
    };
  }, [setHydrated]);

  // Load all stores from permanent Local Space Archive (IndexedDB)
  useEffect(() => {
    let active = true;
    async function loadStores() {
      try {
        setLoadingArchive(true);
        await useStoreArchive.getState().init();
        const all = await useStoreArchive.getState().getAllStores();
        if (active) {
          setArchivedStores(all);
          setLoadingArchive(false);
        }
      } catch {
        if (active) setLoadingArchive(false);
      }
    }
    void loadStores();
    return () => {
      active = false;
    };
  }, [archiveSummaries.length]);

  // Merge permanent archived stores (IndexedDB) and active draft store
  const allDrafts = useMemo(() => {
    const map = new Map<string, SavedDraft>();

    // 1. Generate drafts from all permanently saved stores in IndexedDB
    for (const store of archivedStores) {
      const storeDrafts = storeReviewToDrafts(store);
      for (const d of storeDrafts) {
        map.set(d.id, d);
      }
    }

    // 2. Overlay any manual/local drafts from useDraftStore
    for (const d of localDrafts) {
      map.set(d.id, d);
    }

    return Array.from(map.values()).sort((a, b) => b.createdAt - a.createdAt);
  }, [archivedStores, localDrafts]);

  // Map of hosts to store metadata
  const storeMetaByHost = useMemo(() => {
    const map = new Map<string, SavedStoreReview>();
    for (const s of archivedStores) {
      if (s.host) map.set(s.host.toLowerCase(), s);
    }
    return map;
  }, [archivedStores]);

  // Group drafts by store site with serial numbers
  const { storeGroups, libraryItems, totalSitesCount, totalPapersCount } = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = needle
      ? allDrafts.filter((d) =>
          `${d.title} ${d.slug} ${paperHost(d)} ${d.draftText}`
            .toLowerCase()
            .includes(needle),
        )
      : allDrafts;

    const hostMap = new Map<string, SavedDraft[]>();
    const library: SavedDraft[] = [];

    for (const d of filtered) {
      const host = paperHost(d);
      if (host) {
        const list = hostMap.get(host) ?? [];
        list.push(d);
        hostMap.set(host, list);
      } else if (isStorePaper(d.slug)) {
        const list = hostMap.get("Other Store Work") ?? [];
        list.push(d);
        hostMap.set("Other Store Work", list);
      } else {
        library.push(d);
      }
    }

    // Sort store hosts chronologically by most recent paper or archive updatedAt
    const hostEntries = Array.from(hostMap.entries());
    hostEntries.sort((a, b) => {
      const metaA = storeMetaByHost.get(a[0].toLowerCase());
      const metaB = storeMetaByHost.get(b[0].toLowerCase());
      const timeA = metaA?.updatedAt ?? Math.max(...a[1].map((d) => d.createdAt));
      const timeB = metaB?.updatedAt ?? Math.max(...b[1].map((d) => d.createdAt));
      return timeB - timeA;
    });

    // Assign sequential serial number (1, 2, 3...) to each site
    const sites: StoreSiteGroup[] = hostEntries.map(([host, items], idx) => {
      const meta = storeMetaByHost.get(host.toLowerCase());
      return {
        host,
        siteIndex: idx + 1,
        homeTitle: meta?.homeTitle || host,
        items,
        updatedAt: meta?.updatedAt ?? Math.max(...items.map((d) => d.createdAt)),
      };
    });

    const totalPapers = allDrafts.length;
    const totalSites = new Set(
      allDrafts.map((d) => paperHost(d)).filter(Boolean),
    ).size;

    return {
      storeGroups: sites,
      libraryItems: library,
      totalSitesCount: totalSites,
      totalPapersCount: totalPapers,
    };
  }, [allDrafts, q, storeMetaByHost]);

  const open = allDrafts.find((d) => d.id === openId) ?? null;

  async function saveWord(d: SavedDraft) {
    try {
      await downloadDraftDocx({
        title: d.title,
        subtitle: labelOf(d),
        host: paperHost(d),
        body: d.draftText,
        filename: `${stem(d)}.docx`,
      });
      toast.success("Word file downloaded.");
    } catch {
      toast.error("Could not build the Word file.");
    }
  }

  async function savePdf(d: SavedDraft) {
    try {
      await downloadPaperPdf({
        host: paperHost(d) || "draft",
        title: d.title,
        body: d.draftText,
        filename: `${stem(d)}.pdf`,
      });
      toast.success("PDF downloaded.");
    } catch {
      toast.error("Could not build the PDF.");
    }
  }

  function openInAudit(d: SavedDraft) {
    hydratePaper({
      slug: d.slug,
      title: d.title,
      body: d.draftText,
      notes: d.notes,
      citations: d.citations,
      facts: d.facts,
    });
    toast.success("Loaded into Audit store.");
    void navigate({ to: "/audit" });
  }

  async function openWholeStoreInAudit(host: string) {
    try {
      const store = await useStoreArchive.getState().getStore(host);
      if (store) {
        loadSavedStore(store);
        setActiveHost(host);
        toast.success(`Loaded all papers for ${store.homeTitle || host} into Audit store.`);
        void navigate({ to: "/audit" });
      } else {
        toast.error(`Could not find full archive for ${host}`);
      }
    } catch {
      toast.error("Failed to load store review into Audit.");
    }
  }

  async function handleDeleteStore(host: string) {
    if (!window.confirm(`Delete all saved data and papers for ${host}?`)) return;
    try {
      await deleteStoreArchive(host);
      // Also remove any matching drafts from useDraftStore
      const currentDrafts = useDraftStore.getState().drafts;
      for (const d of currentDrafts) {
        if (paperHost(d).toLowerCase() === host.toLowerCase()) {
          removeDraft(d.id);
        }
      }
      setArchivedStores((prev) => prev.filter((s) => s.host.toLowerCase() !== host.toLowerCase()));
      toast.success(`Deleted all papers for ${host}.`);
    } catch {
      toast.error("Failed to delete store.");
    }
  }

  async function handleExportAll() {
    try {
      const all = await useStoreArchive.getState().getAllStores();
      const blob = new Blob([JSON.stringify(all, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nyayadraft-all-stores-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${all.length} saved store reviews.`);
    } catch {
      toast.error("Failed to export archive.");
    }
  }

  function hostOpen(host: string) {
    if (q.trim() && openHosts[host] === undefined) return true;
    return Boolean(openHosts[host]);
  }

  function toggleHost(host: string) {
    setOpenHosts((s) => ({ ...s, [host]: !hostOpen(host) }));
  }

  function setAllHosts(open: boolean) {
    const next: Record<string, boolean> = {};
    for (const group of storeGroups) next[group.host] = open;
    next["Library drafts"] = open;
    setOpenHosts(next);
  }

  const isReady = hydrated && !loadingArchive;

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[12px] tracking-[0.18em] text-muted uppercase">
              Permanent Local Space Archive
            </p>
            <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">
              Saved audits & drafts
            </h1>
          </div>
          {totalSitesCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => void handleExportAll()}
              className="self-start sm:self-auto"
            >
              <Download className="mr-1.5 size-3.5" />
              Export All JSON ({totalSitesCount} sites)
            </Button>
          )}
        </div>

        <p className="mt-3 max-w-2xl text-sm text-muted">
          All audited websites and their generated papers are indexed with serial numbers.
          Tap <strong>Show</strong> to expand any site. You can view, download in Word/PDF, or load an
          entire store directly back into Audit.
        </p>

        {/* Stats summary bar */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline" className="font-medium bg-surface px-2.5 py-1">
            <span className="font-semibold text-primary mr-1">
              {totalSitesCount}
            </span>{" "}
            Sites Audited
          </Badge>
          <Badge variant="outline" className="font-medium bg-surface px-2.5 py-1">
            <span className="font-semibold text-ink mr-1">
              {totalPapersCount}
            </span>{" "}
            Papers Saved
          </Badge>
          <span className="text-[11px] text-emerald-700 bg-emerald-50/70 border border-emerald-200/60 rounded px-2 py-0.5">
            IndexedDB persistent quota active
          </span>
        </div>

        <Input
          className="mt-4 max-w-md"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by site (#1, folkbazar.com), paper title, or text…"
          aria-label="Search saved drafts"
        />

        {!isReady ? (
          <p className="mt-12 text-sm text-muted">Loading saved audits from this device…</p>
        ) : allDrafts.length === 0 ? (
          <div className="mt-12 rounded-[var(--radius-xl)] border border-dashed border-border px-6 py-16 text-center">
            <p className="font-display text-xl">No audits or drafts on this device yet.</p>
            <p className="mt-2 text-sm text-muted">
              Audit a store to automatically crawl, analyze against Indian law, and save all papers here.
            </p>
            <Button asChild className="mt-6">
              <Link to="/audit">Audit a store</Link>
            </Button>
          </div>
        ) : storeGroups.length === 0 && libraryItems.length === 0 ? (
          <p className="mt-12 text-sm text-muted">Nothing matches that search.</p>
        ) : (
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="text-xs text-muted">
                Showing <strong>{storeGroups.length}</strong> site{storeGroups.length === 1 ? "" : "s"}
                {q ? ` matching "${q}"` : ""}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setAllHosts(true)}>
                  Expand all
                </Button>
                <Button variant="outline" size="sm" onClick={() => setAllHosts(false)}>
                  Collapse all
                </Button>
              </div>
            </div>

            {/* List of Audited Sites with Serial Numbers */}
            <div className="mt-2 space-y-4">
              {storeGroups.map((group) => (
                <Fold
                  key={group.host}
                  title={`#${group.siteIndex} · ${group.host}`}
                  badge={
                    <Badge
                      variant="outline"
                      className="font-mono text-xs font-bold border-primary/30 bg-primary/5 text-primary"
                    >
                      Site #{group.siteIndex}
                    </Badge>
                  }
                  hint={`${group.items.length} paper${group.items.length === 1 ? "" : "s"} · ${group.homeTitle}`}
                  open={hostOpen(group.host)}
                  onToggle={() => toggleHost(group.host)}
                >
                  {/* Site Header Toolbar */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/70 bg-surface-2/40 p-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        Site #{group.siteIndex}
                      </span>
                      <span className="font-medium text-ink">
                        {group.homeTitle !== group.host ? group.homeTitle : group.host}
                      </span>
                      <a
                        href={`https://${group.host}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-muted hover:text-ink underline decoration-dotted ml-1"
                      >
                        Visit site <ExternalLink className="size-3" />
                      </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => void openWholeStoreInAudit(group.host)}
                        className="text-xs"
                      >
                        <Layers className="size-3.5 mr-1 text-primary" />
                        Open Entire Store in Audit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => void handleDeleteStore(group.host)}
                        className="text-xs text-muted hover:text-destructive"
                      >
                        <Trash2 className="size-3.5 mr-1" />
                        Delete Site
                      </Button>
                    </div>
                  </div>

                  {/* Papers Grid */}
                  <ul className="grid gap-4 md:grid-cols-2">
                    {group.items.map((d) => (
                      <li
                        key={d.id}
                        className="flex flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Badge variant="muted">{labelOf(d)}</Badge>
                            <h3 className="mt-2 font-display text-xl font-medium">
                              {d.title}
                            </h3>
                            <p className="mt-1 text-[12px] text-muted tabular-nums">
                              {new Date(d.createdAt).toLocaleString("en-IN")}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete draft"
                            onClick={() => {
                              removeDraft(d.id);
                              if (openId === d.id) setOpenId(null);
                            }}
                          >
                            <Trash2 className="size-4 text-muted hover:text-destructive" />
                          </Button>
                        </div>
                        <p className="mt-3 line-clamp-4 flex-1 font-serif text-sm leading-relaxed text-muted">
                          {preview(d.draftText) || "Empty paper."}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" onClick={() => setOpenId(d.id)}>
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => void saveWord(d)}>
                            Word
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => void savePdf(d)}>
                            PDF
                          </Button>
                          {isStorePaper(d.slug) ? (
                            <Button variant="outline" size="sm" onClick={() => openInAudit(d)}>
                              Open in audit
                            </Button>
                          ) : (
                            <Button asChild variant="outline" size="sm">
                              <Link to="/draft/$slug" params={{ slug: d.slug }}>
                                Open instrument
                              </Link>
                            </Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </Fold>
              ))}

              {/* General Library Drafts (if any) */}
              {libraryItems.length > 0 && (
                <Fold
                  title="General Library Drafts"
                  badge={
                    <Badge variant="outline" className="font-mono text-xs">
                      {libraryItems.length} papers
                    </Badge>
                  }
                  hint={`${libraryItems.length} instrument drafts`}
                  open={hostOpen("Library drafts")}
                  onToggle={() => toggleHost("Library drafts")}
                >
                  <ul className="grid gap-4 md:grid-cols-2">
                    {libraryItems.map((d) => (
                      <li
                        key={d.id}
                        className="flex flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Badge variant="muted">{labelOf(d)}</Badge>
                            <h3 className="mt-2 font-display text-xl font-medium">
                              {d.title}
                            </h3>
                            <p className="mt-1 text-[12px] text-muted tabular-nums">
                              {new Date(d.createdAt).toLocaleString("en-IN")}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete draft"
                            onClick={() => {
                              removeDraft(d.id);
                              if (openId === d.id) setOpenId(null);
                            }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                        <p className="mt-3 line-clamp-4 flex-1 font-serif text-sm leading-relaxed text-muted">
                          {preview(d.draftText) || "Empty paper."}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" onClick={() => setOpenId(d.id)}>
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => void saveWord(d)}>
                            Word
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => void savePdf(d)}>
                            PDF
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/draft/$slug" params={{ slug: d.slug }}>
                              Open instrument
                            </Link>
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Fold>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Reader Modal */}
      <Dialog open={Boolean(open)} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-h-[88vh] max-w-4xl overflow-y-auto">
          {open ? (
            <>
              <DialogHeader>
                <DialogTitle>{open.title}</DialogTitle>
                <DialogDescription>
                  {labelOf(open)}
                  {paperHost(open) ? ` · ${paperHost(open)}` : ""} ·{" "}
                  {new Date(open.createdAt).toLocaleString("en-IN")}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    void navigator.clipboard.writeText(open.draftText);
                    toast.success("Copied to clipboard.");
                  }}
                >
                  <Copy className="size-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={() => void saveWord(open)}>
                  <Download className="size-4 mr-1" />
                  Word
                </Button>
                <Button variant="outline" size="sm" onClick={() => void savePdf(open)}>
                  <FileDown className="size-4 mr-1" />
                  PDF
                </Button>
                {isStorePaper(open.slug) ? (
                  <Button
                    size="sm"
                    onClick={() => {
                      openInAudit(open);
                      setOpenId(null);
                    }}
                  >
                    Open in audit
                  </Button>
                ) : null}
              </div>
              <DraftPaper title={open.title} body={open.draftText} />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
