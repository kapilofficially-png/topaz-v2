import { create } from "zustand";
import type { ExtractedHints, FetchedPage, PolicyKind } from "@/lib/web/types";
import { pageUrlKey } from "@/lib/web/types";
import type { RefinedPolicy } from "@/lib/drafts/audit-store";
import type { SavedCitation, SavedDraft } from "@/lib/drafts/store";
import { parseDraftOutput } from "@/lib/drafts/parse";

export type AiModificationRecord = {
  id: string;
  timestamp: number;
  prompt: string;
  targetField: string;
  summary: string;
};

export type SavedStoreReview = {
  host: string;
  origin: string;
  homeTitle: string;
  createdAt: number;
  updatedAt: number;
  pages: FetchedPage[];
  missing: { kind: PolicyKind; label: string }[];
  hints: ExtractedHints | null;
  findings: string;
  citations: SavedCitation[];
  refined: RefinedPolicy[];
  gapsPaper: string;
  sellingPaper: string;
  questionsPaper: string;
  answers: Record<string, string>;
  briefPaper: string;
  briefAnswers: Record<string, string>;
  implementPaper: string;
  emailPaper: string;
  coldPaper: string;
  agreementPaper: string;
  lastBatchStatus?: "done" | "error" | "stopped";
  failedSteps?: string[];
  aiModifications?: AiModificationRecord[];
};

export type StoreSummary = {
  host: string;
  origin: string;
  homeTitle: string;
  updatedAt: number;
  pageCount: number;
  refinedCount: number;
  hasAudit: boolean;
  hasColdEmail: boolean;
  lastBatchStatus?: "done" | "error" | "stopped";
};

const DB_NAME = "nyayadraft_store_archive_v1";
const STORE_NAME = "stores";
const INDEX_KEY = "nyayadraft_store_index";

// Helper for IndexedDB persistence
function openDb(): Promise<IDBDatabase | null> {
  if (typeof window === "undefined" || !("indexedDB" in window)) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "host" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbGet(host: string): Promise<SavedStoreReview | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(host);
      req.onsuccess = () => resolve((req.result as SavedStoreReview) ?? null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbGetAll(): Promise<SavedStoreReview[]> {
  const db = await openDb();
  if (!db) return [];
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as SavedStoreReview[]) ?? []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

async function idbPut(record: SavedStoreReview): Promise<boolean> {
  const db = await openDb();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

async function idbDelete(host: string): Promise<boolean> {
  const db = await openDb();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(host);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

function cleanHost(raw: string): string {
  if (!raw) return "";
  const trimmed = raw.trim().toLowerCase();
  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    return url.host.replace(/^www\./, "");
  } catch {
    return trimmed.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] ?? trimmed;
  }
}

function toSummary(s: SavedStoreReview): StoreSummary {
  return {
    host: s.host,
    origin: s.origin,
    homeTitle: s.homeTitle,
    updatedAt: s.updatedAt,
    pageCount: s.pages?.length ?? 0,
    refinedCount: s.refined?.length ?? 0,
    hasAudit: Boolean(s.findings?.trim()),
    hasColdEmail: Boolean(s.coldPaper?.trim()),
    lastBatchStatus: s.lastBatchStatus,
  };
}

function saveIndexToLocalStorage(summaries: StoreSummary[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(summaries));
  } catch {
    /* ignore */
  }
}

function readIndexFromLocalStorage(): StoreSummary[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as StoreSummary[]) || [];
  } catch {
    return [];
  }
}

type StoreArchiveState = {
  summaries: StoreSummary[];
  cache: Map<string, SavedStoreReview>;
  hydrated: boolean;
  activeHost: string | null;
  init: () => Promise<void>;
  saveStore: (data: SavedStoreReview) => Promise<void>;
  getStore: (host: string) => Promise<SavedStoreReview | null>;
  addPagePermanently: (host: string, page: FetchedPage) => Promise<void>;
  deleteStore: (host: string) => Promise<void>;
  getAllStores: () => Promise<SavedStoreReview[]>;
  setActiveHost: (host: string | null) => void;
};

