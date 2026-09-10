import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-C7MjJ_c6.js
function hostOfFacts(facts) {
	return (facts.website || facts.host || "").trim();
}
function samePaper(a, b) {
	const hostA = hostOfFacts(a.facts);
	const hostB = hostOfFacts(b.facts);
	if (a.slug !== b.slug) return false;
	if (hostA && hostB && hostA === hostB) {
		const urlA = (a.facts.url || "").trim();
		const urlB = (b.facts.url || "").trim();
		if (urlA || urlB) return urlA === urlB;
		return true;
	}
	return a.id === b.id;
}
function slimCitations(list) {
	return list.slice(0, 8).map((c) => ({
		...c,
		text: (c.text || "").slice(0, 600)
	}));
}
function trimDraft(text) {
	if (text.length <= 8e4) return text;
	return `${text.slice(0, 8e4)}\n\n[truncated to fit this device]`;
}
var memory = /* @__PURE__ */ new Map();
var safeStorage = createJSONStorage(() => ({
	getItem: (name) => {
		try {
			return localStorage.getItem(name) ?? memory.get(name) ?? null;
		} catch {
			return memory.get(name) ?? null;
		}
	},
	setItem: (name, value) => {
		memory.set(name, value);
		try {
			localStorage.setItem(name, value);
		} catch {
			try {
				const parsed = JSON.parse(value);
				const drafts = parsed.state?.drafts ?? [];
				const reduced = {
					...parsed,
					state: {
						...parsed.state,
						drafts: drafts.slice(0, 12)
					}
				};
				localStorage.setItem(name, JSON.stringify(reduced));
			} catch {}
		}
	},
	removeItem: (name) => {
		memory.delete(name);
		try {
			localStorage.removeItem(name);
		} catch {}
	}
}));
var useDraftStore = create()(persist((set, get) => ({
	drafts: [],
	hydrated: false,
	setHydrated: (hydrated) => set({ hydrated }),
	save: (draft) => {
		const next = {
			...draft,
			draftText: trimDraft(draft.draftText || ""),
			citations: slimCitations(draft.citations ?? []),
			createdAt: Date.now()
		};
		set((s) => ({ drafts: [next, ...s.drafts.filter((d) => !samePaper(d, next))].slice(0, 500) }));
		return { ok: true };
	},
	remove: (id) => set((s) => ({ drafts: s.drafts.filter((d) => d.id !== id) })),
	get: (id) => get().drafts.find((d) => d.id === id)
}), {
	name: "nyayadraft-history",
	storage: safeStorage,
	version: 2,
	partialize: (s) => ({ drafts: s.drafts }),
	migrate: (persisted) => {
		const p = persisted;
		const drafts = Array.isArray(p?.drafts) ? p.drafts : [];
		const seen = /* @__PURE__ */ new Set();
		const collapsed = [];
		for (const d of drafts) {
			const host = (d.facts?.website || d.facts?.host || "").trim();
			const key = host ? `${d.slug}::${host}::${d.facts?.url || ""}` : d.id;
			if (seen.has(key)) continue;
			seen.add(key);
			collapsed.push(d);
		}
		return { drafts: collapsed };
	},
	onRehydrateStorage: () => (state) => {
		state?.setHydrated(true);
	}
}));
function isStorePaper(slug) {
	return slug.startsWith("store-");
}
function paperHost(d) {
	const raw = hostOfFacts(d.facts);
	if (!raw) return "";
	try {
		return new URL(raw.startsWith("http") ? raw : `https://${raw}`).host;
	} catch {
		return raw.replace(/^https?:\/\//, "").split("/")[0] ?? raw;
	}
}
var STORE_PAPER_LABEL = {
	"store-research": "Live pages",
	"store-audit": "Store audit",
	"store-gaps": "Gap register",
	"store-selling": "Selling points",
	"store-questions": "Legal facts",
	"store-brief": "Client brief",
	"store-implement": "Implementations",
	"store-email": "Forwarding emails",
	"store-cold": "Cold email",
	"store-agreement": "Service agreement",
	"store-terms-of-service": "Revised terms",
	"store-consent-policy": "Revised consent",
	"store-refund-policy": "Revised refund",
	"store-shipping-policy": "Revised shipping",
	"store-live-policy": "Revised live page"
};
//#endregion
export { useDraftStore as i, isStorePaper as n, paperHost as r, STORE_PAPER_LABEL as t };
