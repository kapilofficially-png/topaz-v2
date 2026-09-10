import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as cn } from "./badge-BGa2cXzN.mjs";
import { H as Check, V as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
require_react();
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ui/select.tsx";
var Select = Select$1;
var SelectValue = SelectValue$1;
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between rounded-[var(--radius-sm)] border border-border bg-paper px-3 text-sm text-ink shadow-[var(--shadow-border)] focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-4 text-muted" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 24,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 23,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 5
	}, this);
}
function SelectContent({ className, children, position = "popper", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent$1, {
		className: cn("relative z-50 max-h-72 min-w-32 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface text-ink shadow-[var(--shadow-border-hover)]", className),
		position,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectViewport, {
			className: "p-1",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 46,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 38,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 5
	}, this);
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem$1, {
		className: cn("relative flex w-full cursor-pointer select-none items-center rounded-[var(--radius-xs)] py-2 pl-8 pr-2 text-sm outline-none focus:bg-surface-2 data-disabled:pointer-events-none data-disabled:opacity-50", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemText, { children }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 70,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 58,
		columnNumber: 5
	}, this);
}
//#endregion
export { SelectValue as a, SelectTrigger as i, SelectContent as n, SelectItem as r, Select as t };
