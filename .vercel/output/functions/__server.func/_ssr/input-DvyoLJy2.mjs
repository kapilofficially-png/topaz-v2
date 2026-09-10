import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as cn } from "./badge-BGa2cXzN.mjs";
require_react();
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ui/input.tsx";
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
		type,
		className: cn("flex h-11 w-full rounded-[var(--radius-sm)] border border-border bg-paper px-3 py-2 text-sm text-ink shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-[var(--motion-quick)] placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 6,
		columnNumber: 5
	}, this);
}
//#endregion
export { Input as t };
