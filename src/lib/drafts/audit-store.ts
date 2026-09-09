import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExtractedHints, FetchedPage, PolicyKind } from "@/lib/web/types";
import { missingFromPages, pageUrlKey } from "@/lib/web/types";
import type { SavedCitation } from "@/lib/drafts/store";
import { useStoreArchive, type SavedStoreReview } from "@/lib/drafts/store-archive";

export type RefinedPolicy = {
  kind: PolicyKind;
  url: string;
  slug: string;
  title: string;
  raw: string;
};

type AuditSession = {
  urlInput: string;
  origin: string;
  host: string;
  homeTitle: string;
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
  setUrlInput: (v: string) => void;
  setResearch: (data: {
    origin: string;
    host: string;
    homeTitle: string;
    pages: FetchedPage[];
    missing: { kind: PolicyKind; label: string }[];
    hints: ExtractedHints;
  }) => void;
  addPage: (page: FetchedPage) => void;
  togglePageHidden: (url: string) => void;
  setFindings: (text: string, citations: SavedCitation[]) => void;
  setGapsPaper: (text: string, citations: SavedCitation[]) => void;
  setSellingPaper: (text: string, citations: SavedCitation[]) => void;
  setQuestionsPaper: (text: string, citations: SavedCitation[]) => void;
  setAnswer: (id: string, value: string) => void;
  setBriefPaper: (text: string, citations: SavedCitation[]) => void;
  setBriefAnswer: (id: string, value: string) => void;
  setImplementPaper: (text: string, citations: SavedCitation[]) => void;
  setEmailPaper: (text: string, citations: SavedCitation[]) => void;
  setColdPaper: (text: string, citations: SavedCitation[]) => void;
  setAgreementPaper: (text: string, citations: SavedCitation[]) => void;
  setRefined: (item: RefinedPolicy) => void;
  replaceRefined: (refined: RefinedPolicy[]) => void;
  hydratePaper: (input: {
    slug: string;
    title: string;
    body: string;
    notes?: string;
    citations: SavedCitation[];
    facts: Record<string, string>;
  }) => void;
  loadSavedStore: (saved: SavedStoreReview) => void;
  persistToArchive: () => Promise<void>;
  reset: () => void;
};

const empty = {
  urlInput: "",
  origin: "",
  host: "",
  homeTitle: "",
  pages: [] as FetchedPage[],
  missing: [] as { kind: PolicyKind; label: string }[],
  hints: null as ExtractedHints | null,
  findings: "",
  citations: [] as SavedCitation[],
  refined: [] as RefinedPolicy[],
  gapsPaper: "",
  sellingPaper: "",
  questionsPaper: "",
  answers: {} as Record<string, string>,
  briefPaper: "",
  briefAnswers: {} as Record<string, string>,
  implementPaper: "",
  emailPaper: "",
  coldPaper: "",
  agreementPaper: "",
};

