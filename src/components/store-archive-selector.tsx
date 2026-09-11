import { useState } from "react";
import {
  Archive,
  ChevronDown,
  Trash2,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { useStoreArchive } from "@/lib/drafts/store-archive";
import { useAuditStore } from "@/lib/drafts/audit-store";
import { cn } from "@/lib/utils";

type StoreArchiveSelectorProps = {
  onSelectStore?: (host: string) => void;
  className?: string;
};

export function StoreArchiveSelector({
  onSelectStore,
  className,
}: StoreArchiveSelectorProps) {
  const archive = useStoreArchive();
  const auditStore = useAuditStore();
  const [isOpen, setIsOpen] = useState(false);

  const activeHost = auditStore.host || archive.activeHost || "";
  const count = archive.summaries.length;

  const handleSelect = async (host: string) => {
    try {
      const storeData = await archive.getStore(host);
      if (!storeData) {
        toast.error(`Could not load store data for ${host}`);
        return;
      }

      auditStore.loadSavedStore(storeData);
      archive.setActiveHost(host);
      setIsOpen(false);
      toast.success(`Loaded saved review for ${storeData.homeTitle || host}`);
      if (onSelectStore) onSelectStore(host);
    } catch {
      toast.error("Failed to load store review");
    }
  };

  const handleDelete = async (e: React.MouseEvent, host: string) => {
    e.stopPropagation();
    if (!window.confirm(`Delete permanently saved data for ${host}?`)) return;
    await archive.deleteStore(host);
    toast.success(`Deleted ${host} from local archive`);
  };

  const handleExportAll = async () => {
    const all = await archive.getAllStores();
    if (!all.length) {
      toast.error("No saved stores to export");
      return;
    }
    const blob = new Blob([JSON.stringify(all, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nyayadraft-saved-stores-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${all.length} saved store reviews`);
  };

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-xs hover:bg-surface-2 transition-colors"
        >
          <Archive className="h-3.5 w-3.5 text-primary" />
          <span>
            {activeHost ? (
              <span className="font-semibold text-ink">{activeHost}</span>
            ) : (
              "Saved Stores"
            )}
          </span>
          <span className="rounded-full bg-surface-2 px-1.5 py-0.2 text-[10px] text-muted">
            {count}
          </span>
          <ChevronDown className="h-3 w-3 text-muted" />
        </button>

        {count > 0 && (
          <button
            type="button"
            onClick={handleExportAll}
            title="Export all permanently saved stores as JSON"
            className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface text-muted hover:text-ink hover:bg-surface-2 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-1.5 z-50 w-80 max-h-96 overflow-y-auto rounded-[var(--radius-md)] border border-border bg-surface p-1 shadow-lg">
            <div className="flex items-center justify-between border-b border-border/70 px-3 py-2 text-[11px] font-medium text-muted">
              <span>Local Space Archive ({count})</span>
              <span className="text-[10px] text-emerald-600 font-normal">
                Persists permanently
              </span>
            </div>

            {count === 0 ? (
              <div className="p-4 text-center text-xs text-muted">
                No stores saved yet. Audit a store or run a batch to automatically persist data here.
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {archive.summaries.map((s, idx) => {
                  const isActive = s.host === activeHost;
                  return (
                    <div
                      key={s.host}
                      onClick={() => void handleSelect(s.host)}
                      className={cn(
                        "group flex cursor-pointer items-center justify-between p-2.5 text-xs transition-colors hover:bg-surface-2 rounded-[var(--radius-sm)]",
                        isActive && "bg-primary/5 font-medium text-primary",
                      )}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] font-semibold text-muted bg-surface-2 border border-border/70 px-1 py-0.2 rounded shrink-0">
                            #{idx + 1}
                          </span>
                          <span className="truncate font-medium text-ink">
                            {s.homeTitle || s.host}
                          </span>
                          {isActive && (
                            <span className="rounded bg-primary/20 px-1 py-0.2 text-[9px] text-primary">
                              active
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-muted mt-0.5">
                          <span>{s.host}</span>
                          <span>·</span>
                          <span>{s.pageCount} pages</span>
                          {s.refinedCount > 0 && (
                            <>
                              <span>·</span>
                              <span className="text-emerald-600">
                                {s.refinedCount} rewritten
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => void handleDelete(e, s.host)}
                          className="rounded p-1 text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete store record"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
