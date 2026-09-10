import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as rememberProvider, n as Badge, r as aiKeysPayload, t as AppShell } from "./badge-BGa2cXzN.mjs";
import { C as MessageCircle, E as LoaderCircle, L as Download, N as FileDown, R as Copy, T as Mail, c as Sparkles, f as Send, j as Globe } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CWahO9x8.mjs";
import { t as Textarea } from "./textarea-DBq0yRtM.mjs";
import { t as Fold } from "./fold-BhAYn1Jw.mjs";
import { t as useAuditStore } from "./audit-store-DeG2ETsA.mjs";
import { _ as useSenderStore, g as usePipelineStore, h as senderPayload, m as researchStoreFn, r as MiniAiPanel, s as emailTouchId, y as writeColdEmailFn } from "./store-audit-CVIq-TTb.mjs";
import { n as StoreArchiveSelector, t as PipelineBoard } from "./store-archive-selector-BBaEGpoC.mjs";
import { n as downloadDraftDocx, o as downloadPaperPdf, t as DraftPaper } from "./pdf-export-T-1A9IzR.mjs";
import { t as Input } from "./input-DvyoLJy2.mjs";
import { t as Label } from "./label-DbX4wkVX.mjs";
import { c as sampleClauseText, i as mailtoHref, n as callScriptText, o as parseForwardEmails, r as emailCta } from "./parse-X7WrXe75.mjs";
import { i as useDraftStore } from "./store-C7MjJ_c6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/outreach-BVJW9rWl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/outreach.tsx?tsr-split=component";
function OutreachPage() {
	const sender = useSenderStore();
	const audit = useAuditStore();
	const startSequence = usePipelineStore((s) => s.startSequence);
	const ensurePipeline = usePipelineStore((s) => s.ensure);
	const markSent = usePipelineStore((s) => s.markSent);
	const saveHistory = useDraftStore((s) => s.save);
	const [url, setUrl] = (0, import_react.useState)(audit.urlInput || audit.host || "");
	const [busy, setBusy] = (0, import_react.useState)("idle");
	const [showMiniAi, setShowMiniAi] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)({
		emails: true,
		paper: false,
		timeline: true
	});
	const working = busy !== "idle";
	const emails = (0, import_react.useMemo)(() => parseForwardEmails(audit.coldPaper), [audit.coldPaper]);
	const sampleClause = (0, import_react.useMemo)(() => sampleClauseText(audit.coldPaper), [audit.coldPaper]);
	const callScript = (0, import_react.useMemo)(() => callScriptText(audit.coldPaper), [audit.coldPaper]);
	async function researchThenDraft() {
		const target = url.trim() || audit.origin;
		if (!target) {
			toast.error("Paste a store URL first.");
			return;
		}
		setBusy("research");
		try {
			let origin = audit.origin;
			let host = audit.host;
			let homeTitle = audit.homeTitle;
			let pages = audit.pages;
			let missing = audit.missing;
			let hints = audit.hints ?? void 0;
			const sameHost = origin && (target.includes(host) || origin.includes(target.replace(/^https?:\/\//, "")));
			if (!pages.length || !sameHost) {
				const researched = await researchStoreFn({ data: { url: target } });
				if (!researched.ok) {
					toast.error(researched.error);
					return;
				}
				audit.setUrlInput(target);
				audit.setResearch({
					origin: researched.origin,
					host: researched.host,
					homeTitle: researched.homeTitle,
					pages: researched.pages,
					missing: researched.missing,
					hints: researched.hints
				});
				origin = researched.origin;
				host = researched.host;
				homeTitle = researched.homeTitle;
				pages = researched.pages;
				missing = researched.missing;
				hints = researched.hints;
				toast.success(`Read ${pages.length} page${pages.length === 1 ? "" : "s"} on ${host}.`);
			}
			setBusy("draft");
			const packed = senderPayload(sender);
			const result = await writeColdEmailFn({ data: {
				origin,
				host,
				homeTitle,
				hints,
				pages: pages.map((p) => ({
					kind: p.kind,
					label: p.label,
					url: p.url,
					title: p.title,
					text: p.text.slice(0, 9e3)
				})),
				missing,
				findings: audit.findings?.slice(0, 8e3) || void 0,
				gapsPaper: audit.gapsPaper?.slice(0, 8e3) || void 0,
				sender: packed,
				aiKeys: aiKeysPayload()
			} });
			if (!result.ok) {
				toast.error(result.error);
				return;
			}
			rememberProvider(result);
			audit.setColdPaper(result.text, result.citations);
			startSequence(host, origin);
			ensurePipeline(host, origin);
			toast.success("21-day sequence ready. Send Email 1 — ask them to reply send.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not draft the cold emails.");
		} finally {
			setBusy("idle");
		}
	}
	async function saveWord() {
		if (!audit.coldPaper.trim()) return;
		try {
			await downloadDraftDocx({
				title: `Cold outreach — ${audit.host || "store"}`,
				subtitle: sender.name ? `From ${sender.name} to the merchant` : "From you to the merchant",
				host: audit.host,
				body: audit.coldPaper,
				filename: `NyayaDraft-${(audit.host || "store").replace(/[^\w.-]+/g, "-")}-cold-email.docx`
			});
			toast.success("Word file downloaded.");
		} catch {
			toast.error("Could not build the Word file.");
		}
	}
	async function savePdf() {
		if (!audit.coldPaper.trim()) return;
		try {
			await downloadPaperPdf({
				host: audit.host || "store",
				title: `Cold outreach — ${audit.host || "store"}`,
				body: audit.coldPaper,
				filename: `NyayaDraft-${(audit.host || "store").replace(/[^\w.-]+/g, "-")}-cold-email.pdf`
			});
			toast.success("PDF downloaded.");
		} catch {
			toast.error("Could not build the PDF.");
		}
	}
	function save() {
		if (!audit.coldPaper) return;
		saveHistory({
			id: `store-cold::${audit.host}`,
			slug: "store-cold",
			title: `Cold email — ${audit.host}`,
			createdAt: Date.now(),
			facts: {
				website: audit.origin,
				host: audit.host,
				from: sender.name
			},
			draftText: audit.coldPaper,
			notes: "",
			citations: audit.citations
		});
		toast.success("Saved on this device.");
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "border-b border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[12px] tracking-[0.2em] text-muted uppercase",
						children: "Freelance drafter · store outreach"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StoreArchiveSelector, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 178,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-2 font-display text-4xl font-medium tracking-tight",
					children: "Cold email the store"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 180,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 max-w-2xl text-[16px] leading-relaxed text-muted",
					children: "Email 1 is 80–120 words: one live gap in shop language, a one-page SAMPLE rewrite if they reply “send”, and why they should hire you. The 21-day timeline sits next to the pack. The meeting comes after they have seen your sentence next to theirs."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 183,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 173,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 172,
		columnNumber: 9
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[12px] tracking-[0.16em] text-muted uppercase",
							children: "From you"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-1 font-display text-2xl font-medium",
							children: "Your signature"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Optional. Leave the name as x — you will type your own name into the email before you send it."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 grid gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									id: "sender-name",
									label: "Signature name",
									value: sender.name,
									onChange: (v) => sender.setField("name", v),
									placeholder: "x"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									id: "sender-city",
									label: "City",
									value: sender.city,
									onChange: (v) => sender.setField("city", v),
									placeholder: "Delhi"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									id: "sender-email",
									label: "Reply-to email",
									value: sender.email,
									onChange: (v) => sender.setField("email", v),
									placeholder: "you@studio.example"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 206,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									id: "sender-phone",
									label: "Phone / WhatsApp",
									value: sender.phone,
									onChange: (v) => sender.setField("phone", v),
									placeholder: "+91 …"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "sender-offer",
										children: "What you offer in one line"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 209,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
										id: "sender-offer",
										value: sender.offer,
										onChange: (e) => sender.setField("offer", e.target.value),
										placeholder: "I rewrite Indian D2C TOS, refund, shipping and DPDP notices so the live banners match the law."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 210,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									id: "sender-proof",
									label: "Proof (optional — a result, not a boast)",
									value: sender.proof,
									onChange: (v) => sender.setField("proof", v),
									placeholder: "Last month: aligned a jewellery store’s 7-day banner with its refund page."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 212,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									id: "sender-address",
									label: "Address (for the service agreement)",
									value: sender.address,
									onChange: (v) => sender.setField("address", v),
									placeholder: "Hisar, Haryana"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
										id: "sender-pan",
										label: "PAN",
										value: sender.pan,
										onChange: (v) => sender.setField("pan", v),
										placeholder: "ABCDE1234F"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
										id: "sender-gstin",
										label: "GSTIN",
										value: sender.gstin,
										onChange: (v) => sender.setField("gstin", v),
										placeholder: "If registered"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
										id: "sender-fee",
										label: "Typical fee (INR)",
										value: sender.fee,
										onChange: (v) => sender.setField("fee", v),
										placeholder: "25000"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 219,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
										id: "sender-advance",
										label: "Advance %",
										value: sender.advancePct,
										onChange: (v) => sender.setField("advancePct", v),
										placeholder: "50"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 218,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 194,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[12px] tracking-[0.16em] text-muted uppercase",
							children: "To the store"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-1 font-display text-2xl font-medium",
							children: "Their URL"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-muted",
							children: "NyayaDraft opens the published TOS, privacy, refund and shipping pages and writes the hook from those, not from a template."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							className: "mt-4 flex flex-col gap-3 sm:flex-row",
							onSubmit: (e) => {
								e.preventDefault();
								researchThenDraft();
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: url,
								onChange: (e) => setUrl(e.target.value),
								placeholder: "dakshis.com",
								"aria-label": "Store URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "submit",
								disabled: working,
								className: "sm:w-56",
								children: [busy === "research" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 240,
									columnNumber: 42
								}, this) : busy === "draft" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 240,
									columnNumber: 107
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 240,
									columnNumber: 153
								}, this), busy === "research" ? "Reading the store…" : busy === "draft" ? "Writing the emails…" : "Draft cold emails"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 15
						}, this),
						audit.host ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-[13px] text-muted",
							children: [
								"Last researched: ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-ink",
									children: audit.host
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 36
								}, this),
								audit.pages.length ? ` · ${audit.pages.length} pages` : "",
								".",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/audit",
									className: "text-primary hover:underline",
									children: "Open full audit"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 29
						}, this) : null,
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								variant: showMiniAi ? "default" : "outline",
								size: "sm",
								onClick: () => setShowMiniAi(!showMiniAi),
								className: "border-primary/50 text-primary hover:bg-primary/10",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 mr-1.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 19
								}, this), showMiniAi ? "Hide Mini AI" : "Mini AI · Feature Full Revised Policy in Cold Mail"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 252,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-6 grid gap-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Day 0 — observation, layman so-what, “reply send”." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Day 3 — bump. Day 7 — a second live gap." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 261,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Day 14 — pack and fee. Day 21 — break-up." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Sample clause is marked not for publication. Full TOS stays behind the fee." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 263,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 259,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 225,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 193,
				columnNumber: 11
			}, this),
			showMiniAi && /* @__PURE__ */ (void 0)("div", {
				className: "my-6 rounded-[var(--radius-lg)] border border-primary/30 bg-surface p-6 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between mb-4 border-b border-border/70 pb-3",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
						className: "font-display text-xl font-medium flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-5 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 272,
							columnNumber: 21
						}, this), "Mini AI Adaptive Cold Email Drafter"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 271,
						columnNumber: 19
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted mt-0.5",
						children: "Feature a full rewritten policy (e.g. Return & Refund) as a teaser in cold email instead of just one single clause, or tailor to your custom needs."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 275,
						columnNumber: 19
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 270,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setShowMiniAi(false),
						children: "Close"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 279,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 269,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)(MiniAiPanel, { currentStoreHost: audit.host }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 283,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 268,
				columnNumber: 26
			}, this),
			audit.host ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Onboard timeline",
				hint: "Clock A until they reply · Clock B after send",
				open: open.timeline,
				onToggle: () => setOpen((s) => ({
					...s,
					timeline: !s.timeline
				})),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PipelineBoard, {
					host: audit.host,
					origin: audit.origin
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 290,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 286,
				columnNumber: 25
			}, this) : null,
			emails.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "The 21-day pack",
				hint: `Ready to send · ${audit.host}`,
				open: open.emails,
				onToggle: () => setOpen((s) => ({
					...s,
					emails: !s.emails
				})),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap justify-end gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									onClick: () => void saveWord(),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 300,
										columnNumber: 21
									}, this), "Word"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 299,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									onClick: () => void savePdf(),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 304,
										columnNumber: 21
									}, this), "PDF"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 303,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									onClick: save,
									children: "Save"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 307,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 298,
							columnNumber: 15
						}, this),
						sampleClause ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
							className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: "muted",
									children: "SAMPLE — not for publication"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 312,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-3 font-display text-lg font-medium",
									children: "One-page rewrite — send after they reply send"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 313,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
									className: "mt-3 font-serif text-[14px] leading-relaxed whitespace-pre-wrap",
									children: sampleClause
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 316,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									className: "mt-3",
									variant: "outline",
									size: "sm",
									onClick: () => {
										navigator.clipboard.writeText(sampleClause);
										markSent(audit.host, "sample");
										toast.success("Sample copied. Mark sample sent when it leaves your inbox.");
									},
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 324,
										columnNumber: 21
									}, this), "Copy sample"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 319,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 31
						}, this) : null,
						callScript ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
							className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "muted",
								children: "Call script"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 329,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
								className: "mt-3 font-serif text-[14px] leading-relaxed whitespace-pre-wrap",
								children: callScript
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 330,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 328,
							columnNumber: 29
						}, this) : null,
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 lg:grid-cols-2",
							children: emails.map((email) => {
								const touch = emailTouchId(email.heading);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
									className: "flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: "muted",
												children: email.heading.replace(/^EMAIL \d+\s*—\s*/i, "")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 339,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 338,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "mt-3 font-display text-lg font-medium leading-snug",
											children: email.subject && email.subject !== "—" ? email.subject : email.heading
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 341,
											columnNumber: 21
										}, this),
										email.to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-1 text-[13px] text-muted",
											children: ["To: ", email.to]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 344,
											columnNumber: 33
										}, this) : null,
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
											className: "mt-3 flex-1 font-serif text-[14px] leading-relaxed whitespace-pre-wrap text-ink",
											children: email.body
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 345,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-4 flex flex-wrap gap-2",
											children: [
												/whatsapp|dm/i.test(email.heading) ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													variant: "outline",
													size: "sm",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
														href: `https://wa.me/?text=${encodeURIComponent(email.body)}`,
														target: "_blank",
														rel: "noreferrer",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "size-4" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 351,
															columnNumber: 29
														}, this), "Open WhatsApp"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 350,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 349,
													columnNumber: 61
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													variant: "outline",
													size: "sm",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
														href: mailtoHref(email.to, email.subject, email.body),
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 356,
															columnNumber: 29
														}, this), emailCta(email.heading)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 355,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 354,
													columnNumber: 37
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													variant: "outline",
													size: "sm",
													onClick: () => {
														navigator.clipboard.writeText(email.subject && email.subject !== "—" ? `Subject: ${email.subject}\n\n${email.body}` : email.body);
														toast.success("Copied.");
													},
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 364,
														columnNumber: 25
													}, this), "Copy"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 360,
													columnNumber: 23
												}, this),
												touch ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													variant: "outline",
													size: "sm",
													onClick: () => {
														markSent(audit.host, touch);
														toast.success("Marked sent on the timeline.");
													},
													children: "Mark sent"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 367,
													columnNumber: 32
												}, this) : null
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 348,
											columnNumber: 21
										}, this)
									]
								}, email.heading, true, {
									fileName: _jsxFileName,
									lineNumber: 337,
									columnNumber: 24
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 334,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 297,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 293,
				columnNumber: 28
			}, this) : null,
			audit.coldPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Full outreach paper",
				hint: audit.host,
				open: open.paper,
				onToggle: () => setOpen((s) => ({
					...s,
					paper: !s.paper
				})),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
					title: `Cold outreach — ${audit.host}`,
					body: audit.coldPaper
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 384,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 380,
				columnNumber: 30
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-10 flex items-center gap-2 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 386,
					columnNumber: 15
				}, this), "Paste a store and draft. Sign as x unless you type a name. Nothing leaves this device until you tap the button."]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 385,
				columnNumber: 23
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 192,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 171,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 170,
		columnNumber: 10
	}, this);
}
function Field({ id, label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			htmlFor: id,
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 408,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
			id,
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 409,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 407,
		columnNumber: 10
	}, this);
}
//#endregion
export { OutreachPage as component };
