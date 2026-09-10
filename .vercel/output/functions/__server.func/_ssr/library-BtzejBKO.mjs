import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as Badge, t as AppShell } from "./badge-BGa2cXzN.mjs";
import { t as ScrollArea } from "./scroll-area-Fo-tT7S5.mjs";
import { t as Input } from "./input-DvyoLJy2.mjs";
import { retrieve, t as CORPUS } from "./retrieve-z2AVaBQ4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-BtzejBKO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var LAW_CATEGORIES = [
	"constitutional",
	"criminal",
	"procedure",
	"contract",
	"commercial",
	"consumer",
	"property",
	"family",
	"labour",
	"corporate",
	"evidence",
	"public",
	"drafting"
];
var _jsxFileName = "/app/applet/src/routes/library.tsx?tsr-split=component";
var LABELS = {
	constitutional: "Constitutional",
	criminal: "Criminal",
	procedure: "Procedure",
	contract: "Contract",
	commercial: "Commercial",
	consumer: "Consumer",
	property: "Property",
	family: "Family",
	labour: "Labour",
	corporate: "Corporate",
	evidence: "Evidence",
	public: "Public law",
	drafting: "Drafting"
};
function LibraryPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [activeId, setActiveId] = (0, import_react.useState)(CORPUS[0]?.id ?? "");
	const list = (0, import_react.useMemo)(() => {
		if (q.trim().length >= 2) return retrieve({
			query: q,
			k: 30,
			categories: category === "all" ? void 0 : [category]
		});
		return category === "all" ? CORPUS : CORPUS.filter((c) => c.category === category);
	}, [q, category]);
	const active = list.find((c) => c.id === activeId) ?? list[0] ?? CORPUS.find((c) => c.id === activeId);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[12px] tracking-[0.18em] text-muted uppercase",
				children: "Retrieval corpus"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-2 font-display text-4xl font-medium tracking-tight",
				children: "Library of authorities"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: [CORPUS.length, " abridged heads of Indian statute and drafting practice. This is the index the drafter searches before it writes."]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 flex flex-col gap-3 sm:flex-row",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search 138, refund, DPDP, Article 21…",
					className: "sm:max-w-md"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 flex gap-2 overflow-x-auto pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
					active: category === "all",
					onClick: () => setCategory("all"),
					label: "All"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 11
				}, this), LAW_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
					active: category === c,
					onClick: () => setCategory(c),
					label: LABELS[c]
				}, c, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 36
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollArea, {
						className: "h-[32rem]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { children: list.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "border-b border-border last:border-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setActiveId(c.id),
								className: c.id === active?.id ? "w-full px-4 py-3 text-left bg-surface-2" : "w-full px-4 py-3 text-left hover:bg-surface-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium",
									children: c.citation
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 64,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[13px] text-muted",
									children: c.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 65,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 63,
								columnNumber: 21
							}, this)
						}, c.id, false, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 32
						}, this)) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 60,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 11
				}, this), active ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
					className: "rounded-[var(--radius-lg)] border border-border bg-paper p-6 shadow-[var(--shadow-border)] sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "muted",
							children: LABELS[active.category]
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-3 font-display text-2xl font-medium tracking-tight",
							children: active.citation
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-muted",
							children: active.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-[13px] text-subtle",
							children: active.statute
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 77,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 font-serif text-[16px] leading-[1.7]",
							children: active.text
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 15
						}, this),
						active.note ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-6 border-t border-border pt-4 text-[13px] leading-relaxed text-muted",
							children: active.note
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 79,
							columnNumber: 30
						}, this) : null,
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 flex flex-wrap gap-1.5",
							children: active.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								children: tag
							}, tag, false, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 41
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 21
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "py-16 text-sm text-muted",
					children: "No head matches."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 26
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 58,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 10
	}, this);
}
function Chip({ active, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick,
		className: active ? "rounded-full bg-primary px-3 py-2 text-[13px] text-primary-fg whitespace-nowrap" : "rounded-full bg-surface-2 px-3 py-2 text-[13px] text-muted whitespace-nowrap hover:text-ink",
		children: label
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 101,
		columnNumber: 10
	}, this);
}
//#endregion
export { LibraryPage as component };
