import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as rememberProvider, n as Badge, r as aiKeysPayload, t as AppShell } from "./badge-BGa2cXzN.mjs";
import { E as LoaderCircle, J as ArrowLeft, L as Download, N as FileDown, R as Copy, S as PenLine, W as Bookmark, r as WandSparkles, y as Printer } from "../_libs/lucide-react.mjs";
import { t as CitationPanel } from "./citation-panel-Csp_3L1W.mjs";
import { t as Button } from "./button-CWahO9x8.mjs";
import { t as Textarea } from "./textarea-DBq0yRtM.mjs";
import { i as searchAuthorities, n as generateDraft, r as refineDraft } from "./legal-WyW9ffsC.mjs";
import { n as downloadDraftDocx, o as downloadPaperPdf, t as DraftPaper } from "./pdf-export-T-1A9IzR.mjs";
import { t as Input } from "./input-DvyoLJy2.mjs";
import { t as Label } from "./label-DbX4wkVX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CEfP1rFN.mjs";
import { a as parseDraftOutput } from "./parse-X7WrXe75.mjs";
import { i as useDraftStore } from "./store-C7MjJ_c6.mjs";
import { r as getTemplate } from "./templates-zz7-2I6c.mjs";
import { n as Route } from "./router-BaHigX3m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/draft._slug-B7BeXPBu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$2 = "/app/applet/src/components/studio-form.tsx";
function StudioForm({ template, values, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col gap-4",
		children: template.fields.map((field) => {
			const id = `field-${field.key}`;
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: id,
						children: [field.label, field.required ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "ml-1 text-danger",
							children: "*"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 31,
							columnNumber: 17
						}, this) : null]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 28,
						columnNumber: 13
					}, this),
					field.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						id,
						value: values[field.key] ?? "",
						placeholder: field.placeholder,
						onChange: (e) => onChange(field.key, e.target.value),
						rows: 4
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 35,
						columnNumber: 15
					}, this) : field.type === "select" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: values[field.key] || field.options?.[0]?.value,
						onValueChange: (v) => onChange(field.key, v),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
							id,
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 48,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 47,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: (field.options ?? []).map((opt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: opt.value,
							children: opt.label
						}, opt.value, false, {
							fileName: _jsxFileName$2,
							lineNumber: 52,
							columnNumber: 21
						}, this)) }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 50,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 43,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id,
						type: field.type === "date" ? "date" : "text",
						value: values[field.key] ?? "",
						placeholder: field.placeholder,
						onChange: (e) => onChange(field.key, e.target.value)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 59,
						columnNumber: 15
					}, this),
					field.hint ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[12px] text-muted",
						children: field.hint
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 68,
						columnNumber: 15
					}, this) : null
				]
			}, field.key, true, {
				fileName: _jsxFileName$2,
				lineNumber: 27,
				columnNumber: 11
			}, this);
		})
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/draft-studio.tsx";
function DraftStudio({ template }) {
	const [values, setValues] = (0, import_react.useState)(() => {
		const init = {};
		for (const field of template.fields) if (field.type === "select" && field.options?.[0]) init[field.key] = field.options[0].value;
		return init;
	});
	const [stage, setStage] = (0, import_react.useState)("idle");
	const [raw, setRaw] = (0, import_react.useState)("");
	const [citations, setCitations] = (0, import_react.useState)([]);
	const [refine, setRefine] = (0, import_react.useState)("");
	const save = useDraftStore((s) => s.save);
	const parsed = (0, import_react.useMemo)(() => raw ? parseDraftOutput(raw) : null, [raw]);
	const busy = stage === "retrieving" || stage === "drafting" || stage === "refining";
	function setField(key, value) {
		setValues((v) => ({
			...v,
			[key]: value
		}));
	}
	function fillSample() {
		setValues({ ...template.sample });
		toast.message("Sample matter loaded. Review the facts, then draft.");
	}
	async function runDraft() {
		const missing = template.fields.filter((f) => f.required && !(values[f.key] ?? "").trim());
		if (missing.length) {
			toast.error(`Please complete: ${missing.map((f) => f.label).join(", ")}`);
			return;
		}
		const factBlob = Object.values(values).join(" ");
		setStage("retrieving");
		try {
			const found = await searchAuthorities({ data: {
				query: `${template.ragQuery}\n${factBlob}`,
				k: 8
			} });
			setCitations(found.hits);
			setStage("drafting");
			const result = await generateDraft({ data: {
				slug: template.slug,
				title: template.title,
				instructions: template.instructions,
				facts: values,
				ragQuery: template.ragQuery,
				aiKeys: aiKeysPayload()
			} });
			if (!result.ok) {
				toast.error(result.error);
				setCitations(result.citations);
				setStage(raw ? "ready" : "idle");
				return;
			}
			rememberProvider(result);
			setRaw(result.text);
			setCitations(result.citations);
			setStage("ready");
			toast.success("Draft prepared. Review authorities before you copy it.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Drafting failed.");
			setStage(raw ? "ready" : "idle");
		}
	}
	async function runRefine() {
		if (!raw || !refine.trim()) return;
		setStage("refining");
		try {
			const result = await refineDraft({ data: {
				slug: template.slug,
				title: template.title,
				currentDraft: raw,
				instruction: refine.trim(),
				ragQuery: template.ragQuery,
				aiKeys: aiKeysPayload()
			} });
			if (!result.ok) {
				toast.error(result.error);
				setStage("ready");
				return;
			}
			rememberProvider(result);
			setRaw(result.text);
			setCitations(result.citations);
			setRefine("");
			setStage("ready");
			toast.success("Revision applied.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Revision failed.");
			setStage("ready");
		}
	}
	function copyDraft() {
		const text = parsed?.draft || raw;
		if (!text) return;
		navigator.clipboard.writeText(text);
		toast.success("Draft copied.");
	}
	function saveDraft() {
		if (!parsed?.draft) return;
		save({
			id: `${template.slug}-${Date.now()}`,
			slug: template.slug,
			title: template.title,
			createdAt: Date.now(),
			facts: values,
			draftText: parsed.draft,
			notes: parsed.notes,
			citations
		});
		toast.success("Saved to history on this device.");
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/",
				className: "inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 161,
					columnNumber: 9
				}, this), "All instruments"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 157,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "muted",
						children: template.forum
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 166,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl",
						children: template.title
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 167,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: template.blurb
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 170,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 165,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					"data-print-hide": true,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: fillSample,
						disabled: busy,
						children: "Load sample matter"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 173,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => void runDraft(),
						disabled: busy,
						children: [busy && stage !== "refining" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 178,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PenLine, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 180,
							columnNumber: 15
						}, this), stage === "retrieving" ? "Retrieving authorities" : stage === "drafting" ? "Drafting" : "Draft with RAG"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 176,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 172,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 164,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_minmax(0,18rem)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)] lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-lg font-medium",
								children: "Facts of the matter"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 193,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 mb-5 text-[13px] text-muted",
								children: "These particulars are the only facts the model may use."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 194,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StudioForm, {
								template,
								values,
								onChange: setField
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 197,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 192,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
								title: template.title,
								body: parsed?.draft ?? "",
								emptyHint: stage === "drafting" || stage === "retrieving" ? "Retrieving statute and composing the instrument…" : "Fill the facts — or load a sample matter — then draft. The page will set here as a pleading."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 201,
								columnNumber: 11
							}, this),
							parsed?.notes ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 rounded-[var(--radius-md)] border border-border bg-surface-2 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] tracking-[0.14em] text-muted uppercase",
									children: "Drafting notes"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 212,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 whitespace-pre-wrap text-[13px] leading-relaxed text-ink",
									children: parsed.notes
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 215,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 211,
								columnNumber: 13
							}, this) : null,
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								"data-print-hide": true,
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										size: "sm",
										onClick: copyDraft,
										disabled: !raw,
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 222,
											columnNumber: 15
										}, this), "Copy"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 221,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										size: "sm",
										disabled: !raw,
										onClick: () => {
											downloadDraftDocx({
												title: template.title,
												subtitle: "NyayaDraft working draft — review before use",
												body: parsed?.draft || raw,
												filename: `NyayaDraft-${template.slug}.docx`
											}).then(() => toast.success("Word file downloaded.")).catch(() => toast.error("Could not build the Word file."));
										},
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 240,
											columnNumber: 15
										}, this), "Word"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 225,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										size: "sm",
										disabled: !raw,
										onClick: () => {
											downloadPaperPdf({
												host: "NyayaDraft",
												title: template.title,
												body: parsed?.draft || raw,
												filename: `NyayaDraft-${template.slug}.pdf`
											}).then(() => toast.success("PDF downloaded.")).catch(() => toast.error("Could not build the PDF."));
										},
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 258,
											columnNumber: 15
										}, this), "PDF"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 243,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										size: "sm",
										disabled: !raw,
										onClick: () => window.print(),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Printer, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 267,
											columnNumber: 15
										}, this), "Print"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 261,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										size: "sm",
										disabled: !parsed?.draft,
										onClick: saveDraft,
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 271,
											columnNumber: 15
										}, this), "Save"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 270,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 220,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3 flex gap-2",
								"data-print-hide": true,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: refine,
									placeholder: "Revise: shorten the prayer, add limitation, more formal…",
									onChange: (e) => setRefine(e.target.value),
									disabled: !raw || busy,
									onKeyDown: (e) => {
										if (e.key === "Enter") runRefine();
									}
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 276,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "secondary",
									disabled: !raw || busy || !refine.trim(),
									onClick: () => void runRefine(),
									children: [stage === "refining" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 291,
										columnNumber: 17
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 293,
										columnNumber: 17
									}, this), "Revise"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 285,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 275,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 200,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CitationPanel, {
						citations,
						className: "lg:col-span-2 xl:col-span-1 xl:sticky xl:top-20"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 300,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 191,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 156,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/draft.$slug.tsx?tsr-split=component";
function DraftPage() {
	const { slug } = Route.useParams();
	const template = getTemplate(slug);
	if (!template) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "mx-auto max-w-lg px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-3xl font-medium",
				children: "No such instrument"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 15,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-sm text-muted",
				children: "That draft type is not in the chambers list."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 16,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				className: "mt-6",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					children: "Back to drafts"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 14,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 13,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftStudio, { template }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 27,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 26,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 25,
		columnNumber: 10
	}, this);
}
//#endregion
export { DraftPage as component };
