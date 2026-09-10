import { n as persist, r as create } from "../_libs/zustand.mjs";
import { i as pageUrlKey, r as missingFromPages } from "./types-BWR_EVh8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-store-DeG2ETsA.js
var DB_NAME = "nyayadraft_store_archive_v1";
var STORE_NAME = "stores";
var INDEX_KEY = "nyayadraft_store_index";
function openDb() {
	if (typeof window === "undefined" || !("indexedDB" in window)) return Promise.resolve(null);
	return new Promise((resolve) => {
		try {
			const request = indexedDB.open(DB_NAME, 1);
			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: "host" });
			};
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => resolve(null);
		} catch {
			resolve(null);
		}
	});
}
async function idbGet(host) {
	const db = await openDb();
	if (!db) return null;
	return new Promise((resolve) => {
		try {
			const req = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(host);
			req.onsuccess = () => resolve(req.result ?? null);
			req.onerror = () => resolve(null);
		} catch {
			resolve(null);
		}
	});
}
async function idbGetAll() {
	const db = await openDb();
	if (!db) return [];
	return new Promise((resolve) => {
		try {
			const req = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).getAll();
			req.onsuccess = () => resolve(req.result ?? []);
			req.onerror = () => resolve([]);
		} catch {
			resolve([]);
		}
	});
}
async function idbPut(record) {
	const db = await openDb();
	if (!db) return false;
	return new Promise((resolve) => {
		try {
			const req = db.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).put(record);
			req.onsuccess = () => resolve(true);
			req.onerror = () => resolve(false);
		} catch {
			resolve(false);
		}
	});
}
async function idbDelete(host) {
	const db = await openDb();
	if (!db) return false;
	return new Promise((resolve) => {
		try {
			const req = db.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).delete(host);
			req.onsuccess = () => resolve(true);
			req.onerror = () => resolve(false);
		} catch {
			resolve(false);
		}
	});
}
function cleanHost(raw) {
	if (!raw) return "";
	const trimmed = raw.trim().toLowerCase();
	try {
		return new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`).host.replace(/^www\./, "");
	} catch {
		return trimmed.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] ?? trimmed;
	}
}
function toSummary(s) {
	return {
		host: s.host,
		origin: s.origin,
		homeTitle: s.homeTitle,
		updatedAt: s.updatedAt,
		pageCount: s.pages?.length ?? 0,
		refinedCount: s.refined?.length ?? 0,
		hasAudit: Boolean(s.findings?.trim()),
		hasColdEmail: Boolean(s.coldPaper?.trim()),
		lastBatchStatus: s.lastBatchStatus
	};
}
function saveIndexToLocalStorage(summaries) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(INDEX_KEY, JSON.stringify(summaries));
	} catch {}
}
function readIndexFromLocalStorage() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(INDEX_KEY);
		if (!raw) return [];
		return JSON.parse(raw) || [];
	} catch {
		return [];
	}
}
var useStoreArchive = create((set, get) => ({
	summaries: readIndexFromLocalStorage(),
	cache: /* @__PURE__ */ new Map(),
	hydrated: false,
	activeHost: null,
	init: async () => {
		if (get().hydrated) return;
		try {
			const all = await idbGetAll();
			const cache = /* @__PURE__ */ new Map();
			for (const s of all) if (s.host) cache.set(s.host, s);
			const summaries = all.filter((s) => Boolean(s.host)).map(toSummary).sort((a, b) => b.updatedAt - a.updatedAt);
			saveIndexToLocalStorage(summaries);
			set({
				summaries,
				cache,
				hydrated: true
			});
		} catch {
			set({ hydrated: true });
		}
	},
	saveStore: async (data) => {
		const host = cleanHost(data.host);
		if (!host) return;
		const now = Date.now();
		const existing = get().cache.get(host) || await idbGet(host);
		let mergedPages = [...data.pages];
		if (existing) {
			const existingByKey = new Map(existing.pages.map((p) => [pageUrlKey(p.url), p]));
			for (const old of existing.pages) if (old.added && !mergedPages.some((p) => pageUrlKey(p.url) === pageUrlKey(old.url))) mergedPages.push(old);
			mergedPages = mergedPages.map((p) => {
				const old = existingByKey.get(pageUrlKey(p.url));
				return old ? {
					...p,
					hidden: p.hidden ?? old.hidden,
					added: p.added || old.added
				} : p;
			});
		}
		const mergedRecord = {
			...existing,
			...data,
			host,
			origin: data.origin || existing?.origin || `https://${host}`,
			homeTitle: data.homeTitle || existing?.homeTitle || host,
			createdAt: existing?.createdAt || now,
			updatedAt: now,
			pages: mergedPages,
			aiModifications: [...data.aiModifications || [], ...(existing?.aiModifications || []).filter((m) => !(data.aiModifications || []).some((dm) => dm.id === m.id))].slice(0, 30)
		};
		await idbPut(mergedRecord);
		const nextCache = new Map(get().cache);
		nextCache.set(host, mergedRecord);
		const nextSummaries = [toSummary(mergedRecord), ...get().summaries.filter((s) => s.host !== host)].sort((a, b) => b.updatedAt - a.updatedAt);
		saveIndexToLocalStorage(nextSummaries);
		set({
			cache: nextCache,
			summaries: nextSummaries
		});
	},
	getStore: async (rawHost) => {
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
	addPagePermanently: async (rawHost, page) => {
		const host = cleanHost(rawHost);
		if (!host) return;
		const existing = await get().getStore(host) || {
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
			agreementPaper: ""
		};
		const updatedPages = [{
			...page,
			added: true
		}, ...existing.pages.filter((p) => pageUrlKey(p.url) !== pageUrlKey(page.url))];
		await get().saveStore({
			...existing,
			pages: updatedPages,
			updatedAt: Date.now()
		});
	},
	deleteStore: async (rawHost) => {
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
			activeHost: get().activeHost === host ? null : get().activeHost
		});
	},
	getAllStores: async () => {
		return (await idbGetAll()).sort((a, b) => b.updatedAt - a.updatedAt);
	},
	setActiveHost: (host) => set({ activeHost: host ? cleanHost(host) : null })
}));
if (typeof window !== "undefined") useStoreArchive.getState().init();
var empty = {
	urlInput: "",
	origin: "",
	host: "",
	homeTitle: "",
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
	agreementPaper: ""
};
var useAuditStore = create()(persist((set) => ({
	...empty,
	setUrlInput: (urlInput) => set({ urlInput }),
	setResearch: (data) => set((s) => {
		const clean = (h) => h.replace(/^www\./, "").toLowerCase().trim();
		const targetHost = clean(data.host);
		const sameHost = s.host && targetHost && clean(s.host) === targetHost;
		const archived = useStoreArchive.getState().cache.get(targetHost);
		const previousPages = sameHost ? s.pages : archived?.pages || [];
		const byKey = new Map(previousPages.map((p) => [pageUrlKey(p.url), p]));
		const pages = data.pages.map((p) => {
			const old = byKey.get(pageUrlKey(p.url));
			return old ? {
				...p,
				hidden: old.hidden,
				added: old.added
			} : {
				...p,
				hidden: Boolean(p.hidden),
				added: Boolean(p.added)
			};
		});
		for (const old of previousPages) {
			if (!old.added) continue;
			if (pages.some((p) => pageUrlKey(p.url) === pageUrlKey(old.url))) continue;
			pages.push({
				...old,
				added: true
			});
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
			agreementPaper: sameHost ? s.agreementPaper : ""
		};
	}),
	addPage: (page) => set((s) => {
		const markedPage = {
			...page,
			added: true
		};
		const pages = [markedPage, ...s.pages.filter((p) => pageUrlKey(p.url) !== pageUrlKey(page.url))];
		const host = s.host || (page.url ? new URL(page.url).host.replace(/^www\./, "") : "");
		if (host) useStoreArchive.getState().addPagePermanently(host, markedPage);
		return {
			pages,
			missing: missingFromPages(pages)
		};
	}),
	togglePageHidden: (url) => set((s) => ({ pages: s.pages.map((p) => pageUrlKey(p.url) === pageUrlKey(url) ? {
		...p,
		hidden: !p.hidden
	} : p) })),
	setFindings: (findings, citations) => set({
		findings,
		citations
	}),
	setGapsPaper: (gapsPaper, citations) => set((s) => ({
		gapsPaper,
		citations: citations.length ? citations : s.citations
	})),
	setSellingPaper: (sellingPaper, citations) => set((s) => ({
		sellingPaper,
		citations: citations.length ? citations : s.citations
	})),
	setQuestionsPaper: (questionsPaper, citations) => set((s) => ({
		questionsPaper,
		citations: citations.length ? citations : s.citations
	})),
	setAnswer: (id, value) => set((s) => ({ answers: {
		...s.answers,
		[id]: value
	} })),
	setBriefPaper: (briefPaper, citations) => set((s) => ({
		briefPaper,
		citations: citations.length ? citations : s.citations
	})),
	setBriefAnswer: (id, value) => set((s) => ({ briefAnswers: {
		...s.briefAnswers,
		[id]: value
	} })),
	setImplementPaper: (implementPaper, citations) => set((s) => ({
		implementPaper,
		citations: citations.length ? citations : s.citations
	})),
	setEmailPaper: (emailPaper, citations) => set((s) => ({
		emailPaper,
		citations: citations.length ? citations : s.citations
	})),
	setColdPaper: (coldPaper, citations) => set((s) => ({
		coldPaper,
		citations: citations.length ? citations : s.citations
	})),
	setAgreementPaper: (agreementPaper, citations) => set((s) => ({
		agreementPaper,
		citations: citations.length ? citations : s.citations
	})),
	setRefined: (item) => set((s) => {
		const key = item.url || `kind:${item.kind}`;
		return { refined: [item, ...s.refined.filter((r) => (r.url || `kind:${r.kind}`) !== key)] };
	}),
	replaceRefined: (refined) => set({ refined }),
	hydratePaper: (input) => set((s) => {
		const citations = input.citations.length ? input.citations : s.citations;
		const body = input.body;
		switch (input.slug) {
			case "store-research": return s;
			case "store-audit": return {
				findings: body,
				citations
			};
			case "store-gaps": return {
				gapsPaper: body,
				citations
			};
			case "store-selling": return {
				sellingPaper: body,
				citations
			};
			case "store-questions": return {
				questionsPaper: body,
				citations
			};
			case "store-brief": return {
				briefPaper: body,
				citations
			};
			case "store-implement": return {
				implementPaper: body,
				citations
			};
			case "store-email": return {
				emailPaper: body,
				citations
			};
			case "store-cold": return {
				coldPaper: body,
				citations
			};
			case "store-agreement": return {
				agreementPaper: body,
				citations
			};
			default: {
				const kind = input.facts.kind || "other";
				const url = input.facts.url || "";
				return {
					citations,
					refined: [{
						kind,
						url,
						slug: input.slug,
						title: input.facts.pageTitle || input.title,
						raw: input.notes ? `${body}\n\n## DRAFTING NOTES\n${input.notes}` : body
					}, ...s.refined.filter((r) => url ? r.url !== url : r.kind !== kind)]
				};
			}
		}
	}),
	loadSavedStore: (saved) => {
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
			agreementPaper: saved.agreementPaper || ""
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
			agreementPaper: s.agreementPaper
		});
	},
	reset: () => set({ ...empty })
}), { name: "nyayadraft-audit" }));
//#endregion
export { useStoreArchive as n, useAuditStore as t };
