import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as cn, n as Badge, t as AppShell } from "./badge-BGa2cXzN.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { L as Download, N as FileDown, R as Copy, a as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CWahO9x8.mjs";
import { t as Fold } from "./fold-BhAYn1Jw.mjs";
import { t as useAuditStore } from "./audit-store-DeG2ETsA.mjs";
import { n as downloadDraftDocx, o as downloadPaperPdf, t as DraftPaper } from "./pdf-export-T-1A9IzR.mjs";
import { t as Input } from "./input-DvyoLJy2.mjs";
import { i as useDraftStore, n as isStorePaper, r as paperHost, t as STORE_PAPER_LABEL } from "./store-C7MjJ_c6.mjs";
import { r as getTemplate } from "./templates-zz7-2I6c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-BcwGcdkD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ui/dialog.tsx";
var Dialog = Dialog$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-ink/40", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 15,
		columnNumber: 5
	}, this);
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay, {}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 29,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[var(--radius-xl)] border border-border bg-surface p-6 shadow-[var(--shadow-border-hover)]", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
			className: "absolute top-4 right-4 rounded-[var(--radius-xs)] p-1 text-muted hover:text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-4" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 39,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "sr-only",
				children: "Close"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 40,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 38,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 30,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 28,
		columnNumber: 5
	}, this);
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("flex flex-col gap-1.5 text-left", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 49,
		columnNumber: 5
	}, this);
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle$1, {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 58,
		columnNumber: 5
	}, this);
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 70,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/history.tsx?tsr-split=component";
function labelOf(d) {
	return STORE_PAPER_LABEL[d.slug] ?? getTemplate(d.slug)?.forum ?? d.slug;
}
function preview(text) {
	return text.replace(/^#+\s+/gm, "").replace(/\*\*/g, "").replace(/\n{2,}/g, " ").trim();
}
function stem(d) {
	const host = paperHost(d) || "draft";
	const kind = (STORE_PAPER_LABEL[d.slug] ?? d.slug).toLowerCase().replace(/\s+/g, "-");
	return `NyayaDraft-${host.replace(/[^\w.-]+/g, "-")}-${kind}`;
}
function HistoryPage() {
	const drafts = useDraftStore((s) => s.drafts);
	const hydrated = useDraftStore((s) => s.hydrated);
	const setHydrated = useDraftStore((s) => s.setHydrated);
	const remove = useDraftStore((s) => s.remove);
	const hydratePaper = useAuditStore((s) => s.hydratePaper);
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [openHosts, setOpenHosts] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (useDraftStore.persist.hasHydrated()) setHydrated(true);
		const unsub = useDraftStore.persist.onFinishHydration(() => setHydrated(true));
		const t = window.setTimeout(() => setHydrated(true), 900);
		return () => {
			unsub();
			window.clearTimeout(t);
		};
	}, [setHydrated]);
	const open = drafts.find((d) => d.id === openId) ?? null;
	const groups = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		const filtered = needle ? drafts.filter((d) => `${d.title} ${d.slug} ${paperHost(d)} ${d.draftText}`.toLowerCase().includes(needle)) : drafts;
		const map = /* @__PURE__ */ new Map();
		for (const d of filtered) {
			const key = paperHost(d) || (isStorePaper(d.slug) ? "Store work" : "Library drafts");
			const list = map.get(key) ?? [];
			list.push(d);
			map.set(key, list);
		}
		return [...map.entries()];
	}, [drafts, q]);
	async function saveWord(d) {
		try {
			await downloadDraftDocx({
				title: d.title,
				subtitle: labelOf(d),
				host: paperHost(d),
				body: d.draftText,
				filename: `${stem(d)}.docx`
			});
			toast.success("Word file downloaded.");
		} catch {
			toast.error("Could not build the Word file.");
		}
	}
	async function savePdf(d) {
		try {
			await downloadPaperPdf({
				host: paperHost(d) || "draft",
				title: d.title,
				body: d.draftText,
				filename: `${stem(d)}.pdf`
			});
			toast.success("PDF downloaded.");
		} catch {
			toast.error("Could not build the PDF.");
		}
	}
	function openInAudit(d) {
		hydratePaper({
			slug: d.slug,
			title: d.title,
			body: d.draftText,
			notes: d.notes,
			citations: d.citations,
			facts: d.facts
		});
		toast.success("Loaded into Audit store.");
		navigate({ to: "/audit" });
	}
	function hostOpen(host) {
		if (q.trim() && openHosts[host] === void 0) return true;
		return Boolean(openHosts[host]);
	}
	function toggleHost(host) {
		setOpenHosts((s) => ({
			...s,
			[host]: !hostOpen(host)
		}));
	}
	function setAllHosts(open) {
		const next = {};
		for (const [host] of groups) next[host] = open;
		setOpenHosts(next);
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[12px] tracking-[0.18em] text-muted uppercase",
				children: "This device"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-2 font-display text-4xl font-medium tracking-tight",
				children: "Saved drafts"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 121,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 max-w-2xl text-sm text-muted",
				children: "Audits are grouped by store. Tap Show on a website to open its papers. Open a card to read, download, or load it back into Audit store. Re-saving the same paper updates it — it does not duplicate."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
				className: "mt-6 max-w-md",
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search a store or paper…",
				"aria-label": "Search saved drafts"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 9
			}, this),
			!hydrated ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-12 text-sm text-muted",
				children: "Loading saved work on this device…"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 22
			}, this) : drafts.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 rounded-[var(--radius-xl)] border border-dashed border-border px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-display text-xl",
						children: "No drafts on this device yet."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted",
						children: "On Audit store, tap Save on a paper. The same paper for the same store overwrites the last copy."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/audit",
							children: "Audit a store"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 125
			}, this) : groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-12 text-sm text-muted",
				children: "Nothing matches that search."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 141,
				columnNumber: 42
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setAllHosts(true),
						children: "Expand all"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 143,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setAllHosts(false),
						children: "Collapse all"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 142,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-2",
					children: groups.map(([host, items]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
						title: host,
						hint: `${items.length} paper${items.length === 1 ? "" : "s"} · ${isStorePaper(items[0]?.slug ?? "") ? "Store" : "Library"}`,
						open: hostOpen(host),
						onToggle: () => toggleHost(host),
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "grid gap-4 md:grid-cols-2",
							children: items.map((d) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: "muted",
												children: labelOf(d)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 156,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
												className: "mt-2 font-display text-xl font-medium",
												children: d.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 157,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-1 text-[12px] text-muted tabular-nums",
												children: new Date(d.createdAt).toLocaleString("en-IN")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 160,
												columnNumber: 27
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 155,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "ghost",
											size: "icon",
											"aria-label": "Delete draft",
											onClick: () => {
												remove(d.id);
												if (openId === d.id) setOpenId(null);
											},
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 168,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 164,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 154,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-3 line-clamp-4 flex-1 font-serif text-sm leading-relaxed text-muted",
										children: preview(d.draftText) || "Empty paper."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 171,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-4 flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "outline",
											onClick: () => setOpenId(d.id),
											children: "View"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 175,
											columnNumber: 25
										}, this), isStorePaper(d.slug) ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "outline",
											onClick: () => openInAudit(d),
											children: "Open in audit"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 178,
											columnNumber: 49
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											asChild: true,
											variant: "outline",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
												to: "/draft/$slug",
												params: { slug: d.slug },
												children: "Open instrument"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 181,
												columnNumber: 29
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 180,
											columnNumber: 39
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 174,
										columnNumber: 23
									}, this)
								]
							}, d.id, true, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 35
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 17
						}, this)
					}, host, false, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 44
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 150,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 141,
				columnNumber: 117
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 117,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open: Boolean(open),
		onOpenChange: (v) => !v && setOpenId(null),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-h-[88vh] max-w-4xl overflow-y-auto",
			children: open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: open.title }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 199,
					columnNumber: 17
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: [
					labelOf(open),
					paperHost(open) ? ` · ${paperHost(open)}` : "",
					" ·",
					" ",
					new Date(open.createdAt).toLocaleString("en-IN")
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 200,
					columnNumber: 17
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 198,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => {
								navigator.clipboard.writeText(open.draftText);
								toast.success("Copied.");
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 19
							}, this), "Copy"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 207,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void saveWord(open),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 19
							}, this), "Word"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void savePdf(open),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 219,
								columnNumber: 19
							}, this), "PDF"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 17
						}, this),
						isStorePaper(open.slug) ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => {
								openInAudit(open);
								setOpenId(null);
							},
							children: "Open in audit"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 44
						}, this) : null
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
					title: open.title,
					body: open.draftText
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 229,
					columnNumber: 15
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 197,
				columnNumber: 19
			}, this) : null
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 196,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 195,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 116,
		columnNumber: 10
	}, this);
}
//#endregion
export { HistoryPage as component };
