import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as cn } from "./badge-BGa2cXzN.mjs";
import { V as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fold-BhAYn1Jw.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/fold.tsx";
function Fold({ title, hint, badge, open, onToggle, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			onClick: onToggle,
			"aria-expanded": open,
			className: "flex w-full items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)] transition-colors hover:bg-surface-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: cn("size-4 shrink-0 text-muted transition-transform duration-[var(--motion-quick)]", open && "rotate-180") }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "block font-display text-lg font-medium tracking-tight",
						children: title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 35,
						columnNumber: 11
					}, this), hint ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "mt-0.5 block text-[13px] text-muted",
						children: hint
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 13
					}, this) : null]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 9
				}, this),
				badge,
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "shrink-0 text-[12px] tracking-wide text-muted uppercase",
					children: open ? "Hide" : "Show"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 7
		}, this), open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-3",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 15
		}, this) : null]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 5
	}, this);
}
//#endregion
export { Fold as t };