export const useStoreArchive = create<StoreArchiveState>((set, get) => ({
  summaries: readIndexFromLocalStorage(),
  cache: new Map<string, SavedStoreReview>(),
  hydrated: false,
  activeHost: null,

  init: async () => {
    if (get().hydrated) return;
    try {
      const all = await idbGetAll();
      const cache = new Map<string, SavedStoreReview>();
      for (const s of all) {
        if (s.host) cache.set(s.host, s);
      }
      const summaries = all
        .filter((s) => Boolean(s.host))
        .map(toSummary)
        .sort((a, b) => b.updatedAt - a.updatedAt);

      saveIndexToLocalStorage(summaries);
      set({ summaries, cache, hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },

  saveStore: async (data: SavedStoreReview) => {
    const host = cleanHost(data.host);
    if (!host) return;
    const now = Date.now();

    // Check if we have an existing store to merge pages and modifications safely
    const existing = get().cache.get(host) || (await idbGet(host));
    let mergedPages = [...data.pages];

    if (existing) {
      const existingByKey = new Map(existing.pages.map((p) => [pageUrlKey(p.url), p]));
      // If a page was previously fetched or marked added, preserve it if not present in new pages
      for (const old of existing.pages) {
        if (old.added && !mergedPages.some((p) => pageUrlKey(p.url) === pageUrlKey(old.url))) {
          mergedPages.push(old);
        }
      }
      // Preserve hidden / added flags from existing pages
      mergedPages = mergedPages.map((p) => {
        const old = existingByKey.get(pageUrlKey(p.url));
        return old
          ? { ...p, hidden: p.hidden ?? old.hidden, added: p.added || old.added }
          : p;
      });
    }

    const mergedRecord: SavedStoreReview = {
      ...existing,
      ...data,
      host,
      origin: data.origin || existing?.origin || `https://${host}`,
      homeTitle: data.homeTitle || existing?.homeTitle || host,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      pages: mergedPages,
      aiModifications: [
        ...(data.aiModifications || []),
        ...(existing?.aiModifications || []).filter(
          (m) => !(data.aiModifications || []).some((dm) => dm.id === m.id),
        ),
      ].slice(0, 30),
    };

    // Save to IndexedDB
    await idbPut(mergedRecord);

    // Update in-memory cache and summaries
    const nextCache = new Map(get().cache);
    nextCache.set(host, mergedRecord);

    const nextSummaries = [
      toSummary(mergedRecord),
      ...get().summaries.filter((s) => s.host !== host),
    ].sort((a, b) => b.updatedAt - a.updatedAt);

    saveIndexToLocalStorage(nextSummaries);

    set({ cache: nextCache, summaries: nextSummaries });
  },

  getStore: async (rawHost: string) => {
    const host = cleanHost(rawHost);
    if (!host) return null;
    const cached = get().cache.get(host);
    if (cached) return cached;
    const fromIdb = await idbGet(host);
    if (fromIdb) {
      const nextCache = new Map(get().cache);
      nextCache.set(host, fromIdb);
      set({ cache: nextCache });
      return fromIdb;
    }
    return null;
  },

  addPagePermanently: async (rawHost: string, page: FetchedPage) => {
    const host = cleanHost(rawHost);
    if (!host) return;
    const existing = (await get().getStore(host)) || {
      host,
      origin: page.url ? new URL(page.url).origin : `https://${host}`,
      homeTitle: host,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      pages: [],
      missing: [],
      hints: null,
      findings: "",
      citations: [],
      refined: [],
      gapsPaper: "",
      sellingPaper: "",
      questionsPaper: "",
      answers: {},
      briefPaper: "",
      briefAnswers: {},
      implementPaper: "",
      emailPaper: "",
      coldPaper: "",
      agreementPaper: "",
    };

    const markedPage: FetchedPage = {
      ...page,
      added: true,
    };

    const filtered = existing.pages.filter(
      (p) => pageUrlKey(p.url) !== pageUrlKey(page.url),
    );
    const updatedPages = [markedPage, ...filtered];

    await get().saveStore({
      ...existing,
      pages: updatedPages,
      updatedAt: Date.now(),
    });
  },

  deleteStore: async (rawHost: string) => {
    const host = cleanHost(rawHost);
    if (!host) return;
    await idbDelete(host);
    const nextCache = new Map(get().cache);
    nextCache.delete(host);
    const nextSummaries = get().summaries.filter((s) => s.host !== host);
    saveIndexToLocalStorage(nextSummaries);
    set({
      cache: nextCache,
      summaries: nextSummaries,
      activeHost: get().activeHost === host ? null : get().activeHost,
    });
  },

  getAllStores: async () => {
    const all = await idbGetAll();
    return all.sort((a, b) => b.updatedAt - a.updatedAt);
  },

  setActiveHost: (host: string | null) => set({ activeHost: host ? cleanHost(host) : null }),
}));

// Auto-initialize when in browser
if (typeof window !== "undefined") {
  void useStoreArchive.getState().init();
}

export function storeReviewToDrafts(s: SavedStoreReview): SavedDraft[] {
  if (!s || !s.host) return [];
  const host = cleanHost(s.host);
  const facts = { website: s.origin || `https://${host}`, host };
  const out: SavedDraft[] = [];
  const createdAt = s.updatedAt || s.createdAt || Date.now();

  // 1. Research paper from crawled pages
  if (s.pages && s.pages.length > 0) {
    out.push({
      id: `store-research::${host}`,
      slug: "store-research",
      title: `Research — ${host}`,
      createdAt,
      facts,
      draftText: s.pages
        .map(
          (p) =>
            `## ${p.label || p.kind}\n${p.title || p.url}\n${p.url}\n(${p.chars ? p.chars.toLocaleString("en-IN") : 0} characters)${p.hidden ? " · hidden" : ""}\n\n${(p.text || "").slice(0, 12_000)}`,
        )
        .join("\n\n"),
      notes: (s.missing || []).map((m) => m.label).join(", "),
      citations: s.citations || [],
    });
  }

  // 2. Audit against Indian law
  if (s.findings && s.findings.trim()) {
    out.push({
      id: `store-audit::${host}`,
      slug: "store-audit",
      title: `Store audit — ${host}`,
      createdAt,
      facts,
      draftText: s.findings,
      notes: (s.missing || []).map((m) => m.label).join(", "),
      citations: s.citations || [],
    });
  }

  // 3. Rewritten / Refined policies
  if (s.refined && s.refined.length > 0) {
    for (const item of s.refined) {
      const parsed = parseDraftOutput(item.raw || "");
      out.push({
        id: `${item.slug}::${host}::${item.url || item.kind}`,
        slug: item.slug,
        title: `${item.title || "Policy"} — ${host}`,
        createdAt,
        facts: {
          ...facts,
          url: item.url,
          kind: item.kind,
          pageTitle: item.title,
        },
        draftText: parsed.draft || item.raw || "",
        notes: parsed.notes || "",
        citations: s.citations || [],
      });
    }
  }

  // 4. Secondary papers
  const papers: [string, string, string | undefined][] = [
    ["store-gaps", "Gap register", s.gapsPaper],
    ["store-brief", "Client brief", s.briefPaper],
    ["store-questions", "Legal facts", s.questionsPaper],
    ["store-implement", "Implementations", s.implementPaper],
    ["store-selling", "Selling points", s.sellingPaper],
    ["store-email", "Forwarding emails", s.emailPaper],
    ["store-cold", "Cold email", s.coldPaper],
    ["store-agreement", "Service agreement", s.agreementPaper],
  ];

  for (const [slug, title, body] of papers) {
    if (!body || !body.trim()) continue;
    out.push({
      id: `${slug}::${host}`,
      slug,
      title: `${title} — ${host}`,
      createdAt,
      facts,
      draftText: body,
      notes: "",
      citations: s.citations || [],
    });
  }

  return out;
}

