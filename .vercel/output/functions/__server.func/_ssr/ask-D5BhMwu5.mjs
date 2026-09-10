import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as rememberProvider, r as aiKeysPayload, t as AppShell } from "./badge-BGa2cXzN.mjs";
import { E as LoaderCircle, f as Send } from "../_libs/lucide-react.mjs";
import { t as CitationPanel } from "./citation-panel-Csp_3L1W.mjs";
import { t as Button } from "./button-CWahO9x8.mjs";
import { t as Textarea } from "./textarea-DBq0yRtM.mjs";
import { t as askTheLaw } from "./legal-WyW9ffsC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-D5BhMwu5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/ask.tsx?tsr-split=component";
var STARTERS = [
	"When is a post-employment non-compete void in India?",
	"Walk me through the 30–15–30 timeline for a section 138 notice.",
	"Can an Indian web store write 'all sales final' in its refund policy?",
	"What must a DPDP consent notice tell the customer?"
];
function AskPage() {
	const [question, setQuestion] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [citations, setCitations] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function run(q) {
		const text = q.trim();
		if (text.length < 8) {
			toast.error("Ask a complete question of Indian law.");
			return;
		}
		setQuestion(text);
		setBusy(true);
		try {
			const result = await askTheLaw({ data: {
				question: text,
				aiKeys: aiKeysPayload()
			} });
			if (!result.ok) {
				toast.error(result.error);
				setCitations(result.citations);
				return;
			}
			rememberProvider(result);
			setAnswer(result.text);
			setCitations(result.citations);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "The library could not answer.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[12px] tracking-[0.18em] text-muted uppercase",
				children: "Grounded Q&A"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-2 font-display text-4xl font-medium tracking-tight",
				children: "Ask the law"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Questions are answered from the same corpus that grounds drafts — not from an uncited model memory."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: STARTERS.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					disabled: busy,
					onClick: () => void run(s),
					className: "rounded-full border border-border bg-surface px-3 py-2 text-left text-[13px] text-ink hover:bg-surface-2",
					children: s
				}, s, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 30
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				className: "mt-5 flex flex-col gap-3 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					run(question);
				},
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
					value: question,
					onChange: (e) => setQuestion(e.target.value),
					placeholder: "e.g. Can I file a Zero FIR if the offence took place in another State?",
					className: "min-h-24 sm:min-h-20",
					disabled: busy
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "submit",
					disabled: busy,
					className: "sm:h-11",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 21
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 67
					}, this), "Ask"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
					className: "rounded-[var(--radius-lg)] border border-border bg-paper p-6 shadow-[var(--shadow-border)] sm:p-8",
					children: busy && !answer ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-serif text-muted italic",
						children: "Retrieving authorities and composing an answer…"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 32
					}, this) : answer ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-serif text-[16px] leading-[1.7] whitespace-pre-wrap",
						children: answer
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 31
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-serif text-muted italic",
						children: "Put a question of Indian law. The answer will cite the retrieved heads."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 24
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CitationPanel, {
					citations,
					title: "Retrieved for this question"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 83,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 45,
		columnNumber: 10
	}, this);
}
//#endregion
export { AskPage as component };
