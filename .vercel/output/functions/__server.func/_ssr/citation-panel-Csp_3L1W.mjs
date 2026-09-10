import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as cn, n as Badge } from "./badge-BGa2cXzN.mjs";
import { t as ScrollArea } from "./scroll-area-Fo-tT7S5.mjs";
import { h as Scale } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/citation-panel-Csp_3L1W.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/citation-panel.tsx";
function CitationPanel({ citations, title = "Authorities retrieved", className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
		className: cn("flex min-h-0 flex-col rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-border)]", className),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2 border-b border-border px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scale, { className: "size-4 text-primary" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-sm font-medium",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "ml-auto text-xs tabular-nums text-muted",
					children: citations.length
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 31,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollArea, {
			className: "max-h-[28rem]",
			children: citations.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "px-4 py-6 text-sm text-muted",
				children: "Retrieved sections will appear here and be sent to the model as grounding context."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 40,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
				className: "divide-y divide-border",
				children: citations.map((c, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
					className: "px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "mt-0.5 font-mono text-[11px] text-muted tabular-nums",
							children: String(i + 1).padStart(2, "0")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 49,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium",
									children: c.citation
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 53,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[13px] text-muted",
									children: c.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 54,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									className: "mt-1.5",
									variant: "muted",
									children: c.statute
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 55,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 line-clamp-4 text-[13px] leading-relaxed text-muted",
									children: c.text
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 58,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 52,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 17
					}, this)
				}, c.id, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 25,
		columnNumber: 5
	}, this);
}
//#endregion
export { CitationPanel as t };
