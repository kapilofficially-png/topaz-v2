import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as Badge, t as AppShell } from "./badge-BGa2cXzN.mjs";
import { G as BookOpen, O as Landmark, f as Send, h as Scale, j as Globe, q as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-DvyoLJy2.mjs";
import { n as TEMPLATES, t as PRACTICE_AREAS } from "./templates-zz7-2I6c.mjs";
import { corpusStats } from "./retrieve-z2AVaBQ4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-SF7MxysO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Home() {
	const [area, setArea] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const stats = corpusStats();
	const list = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return TEMPLATES.filter((t) => {
			if (area !== "all" && t.area !== area) return false;
			if (!needle) return true;
			return t.title.toLowerCase().includes(needle) || t.blurb.toLowerCase().includes(needle) || t.forum.toLowerCase().includes(needle);
		});
	}, [area, q]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "border-b border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[12px] tracking-[0.2em] text-muted uppercase",
					children: "Chambers drafting · RAG over Indian statute"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-3 font-display text-4xl leading-[1.12] font-medium tracking-tight sm:text-5xl",
					children: [
						"Draft Indian legal",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 31,
							columnNumber: 17
						}, this),
						"instruments on the Act,",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 33,
							columnNumber: 17
						}, this),
						"not on a guess."
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 29,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-5 max-w-xl text-[16px] leading-relaxed text-muted",
					children: "NyayaDraft retrieves the governing sections — BNS, BNSS, Contract Act, NI Act, CPA 2019, DPDP, e-commerce rules — then asks Grok to compose the notice, plaint, deed, or store policy from your facts."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", {
					className: "mt-8 grid grid-cols-3 gap-4 max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stat, {
							label: "Instruments",
							value: String(TEMPLATES.length)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 43,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stat, {
							label: "Corpus heads",
							value: String(stats.total)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stat, {
							label: "Codes in force",
							value: "2023+"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 45,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/audit",
					className: "mt-8 inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-bg px-4 py-3 text-sm font-medium text-primary shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 17
						}, this),
						"Audit a live store’s policies",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 50,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/batch",
					className: "mt-3 ml-0 inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-bg px-4 py-3 text-sm font-medium text-primary shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] sm:ml-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 17
					}, this), "Batch 50 stores"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/outreach",
					className: "mt-3 ml-0 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-primary px-4 py-3 text-sm font-medium text-primary-fg sm:ml-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 17
					}, this), "Cold-email a store"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 15
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 25,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "flex flex-col justify-end gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Note, {
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scale, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 27
						}, this),
						title: "Retrieval first",
						body: "Every draft is grounded in a BM25 pass over an India-law corpus. Citations sit beside the page."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Note, {
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Landmark, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 27
						}, this),
						title: "Current criminal codes",
						body: "BNS, BNSS and BSA from 1 July 2024 — with mappings from the old IPC / CrPC numbers you still type."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 63,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Note, {
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 64,
							columnNumber: 27
						}, this),
						title: "For review, not filing",
						body: "A first cut for chambers. Stamp, limitation and a human advocate still have the last word."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 61,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 24,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 23,
		columnNumber: 9
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Choose an instrument"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Load a sample matter if you want to see a full draft immediately."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 75,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search notices, store policies, RTI…",
					className: "sm:max-w-xs"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-5 flex gap-2 overflow-x-auto pb-1",
				children: PRACTICE_AREAS.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setArea(item.id),
					className: area === item.id ? "rounded-full bg-primary px-3 py-2 text-[13px] text-primary-fg whitespace-nowrap" : "rounded-full bg-surface-2 px-3 py-2 text-[13px] text-muted whitespace-nowrap hover:text-ink",
					children: item.label
				}, item.id, false, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 41
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 81,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/draft/$slug",
					params: { slug: t.slug },
					className: "group flex flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-[var(--motion-fast)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "muted",
							children: t.forum
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-3 font-display text-xl font-medium tracking-tight group-hover:text-primary",
							children: t.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 flex-1 text-sm leading-relaxed text-muted",
							children: t.blurb
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary",
							children: ["Open the matter", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4 transition-transform duration-[var(--motion-quick)] group-hover:translate-x-0.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 17
						}, this)
					]
				}, t.slug, true, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 28
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 86,
				columnNumber: 11
			}, this),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "py-16 text-center text-sm text-muted",
				children: "No instrument matches that search."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 32
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 69,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 10
	}, this);
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
		className: "text-[11px] tracking-[0.14em] text-muted uppercase",
		children: label
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 118,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
		className: "font-display text-3xl font-medium tabular-nums",
		children: value
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 121,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 117,
		columnNumber: 10
	}, this);
}
function Note({ icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-[var(--radius-lg)] border border-border bg-bg p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2 text-primary",
			children: [icon, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm font-medium text-ink",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 136,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 134,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-2 text-[13px] leading-relaxed text-muted",
			children: body
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 138,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 133,
		columnNumber: 10
	}, this);
}
//#endregion
export { Home as component };
