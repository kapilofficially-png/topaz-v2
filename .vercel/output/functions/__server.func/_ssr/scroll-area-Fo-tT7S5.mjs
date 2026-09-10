import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as cn } from "./badge-BGa2cXzN.mjs";
import { i as Viewport, n as Scrollbar, r as Thumb, t as Root } from "../_libs/radix-ui__react-scroll-area.mjs";
require_react();
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ui/scroll-area.tsx";
function ScrollArea({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
		className: cn("relative overflow-hidden", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 15,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scrollbar, {
			orientation: "vertical",
			className: "flex touch-none select-none p-0.5 transition-colors",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Thumb, { className: "relative flex-1 rounded-full bg-border" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 22,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 5
	}, this);
}
//#endregion
export { ScrollArea as t };
