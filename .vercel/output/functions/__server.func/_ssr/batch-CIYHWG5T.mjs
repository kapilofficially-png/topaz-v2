import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Badge, t as AppShell } from "./badge-BGa2cXzN.mjs";
import { B as CircleCheck, E as LoaderCircle, L as Download, M as FolderOpen, X as Archive, a as Trash2, b as Plus, c as Sparkles, s as Square, x as Play } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CWahO9x8.mjs";
import { t as Textarea } from "./textarea-DBq0yRtM.mjs";
import { n as useStoreArchive, t as useAuditStore } from "./audit-store-DeG2ETsA.mjs";
import { r as MiniAiPanel } from "./store-audit-CVIq-TTb.mjs";
import { t as Input } from "./input-DvyoLJy2.mjs";
import { c as stopBatch, i as parseStoreList, l as useBatchStore, n as mergeStoreLists, s as startBatch } from "./batch-runner-R9Mrm9Oh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batch-CIYHWG5T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/batch.tsx?tsr-split=component";
function BatchPage() {
	const batch = useBatchStore();
	const archive = useStoreArchive();
	const auditStore = useAuditStore();
	const navigate = useNavigate();
	const [commaInput, setCommaInput] = (0, import_react.useState)("");
	const [miniAiHost, setMiniAiHost] = (0, import_react.useState)(null);
	const queued = batch.jobs.filter((j) => j.status === "queued").length;
	const done = batch.jobs.filter((j) => j.status === "done").length;
	const errors = batch.jobs.filter((j) => j.status === "error").length;
	const parsed = parseStoreList(batch.listText, 50);
	const progress = batch.progress;
	async function openStoreInAudit(targetHost) {
		try {
			const storeData = await archive.getStore(targetHost);
			if (storeData) {
				auditStore.loadSavedStore(storeData);
				archive.setActiveHost(targetHost);
				toast.success(`Loaded saved review for ${storeData.homeTitle || targetHost}`);
				navigate({ to: "/audit" });
			} else toast.error(`No permanent data found for ${targetHost}`);
		} catch {
			toast.error("Failed to load store review");
		}
	}
	async function exportAllJson() {
		const all = await archive.getAllStores();
		if (!all.length) {
			toast.error("No saved stores to export yet");
			return;
		}
		const blob = new Blob([JSON.stringify(all, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `nyayadraft-saved-stores-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
		toast.success(`Exported ${all.length} saved store reviews`);
	}
	async function start() {
		try {
			if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
		} catch {}
		const result = await startBatch();
		if (result && result.ok === false) toast.error(result.error);
	}
	function addCommaLinks() {
		const extra = commaInput.trim();
		if (!extra) {
			toast.error("Paste links separated by commas.");
			return;
		}
		const merged = mergeStoreLists(batch.listText, extra, 50);
		const before = parseStoreList(batch.listText, 50).length;
		const after = parseStoreList(merged, 50).length;
		if (after === before) {
			toast.error("No new unique stores in that list (duplicates or already queued).");
			return;
		}
		batch.setListText(merged);
		setCommaInput("");
		toast.success(`Added ${after - before} store${after - before === 1 ? "" : "s"}. ${after} in the queue.`);
	}
	function stop() {
		stopBatch();
		toast.message("Stopping after this store finishes. Skipped stores will be retried if you run again.");
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "border-b border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[12px] tracking-[0.2em] text-muted uppercase",
					children: "Queue · one store at a time · save to History"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-2 font-display text-4xl font-medium tracking-tight",
					children: "Batch audit"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 max-w-2xl text-[15px] leading-relaxed text-muted",
					children: "Paste up to 50 store URLs — one per line, or separated by commas. NyayaDraft runs the full sequence on each one in order and saves every paper to History before the next store. Stay on this page while it runs."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 99,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 98,
		columnNumber: 9
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
				className: "block text-sm font-medium",
				htmlFor: "batch-list",
				children: "Store URLs"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
				id: "batch-list",
				value: batch.listText,
				onChange: (e) => batch.setListText(e.target.value),
				disabled: batch.running,
				className: "mt-2 min-h-48 font-mono text-[13px]",
				placeholder: "dakshis.com\nclovia.com\nhttps://www.example.in"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-[13px] text-muted",
				children: [
					parsed.length,
					" unique store",
					parsed.length === 1 ? "" : "s",
					" ready",
					parsed.length >= 50 ? " (capped at 50)" : "",
					". New lines or commas."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 120,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					addCommaLinks();
				},
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-sm font-medium",
						htmlFor: "comma-links",
						children: "Add links separated by a comma"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "comma-links",
						value: commaInput,
						onChange: (e) => setCommaInput(e.target.value),
						disabled: batch.running,
						className: "mt-1 font-mono text-[13px]",
						placeholder: "dakshis.com, clovia.com, https://www.example.in",
						autoCapitalize: "none",
						autoCorrect: "off",
						spellCheck: false
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 128,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "submit",
					variant: "outline",
					disabled: batch.running || !commaInput.trim(),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 15
					}, this), "Add to queue"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					batch.running ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: stop,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Square, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 17
						}, this), batch.stopAfterCurrent ? "Stopping after this store" : "Stop after this store"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 30
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => void start(),
						disabled: !parsed.length,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 144,
								columnNumber: 17
							}, this),
							"Run ",
							parsed.length || "",
							" store",
							parsed.length === 1 ? "" : "s"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 143,
						columnNumber: 27
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => batch.clearResults(),
						disabled: batch.running || !batch.jobs.length,
						children: "Clear results"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/history",
							children: "Open History"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 150,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 139,
				columnNumber: 11
			}, this),
			batch.running && progress ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 rounded-[var(--radius-md)] border border-border bg-surface-2 px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "flex items-center gap-2 font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 17
						}, this),
						"Store ",
						(batch.currentIndex < 0 ? 0 : batch.currentIndex) + 1,
						" of",
						" ",
						batch.jobs.length,
						" — step ",
						progress.step,
						"/",
						progress.total,
						" ",
						progress.title
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 15
				}, this), progress.rewrite ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-muted",
					children: [
						"Rewriting ",
						progress.rewrite.current,
						"/",
						progress.rewrite.total,
						":",
						" ",
						progress.rewrite.title
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 162,
					columnNumber: 35
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-muted",
					children: "Each store is saved before the next one starts. Stores that skip research, audit, or rewrites are retried once at the end."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 165,
					columnNumber: 24
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 155,
				columnNumber: 40
			}, this) : null,
			batch.jobs.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2 text-[13px] text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "muted",
							children: [batch.jobs.length, " queued"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "outline",
							children: [done, " done"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 17
						}, this),
						errors ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "outline",
							children: [errors, " failed"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 27
						}, this) : null,
						queued && batch.running ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "outline",
							children: [queued, " waiting"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 176,
							columnNumber: 44
						}, this) : null
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 172,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full min-w-[640px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
							className: "border-b border-border text-[12px] tracking-wide text-muted uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2 pr-3 font-medium",
									children: "#"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Store"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 183,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Status"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 184,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Rewrites"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Saved"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Notes"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2 font-medium text-right",
									children: "Actions"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 188,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 21
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 180,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: batch.jobs.map((job, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
							className: "border-b border-border/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2 pr-3 text-muted",
									children: i + 1
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 193,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2 pr-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-medium",
										children: job.host || job.url
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 195,
										columnNumber: 27
									}, this), job.host ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[12px] text-muted",
										children: job.url
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 196,
										columnNumber: 39
									}, this) : null]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 194,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: job.status === "done" ? "default" : job.status === "running" ? "outline" : "muted",
										children: [
											job.status === "running" && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-3 animate-spin" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 200,
												columnNumber: 58
											}, this),
											job.status,
											job.pass === "retry" ? " · retry" : ""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 199,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2 pr-3 text-muted",
									children: job.rewriteTotal ? `${job.rewriteOk}/${job.rewriteTotal}` : "—"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2 pr-3 text-muted",
									children: job.saved ? `${job.saved} papers` : "—"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2 pr-3 text-[13px] text-muted",
									children: job.error || (job.failed.length ? job.failed.join(", ") : "")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2 text-right",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-end gap-1",
										children: job.host ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-7 px-2 text-xs",
											onClick: () => void openStoreInAudit(job.host),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FolderOpen, { className: "size-3.5 mr-1" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 218,
												columnNumber: 35
											}, this), "Review"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 217,
											columnNumber: 33
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "outline",
											size: "sm",
											className: "h-7 px-2 text-xs text-primary",
											onClick: () => setMiniAiHost(job.host),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 mr-1" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 222,
												columnNumber: 35
											}, this), "Mini AI"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 221,
											columnNumber: 33
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 216,
											columnNumber: 41
										}, this) : null
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 25
								}, this)
							]
						}, `${job.url}-${i}`, true, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 49
						}, this)) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 178,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 171,
				columnNumber: 32
			}, this) : null,
			miniAiHost && /* @__PURE__ */ (void 0)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between mb-2",
					children: [/* @__PURE__ */ (void 0)("h3", {
						className: "font-display text-lg font-medium",
						children: ["Mini AI Studio · ", miniAiHost]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 237,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setMiniAiHost(null),
						children: "Close"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 236,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)(MiniAiPanel, { currentStoreHost: miniAiHost }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 244,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 235,
				columnNumber: 26
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 pt-8 border-t border-border",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Archive, { className: "size-5 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 252,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-2xl font-medium tracking-tight",
								children: "Permanently Saved Stores"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "text-emerald-700 bg-emerald-50 border-emerald-200",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3 mr-1" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 257,
									columnNumber: 21
								}, this), " Local Space Storage"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 256,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 251,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Every store run in a batch or audited is saved permanently in your browser. If you close the browser or reopen the app, all store reviews and crawled pages remain here."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 260,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => void exportAllJson(),
							disabled: !archive.summaries.length,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 268,
								columnNumber: 19
							}, this), "Export All JSON"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 267,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 266,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 249,
					columnNumber: 13
				}, this), archive.summaries.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 rounded-[var(--radius-md)] border border-dashed border-border p-8 text-center text-sm text-muted",
					children: "No stores saved yet. Run a batch of URLs above to permanently archive full reviews here."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 274,
					columnNumber: 47
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full min-w-[640px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
							className: "border-b border-border text-[12px] tracking-wide text-muted uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 pr-3 font-medium",
									children: "Store"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 280,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 pr-3 font-medium",
									children: "Pages Crawled"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 281,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 pr-3 font-medium",
									children: "Rewritten Policies"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 282,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 pr-3 font-medium",
									children: "Last Updated"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 283,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 font-medium text-right",
									children: "Actions"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 279,
							columnNumber: 21
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 278,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: archive.summaries.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
							className: "border-b border-border/70 hover:bg-surface-2/40 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2.5 pr-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-medium text-ink",
										children: s.homeTitle || s.host
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 290,
										columnNumber: 27
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[12px] font-mono text-muted",
										children: s.host
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 293,
										columnNumber: 27
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 289,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2.5 pr-3 text-muted",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "muted",
										children: [s.pageCount, " pages"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 296,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 295,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2.5 pr-3 text-muted",
									children: s.refinedCount > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "outline",
										className: "text-emerald-700 bg-emerald-50/60",
										children: [s.refinedCount, " policies"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 299,
										columnNumber: 49
									}, this) : "—"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 298,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2.5 pr-3 text-xs text-muted",
									children: [
										new Date(s.updatedAt).toLocaleDateString(),
										" at",
										" ",
										new Date(s.updatedAt).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit"
										})
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 303,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									className: "py-2.5 text-right",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-end gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												variant: "default",
												size: "sm",
												className: "h-7 px-2.5 text-xs",
												onClick: () => void openStoreInAudit(s.host),
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FolderOpen, { className: "size-3.5 mr-1" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 313,
													columnNumber: 31
												}, this), "Open Review"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 312,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												variant: "outline",
												size: "sm",
												className: "h-7 px-2 text-xs text-primary",
												onClick: () => setMiniAiHost(s.host),
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 mr-1" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 317,
													columnNumber: 31
												}, this), "Mini AI"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 316,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												variant: "ghost",
												size: "sm",
												className: "h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50",
												onClick: async () => {
													if (window.confirm(`Delete permanently saved data for ${s.host}?`)) {
														await archive.deleteStore(s.host);
														toast.success(`Deleted ${s.host}`);
													}
												},
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 326,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 320,
												columnNumber: 29
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 311,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 310,
									columnNumber: 25
								}, this)
							]
						}, s.host, true, {
							fileName: _jsxFileName,
							lineNumber: 288,
							columnNumber: 49
						}, this)) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 287,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 277,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 276,
					columnNumber: 24
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 248,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 115,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 97,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 96,
		columnNumber: 10
	}, this);
}
//#endregion
export { BatchPage as component };
