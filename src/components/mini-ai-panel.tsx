import { useState } from "react";
import {
  Sparkles,
  Mail,
  Brain,
  Check,
  Copy,
  Save,
  Loader2,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { miniAiAnalyzeAndModifyFn } from "@/lib/ai/mini-ai";
import { useAuditStore, type RefinedPolicy } from "@/lib/drafts/audit-store";
import { useStoreArchive } from "@/lib/drafts/store-archive";
import { useSenderStore } from "@/lib/drafts/sender-store";
import { aiKeysPayload } from "@/lib/ai/keys-store";
import { cn } from "@/lib/utils";

type MiniAiPanelProps = {
  currentStoreHost?: string;
  onApplied?: () => void;
  className?: string;
};

export function MiniAiPanel({
  currentStoreHost,
  onApplied,
  className,
}: MiniAiPanelProps) {
  const auditStore = useAuditStore();
  const archive = useStoreArchive();
  const sender = useSenderStore();

  const host = currentStoreHost || auditStore.host || archive.activeHost || "";
  const [activeTab, setActiveTab] = useState<
    "cold_policy" | "study" | "custom_modify"
  >("cold_policy");

  // Selection states
  const [selectedPolicyKind, setSelectedPolicyKind] = useState<string>("refund");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [targetField, setTargetField] = useState<
    "coldPaper" | "findings" | "refined" | "gapsPaper" | "briefPaper" | "implementPaper" | "agreementPaper"
  >("coldPaper");

  // Output states
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [analysisNotes, setAnalysisNotes] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Available policies for current store
  const availablePolicies: RefinedPolicy[] = auditStore.refined.length
    ? auditStore.refined
    : (archive.cache.get(host)?.refined || []);

  const storeOrigin = auditStore.origin || archive.cache.get(host)?.origin || (host ? `https://${host}` : "");
  const storeTitle = auditStore.homeTitle || archive.cache.get(host)?.homeTitle || host;

  const handleRunColdPolicy = async () => {
    if (!host) {
      toast.error("Please audit or select a store first");
      return;
    }

    setLoading(true);
    setGeneratedContent(null);
    setAnalysisNotes(null);

    try {
      const chosenPolicy = availablePolicies.find(
        (p) => p.kind === selectedPolicyKind || p.slug.includes(selectedPolicyKind),
      );

      const res = await miniAiAnalyzeAndModifyFn({
        data: {
          host,
          origin: storeOrigin,
          homeTitle: storeTitle,
          action: "cold_mail_full_policy",
          selectedPolicyKind,
          selectedPolicyTitle: chosenPolicy?.title || `Revised ${selectedPolicyKind} Policy`,
          targetField: "coldPaper",
          userPrompt: customPrompt.trim() || undefined,
          sender: {
            name: sender.name,
            city: sender.city,
            email: sender.email,
            phone: sender.phone,
            fee: sender.fee,
            advancePct: sender.advancePct,
          },
          pages: auditStore.pages.map((p) => ({
            kind: p.kind,
            label: p.label,
            url: p.url,
            title: p.title,
            text: p.text.slice(0, 4000),
            hidden: p.hidden,
            added: p.added,
          })),
          refined: availablePolicies.map((r) => ({
            kind: r.kind,
            url: r.url,
            slug: r.slug,
            title: r.title,
            raw: r.raw.slice(0, 9000),
          })),
          findings: auditStore.findings || archive.cache.get(host)?.findings || "",
          gapsPaper: auditStore.gapsPaper || archive.cache.get(host)?.gapsPaper || "",
          currentContent: auditStore.coldPaper || archive.cache.get(host)?.coldPaper || "",
          aiKeys: aiKeysPayload(),
        },
      });

      if (!res.ok) {
        toast.error(res.error || "Failed to generate outreach sequence");
        return;
      }

      setGeneratedContent(res.modifiedContent);
      setAnalysisNotes(
        `Generated cold email sequence featuring complete ${res.policyTitle || selectedPolicyKind} policy instead of a single clause.`,
      );
      setLastAction("cold_mail_full_policy");
      toast.success("Mini AI drafted outreach sequence featuring full revised policy!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Mini AI request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRunStudy = async () => {
    if (!host) {
      toast.error("Please audit or select a store first");
      return;
    }

    setLoading(true);
    setGeneratedContent(null);
    setAnalysisNotes(null);

    try {
      const res = await miniAiAnalyzeAndModifyFn({
        data: {
          host,
          origin: storeOrigin,
          homeTitle: storeTitle,
          action: "study_and_analyze",
          userPrompt: customPrompt.trim() || undefined,
          pages: auditStore.pages.map((p) => ({
            kind: p.kind,
            label: p.label,
            url: p.url,
            title: p.title,
            text: p.text.slice(0, 4000),
            hidden: p.hidden,
            added: p.added,
          })),
          refined: availablePolicies.map((r) => ({
            kind: r.kind,
            url: r.url,
            slug: r.slug,
            title: r.title,
            raw: r.raw.slice(0, 9000),
          })),
          findings: auditStore.findings || archive.cache.get(host)?.findings || "",
          gapsPaper: auditStore.gapsPaper || archive.cache.get(host)?.gapsPaper || "",
          aiKeys: aiKeysPayload(),
        },
      });

      if (!res.ok) {
        toast.error(res.error || "Failed to analyze store");
        return;
      }

      setGeneratedContent(res.analysis);
      setAnalysisNotes("Store analysis complete.");
      setLastAction("study_and_analyze");
      toast.success("Strategic store analysis complete!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Study request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRunCustomModify = async () => {
    if (!host) {
      toast.error("Please audit or select a store first");
      return;
    }
    if (!customPrompt.trim()) {
      toast.error("Please enter instructions on how you want to modify this paper");
      return;
    }

    setLoading(true);
    setGeneratedContent(null);
    setAnalysisNotes(null);

    try {
      let currentContent = "";
      if (targetField === "coldPaper") {
        currentContent = auditStore.coldPaper || archive.cache.get(host)?.coldPaper || "";
      } else if (targetField === "findings") {
        currentContent = auditStore.findings || archive.cache.get(host)?.findings || "";
      } else if (targetField === "gapsPaper") {
        currentContent = auditStore.gapsPaper || archive.cache.get(host)?.gapsPaper || "";
      } else if (targetField === "briefPaper") {
        currentContent = auditStore.briefPaper || archive.cache.get(host)?.briefPaper || "";
      } else if (targetField === "implementPaper") {
        currentContent = auditStore.implementPaper || archive.cache.get(host)?.implementPaper || "";
      } else if (targetField === "agreementPaper") {
        currentContent = auditStore.agreementPaper || archive.cache.get(host)?.agreementPaper || "";
      }

      const res = await miniAiAnalyzeAndModifyFn({
        data: {
          host,
          origin: storeOrigin,
          homeTitle: storeTitle,
          action: "modify_paper",
          targetField,
          userPrompt: customPrompt.trim(),
          currentContent,
          sender: {
            name: sender.name,
            city: sender.city,
            email: sender.email,
            phone: sender.phone,
            fee: sender.fee,
            advancePct: sender.advancePct,
          },
          pages: auditStore.pages.map((p) => ({
            kind: p.kind,
            label: p.label,
            url: p.url,
            title: p.title,
            text: p.text.slice(0, 3000),
            hidden: p.hidden,
            added: p.added,
          })),
          refined: availablePolicies.map((r) => ({
            kind: r.kind,
            url: r.url,
            slug: r.slug,
            title: r.title,
            raw: r.raw.slice(0, 5000),
          })),
          findings: auditStore.findings || archive.cache.get(host)?.findings || "",
          aiKeys: aiKeysPayload(),
        },
      });

      if (!res.ok) {
        toast.error(res.error || "Failed to modify paper");
        return;
      }

      setGeneratedContent(res.modifiedContent);
      setAnalysisNotes(`Modified ${targetField} per instructions.`);
      setLastAction("modify_paper");
      toast.success(`Successfully customized ${targetField}!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Modification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToStore = async () => {
    if (!generatedContent || !host) return;

    try {
      if (lastAction === "cold_mail_full_policy" || targetField === "coldPaper") {
        auditStore.setColdPaper(generatedContent, []);
      } else if (targetField === "findings") {
        auditStore.setFindings(generatedContent, []);
      } else if (targetField === "gapsPaper") {
        auditStore.setGapsPaper(generatedContent, []);
      } else if (targetField === "briefPaper") {
        auditStore.setBriefPaper(generatedContent, []);
      } else if (targetField === "implementPaper") {
        auditStore.setImplementPaper(generatedContent, []);
      } else if (targetField === "agreementPaper") {
        auditStore.setAgreementPaper(generatedContent, []);
      }

      // Persist permanently to store archive
      await auditStore.persistToArchive();

      toast.success("Applied and permanently saved to this store review!");
      if (onApplied) onApplied();
    } catch {
      toast.error("Failed to save changes permanently");
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    void navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast.success("Copied content to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-primary/20 bg-surface/90 shadow-sm backdrop-blur-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-4 py-3 bg-primary/5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-fg shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold tracking-tight text-ink">
                Mini AI Studio
              </span>
              <span className="rounded-[var(--radius-sm)] bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                Adaptive Drafter
              </span>
            </div>
            <p className="text-[11px] text-muted">
              Studies, analyzes, & modifies store data to your exact specifications
            </p>
          </div>
        </div>

        {host ? (
          <div className="flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-border bg-surface-2/60 px-2 py-1 text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] text-ink">{host}</span>
          </div>
        ) : (
          <span className="text-xs text-muted italic">No store active</span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/60 bg-surface-2/30 px-3 pt-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("cold_policy")}
          className={cn(
            "flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors",
            activeTab === "cold_policy"
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-ink",
          )}
        >
          <Mail className="h-3.5 w-3.5" />
          Full Policy in Cold Mail
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("study")}
          className={cn(
            "flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors",
            activeTab === "study"
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-ink",
          )}
        >
          <Brain className="h-3.5 w-3.5" />
          Strategic Store Study
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("custom_modify")}
          className={cn(
            "flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors",
            activeTab === "custom_modify"
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-ink",
          )}
        >
          <Sliders className="h-3.5 w-3.5" />
          Modify Any Paper
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Tab 1: Cold Mail with Full Policy */}
        {activeTab === "cold_policy" && (
          <div className="space-y-3">
            <div className="rounded-[var(--radius-sm)] bg-surface-2/50 border border-border/60 p-3 text-xs text-muted leading-relaxed">
              <span className="font-semibold text-ink">Feature Complete Policy Teaser: </span>
              Ordinarily, the cold outreach sequence sends just 1 sample clause.
              Use this to restructure the cold mail sequence to present an{" "}
              <strong className="text-ink">entire revised policy</strong> (e.g.
              Full Revised Refund Policy or Full Terms of Service) as a high-value teaser pack to
              compel the founder to respond.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Select Revised Policy to Feature:
                </label>
                <select
                  value={selectedPolicyKind}
                  onChange={(e) => setSelectedPolicyKind(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-primary focus:outline-none"
                >
                  <option value="refund">Revised Refund & Cancellation Policy</option>
                  <option value="terms">Revised Terms of Service</option>
                  <option value="privacy">Revised Privacy & Consent Policy</option>
                  <option value="shipping">Revised Shipping & Delivery Policy</option>
                  <option value="other">General E-Commerce Compliance Pack</option>
                </select>
                {availablePolicies.length > 0 && (
                  <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    {availablePolicies.length} refined policies available in store review
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Optional Angle / Custom Instruction:
                </label>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Focus on COD dispute prevention and 48-hr unboxing rule..."
                  className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-muted">
                Pitches the complete policy in Email 1, Email 3, WhatsApp DM, and Call Script.
              </span>
              <button
                type="button"
                disabled={loading || !host}
                onClick={handleRunColdPolicy}
                className="flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Synthesizing Sequence...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate Outreach with Full Policy
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Study & Analyze */}
        {activeTab === "study" && (
          <div className="space-y-3">
            <div className="rounded-[var(--radius-sm)] bg-surface-2/50 border border-border/60 p-3 text-xs text-muted leading-relaxed">
              <span className="font-semibold text-ink">Deep Store Intelligence: </span>
              Studies all live pages, policy gaps, and legal metrology disclosures to identify
              critical statutory vulnerabilities (CPA 2019, E-Commerce Rules 2020, DPDP Act 2023)
              and commercial leverage angles to present to the store founder.
            </div>

            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                Specific Area of Investigation (Optional):
              </label>
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Analyze return and refund bottlenecks, COD risks, or DPDPA compliance..."
                className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                disabled={loading || !host}
                onClick={handleRunStudy}
                className="flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Studying Store Data...
                  </>
                ) : (
                  <>
                    <Brain className="h-3.5 w-3.5" />
                    Run Strategic Study
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Custom Modify */}
        {activeTab === "custom_modify" && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Target Paper / Data Field:
                </label>
                <select
                  value={targetField}
                  onChange={(e) =>
                    setTargetField(
                      e.target.value as
                        | "coldPaper"
                        | "findings"
                        | "refined"
                        | "gapsPaper"
                        | "briefPaper"
                        | "implementPaper"
                        | "agreementPaper",
                    )
                  }
                  className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-primary focus:outline-none"
                >
                  <option value="coldPaper">Cold Email Sequence (coldPaper)</option>
                  <option value="findings">Store Legal Audit Findings (findings)</option>
                  <option value="gapsPaper">Policy Gap Register (gapsPaper)</option>
                  <option value="briefPaper">Client Brief & Scoping (briefPaper)</option>
                  <option value="implementPaper">Implementation Checklist (implementPaper)</option>
                  <option value="agreementPaper">Service Agreement (agreementPaper)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Quick Presets:
                </label>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setCustomPrompt(
                        "Tone: direct and assertive. Emphasize CCPA penalty risks under E-Commerce Rules 2020.",
                      )
                    }
                    className="rounded bg-surface-2 px-2 py-0.5 text-[10px] text-muted hover:text-ink"
                  >
                    CCPA Risk Focus
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomPrompt(
                        "Shorten all emails by 30%. Add clear WhatsApp one-tap question at the end.",
                      )
                    }
                    className="rounded bg-surface-2 px-2 py-0.5 text-[10px] text-muted hover:text-ink"
                  >
                    Shorten & WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomPrompt(
                        "Add clause addressing Indian courier transit damage and 48-hour unboxing video requirements.",
                      )
                    }
                    className="rounded bg-surface-2 px-2 py-0.5 text-[10px] text-muted hover:text-ink"
                  >
                    Courier Damage / Video
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                How should the Mini AI modify this document?
              </label>
              <textarea
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe your specific modifications (e.g., 'Rewrite the cold email Day 0 and WhatsApp DM to pitch our revised return policy for apparel brands', or 'Add clauses for cash-on-delivery cancellation fees')..."
                className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                disabled={loading || !host || !customPrompt.trim()}
                onClick={handleRunCustomModify}
                className="flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Modifying Document...
                  </>
                ) : (
                  <>
                    <Sliders className="h-3.5 w-3.5" />
                    Execute Custom Modification
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Output Section */}
        {generatedContent && (
          <div className="mt-4 border-t border-border pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-medium text-ink">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Mini AI Output</span>
                {analysisNotes && (
                  <span className="text-[11px] text-muted">({analysisNotes})</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-[var(--radius-sm)] border border-border bg-surface px-2 py-1 text-xs text-muted hover:text-ink transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleApplyToStore}
                  className="flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-emerald-700 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  Apply & Save Permanently
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto rounded-[var(--radius-sm)] border border-border bg-surface-2/40 p-3 font-mono text-[11px] leading-relaxed text-ink whitespace-pre-wrap select-text">
              {generatedContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