export const useAuditStore = create<AuditSession>()(
  persist(
    (set) => ({
      ...empty,
      setUrlInput: (urlInput) => set({ urlInput }),
      setResearch: (data) =>
        set((s) => {
          const clean = (h: string) => h.replace(/^www\./, "").toLowerCase().trim();
          const targetHost = clean(data.host);
          const sameHost = s.host && targetHost && clean(s.host) === targetHost;
          
          // Look up previously known pages from current session AND archive
          const archived = useStoreArchive.getState().cache.get(targetHost);
          const previousPages = sameHost
            ? s.pages
            : archived?.pages || [];
          
          const byKey = new Map(previousPages.map((p) => [pageUrlKey(p.url), p]));
          const pages = data.pages.map((p) => {
            const old = byKey.get(pageUrlKey(p.url));
            return old
              ? { ...p, hidden: old.hidden, added: old.added }
              : { ...p, hidden: Boolean(p.hidden), added: Boolean(p.added) };
          });

          // Retain ALL previously added or custom fetched pages
          for (const old of previousPages) {
            if (!old.added) continue;
            if (pages.some((p) => pageUrlKey(p.url) === pageUrlKey(old.url))) continue;
            pages.push({ ...old, added: true });
          }

          return {
            origin: data.origin,
            host: data.host,
            homeTitle: data.homeTitle,
            pages,
            missing: missingFromPages(pages),
            hints: data.hints,
            findings: sameHost ? s.findings : "",
            citations: sameHost ? s.citations : [],
            refined: sameHost ? s.refined : [],
            gapsPaper: sameHost ? s.gapsPaper : "",
            sellingPaper: sameHost ? s.sellingPaper : "",
            questionsPaper: sameHost ? s.questionsPaper : "",
            answers: sameHost ? s.answers : {},
            briefPaper: sameHost ? s.briefPaper : "",
            briefAnswers: sameHost ? s.briefAnswers : {},
            implementPaper: sameHost ? s.implementPaper : "",
            emailPaper: sameHost ? s.emailPaper : "",
            coldPaper: sameHost ? s.coldPaper : "",
            agreementPaper: sameHost ? s.agreementPaper : "",
          };
        }),
      addPage: (page) =>
        set((s) => {
          const markedPage: FetchedPage = { ...page, added: true };
          const pages = [
            markedPage,
            ...s.pages.filter((p) => pageUrlKey(p.url) !== pageUrlKey(page.url)),
          ];
          
          // Persist to store archive permanently in background
          const host = s.host || (page.url ? new URL(page.url).host.replace(/^www\./, "") : "");
          if (host) {
            void useStoreArchive.getState().addPagePermanently(host, markedPage);
          }

          return { pages, missing: missingFromPages(pages) };
        }),
      togglePageHidden: (url) =>
        set((s) => ({
          pages: s.pages.map((p) =>
            pageUrlKey(p.url) === pageUrlKey(url) ? { ...p, hidden: !p.hidden } : p,
          ),
        })),
      setFindings: (findings, citations) => set({ findings, citations }),
      setGapsPaper: (gapsPaper, citations) =>
        set((s) => ({
          gapsPaper,
          citations: citations.length ? citations : s.citations,
        })),
      setSellingPaper: (sellingPaper, citations) =>
        set((s) => ({
          sellingPaper,
          citations: citations.length ? citations : s.citations,
        })),
      setQuestionsPaper: (questionsPaper, citations) =>
        set((s) => ({
          questionsPaper,
          citations: citations.length ? citations : s.citations,
        })),
      setAnswer: (id, value) =>
        set((s) => ({ answers: { ...s.answers, [id]: value } })),
      setBriefPaper: (briefPaper, citations) =>
        set((s) => ({
          briefPaper,
          citations: citations.length ? citations : s.citations,
        })),
      setBriefAnswer: (id, value) =>
        set((s) => ({ briefAnswers: { ...s.briefAnswers, [id]: value } })),
      setImplementPaper: (implementPaper, citations) =>
        set((s) => ({
          implementPaper,
          citations: citations.length ? citations : s.citations,
        })),
      setEmailPaper: (emailPaper, citations) =>
        set((s) => ({
          emailPaper,
          citations: citations.length ? citations : s.citations,
        })),
      setColdPaper: (coldPaper, citations) =>
        set((s) => ({
          coldPaper,
          citations: citations.length ? citations : s.citations,
        })),
      setAgreementPaper: (agreementPaper, citations) =>
        set((s) => ({
          agreementPaper,
          citations: citations.length ? citations : s.citations,
        })),
      setRefined: (item) =>
        set((s) => {
          const key = item.url || `kind:${item.kind}`;
          return {
            refined: [
              item,
              ...s.refined.filter((r) => (r.url || `kind:${r.kind}`) !== key),
            ],
          };
        }),
      replaceRefined: (refined: RefinedPolicy[]) => set({ refined }),
      hydratePaper: (input) =>
        set((s) => {
          const citations = input.citations.length ? input.citations : s.citations;
          const body = input.body;
          switch (input.slug) {
            case "store-research":
              return s;
            case "store-audit":
              return { findings: body, citations };
            case "store-gaps":
              return { gapsPaper: body, citations };
            case "store-selling":
              return { sellingPaper: body, citations };
            case "store-questions":
              return { questionsPaper: body, citations };
            case "store-brief":
              return { briefPaper: body, citations };
            case "store-implement":
              return { implementPaper: body, citations };
            case "store-email":
              return { emailPaper: body, citations };
            case "store-cold":
              return { coldPaper: body, citations };
            case "store-agreement":
              return { agreementPaper: body, citations };
            default: {
              const kind = (input.facts.kind || "other") as RefinedPolicy["kind"];
              const url = input.facts.url || "";
              const item: RefinedPolicy = {
                kind,
                url,
                slug: input.slug,
                title: input.facts.pageTitle || input.title,
                raw: input.notes
                  ? `${body}\n\n## DRAFTING NOTES\n${input.notes}`
                  : body,
              };
              return {
                citations,
                refined: [
                  item,
                  ...s.refined.filter((r) =>
                    url ? r.url !== url : r.kind !== kind,
                  ),
                ],
              };
            }
          }
        }),
      loadSavedStore: (saved: SavedStoreReview) => {
        set({
          origin: saved.origin,
          host: saved.host,
          homeTitle: saved.homeTitle,
          urlInput: saved.origin,
          pages: saved.pages || [],
          missing: saved.missing || [],
          hints: saved.hints || null,
          findings: saved.findings || "",
          citations: saved.citations || [],
          refined: saved.refined || [],
          gapsPaper: saved.gapsPaper || "",
          sellingPaper: saved.sellingPaper || "",
          questionsPaper: saved.questionsPaper || "",
          answers: saved.answers || {},
          briefPaper: saved.briefPaper || "",
          briefAnswers: saved.briefAnswers || {},
          implementPaper: saved.implementPaper || "",
          emailPaper: saved.emailPaper || "",
          coldPaper: saved.coldPaper || "",
          agreementPaper: saved.agreementPaper || "",
        });
      },
      persistToArchive: async () => {
        const s = useAuditStore.getState();
        if (!s.host) return;
        await useStoreArchive.getState().saveStore({
          host: s.host,
          origin: s.origin,
          homeTitle: s.homeTitle,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          pages: s.pages,
          missing: s.missing,
          hints: s.hints,
          findings: s.findings,
          citations: s.citations,
          refined: s.refined,
          gapsPaper: s.gapsPaper,
          sellingPaper: s.sellingPaper,
          questionsPaper: s.questionsPaper,
          answers: s.answers,
          briefPaper: s.briefPaper,
          briefAnswers: s.briefAnswers,
          implementPaper: s.implementPaper,
          emailPaper: s.emailPaper,
          coldPaper: s.coldPaper,
          agreementPaper: s.agreementPaper,
        });
      },
      reset: () => set({ ...empty }),
    }),
    { name: "nyayadraft-audit" },
  ),
);
