import { a as getProvider, n as DEFAULT_ORDER, t as DEFAULT_ENABLED } from "./providers-B7LlmDHe.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as persist, r as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-BGa2cXzN.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$2 = "/app/applet/src/components/brand-mark.tsx";
function BrandMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8 text-primary", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "currentColor"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 10,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				d: "M9 12h5.2c.9 0 1.6.4 2.2 1.1L16 13.5l-.4.4C15.1 14.6 14.3 15 13.4 15H9V12Zm8.6 0H23v3h-4.4c-.9 0-1.7-.4-2.2-1.1l.4-.4c.6-.7 1.3-1.1 2.2-1.1Z",
				fill: "#f6f1e8"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 11,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				d: "M9 16h5.2c.9 0 1.7.4 2.2 1.1l.6.7.6-.7c.5-.7 1.3-1.1 2.2-1.1H23v6.4h-4.4c-.9 0-1.7.3-2.2.9L16 23.2l-.6-.9c-.5-.6-1.3-.9-2.2-.9H9V16Z",
				fill: "none",
				stroke: "#f6f1e8",
				strokeWidth: "1.3",
				strokeLinejoin: "round"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 15,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "16",
				cy: "9",
				r: "2",
				fill: "none",
				stroke: "#f6f1e8",
				strokeWidth: "1.3"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 22,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 5,
		columnNumber: 5
	}, this);
}
var useKeysStore = create()(persist((set, get) => ({
	keys: {},
	models: {},
	geminiModels: [],
	enabled: [...DEFAULT_ENABLED],
	order: [...DEFAULT_ORDER],
	fallback: true,
	lastProvider: "",
	lastModel: "",
	lastFallback: false,
	lastError: "",
	grokEnv: null,
	setKey: (id, value) => set((s) => ({ keys: {
		...s.keys,
		[id]: value
	} })),
	setModel: (id, value) => set((s) => ({ models: {
		...s.models,
		[id]: value
	} })),
	setGeminiModels: (models) => set({ geminiModels: models }),
	setEnabled: (id, on) => set((s) => {
		const enabled = s.enabled.filter((x) => x !== id);
		if (on) enabled.push(id);
		return { enabled };
	}),
	move: (id, dir) => set((s) => {
		const order = [...s.order];
		const i = order.indexOf(id);
		if (i < 0) return s;
		const j = i + dir;
		if (j < 0 || j >= order.length) return s;
		const tmp = order[i];
		order[i] = order[j];
		order[j] = tmp;
		return { order };
	}),
	setFallback: (on) => set({ fallback: on }),
	setLastUsed: (provider, model, fallback) => set({
		lastProvider: provider,
		lastModel: model,
		lastFallback: fallback,
		lastError: ""
	}),
	setLastError: (error) => set({ lastError: error }),
	setGrokEnv: (on) => set({ grokEnv: on }),
	toPayload: () => {
		const s = get();
		const payload = {
			order: s.order,
			enabled: s.enabled,
			models: Object.fromEntries(Object.entries(s.models).filter(([, v]) => v)),
			fallback: s.fallback
		};
		for (const [id, key] of Object.entries(s.keys)) {
			const trimmed = key?.trim();
			if (trimmed) payload[id] = trimmed;
		}
		return payload;
	}
}), {
	name: "nyayadraft-ai-keys",
	partialize: (s) => ({
		keys: s.keys,
		models: s.models,
		geminiModels: s.geminiModels,
		enabled: s.enabled,
		order: s.order,
		fallback: s.fallback,
		lastProvider: s.lastProvider,
		lastModel: s.lastModel,
		lastFallback: s.lastFallback
	}),
	merge: (persisted, current) => {
		const p = persisted ?? {};
		const models = { ...p.models ?? current.models };
		if (models.gemini === "gemini-2.0-flash" || models.gemini === "gemini-1.5-flash") models.gemini = "gemini-2.5-flash";
		return {
			...current,
			...p,
			enabled: p.enabled?.length ? p.enabled : current.enabled,
			order: p.order?.length ? p.order : current.order,
			keys: p.keys ?? current.keys,
			models,
			geminiModels: p.geminiModels?.length ? p.geminiModels : current.geminiModels,
			grokEnv: current.grokEnv,
			lastError: ""
		};
	}
}));
function aiKeysPayload() {
	return useKeysStore.getState().toPayload();
}
function rememberProvider(result) {
	if (typeof window === "undefined") return;
	if (result.ok && result.provider) {
		const prev = useKeysStore.getState().lastProvider;
		useKeysStore.getState().setLastUsed(result.provider, result.model ?? "", Boolean(result.fallback));
		if (result.fallback && result.provider !== prev) {
			const name = getProvider(result.provider)?.name ?? result.provider;
			toast.message(`Grok was unavailable. This run used ${name}.`);
		}
		return;
	}
	if (result.error) useKeysStore.getState().setLastError(result.error);
}
var _jsxFileName$1 = "/app/applet/src/components/app-shell.tsx";
var NAV = [
	{
		to: "/",
		label: "Draft"
	},
	{
		to: "/library",
		label: "Library"
	},
	{
		to: "/ask",
		label: "Ask the law"
	},
	{
		to: "/audit",
		label: "Audit store"
	},
	{
		to: "/batch",
		label: "Batch"
	},
	{
		to: "/outreach",
		label: "Cold email"
	},
	{
		to: "/history",
		label: "History"
	},
	{
		to: "/models",
		label: "Models"
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const lastProvider = useKeysStore((s) => s.lastProvider);
	const lastFallback = useKeysStore((s) => s.lastFallback);
	const lastLabel = lastProvider ? getProvider(lastProvider)?.name ?? lastProvider : "";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "flex min-w-0 items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BrandMark, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 32,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "block font-display text-lg leading-none font-medium tracking-tight",
								children: "NyayaDraft"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 34,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "mt-0.5 hidden text-[11px] tracking-[0.14em] text-muted uppercase sm:block",
								children: "Indian legal drafting"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 37,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 33,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 31,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "ml-auto flex items-center gap-1 overflow-x-auto",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" || pathname.startsWith("/draft") : pathname === item.to || pathname.startsWith(`${item.to}/`);
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: item.to,
								className: cn("rounded-[var(--radius-sm)] px-3 py-2 text-sm whitespace-nowrap transition-colors duration-[var(--motion-quick)]", active ? "bg-primary text-primary-fg" : "text-muted hover:bg-surface-2 hover:text-ink"),
								children: item.label
							}, item.to, false, {
								fileName: _jsxFileName$1,
								lineNumber: 49,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 42,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 30,
					columnNumber: 9
				}, this), lastLabel ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border-t border-border/60",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto flex max-w-6xl items-center justify-end px-4 py-1.5 sm:px-6",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/models",
							className: "text-[11px] tracking-wide text-muted uppercase hover:text-ink",
							children: [
								"Last model: ",
								lastLabel,
								lastFallback ? " · fallback" : ""
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 68,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 67,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 66,
					columnNumber: 11
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 29,
				columnNumber: 7
			}, this),
			children,
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "max-w-3xl text-[13px] leading-relaxed text-muted",
						children: "NyayaDraft is an AI drafting aid grounded in a curated corpus of Indian statute. It is not a law firm, does not create an advocate–client relationship, and is not a substitute for advice from an advocate enrolled under the Advocates Act, 1961. Statutory excerpts are abridged for retrieval. Always review, stamp, and verify a draft before it leaves chambers."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 82,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 81,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 80,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 28,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/ui/badge.tsx";
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-fg",
		outline: "border-border text-muted bg-surface",
		muted: "border-transparent bg-surface-2 text-muted"
	} },
	defaultVariants: { variant: "outline" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 24,
		columnNumber: 5
	}, this);
}
//#endregion
export { rememberProvider as a, cn as i, Badge as n, useKeysStore as o, aiKeysPayload as r, AppShell as t };
