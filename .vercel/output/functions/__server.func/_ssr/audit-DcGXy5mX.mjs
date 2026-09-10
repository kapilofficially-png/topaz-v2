import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as rememberProvider, i as cn, n as Badge, r as aiKeysPayload, t as AppShell } from "./badge-BGa2cXzN.mjs";
import { t as ScrollArea } from "./scroll-area-Fo-tT7S5.mjs";
import { A as Handshake, D as ListChecks, E as LoaderCircle, F as EyeOff, L as Download, N as FileDown, P as Eye, R as Copy, T as Mail, W as Bookmark, b as Plus, c as Sparkles, f as Send, j as Globe, m as ScanSearch, n as Wrench, p as ScrollText, r as WandSparkles, w as Megaphone, x as Play, z as ClipboardPen } from "../_libs/lucide-react.mjs";
import { t as CitationPanel } from "./citation-panel-Csp_3L1W.mjs";
import { t as Button } from "./button-CWahO9x8.mjs";
import { t as Textarea } from "./textarea-DBq0yRtM.mjs";
import { n as POLICY_LABELS, t as POLICY_KINDS } from "./types-BWR_EVh8.mjs";
import { t as Fold } from "./fold-BhAYn1Jw.mjs";
import { t as useAuditStore } from "./audit-store-DeG2ETsA.mjs";
import { C as writeSellingPointsFn, S as writeQuestionnaireFn, _ as useSenderStore, a as auditStoreFn, b as writeForwardEmailFn, c as fetchStorePageFn, g as usePipelineStore, h as senderPayload, l as findPolicyGapsFn, m as researchStoreFn, p as refineStorePolicyFn, r as MiniAiPanel, s as emailTouchId, v as writeClientBriefFn, w as writeServiceAgreementFn, x as writeImplementationsFn, y as writeColdEmailFn } from "./store-audit-CVIq-TTb.mjs";
import { n as StoreArchiveSelector, t as PipelineBoard } from "./store-archive-selector-BBaEGpoC.mjs";
import { a as downloadOriginalPoliciesPdf, i as downloadMasterPdf, n as downloadDraftDocx, o as downloadPaperPdf, r as downloadMasterDocx, t as DraftPaper } from "./pdf-export-T-1A9IzR.mjs";
import { t as Input } from "./input-DvyoLJy2.mjs";
import { t as Label } from "./label-DbX4wkVX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CEfP1rFN.mjs";
import { a as parseDraftOutput, c as sampleClauseText, i as mailtoHref, n as callScriptText, o as parseForwardEmails, r as emailCta, s as parseStoreQuestions, t as applyQuestionnaireAnswers } from "./parse-X7WrXe75.mjs";
import { i as useDraftStore } from "./store-C7MjJ_c6.mjs";
import { a as runStoreSequence, o as saveSessionPapers, r as notifySequenceComplete, t as isBatchRunning } from "./batch-runner-R9Mrm9Oh.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-DcGXy5mX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ui/tabs.tsx";
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, {
		className: cn("inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-surface-2 p-1 text-muted", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 12,
		columnNumber: 5
	}, this);
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger, {
		className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-[var(--motion-quick)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface data-[state=active]:text-ink data-[state=active]:shadow-[var(--shadow-border)]", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 27,
		columnNumber: 5
	}, this);
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content, {
		className: cn("mt-4 focus-visible:outline-none", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 42,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/audit.tsx?tsr-split=component";
var EXAMPLES = ["dakshis.com"];
var PAYLOAD_CLIP = 8e3;
function actionError(err, fallback) {
	const raw = err instanceof Error ? err.message : String(err ?? "");
	if (/too_big|Too big/i.test(raw)) return "A policy in this session was too long to send in one request. Tap the button again.";
	if (!raw || raw.length > 180 || raw.trim().startsWith("[") || raw.trim().startsWith("{")) return fallback;
	return raw;
}
var KIND_HINTS = {
	terms: "CPA, no as-is waiver, Indian forum",
	privacy: "DPDP notice, withdrawal, children",
	consent: "Cookie/consent — as easy to withdraw as to give",
	return: "Return/exchange only; keep refund on its own page",
	refund: "Money-back and COD NEFT; keep return on its own page",
	cancellation: "Cancel before dispatch; no one-sided fee",
	shipping: "Dispatch SLA, risk, displayed estimates",
	delivery: "Delivery windows and failed attempts; cross-refer shipping",
	contact: "Legal entity, grievance officer, hours, emails",
	other: "Rewrite this live page as a standalone Indian-law document"
};
function AuditPage() {
	const session = useAuditStore();
	const sender = useSenderStore();
	const startSequence = usePipelineStore((s) => s.startSequence);
	const ensurePipeline = usePipelineStore((s) => s.ensure);
	const markSent = usePipelineStore((s) => s.markSent);
	const saveHistory = useDraftStore((s) => s.save);
	const [busy, setBusy] = (0, import_react.useState)("idle");
	const [pageTab, setPageTab] = (0, import_react.useState)("");
	const [refineTab, setRefineTab] = (0, import_react.useState)("");
	const [rewriteUrl, setRewriteUrl] = (0, import_react.useState)("");
	const [rewriteProgress, setRewriteProgress] = (0, import_react.useState)(null);
	const [flowProgress, setFlowProgress] = (0, import_react.useState)(null);
	const [sequenceNotice, setSequenceNotice] = (0, import_react.useState)(null);
	const [extraUrl, setExtraUrl] = (0, import_react.useState)("");
	const [extraKind, setExtraKind] = (0, import_react.useState)("auto");
	const [extraHidden, setExtraHidden] = (0, import_react.useState)(false);
	const [showMiniAi, setShowMiniAi] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)({});
	function isOpen(id) {
		return Boolean(open[id]);
	}
	function toggleFold(id) {
		setOpen((s) => ({
			...s,
			[id]: !s[id]
		}));
	}
	function reveal(id) {
		setOpen((s) => ({
			...s,
			[id]: true
		}));
	}
	const working = busy !== "idle";
	async function research(url = session.urlInput, nested = false) {
		const target = url.trim();
		if (target.length < 4) {
			toast.error("Paste a store address — for example dakshis.com");
			return false;
		}
		session.setUrlInput(target);
		if (!nested) setBusy("research");
		try {
			const result = await researchStoreFn({ data: { url: target } });
			if (!result.ok) {
				toast.error(actionError(result.error, "That request did not complete."));
				return false;
			}
			rememberProvider(result);
			session.setResearch({
				origin: result.origin,
				host: result.host,
				homeTitle: result.homeTitle,
				pages: result.pages,
				missing: result.missing,
				hints: result.hints
			});
			ensurePipeline(result.host, result.origin);
			setPageTab(result.pages[0]?.url ?? "");
			if (result.pages.length === 0) {
				toast.error("No policy pages were readable. The store may block fetches.");
				return false;
			}
			if (!nested) {
				toast.success(`Read ${result.pages.length} legal page${result.pages.length === 1 ? "" : "s"} on ${result.host}`);
				reveal("pages");
			}
			return true;
		} finally {
			if (!nested) setBusy("idle");
		}
	}
	async function addLivePage() {
		const origin = useAuditStore.getState().origin;
		if (!origin) {
			toast.error("Research the store first, then add extra policy URLs.");
			return;
		}
		const raw = extraUrl.trim();
		if (raw.length < 2) {
			toast.error("Paste the full policy URL, or a path like /pages/return-policy.");
			return;
		}
		const resolved = raw.startsWith("/") ? `${origin.replace(/\/$/, "")}${raw}` : raw;
		setBusy("fetch-page");
		try {
			const result = await fetchStorePageFn({ data: {
				url: resolved,
				kind: extraKind === "auto" ? void 0 : extraKind,
				hidden: extraHidden
			} });
			if (!result.ok) {
				toast.error(actionError(result.error, "Could not read that page."));
				return;
			}
			try {
				const host = new URL(result.page.url).host.replace(/^www\./, "");
				const current = useAuditStore.getState().host.replace(/^www\./, "");
				if (current && host !== current) {
					toast.error(`That URL is on ${host}, not ${current}.`);
					return;
				}
			} catch {}
			useAuditStore.getState().addPage(result.page);
			setPageTab(result.page.url);
			setExtraUrl("");
			reveal("pages");
			toast.success(`Added “${result.page.title}”${result.page.hidden ? " (hidden from homepage)" : ""}.`);
		} finally {
			setBusy("idle");
		}
	}
	async function audit(nested = false) {
		const s = useAuditStore.getState();
		if (!s.pages.length) {
			toast.error("Research the store first.");
			return false;
		}
		if (!nested) setBusy("audit");
		try {
			const result = await auditStoreFn({ data: {
				origin: s.origin,
				host: s.host,
				homeTitle: s.homeTitle,
				hints: s.hints ?? void 0,
				pages: s.pages.map((p) => ({
					kind: p.kind,
					label: p.label,
					url: p.url,
					title: p.title,
					text: p.text.slice(0, 9e3),
					hidden: Boolean(p.hidden),
					added: Boolean(p.added)
				})),
				missing: s.missing,
				aiKeys: aiKeysPayload()
			} });
			if (!result.ok) {
				toast.error(actionError(result.error, "That request did not complete."));
				s.setFindings("", result.citations);
				return false;
			}
			rememberProvider(result);
			s.setFindings(result.text, result.citations);
			if (!nested) {
				toast.success("Audit complete. Review the gaps, then rewrite a policy.");
				reveal("audit");
				reveal("rewrite");
			}
			return true;
		} finally {
			if (!nested) setBusy("idle");
		}
	}
	async function refinePage(page, quiet = false) {
		const s = useAuditStore.getState();
		const answered = [...Object.entries(s.briefAnswers), ...Object.entries(s.answers)].filter(([, v]) => v.trim()).map(([id, answer]) => `${id}: ${answer}`).join("\n");
		try {
			const result = await refineStorePolicyFn({ data: {
				kind: page.kind,
				origin: s.origin,
				host: s.host,
				pageUrl: page.url || void 0,
				pageTitle: page.title || page.label,
				findings: s.findings,
				currentPolicy: page.text.slice(0, 12e3),
				extraInstruction: answered ? `Merchant questionnaire answers (use these instead of [TO BE COMPLETED] where they fit):\n${answered}` : void 0,
				aiKeys: aiKeysPayload()
			} });
			if (!result.ok) {
				if (!quiet) toast.error(actionError(result.error, "That request did not complete."));
				return null;
			}
			rememberProvider(result);
			const item = {
				kind: page.kind,
				url: page.url,
				slug: result.slug,
				title: result.title,
				raw: result.text
			};
			s.setRefined(item);
			setRefineTab(page.url || page.kind);
			if (!quiet) toast.success(`Revised “${result.title}” drafted.`);
			return item;
		} catch (err) {
			if (!quiet) toast.error(actionError(err, "That rewrite did not complete."));
			return null;
		}
	}
	async function refine(page) {
		if (!session.findings) {
			toast.error("Run the Indian-law audit first so the rewrite has findings to use.");
			return;
		}
		setBusy(page.kind);
		setRewriteUrl(page.url);
		try {
			await refinePage(page);
			reveal("rewrite");
		} finally {
			setBusy("idle");
			setRewriteUrl("");
		}
	}
	function currentRewriteCards() {
		const s = useAuditStore.getState();
		const live = s.pages.map((p) => ({
			...p,
			missing: false
		}));
		const missing = s.missing.filter((m) => !s.pages.some((p) => p.kind === m.kind)).map((m) => ({
			kind: m.kind,
			label: m.label,
			url: "",
			title: m.label,
			text: "",
			chars: 0,
			status: 0,
			hidden: false,
			added: false,
			missing: true
		}));
		return [...live, ...missing];
	}
	async function refineAll(nested = false) {
		const s = useAuditStore.getState();
		if (!s.findings) {
			toast.error("Run the Indian-law audit first so the rewrite has findings to use.");
			return {
				ok: false,
				rewriteOk: 0,
				rewriteTotal: 0,
				failed: ["Revise policies"]
			};
		}
		const cards = currentRewriteCards();
		if (!cards.length) {
			toast.error("Research a store first.");
			return {
				ok: false,
				rewriteOk: 0,
				rewriteTotal: 0,
				failed: ["Revise policies"]
			};
		}
		if (!nested) {
			setBusy("rewrite-all");
			reveal("rewrite");
		}
		const written = [];
		const failed = [];
		const pause = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
		async function one(page, index, total) {
			setRewriteUrl(page.url);
			setRewriteProgress({
				current: index + 1,
				total,
				title: page.title || POLICY_LABELS[page.kind]
			});
			let item = await refinePage(page, true);
			if (!item) {
				await pause(800);
				item = await refinePage(page, true);
			}
			if (item) written.push(item);
			else failed.push(page.title || POLICY_LABELS[page.kind]);
		}
		try {
			for (let i = 0; i < cards.length; i += 1) {
				await one(cards[i], i, cards.length);
				if (i < cards.length - 1) await pause(400);
			}
			useAuditStore.getState().replaceRefined(written);
			if (!nested) {
				if (!failed.length) toast.success(`Rewrote all ${written.length} pages for ${s.host}.`);
				else toast.error(`${written.length} rewritten, ${failed.length} failed (${failed.join(", ")}). Tap the failed cards to retry.`);
			}
			return {
				ok: failed.length === 0,
				rewriteOk: written.length,
				rewriteTotal: cards.length,
				failed
			};
		} catch (err) {
			useAuditStore.getState().replaceRefined(written);
			if (!nested) toast.error(actionError(err, "Rewrite-all stopped before finishing."));
			return {
				ok: false,
				rewriteOk: written.length,
				rewriteTotal: cards.length,
				failed: failed.length ? failed : ["Revise policies"]
			};
		} finally {
			if (!nested) {
				setBusy("idle");
				setRewriteUrl("");
				setRewriteProgress(null);
			}
		}
	}
	function improvedPayload() {
		const s = useAuditStore.getState();
		const send = useSenderStore.getState();
		return {
			origin: s.origin,
			host: s.host,
			homeTitle: s.homeTitle,
			hints: s.hints ?? void 0,
			pages: s.pages.map((p) => ({
				kind: p.kind,
				label: p.label,
				url: p.url,
				title: p.title,
				text: p.text.slice(0, 9e3),
				hidden: Boolean(p.hidden),
				added: Boolean(p.added)
			})),
			missing: s.missing,
			findings: s.findings?.slice(0, 8e3) || void 0,
			gapsPaper: s.gapsPaper?.slice(0, 8e3) || void 0,
			questionnairePaper: s.questionsPaper?.slice(0, 8e3) || void 0,
			clientBrief: s.briefPaper?.slice(0, 8e3) || void 0,
			implementPaper: s.implementPaper?.slice(0, 8e3) || void 0,
			answers: [...Object.entries(s.briefAnswers), ...Object.entries(s.answers)].filter(([, v]) => v.trim()).slice(0, 24).map(([id, answer]) => ({
				id: id.slice(0, 40),
				title: id.slice(0, 200),
				answer: answer.slice(0, 800)
			})),
			refined: s.refined.slice(0, 12).map((r) => ({
				kind: r.kind,
				title: r.title.slice(0, 200),
				text: (parseDraftOutput(r.raw).draft || r.raw).slice(0, PAYLOAD_CLIP)
			})),
			sender: senderPayload(send)
		};
	}
	async function findGaps(nested = false) {
		const s = useAuditStore.getState();
		if (!s.pages.length) {
			toast.error("Research the store first.");
			return false;
		}
		if (!nested) setBusy("gaps");
		try {
			const result = await findPolicyGapsFn({ data: improvedPayload() });
			if (!result.ok) {
				toast.error(actionError(result.error, "That request did not complete."));
				return false;
			}
			rememberProvider(result);
			s.setGapsPaper(result.text, result.citations);
			if (!nested) {
				toast.success(s.refined.length ? "Gap register updated against the live pages and your rewrites." : "Gap register ready. Rewrite a policy, then run this again to see what closed.");
				reveal("gaps");
			}
			return true;
		} catch (err) {
			toast.error(actionError(err, "Could not score remaining gaps."));
			return false;
		} finally {
			if (!nested) setBusy("idle");
		}
	}
	async function writeSelling(nested = false) {
		const s = useAuditStore.getState();
		if (!s.pages.length) {
			toast.error("Research the store first.");
			return false;
		}
		if (!nested) setBusy("selling");
		try {
			const result = await writeSellingPointsFn({ data: improvedPayload() });
			if (!result.ok) {
				toast.error(actionError(result.error, "That request did not complete."));
				return false;
			}
			rememberProvider(result);
			s.setSellingPaper(result.text, result.citations);
			if (!nested) {
				toast.success("Selling points ready — store copy plus your pitch to this founder.");
				reveal("selling");
			}
			return true;
		} catch (err) {
			toast.error(actionError(err, "Could not write selling points."));
			return false;
		} finally {
			if (!nested) setBusy("idle");
		}
	}
	async function writeQuestions(nested = false) {
		const s = useAuditStore.getState();
		if (!s.pages.length) {
			toast.error("Research the store first.");
			return false;
		}
		if (!nested) setBusy("questions");
		try {
			const result = await writeQuestionnaireFn({ data: improvedPayload() });
			if (!result.ok) {
				toast.error(actionError(result.error, "That request did not complete."));
				return false;
			}
			rememberProvider(result);
			s.setQuestionsPaper(result.text, result.citations);
			if (!nested) {
				toast.success("Legal-facts questionnaire ready.");
				reveal("facts");
			}
			return true;
		} catch (err) {
			toast.error(actionError(err, "Could not build the legal-facts questionnaire."));
			return false;
		} finally {
			if (!nested) setBusy("idle");
		}
	}
	async function writeBrief(nested = false) {
		const s = useAuditStore.getState();
		if (!s.pages.length) {
			toast.error("Research the store first.");
			return false;
		}
		if (!nested) setBusy("brief");
		try {
			const result = await writeClientBriefFn({ data: improvedPayload() });
			if (!result.ok) {
				toast.error(actionError(result.error, "That request did not complete."));
				return false;
			}
			rememberProvider(result);
			s.setBriefPaper(result.text, result.citations);
			if (!nested) {
				toast.success("Client-needs brief ready. Send it, or fill it on the call.");
				reveal("brief");
			}
			return true;
		} catch (err) {
			toast.error(actionError(err, "Could not draft the client brief."));
			return false;
		} finally {
			if (!nested) setBusy("idle");
		}
	}
	async function writeImplement(nested = false) {
		const s = useAuditStore.getState();
		if (!s.pages.length) {
			toast.error("Research the store first.");
			return false;
		}
		if (!nested) setBusy("implement");
		try {
			const result = await writeImplementationsFn({ data: improvedPayload() });
			if (!result.ok) {
				toast.error(actionError(result.error, "That request did not complete."));
				return false;
			}
			rememberProvider(result);
			s.setImplementPaper(result.text, result.citations);
			if (!nested) {
				toast.success("Implementation playbook drafted for this store.");
				reveal("implement");
			}
			return true;
		} catch (err) {
			toast.error(actionError(err, "Could not draft the playbook."));
			return false;
		} finally {
			if (!nested) setBusy("idle");
		}
	}
	async function writeEmail(nested = false) {
		const s = useAuditStore.getState();
		if (!s.pages.length) {
			toast.error("Research the store first.");
			return false;
		}
		if (!nested) setBusy("email");
		try {
			const result = await writeForwardEmailFn({ data: improvedPayload() });
			if (!result.ok) {
				toast.error(actionError(result.error, "That request did not complete."));
				return false;
			}
			rememberProvider(result);
			s.setEmailPaper(result.text, result.citations);
			if (!nested) {
				toast.success("Forward-ready emails drafted. Copy or open in your mail app.");
				reveal("emails");
			}
			return true;
		} catch (err) {
			toast.error(actionError(err, "Could not draft the emails."));
			return false;
		} finally {
			if (!nested) setBusy("idle");
		}
	}
	async function writeCold(nested = false) {
		const s = useAuditStore.getState();
		if (!s.pages.length) {
			toast.error("Research the store first.");
			return false;
		}
		if (!nested) setBusy("cold");
		try {
			const result = await writeColdEmailFn({ data: improvedPayload() });
			if (!result.ok) {
				toast.error(actionError(result.error, "Could not draft the cold emails."));
				return false;
			}
			rememberProvider(result);
			s.setColdPaper(result.text, result.citations);
			startSequence(s.host, s.origin);
			if (!nested) {
				toast.success("21-day sequence ready. Send Email 1 today — ask them to reply send.");
				reveal("cold");
				reveal("timeline");
			}
			return true;
		} catch (err) {
			toast.error(actionError(err, "Could not draft the cold emails."));
			return false;
		} finally {
			if (!nested) setBusy("idle");
		}
	}
	async function writeAgreement() {
		if (!session.pages.length) {
			toast.error("Research the store first.");
			return;
		}
		setBusy("agreement");
		try {
			const result = await writeServiceAgreementFn({ data: improvedPayload() });
			if (!result.ok) {
				toast.error(actionError(result.error, "Could not draft the service agreement."));
				return;
			}
			rememberProvider(result);
			session.setAgreementPaper(result.text, result.citations);
			toast.success("Service agreement and service levels drafted for this store.");
			reveal("agreement");
		} catch (err) {
			toast.error(actionError(err, "Could not draft the service agreement."));
		} finally {
			setBusy("idle");
		}
	}
	async function runFullFlow() {
		if (isBatchRunning()) {
			toast.error("A batch is running. Wait for it to finish, or stop it on Batch.");
			return;
		}
		const target = session.urlInput.trim() || useAuditStore.getState().origin || "";
		if (target.length < 4) {
			toast.error("Paste a store address — for example dakshis.com");
			return;
		}
		setBusy("flow");
		setSequenceNotice(null);
		try {
			if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") Notification.requestPermission();
		} catch {}
		try {
			const report = await runStoreSequence(target, { onProgress: (p) => {
				setFlowProgress({
					current: p.step,
					total: p.total,
					title: p.title
				});
				if (p.rewrite) setRewriteProgress(p.rewrite);
				else setRewriteProgress(null);
			} });
			const pages = useAuditStore.getState().pages;
			setPageTab(pages[0]?.url ?? "");
			if (!report.pages) {
				toast.error("Full sequence stopped — no live pages were readable.");
				return;
			}
			reveal("pages");
			reveal("audit");
			reveal("rewrite");
			reveal("gaps");
			reveal("brief");
			reveal("facts");
			reveal("implement");
			reveal("selling");
			reveal("emails");
			reveal("cold");
			reveal("timeline");
			const notice = {
				host: report.host,
				finishedAt: Date.now(),
				rewriteOk: report.rewriteOk,
				rewriteTotal: report.rewriteTotal,
				failed: report.failed
			};
			setSequenceNotice(notice);
			notifySequenceComplete(notice);
		} catch (err) {
			toast.error(actionError(err, "Full sequence stopped."));
		} finally {
			setBusy("idle");
			setFlowProgress(null);
			setRewriteProgress(null);
			setRewriteUrl("");
		}
	}
	async function saveWord(opts) {
		if (!opts.body.trim()) return;
		try {
			await downloadDraftDocx({
				title: opts.title,
				subtitle: opts.subtitle ?? session.host,
				host: session.host,
				body: opts.body,
				filename: `NyayaDraft-${session.host.replace(/[^\w.-]+/g, "-")}-${opts.stem}.docx`
			});
			toast.success("Word file downloaded — you can edit it in Word or Google Docs.");
		} catch {
			toast.error("Could not build the Word file.");
		}
	}
	async function savePdf(opts) {
		if (!opts.body.trim()) return;
		try {
			await downloadPaperPdf({
				host: session.host,
				title: opts.title,
				body: opts.body,
				filename: `NyayaDraft-${session.host.replace(/[^\w.-]+/g, "-")}-${opts.stem}.pdf`
			});
			toast.success("PDF downloaded.");
		} catch {
			toast.error("Could not build the PDF.");
		}
	}
	function masterPack() {
		return {
			profile: [
				`Store: ${session.homeTitle || session.host}`,
				`Host: ${session.host}`,
				`URL: ${session.origin}`,
				session.hints?.legalName ? `Legal name: ${session.hints.legalName}` : "",
				session.hints?.gstins?.[0] ? `GSTIN: ${session.hints.gstins.join(", ")}` : "",
				session.hints?.emails?.length ? `Emails: ${session.hints.emails.join(", ")}` : "",
				session.hints?.phones?.length ? `Phones: ${session.hints.phones.join(", ")}` : "",
				`Pages read: ${session.pages.length}`,
				session.missing.length ? `Missing from crawl: ${session.missing.map((m) => m.label).join(", ")}` : "Required policy pages were all found.",
				"Sequence",
				"1. Research — live pages",
				"2. Indian-law audit",
				"3. Revised policies",
				"4. Gaps",
				"5. Client brief",
				"6. Legal facts",
				"7. Implementations",
				"8. Selling points",
				"9. Forwarding emails",
				"10. Cold outreach",
				"",
				"Pages",
				...session.pages.map((p) => `- ${p.label} — ${p.title}${p.hidden ? " [hidden from homepage]" : ""}${p.added ? " [added]" : ""}\n  ${p.url} (${p.chars.toLocaleString("en-IN")} characters)`)
			].filter((line) => line !== "").join("\n"),
			sections: [
				session.pages.length ? {
					title: "1. Research — live pages fetched",
					body: session.pages.map((p) => `## ${p.label}\n${p.title}\n${p.url}\n(${p.chars.toLocaleString("en-IN")} characters)${p.hidden ? " · hidden from homepage" : ""}${p.added ? " · added by drafter" : ""}\n\n${p.text}`).join("\n\n")
				} : null,
				session.findings ? {
					title: "2. Indian-law audit",
					body: session.findings
				} : null,
				...session.refined.map((r, i) => {
					const parsed = parseDraftOutput(r.raw);
					const notes = parsed.notes ? `\n\n## Drafting notes\n${parsed.notes}` : "";
					const auth = parsed.authorities ? `\n\n## Authorities relied on\n${parsed.authorities}` : "";
					return {
						title: `3.${i + 1} Revised policy — ${r.title}`,
						body: `${parsed.draft}${notes}${auth}`
					};
				}),
				session.gapsPaper ? {
					title: "4. Gap register",
					body: session.gapsPaper
				} : null,
				session.briefPaper ? {
					title: "5. Client needs brief",
					body: applyQuestionnaireAnswers(session.briefPaper, session.briefAnswers)
				} : null,
				session.questionsPaper ? {
					title: "6. Legal facts questionnaire",
					body: applyQuestionnaireAnswers(session.questionsPaper, session.answers)
				} : null,
				session.implementPaper ? {
					title: "7. Implementation playbook",
					body: session.implementPaper
				} : null,
				session.sellingPaper ? {
					title: "8. Selling points",
					body: session.sellingPaper
				} : null,
				session.emailPaper ? {
					title: "9. Forwarding emails",
					body: session.emailPaper
				} : null,
				session.coldPaper ? {
					title: "10. Cold outreach to the store",
					body: session.coldPaper
				} : null,
				session.agreementPaper ? {
					title: "Service agreement and service levels",
					body: session.agreementPaper
				} : null,
				session.citations.length ? {
					title: "Authorities retrieved",
					body: session.citations.map((c, i) => `### ${i + 1}. ${c.citation} — ${c.title}\n${c.statute}\n${c.text}`).join("\n\n")
				} : null
			].filter((s) => Boolean(s))
		};
	}
	async function saveMaster(format) {
		if (!session.origin) {
			toast.error("Research a store first.");
			return;
		}
		setBusy(format === "pdf" ? "pdf" : "docx");
		try {
			const { profile, sections } = masterPack();
			if (format === "pdf") {
				await downloadMasterPdf({
					host: session.host,
					homeTitle: session.homeTitle || session.host,
					origin: session.origin,
					profile,
					sections
				});
				toast.success("Master PDF downloaded — every paper from this store in one file.");
			} else {
				await downloadMasterDocx({
					host: session.host,
					homeTitle: session.homeTitle || session.host,
					profile,
					sections
				});
				toast.success("Master Word downloaded — every paper from this store in one file.");
			}
		} catch {
			toast.error(format === "pdf" ? "Could not build the master PDF." : "Could not build the master Word file.");
		} finally {
			setBusy("idle");
		}
	}
	function revisedSections() {
		const used = /* @__PURE__ */ new Set();
		const ordered = [];
		for (const card of rewriteCards) {
			const item = session.refined.find((r) => card.url ? r.url === card.url : r.kind === card.kind);
			const key = item ? item.url || item.kind : "";
			if (item && !used.has(key)) {
				used.add(key);
				ordered.push(item);
			}
		}
		for (const item of session.refined) {
			const key = item.url || item.kind;
			if (!used.has(key)) {
				used.add(key);
				ordered.push(item);
			}
		}
		return ordered.map((r) => {
			const parsed = parseDraftOutput(r.raw);
			const notes = parsed.notes ? `\n\n## Drafting notes\n${parsed.notes}` : "";
			const auth = parsed.authorities ? `\n\n## Authorities relied on\n${parsed.authorities}` : "";
			return {
				title: r.title,
				body: `${parsed.draft}${notes}${auth}`
			};
		});
	}
	async function saveRevised(format) {
		if (!session.refined.length) {
			toast.error("Rewrite at least one policy first.");
			return;
		}
		setBusy(format === "pdf" ? "pdf" : "docx");
		try {
			const sections = revisedSections();
			const profile = [
				`Store: ${session.homeTitle || session.host}`,
				`Host: ${session.host}`,
				`URL: ${session.origin}`,
				session.hints?.legalName ? `Legal name: ${session.hints.legalName}` : "",
				`Revised policies in this file: ${sections.length}`,
				"",
				"Contents",
				...sections.map((s, i) => `${i + 1}. ${s.title}`)
			].filter((line) => line !== "").join("\n");
			const stem = `NyayaDraft-${session.host.replace(/[^\w.-]+/g, "-")}-revised-policies`;
			if (format === "pdf") {
				await downloadMasterPdf({
					host: session.host,
					homeTitle: `${session.homeTitle || session.host} — revised policies`,
					origin: session.origin,
					profile,
					sections,
					kicker: "REVISED POLICIES",
					filename: `${stem}.pdf`
				});
				toast.success("Revised policies PDF downloaded.");
			} else {
				await downloadMasterDocx({
					host: session.host,
					homeTitle: `${session.homeTitle || session.host} — revised policies`,
					title: `${session.homeTitle || session.host} — revised policies`,
					profile,
					sections,
					filename: `${stem}.docx`
				});
				toast.success("Revised policies Word downloaded.");
			}
		} catch {
			toast.error(format === "pdf" ? "Could not build the revised-policies PDF." : "Could not build the revised-policies Word file.");
		} finally {
			setBusy("idle");
		}
	}
	async function saveOriginal(format, pageUrl) {
		if (!session.pages.length) {
			toast.error("Research a store first.");
			return;
		}
		const pages = pageUrl ? session.pages.filter((p) => p.url === pageUrl) : session.pages;
		if (!pages.length) {
			toast.error("No original policy text to export.");
			return;
		}
		setBusy(format === "pdf" ? "orig-pdf" : "docx");
		try {
			const stem = pageUrl ? pages[0]?.kind ?? "policy" : "original-policies";
			const filename = `NyayaDraft-${session.host.replace(/[^\w.-]+/g, "-")}-${stem}`;
			if (format === "pdf") await downloadOriginalPoliciesPdf({
				host: session.host,
				homeTitle: session.homeTitle || session.host,
				origin: session.origin,
				pages,
				filename: `${filename}.pdf`
			});
			else {
				const body = pages.map((p) => `## ${p.title || p.label}\n${p.url}\n\nAs crawled. Not a NyayaDraft rewrite.\n\n${p.text}`).join("\n\n");
				await downloadDraftDocx({
					title: `${session.homeTitle || session.host} — original policies`,
					subtitle: "As crawled. Not a rewrite.",
					host: session.host,
					body,
					filename: `${filename}.docx`
				});
			}
			toast.success(pages.length === 1 ? `Original ${pages[0].label} downloaded as ${format === "pdf" ? "PDF" : "Word"}.` : `Original policies downloaded — ${pages.length} pages as crawled.`);
		} catch {
			toast.error("Could not build the original-policies file.");
		} finally {
			setBusy("idle");
		}
	}
	function saveRefined(url, kind) {
		const item = session.refined.find((r) => url ? r.url === url : r.kind === kind);
		if (!item) return;
		const parsed = parseDraftOutput(item.raw);
		saveHistory({
			id: `${item.slug}::${session.host}::${item.url || item.kind}`,
			slug: item.slug,
			title: `${item.title} — ${session.host}`,
			createdAt: Date.now(),
			facts: {
				website: session.origin,
				host: session.host,
				url: item.url,
				kind: item.kind,
				pageTitle: item.title
			},
			draftText: parsed.draft,
			notes: parsed.notes,
			citations: session.citations
		});
		toast.success("Revised policy saved on this device.");
	}
	function savePaper(slug, title, body) {
		if (!body) return;
		saveHistory({
			id: `${slug}::${session.host}`,
			slug,
			title: `${title} — ${session.host}`,
			createdAt: Date.now(),
			facts: {
				website: session.origin,
				host: session.host
			},
			draftText: body,
			notes: "",
			citations: session.citations
		});
		toast.success("Saved on this device. Open it from History.");
	}
	function saveAllWork(quiet = false) {
		const n = saveSessionPapers();
		if (!quiet) {
			const host = useAuditStore.getState().host;
			toast.success(n ? `Saved ${n} paper${n === 1 ? "" : "s"} for ${host}. Open History.` : "Nothing to save yet — run the sequence first.");
		}
		return n;
	}
	const activePage = session.pages.find((p) => p.url === pageTab) ?? session.pages[0];
	const activeRefined = session.refined.find((r) => (r.url || r.kind) === refineTab);
	const parsedRefined = (0, import_react.useMemo)(() => activeRefined ? parseDraftOutput(activeRefined.raw) : null, [activeRefined]);
	const questions = (0, import_react.useMemo)(() => parseStoreQuestions(session.questionsPaper), [session.questionsPaper]);
	const briefQuestions = (0, import_react.useMemo)(() => parseStoreQuestions(session.briefPaper), [session.briefPaper]);
	const emails = (0, import_react.useMemo)(() => parseForwardEmails(session.emailPaper), [session.emailPaper]);
	const coldEmails = (0, import_react.useMemo)(() => parseForwardEmails(session.coldPaper), [session.coldPaper]);
	const sampleClause = (0, import_react.useMemo)(() => sampleClauseText(session.coldPaper), [session.coldPaper]);
	const callScript = (0, import_react.useMemo)(() => callScriptText(session.coldPaper), [session.coldPaper]);
	const rewriteCards = (0, import_react.useMemo)(() => {
		const live = session.pages.map((p) => ({
			...p,
			missing: false
		}));
		const missing = session.missing.filter((m) => !session.pages.some((p) => p.kind === m.kind)).map((m) => ({
			kind: m.kind,
			label: m.label,
			url: "",
			title: m.label,
			text: "",
			chars: 0,
			status: 0,
			hidden: false,
			added: false,
			missing: true
		}));
		return [...live, ...missing];
	}, [session.pages, session.missing]);
	const briefEmails = (0, import_react.useMemo)(() => parseForwardEmails(session.briefPaper), [session.briefPaper]);
	const answeredCount = questions.filter((q) => session.answers[q.id]?.trim()).length;
	const briefAnswered = briefQuestions.filter((q) => session.briefAnswers[q.id]?.trim()).length;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "border-b border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[12px] tracking-[0.2em] text-muted uppercase",
						children: "Live store · retrieve · rewrite"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1058,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StoreArchiveSelector, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1061,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1057,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-2 font-display text-4xl font-medium tracking-tight",
					children: "Audit a store’s policies"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1063,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 max-w-2xl text-[15px] leading-relaxed text-muted",
					children: "One button runs the full sequence: research the live pages, audit them against Indian law, rewrite every policy, score remaining gaps, then the client brief, legal facts, implementations, selling points, forwarding emails and cold outreach. Save all writes every paper to History. The master Word/PDF follows the same order."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1066,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					className: "mt-6 flex flex-col gap-3 sm:flex-row",
					onSubmit: (e) => {
						e.preventDefault();
						research();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1078,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: session.urlInput,
								onChange: (e) => session.setUrlInput(e.target.value),
								placeholder: "dakshis.com",
								className: "pl-10",
								autoCapitalize: "none",
								autoCorrect: "off",
								spellCheck: false
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1079,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1077,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							disabled: working,
							className: "sm:w-44",
							children: [busy === "research" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1082,
								columnNumber: 40
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScanSearch, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1082,
								columnNumber: 86
							}, this), "Research site"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1081,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							disabled: working,
							onClick: () => void runFullFlow(),
							className: "sm:w-52",
							children: [busy === "flow" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1086,
								columnNumber: 36
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1086,
								columnNumber: 82
							}, this), busy === "flow" && flowProgress ? `${flowProgress.current}/10 ${flowProgress.title}` : "Run full sequence"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1085,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1073,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[12px] text-muted",
						children: "Try"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1091,
						columnNumber: 15
					}, this), EXAMPLES.map((ex) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "rounded-full bg-surface-2 px-3 py-1 text-[12px] text-muted hover:text-ink",
						onClick: () => {
							session.setUrlInput(ex);
							research(ex);
						},
						children: ex
					}, ex, false, {
						fileName: _jsxFileName,
						lineNumber: 1092,
						columnNumber: 35
					}, this))]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1090,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 1056,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1055,
		columnNumber: 9
	}, this), !session.origin ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "font-display text-xl text-muted",
			children: "No store loaded yet. Paste a URL and tap Run full sequence, or Research site to go step by step."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 1103,
			columnNumber: 13
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1102,
		columnNumber: 28
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "muted",
						children: session.host
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1110,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-2 font-display text-2xl font-medium tracking-tight",
						children: session.homeTitle || session.host
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1111,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							session.pages.length,
							" page",
							session.pages.length === 1 ? "" : "s",
							" read",
							session.missing.length ? ` · missing ${session.missing.map((m) => m.label).join(", ")}` : ""
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1114,
						columnNumber: 17
					}, this),
					session.hints ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 max-w-2xl text-[13px] text-muted",
						children: [
							session.hints.legalName ? `${session.hints.legalName}. ` : "",
							session.hints.gstins?.[0] ? `GSTIN ${session.hints.gstins[0]}. ` : "",
							session.hints.emails?.[0] ?? "",
							session.hints.phones?.[0] ? ` · ${session.hints.phones[0]}` : ""
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1118,
						columnNumber: 34
					}, this) : null
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1109,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: showMiniAi ? "default" : "outline",
							onClick: () => setShowMiniAi(!showMiniAi),
							className: "border-primary/50 text-primary hover:bg-primary/10",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1127,
								columnNumber: 19
							}, this), showMiniAi ? "Hide Mini AI" : "Mini AI Studio"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1126,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => void runFullFlow(),
							disabled: working,
							children: [busy === "flow" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1131,
								columnNumber: 38
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1131,
								columnNumber: 84
							}, this), busy === "flow" && flowProgress ? `${flowProgress.current}/10 ${flowProgress.title}` : "Run full sequence"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1130,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => saveAllWork(),
							disabled: working || !session.origin,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1135,
								columnNumber: 19
							}, this), "Save all"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1134,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void saveMaster("docx"),
							disabled: working,
							children: [busy === "docx" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1139,
								columnNumber: 38
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1139,
								columnNumber: 84
							}, this), "Master Word"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1138,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void saveMaster("pdf"),
							disabled: working,
							children: [busy === "pdf" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1143,
								columnNumber: 37
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1143,
								columnNumber: 83
							}, this), "Master PDF"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1142,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void saveOriginal("docx"),
							disabled: working || !session.pages.length,
							children: [busy === "docx" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1147,
								columnNumber: 38
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1147,
								columnNumber: 84
							}, this), "Original policies Word"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1146,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void saveOriginal("pdf"),
							disabled: working || !session.pages.length,
							children: [busy === "orig-pdf" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1151,
								columnNumber: 42
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1151,
								columnNumber: 88
							}, this), "Original policies PDF"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1150,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => setOpen({}),
							disabled: working,
							children: "Collapse all"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1154,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => void audit(),
							disabled: working || !session.pages.length,
							children: [busy === "audit" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1158,
								columnNumber: 39
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1158,
								columnNumber: 85
							}, this), "Audit against Indian law"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1157,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => void refineAll(),
							disabled: working || !session.findings || !rewriteCards.length,
							children: [busy === "rewrite-all" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1162,
								columnNumber: 45
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1162,
								columnNumber: 91
							}, this), busy === "rewrite-all" && rewriteProgress ? `Rewriting ${rewriteProgress.current}/${rewriteProgress.total}` : `Rewrite all policies${rewriteCards.length ? ` (${rewriteCards.length})` : ""}`]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1161,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void saveRevised("docx"),
							disabled: working || !session.refined.length,
							children: [busy === "docx" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1166,
								columnNumber: 38
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1166,
								columnNumber: 84
							}, this), "Revised policies Word"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1165,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void saveRevised("pdf"),
							disabled: working || !session.refined.length,
							children: [busy === "pdf" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1170,
								columnNumber: 37
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1170,
								columnNumber: 83
							}, this), "Revised policies PDF"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1169,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void findGaps(),
							disabled: working || !session.pages.length,
							children: [busy === "gaps" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1174,
								columnNumber: 38
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListChecks, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1174,
								columnNumber: 84
							}, this), "Find remaining gaps"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1173,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void writeBrief(),
							disabled: working || !session.pages.length,
							children: [busy === "brief" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1178,
								columnNumber: 39
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Handshake, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1178,
								columnNumber: 85
							}, this), "Client brief"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1177,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void writeQuestions(),
							disabled: working || !session.pages.length,
							children: [busy === "questions" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1182,
								columnNumber: 43
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardPen, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1182,
								columnNumber: 89
							}, this), "Legal facts"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1181,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void writeImplement(),
							disabled: working || !session.pages.length,
							children: [busy === "implement" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1186,
								columnNumber: 43
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wrench, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1186,
								columnNumber: 89
							}, this), "Better implementations"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1185,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void writeSelling(),
							disabled: working || !session.pages.length,
							children: [busy === "selling" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1190,
								columnNumber: 41
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Megaphone, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1190,
								columnNumber: 87
							}, this), "Write selling points"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1189,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void writeEmail(),
							disabled: working || !session.pages.length,
							children: [busy === "email" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1194,
								columnNumber: 39
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1194,
								columnNumber: 85
							}, this), "Forwarding emails"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1193,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => void writeCold(),
							disabled: working || !session.pages.length,
							children: [busy === "cold" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1198,
								columnNumber: 38
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1198,
								columnNumber: 84
							}, this), "Cold email"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1197,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: () => saveAllWork(),
							disabled: working || !session.origin,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1202,
								columnNumber: 19
							}, this), "Save all"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1201,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1125,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1108,
				columnNumber: 13
			}, this),
			busy === "flow" && flowProgress ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 rounded-[var(--radius-md)] border border-border bg-surface-2 px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-medium",
					children: [
						"Step ",
						flowProgress.current,
						" of ",
						flowProgress.total,
						" — ",
						flowProgress.title
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1209,
					columnNumber: 17
				}, this), rewriteProgress ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-muted",
					children: [
						"Rewriting ",
						rewriteProgress.current,
						"/",
						rewriteProgress.total,
						": ",
						rewriteProgress.title
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1212,
					columnNumber: 36
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-muted",
					children: "Stay on this page. Each step uses the output of the one before."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1214,
					columnNumber: 26
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1208,
				columnNumber: 48
			}, this) : null,
			sequenceNotice ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[12px] tracking-[0.16em] text-muted uppercase",
							children: sequenceNotice.failed.length ? "Sequence finished with gaps" : "Sequence complete"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1222,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 font-display text-lg font-medium",
							children: sequenceNotice.host
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1225,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								new Date(sequenceNotice.finishedAt).toLocaleString("en-IN"),
								sequenceNotice.rewriteTotal ? ` · ${sequenceNotice.rewriteOk} of ${sequenceNotice.rewriteTotal} policies rewritten` : "",
								sequenceNotice.failed.length ? ` · still open: ${sequenceNotice.failed.join(", ")}` : " · all ten steps saved"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1228,
							columnNumber: 21
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1221,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => setSequenceNotice(null),
						children: "Dismiss"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1234,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1220,
					columnNumber: 17
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1219,
				columnNumber: 31
			}, this) : null,
			showMiniAi && /* @__PURE__ */ (void 0)("div", {
				className: "mt-6 mb-8 rounded-[var(--radius-lg)] border border-primary/30 bg-surface p-6 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between mb-4 border-b border-border/70 pb-3",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
						className: "font-display text-xl font-medium flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-5 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1244,
							columnNumber: 23
						}, this), "Mini AI Studio · Adaptive Intelligence & Modification"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1243,
						columnNumber: 21
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted mt-0.5",
						children: "Tailor any store audit paper, study intelligence, or generate cold outreach with full revised policies instead of a single clause."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1247,
						columnNumber: 21
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1242,
						columnNumber: 19
					}, this), /* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setShowMiniAi(false),
						children: "Close"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1251,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1241,
					columnNumber: 17
				}, this), /* @__PURE__ */ (void 0)(MiniAiPanel, { currentStoreHost: session.host }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1255,
					columnNumber: 17
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1240,
				columnNumber: 28
			}, this),
			session.pages.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Live pages",
				hint: `${session.pages.length} page${session.pages.length === 1 ? "" : "s"} as crawled · ${session.pages.filter((p) => p.hidden).length} hidden from homepage`,
				open: isOpen("pages"),
				onToggle: () => toggleFold("pages"),
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						className: "mb-4 flex flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-[var(--shadow-border)] sm:flex-row sm:items-end",
						onSubmit: (e) => {
							e.preventDefault();
							addLivePage();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "extra-policy",
									children: "Add a live policy URL"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1264,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "extra-policy",
									value: extraUrl,
									onChange: (e) => setExtraUrl(e.target.value),
									placeholder: "/pages/return-policy or full URL",
									className: "mt-1",
									autoCapitalize: "none",
									autoCorrect: "off",
									spellCheck: false
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1265,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1263,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "w-full sm:w-48",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Kind" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1268,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: extraKind,
									onValueChange: (v) => setExtraKind(v),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Auto" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1271,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1270,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "auto",
										children: "Auto from URL"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1274,
										columnNumber: 23
									}, this), POLICY_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: k,
										children: POLICY_LABELS[k]
									}, k, false, {
										fileName: _jsxFileName,
										lineNumber: 1275,
										columnNumber: 46
									}, this))] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1273,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1269,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1267,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								variant: extraHidden ? "default" : "outline",
								onClick: () => setExtraHidden((v) => !v),
								className: "sm:w-44",
								children: [extraHidden ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1282,
									columnNumber: 34
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1282,
									columnNumber: 66
								}, this), extraHidden ? "Hidden from home" : "Linked on home"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1281,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "submit",
								disabled: working,
								className: "sm:w-40",
								children: [busy === "fetch-page" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1286,
									columnNumber: 44
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1286,
									columnNumber: 90
								}, this), "Fetch page"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1285,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1259,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-3 text-[13px] text-muted",
						children: "Added pages are saved permanently to this store’s review in your local space and preserved even across full sequence re-runs."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1290,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
						value: pageTab || session.pages[0].url,
						onValueChange: setPageTab,
						className: "mt-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
							className: "h-auto w-full flex-wrap justify-start gap-1",
							children: session.pages.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
								value: p.url,
								className: "gap-1",
								children: [p.hidden ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1296,
									columnNumber: 35
								}, this) : null, p.title && p.title.length <= 40 ? p.title : POLICY_LABELS[p.kind] ?? p.label]
							}, p.url, true, {
								fileName: _jsxFileName,
								lineNumber: 1295,
								columnNumber: 43
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1294,
							columnNumber: 17
						}, this), session.pages.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: p.url,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
												className: "font-display text-lg font-medium",
												children: p.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1304,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
												href: p.url,
												target: "_blank",
												rel: "noreferrer",
												className: "text-[12px] break-all text-primary hover:underline",
												children: p.url
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1305,
												columnNumber: 27
											}, this),
											p.added ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-1 text-[12px] font-medium text-emerald-700",
												children: "Added by you · Saved permanently to store review"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1308,
												columnNumber: 38
											}, this) : null
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1303,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: "outline",
											children: [p.chars.toLocaleString("en-IN"), " chars"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1312,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: p.hidden ? "default" : "outline",
											size: "sm",
											onClick: () => session.togglePageHidden(p.url),
											children: [p.hidden ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1314,
												columnNumber: 39
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1314,
												columnNumber: 71
											}, this), p.hidden ? "Hidden from homepage" : "On homepage"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1313,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => void saveOriginal("docx", p.url),
											disabled: working,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1318,
												columnNumber: 27
											}, this), "Word"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1317,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => void saveOriginal("pdf", p.url),
											disabled: working,
											children: [busy === "orig-pdf" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1322,
												columnNumber: 50
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1322,
												columnNumber: 96
											}, this), "PDF"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1321,
											columnNumber: 25
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1302,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollArea, {
									className: "mt-4 max-h-72",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
										className: "font-serif text-[14px] leading-relaxed whitespace-pre-wrap text-ink",
										children: p.text
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1327,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1326,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1301,
								columnNumber: 21
							}, this)
						}, p.url, false, {
							fileName: _jsxFileName,
							lineNumber: 1300,
							columnNumber: 41
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1293,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1258,
				columnNumber: 37
			}, this) : null,
			session.pages.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionCard, {
						title: "Find remaining gaps",
						ready: Boolean(session.gapsPaper),
						readyLabel: "Ready",
						idleLabel: "After rewrites",
						body: "Scores live pages against any rewrite in this session. Severity, the Indian-law hook, and a paste-ready sentence for each hole — including banner-versus-policy contradictions.",
						busy: busy === "gaps",
						working,
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListChecks, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1338,
							columnNumber: 368
						}, this),
						cta: session.gapsPaper ? "Re-score gaps" : "Find remaining gaps",
						onClick: () => void findGaps()
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1338,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionCard, {
						title: "Client brief",
						ready: Boolean(session.briefPaper),
						readyLabel: briefAnswered ? `${briefAnswered} answered` : "Ready",
						idleLabel: "Send to the merchant",
						body: "What this client wants the work to achieve — deliverables, promises they will honour, claims they will kill, support model, what “done” looks like. Email it as Word, or fill it on the call.",
						busy: busy === "brief",
						working,
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Handshake, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1339,
							columnNumber: 431
						}, this),
						cta: session.briefPaper ? "Refresh client brief" : "Build client brief",
						onClick: () => void writeBrief()
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1339,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionCard, {
						title: "Legal facts",
						ready: Boolean(session.questionsPaper),
						readyLabel: answeredCount ? `${answeredCount} answered` : "Ready",
						idleLabel: "Officer, GST, unboxing",
						body: "The blanks a policy cannot invent — named grievance officer, who reads support@, unboxing as evidence, COD fee. Use after the client brief.",
						busy: busy === "questions",
						working,
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardPen, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1340,
							columnNumber: 390
						}, this),
						cta: session.questionsPaper ? "Refresh legal facts" : "Build legal facts",
						onClick: () => void writeQuestions()
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1340,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionCard, {
						title: "Better implementations",
						ready: Boolean(session.implementPaper),
						readyLabel: "Ready",
						idleLabel: "Shopify playbook",
						body: "Where to put the text: Settings → Policies, footer imprint, PDP Legal Metrology, DPDP notice at collection, checkout lines that match the refund page.",
						busy: busy === "implement",
						working,
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wrench, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1341,
							columnNumber: 358
						}, this),
						cta: session.implementPaper ? "Refresh playbook" : "Suggest implementations",
						onClick: () => void writeImplement()
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1341,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionCard, {
						title: "Write selling points",
						ready: Boolean(session.sellingPaper),
						readyLabel: "Ready",
						idleLabel: "From improved text",
						body: "Checkout, PDP and ad lines that match a clause they have — plus pitch lines for you: how this rewrite helps THEIR conversion, margin and COD/RTO.",
						busy: busy === "selling",
						working,
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Megaphone, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1342,
							columnNumber: 349
						}, this),
						cta: session.sellingPaper ? "Rewrite selling points" : "Write selling points",
						onClick: () => void writeSelling()
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1342,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionCard, {
						title: "Forwarding emails",
						ready: Boolean(session.emailPaper),
						readyLabel: "Ready",
						idleLabel: "Copy and send",
						body: "Three letters in your name: one to the developer, one to your advocate, one customer notice to send only after the new pages are live.",
						busy: busy === "email",
						working,
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1343,
							columnNumber: 326
						}, this),
						cta: session.emailPaper ? "Rewrite emails" : "Write forwarding emails",
						onClick: () => void writeEmail()
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1343,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionCard, {
						title: "Cold email the store",
						ready: Boolean(session.coldPaper),
						readyLabel: "Ready",
						idleLabel: "From you to them",
						body: "Day-0 email asks them to reply send for a one-page SAMPLE rewrite. Then a 21-day sequence. Layman gaps, not statute names.",
						busy: busy === "cold",
						working,
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1344,
							columnNumber: 318
						}, this),
						cta: session.coldPaper ? "Rewrite cold emails" : "Draft cold emails",
						onClick: () => void writeCold()
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1344,
						columnNumber: 17
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1337,
				columnNumber: 15
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1336,
				columnNumber: 37
			}, this) : null,
			session.pages.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Onboard timeline",
				hint: "21-day sequence, then Clock B after they reply",
				open: isOpen("timeline"),
				onToggle: () => toggleFold("timeline"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PipelineBoard, {
					host: session.host,
					origin: session.origin
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1349,
					columnNumber: 17
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1348,
				columnNumber: 37
			}, this) : null,
			briefQuestions.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Client brief",
				hint: `${briefAnswered}/${briefQuestions.length} answered`,
				open: isOpen("brief"),
				onToggle: () => toggleFold("brief"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[12px] tracking-[0.16em] text-muted uppercase",
								children: ["Client needs · ", session.host]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1356,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-1 font-display text-2xl font-medium tracking-tight",
								children: "Client brief"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1359,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 max-w-2xl text-sm text-muted",
								children: "Send this to the merchant, or fill it while you are on the call. HIGH answers drive the rewrites, selling points and the developer email — not a generic D2C checklist."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1362,
								columnNumber: 21
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1355,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: "muted",
									children: [
										briefAnswered,
										"/",
										briefQuestions.length,
										" answered"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1369,
									columnNumber: 21
								}, this),
								briefEmails[0] ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: mailtoHref(briefEmails[0].to, briefEmails[0].subject, briefEmails[0].body),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1374,
											columnNumber: 27
										}, this), "Email brief to client"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1373,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1372,
									columnNumber: 39
								}, this) : null,
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => void saveWord({
										title: `Client needs brief — ${session.host}`,
										subtitle: "For the merchant to complete",
										body: applyQuestionnaireAnswers(session.briefPaper, session.briefAnswers),
										stem: "client-brief"
									}),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1384,
										columnNumber: 23
									}, this), "Word"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1378,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => void savePdf({
										title: `Client needs brief — ${session.host}`,
										body: applyQuestionnaireAnswers(session.briefPaper, session.briefAnswers),
										stem: "client-brief"
									}),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1392,
										columnNumber: 23
									}, this), "PDF"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1387,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1368,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1354,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
						className: "mt-6 grid gap-5",
						children: briefQuestions.map((q) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "border-t border-border pt-4 first:border-t-0 first:pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-[12px] text-muted",
											children: q.id
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1400,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: q.severity === "HIGH" ? "default" : "muted",
											children: q.severity
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1401,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "font-display text-lg font-medium",
											children: q.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1404,
											columnNumber: 25
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1399,
									columnNumber: 23
								}, this),
								q.why ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[13px] leading-relaxed text-muted",
									children: q.why
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1406,
									columnNumber: 32
								}, this) : null,
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: `c-${q.id}`,
									className: "sr-only",
									children: q.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1407,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									id: `c-${q.id}`,
									className: "mt-3",
									value: session.briefAnswers[q.id] ?? "",
									onChange: (e) => session.setBriefAnswer(q.id, e.target.value),
									placeholder: q.hint || "What does this client want — in their words."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1410,
									columnNumber: 23
								}, this)
							]
						}, q.id, true, {
							fileName: _jsxFileName,
							lineNumber: 1398,
							columnNumber: 44
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1397,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1353,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1352,
				columnNumber: 38
			}, this) : null,
			questions.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Legal facts",
				hint: `${answeredCount}/${questions.length} answered`,
				open: isOpen("facts"),
				onToggle: () => toggleFold("facts"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[12px] tracking-[0.16em] text-muted uppercase",
									children: ["Legal facts · ", session.host]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1420,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "mt-1 font-display text-2xl font-medium tracking-tight",
									children: "Legal facts"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1423,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 max-w-2xl text-sm text-muted",
									children: "Blanks a policy cannot invent. Fill after the client brief."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1426,
									columnNumber: 21
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1419,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "muted",
								children: [
									answeredCount,
									"/",
									questions.length,
									" answered"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1430,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => void saveWord({
									title: `Legal facts — ${session.host}`,
									subtitle: "Blanks a policy cannot invent",
									body: applyQuestionnaireAnswers(session.questionsPaper, session.answers),
									stem: "legal-facts"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1439,
									columnNumber: 21
								}, this), "Word"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1433,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => void savePdf({
									title: `Legal facts — ${session.host}`,
									body: applyQuestionnaireAnswers(session.questionsPaper, session.answers),
									stem: "legal-facts"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1447,
									columnNumber: 21
								}, this), "PDF"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1442,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1418,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
						className: "mt-6 grid gap-5",
						children: questions.map((q) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "border-t border-border pt-4 first:border-t-0 first:pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-[12px] text-muted",
											children: q.id
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1454,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: q.severity === "HIGH" ? "default" : "muted",
											children: q.severity
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1455,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "font-display text-lg font-medium",
											children: q.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1458,
											columnNumber: 25
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1453,
									columnNumber: 23
								}, this),
								q.why ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-[13px] leading-relaxed text-muted",
									children: q.why
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1460,
									columnNumber: 32
								}, this) : null,
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: `q-${q.id}`,
									className: "sr-only",
									children: q.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1461,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									id: `q-${q.id}`,
									className: "mt-3",
									value: session.answers[q.id] ?? "",
									onChange: (e) => session.setAnswer(q.id, e.target.value),
									placeholder: q.hint || "Type the answer this store can stand behind."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1464,
									columnNumber: 23
								}, this)
							]
						}, q.id, true, {
							fileName: _jsxFileName,
							lineNumber: 1452,
							columnNumber: 39
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1451,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1417,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1416,
				columnNumber: 33
			}, this) : null,
			session.findings ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Indian-law audit",
				hint: "Gaps against CPA, DPDP and the E-Commerce Rules",
				open: isOpen("audit"),
				onToggle: () => toggleFold("audit"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
						title: `Audit — ${session.host}`,
						body: session.findings
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1472,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CitationPanel, {
								citations: session.citations,
								title: "Authorities retrieved"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1474,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								onClick: () => void saveWord({
									title: `Store policy audit — ${session.host}`,
									subtitle: "Indian-law gap analysis",
									body: session.findings,
									stem: "audit"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1481,
									columnNumber: 21
								}, this), "Word"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1475,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								onClick: () => void savePdf({
									title: `Store policy audit — ${session.host}`,
									body: session.findings,
									stem: "audit"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1489,
									columnNumber: 21
								}, this), "PDF"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1484,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1473,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1471,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1470,
				columnNumber: 33
			}, this) : null,
			session.findings ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Rewrite a policy",
				hint: session.refined.length ? `${session.refined.length} of ${rewriteCards.length} revised` : `${rewriteCards.length} pages from this store`,
				open: isOpen("rewrite"),
				onToggle: () => toggleFold("rewrite"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "max-w-2xl text-sm text-muted",
						children: "One rewrite card per live page this store actually publishes. Return stays return, refund stays refund, contact stays contact."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1498,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								onClick: () => void refineAll(),
								disabled: working || !session.findings,
								children: [busy === "rewrite-all" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1504,
									columnNumber: 47
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1504,
									columnNumber: 93
								}, this), busy === "rewrite-all" && rewriteProgress ? `Rewriting ${rewriteProgress.current} of ${rewriteProgress.total} — ${rewriteProgress.title}` : `Rewrite all ${rewriteCards.length} pages`]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1503,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								onClick: () => void saveRevised("docx"),
								disabled: working || !session.refined.length,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1508,
									columnNumber: 21
								}, this), "All revised Word"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1507,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								onClick: () => void saveRevised("pdf"),
								disabled: working || !session.refined.length,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1512,
									columnNumber: 21
								}, this), "All revised PDF"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1511,
								columnNumber: 19
							}, this),
							busy === "rewrite-all" && rewriteProgress ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[13px] text-muted",
								children: "Stays on this page. Do not refresh."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1515,
								columnNumber: 64
							}, this) : null
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1502,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-5 grid gap-3 sm:grid-cols-2",
						children: rewriteCards.map((item) => {
							const key = item.url || item.kind;
							const have = session.refined.some((r) => item.url ? r.url === item.url : r.kind === item.kind && !r.url);
							const spinning = rewriteUrl === item.url && (busy === item.kind || busy === "rewrite-all");
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "font-display text-lg font-medium",
											children: item.title || POLICY_LABELS[item.kind]
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1526,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: have ? "default" : "muted",
											children: have ? "Drafted" : item.missing ? "Missing" : item.hidden ? "Hidden live" : "Live page"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1529,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1525,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 flex-1 text-[13px] text-muted",
										children: KIND_HINTS[item.kind]
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1533,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										className: "mt-4",
										variant: have ? "outline" : "default",
										disabled: working,
										onClick: () => void refine(item),
										children: [spinning ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1537,
											columnNumber: 39
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1537,
											columnNumber: 85
										}, this), have ? "Redraft" : item.missing ? "Draft from profile" : "Revise this page"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1536,
										columnNumber: 25
									}, this)
								]
							}, key, true, {
								fileName: _jsxFileName,
								lineNumber: 1524,
								columnNumber: 24
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1519,
						columnNumber: 17
					}, this),
					session.refined.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
						value: refineTab || session.refined[0]?.url || session.refined[0]?.kind,
						onValueChange: setRefineTab,
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
							className: "h-auto flex-wrap justify-start gap-1",
							children: session.refined.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
								value: r.url || r.kind,
								children: r.title
							}, r.url || r.kind, false, {
								fileName: _jsxFileName,
								lineNumber: 1546,
								columnNumber: 49
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1545,
							columnNumber: 21
						}, this), session.refined.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: r.url || r.kind,
							children: parsedRefined && (r.url || r.kind) === (refineTab || session.refined[0]?.url || session.refined[0]?.kind) ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
									title: r.title,
									body: parsedRefined.draft
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1552,
									columnNumber: 29
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col gap-2 xl:w-52",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "outline",
											onClick: () => {
												navigator.clipboard.writeText(parsedRefined.draft);
												toast.success("Copied.");
											},
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1558,
												columnNumber: 33
											}, this), "Copy"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1554,
											columnNumber: 31
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "outline",
											onClick: () => void saveWord({
												title: r.title,
												subtitle: `${session.host} — customer-facing policy`,
												body: parsedRefined.draft,
												stem: r.kind
											}),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1567,
												columnNumber: 33
											}, this), "Word"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1561,
											columnNumber: 31
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "outline",
											onClick: () => void savePdf({
												title: r.title,
												body: parsedRefined.draft,
												stem: r.kind
											}),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1575,
												columnNumber: 33
											}, this), "PDF"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1570,
											columnNumber: 31
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "outline",
											onClick: () => saveRefined(r.url, r.kind),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1579,
												columnNumber: 33
											}, this), "Save"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1578,
											columnNumber: 31
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1553,
									columnNumber: 29
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1551,
								columnNumber: 134
							}, this) : null
						}, r.url || r.kind, false, {
							fileName: _jsxFileName,
							lineNumber: 1550,
							columnNumber: 47
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1544,
						columnNumber: 43
					}, this) : null
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1497,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1496,
				columnNumber: 33
			}, this) : null,
			session.gapsPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Gap register",
				hint: "Remaining holes after live pages and rewrites",
				open: isOpen("gaps"),
				onToggle: () => toggleFold("gaps"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
						title: `Gap register — ${session.host}`,
						body: session.gapsPaper
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1591,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaperTools, {
						title: `Gap register — ${session.host}`,
						body: session.gapsPaper,
						stem: "gaps",
						host: session.host,
						onWord: () => void saveWord({
							title: `Gap register — ${session.host}`,
							subtitle: "Remaining holes after live pages and rewrites",
							body: session.gapsPaper,
							stem: "gaps"
						}),
						onPdf: () => void savePdf({
							title: `Gap register — ${session.host}`,
							body: session.gapsPaper,
							stem: "gaps"
						}),
						onSave: () => savePaper("store-gaps", "Gap register", session.gapsPaper)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1592,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1590,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1589,
				columnNumber: 34
			}, this) : null,
			session.sellingPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Selling points",
				hint: "Store copy + your pitch to this founder",
				open: isOpen("selling"),
				onToggle: () => toggleFold("selling"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
						title: `Selling points — ${session.host}`,
						body: session.sellingPaper
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1607,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaperTools, {
						title: `Selling points — ${session.host}`,
						body: session.sellingPaper,
						stem: "selling-points",
						host: session.host,
						onWord: () => void saveWord({
							title: `Selling points — ${session.host}`,
							subtitle: "Store copy and your pitch — conversion, margin, COD",
							body: session.sellingPaper,
							stem: "selling-points"
						}),
						onPdf: () => void savePdf({
							title: `Selling points — ${session.host}`,
							body: session.sellingPaper,
							stem: "selling-points"
						}),
						onSave: () => savePaper("store-selling", "Selling points", session.sellingPaper)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1608,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1606,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1605,
				columnNumber: 37
			}, this) : null,
			session.briefPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Client brief paper",
				hint: "Full brief for Word or the merchant",
				open: isOpen("brief"),
				onToggle: () => toggleFold("brief"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
						title: `Client brief — ${session.host}`,
						body: applyQuestionnaireAnswers(session.briefPaper, session.briefAnswers)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1623,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaperTools, {
						title: `Client needs brief — ${session.host}`,
						body: applyQuestionnaireAnswers(session.briefPaper, session.briefAnswers),
						stem: "client-brief",
						host: session.host,
						onWord: () => void saveWord({
							title: `Client needs brief — ${session.host}`,
							subtitle: "What this merchant wants the work to achieve",
							body: applyQuestionnaireAnswers(session.briefPaper, session.briefAnswers),
							stem: "client-brief"
						}),
						onPdf: () => void savePdf({
							title: `Client needs brief — ${session.host}`,
							body: applyQuestionnaireAnswers(session.briefPaper, session.briefAnswers),
							stem: "client-brief"
						}),
						onSave: () => savePaper("store-brief", "Client brief", applyQuestionnaireAnswers(session.briefPaper, session.briefAnswers))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1624,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1622,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1621,
				columnNumber: 35
			}, this) : null,
			session.questionsPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Legal facts paper",
				hint: "Blanks a policy cannot invent",
				open: isOpen("facts"),
				onToggle: () => toggleFold("facts"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
						title: `Legal facts — ${session.host}`,
						body: applyQuestionnaireAnswers(session.questionsPaper, session.answers)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1639,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaperTools, {
						title: `Legal facts — ${session.host}`,
						body: applyQuestionnaireAnswers(session.questionsPaper, session.answers),
						stem: "legal-facts",
						host: session.host,
						onWord: () => void saveWord({
							title: `Legal facts — ${session.host}`,
							subtitle: "Blanks a policy cannot invent",
							body: applyQuestionnaireAnswers(session.questionsPaper, session.answers),
							stem: "legal-facts"
						}),
						onPdf: () => void savePdf({
							title: `Legal facts — ${session.host}`,
							body: applyQuestionnaireAnswers(session.questionsPaper, session.answers),
							stem: "legal-facts"
						}),
						onSave: () => savePaper("store-questions", "Legal facts", applyQuestionnaireAnswers(session.questionsPaper, session.answers))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1640,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1638,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1637,
				columnNumber: 39
			}, this) : null,
			session.implementPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Implementations",
				hint: "Where the improved text goes on the live site",
				open: isOpen("implement"),
				onToggle: () => toggleFold("implement"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
						title: `Implementations — ${session.host}`,
						body: session.implementPaper
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1655,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaperTools, {
						title: `Implementation playbook — ${session.host}`,
						body: session.implementPaper,
						stem: "implementations",
						host: session.host,
						onWord: () => void saveWord({
							title: `Implementation playbook — ${session.host}`,
							subtitle: "Where the improved text goes on the live site",
							body: session.implementPaper,
							stem: "implementations"
						}),
						onPdf: () => void savePdf({
							title: `Implementation playbook — ${session.host}`,
							body: session.implementPaper,
							stem: "implementations"
						}),
						onSave: () => savePaper("store-implement", "Implementations", session.implementPaper)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1656,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1654,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1653,
				columnNumber: 39
			}, this) : null,
			session.emailPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Forwarding emails",
				hint: "Developer, advocate, customer notice",
				open: isOpen("emails"),
				onToggle: () => toggleFold("emails"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
						title: `Forwarding emails — ${session.host}`,
						body: session.emailPaper
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1671,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-2 xl:w-52",
						children: [emails.slice(0, 3).map((em) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: mailtoHref(em.to, em.subject, em.body),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1675,
									columnNumber: 25
								}, this), /developer/i.test(em.heading) ? "Open developer mail" : /advocate|ca/i.test(em.heading) ? "Open advocate mail" : "Open customer notice"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1674,
								columnNumber: 23
							}, this)
						}, em.heading, false, {
							fileName: _jsxFileName,
							lineNumber: 1673,
							columnNumber: 49
						}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaperTools, {
							title: `Forwarding emails — ${session.host}`,
							body: session.emailPaper,
							stem: "emails",
							host: session.host,
							stacked: false,
							onWord: () => void saveWord({
								title: `Forwarding emails — ${session.host}`,
								subtitle: "Copy into Gmail, Outlook or WhatsApp",
								body: session.emailPaper,
								stem: "emails"
							}),
							onPdf: () => void savePdf({
								title: `Forwarding emails — ${session.host}`,
								body: session.emailPaper,
								stem: "emails"
							}),
							onSave: () => savePaper("store-email", "Forwarding emails", session.emailPaper)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1679,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1672,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1670,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1669,
				columnNumber: 35
			}, this) : null,
			session.coldPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Cold email",
				hint: "Day 0 → day 21 · sample first",
				open: isOpen("cold"),
				onToggle: () => toggleFold("cold"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4",
					children: [
						sampleClause ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[12px] tracking-[0.16em] text-muted uppercase",
									children: "Gift · send only after they reply send"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1696,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-1 font-display text-xl font-medium",
									children: "Sample clause — not for publication"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1699,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
									className: "mt-3 font-serif text-[14px] leading-relaxed whitespace-pre-wrap",
									children: sampleClause
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1702,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										onClick: () => {
											navigator.clipboard.writeText(sampleClause);
											toast.success("Sample copied.");
										},
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1710,
											columnNumber: 25
										}, this), "Copy sample"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1706,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										onClick: () => void saveWord({
											title: `SAMPLE — ${session.host}`,
											subtitle: "Not for publication",
											body: sampleClause,
											stem: "sample-clause"
										}),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1719,
											columnNumber: 25
										}, this), "Sample Word"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1713,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1705,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1695,
							columnNumber: 33
						}, this) : null,
						callScript ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[12px] tracking-[0.16em] text-muted uppercase",
									children: "After they have the sample"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1725,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-1 font-display text-xl font-medium",
									children: "Call script"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1728,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
									className: "mt-3 font-serif text-[14px] leading-relaxed whitespace-pre-wrap",
									children: callScript
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1729,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									className: "mt-3",
									variant: "outline",
									onClick: () => {
										navigator.clipboard.writeText(callScript);
										toast.success("Script copied.");
									},
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1736,
										columnNumber: 23
									}, this), "Copy script"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1732,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1724,
							columnNumber: 31
						}, this) : null,
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 lg:grid-cols-2",
							children: coldEmails.map((em) => {
								const touch = emailTouchId(em.heading);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
									className: "flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[12px] text-muted",
											children: em.heading
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1744,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "mt-1 font-display text-lg font-medium leading-snug",
											children: em.subject && em.subject !== "—" ? em.subject : em.heading
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1745,
											columnNumber: 25
										}, this),
										em.to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-1 text-[13px] text-muted",
											children: ["To: ", em.to]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1748,
											columnNumber: 34
										}, this) : null,
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
											className: "mt-3 flex-1 font-serif text-[14px] leading-relaxed whitespace-pre-wrap",
											children: em.body
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1749,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-4 flex flex-wrap gap-2",
											children: [
												/whatsapp|dm/i.test(em.heading) ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													variant: "outline",
													size: "sm",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
														href: `https://wa.me/?text=${encodeURIComponent(em.body)}`,
														target: "_blank",
														rel: "noreferrer",
														children: "Open WhatsApp"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1754,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1753,
													columnNumber: 62
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													variant: "outline",
													size: "sm",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
														href: mailtoHref(em.to, em.subject, em.body),
														children: emailCta(em.heading)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1758,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1757,
													columnNumber: 41
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													variant: "outline",
													size: "sm",
													onClick: () => {
														navigator.clipboard.writeText(em.subject && em.subject !== "—" ? `Subject: ${em.subject}\n\n${em.body}` : em.body);
														toast.success("Copied.");
													},
													children: "Copy"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1762,
													columnNumber: 27
												}, this),
												touch ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													variant: "outline",
													size: "sm",
													onClick: () => {
														markSent(session.host, touch);
														toast.success(`Marked ${touch.toUpperCase()} sent.`);
													},
													children: "Mark sent"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1768,
													columnNumber: 36
												}, this) : null
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1752,
											columnNumber: 25
										}, this)
									]
								}, em.heading, true, {
									fileName: _jsxFileName,
									lineNumber: 1743,
									columnNumber: 24
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1740,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaperTools, {
							title: `Cold outreach — ${session.host}`,
							body: session.coldPaper,
							stem: "cold-email",
							host: session.host,
							stacked: false,
							onWord: () => void saveWord({
								title: `Cold outreach — ${session.host}`,
								subtitle: "21-day sequence · sample first",
								body: session.coldPaper,
								stem: "cold-email"
							}),
							onPdf: () => void savePdf({
								title: `Cold outreach — ${session.host}`,
								body: session.coldPaper,
								stem: "cold-email"
							}),
							onSave: () => savePaper("store-cold", "Cold email", session.coldPaper)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1778,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1694,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1693,
				columnNumber: 34
			}, this) : null,
			session.pages.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Fold, {
				title: "Service agreement",
				hint: session.agreementPaper ? "Draft ready · fee and SLA" : "Set fee and SLA, then draft",
				open: isOpen("agreement"),
				onToggle: () => toggleFold("agreement"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[12px] tracking-[0.16em] text-muted uppercase",
								children: "Your terms · this engagement"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1794,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-1 font-display text-2xl font-medium",
								children: "Fee, advance and service levels"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1797,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 max-w-2xl text-sm text-muted",
								children: [
									"These numbers go into the service agreement with ",
									session.host,
									". Blanks become [TO BE COMPLETED]. Saved on this device."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1800,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TermField, {
										id: "fee",
										label: "Fixed fee (INR)",
										value: sender.fee,
										onChange: (v) => sender.setField("fee", v),
										placeholder: "25000"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1805,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TermField, {
										id: "advance",
										label: "Advance %",
										value: sender.advancePct,
										onChange: (v) => sender.setField("advancePct", v),
										placeholder: "50"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1806,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TermField, {
										id: "draft-days",
										label: "Draft working days",
										value: sender.draftDays,
										onChange: (v) => sender.setField("draftDays", v),
										placeholder: "7"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1807,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TermField, {
										id: "revisions",
										label: "Included revisions",
										value: sender.revisions,
										onChange: (v) => sender.setField("revisions", v),
										placeholder: "1"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1808,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TermField, {
										id: "response",
										label: "Reply hours (IST)",
										value: sender.responseHours,
										onChange: (v) => sender.setField("responseHours", v),
										placeholder: "24"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1809,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TermField, {
										id: "pan",
										label: "Your PAN",
										value: sender.pan,
										onChange: (v) => sender.setField("pan", v),
										placeholder: "ABCDE1234F"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1810,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TermField, {
										id: "gstin",
										label: "Your GSTIN",
										value: sender.gstin,
										onChange: (v) => sender.setField("gstin", v),
										placeholder: "If registered"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1811,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TermField, {
										id: "city-forum",
										label: "City / courts",
										value: sender.city,
										onChange: (v) => sender.setField("city", v),
										placeholder: "Hisar"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1812,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1804,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TermField, {
									id: "address",
									label: "Your address",
									value: sender.address,
									onChange: (v) => sender.setField("address", v),
									placeholder: "For the signature block"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1815,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1814,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								className: "mt-4",
								onClick: () => void writeAgreement(),
								disabled: working,
								children: [busy === "agreement" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1818,
									columnNumber: 45
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollText, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1818,
									columnNumber: 91
								}, this), session.agreementPaper ? "Rewrite service agreement" : "Draft service agreement"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1817,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1793,
						columnNumber: 17
					}, this), session.agreementPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DraftPaper, {
							title: `Service agreement — ${session.host}`,
							body: session.agreementPaper
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1823,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaperTools, {
							title: `Service agreement — ${session.host}`,
							body: session.agreementPaper,
							stem: "service-agreement",
							host: session.host,
							onWord: () => void saveWord({
								title: `Service agreement — ${session.host}`,
								subtitle: "Drafter and store · service levels attached",
								body: session.agreementPaper,
								stem: "service-agreement"
							}),
							onPdf: () => void savePdf({
								title: `Service agreement — ${session.host}`,
								body: session.agreementPaper,
								stem: "service-agreement"
							}),
							onSave: () => savePaper("store-agreement", "Service agreement", session.agreementPaper)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1824,
							columnNumber: 21
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1822,
						columnNumber: 43
					}, this) : null]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1792,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1791,
				columnNumber: 37
			}, this) : null,
			activePage && !session.findings && !session.gapsPaper && !session.questionsPaper && !session.briefPaper ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Next: build the client brief and email it to the merchant. Then legal facts, audit, and Word downloads."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1838,
				columnNumber: 120
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1107,
		columnNumber: 24
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1054,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1053,
		columnNumber: 10
	}, this);
}
function ActionCard({ title, ready, readyLabel, idleLabel, body, busy, working, icon, cta, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-display text-lg font-medium",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1871,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: ready ? "default" : "muted",
					children: ready ? readyLabel : idleLabel
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1872,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1870,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 flex-1 text-[13px] text-muted",
				children: body
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1874,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				className: "mt-4",
				variant: ready ? "outline" : "default",
				disabled: working,
				onClick,
				children: [busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1876,
					columnNumber: 17
				}, this) : icon, cta]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1875,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1869,
		columnNumber: 10
	}, this);
}
function PaperTools({ body, onSave, onWord, onPdf, stacked = true }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: stacked ? "flex flex-col gap-2 xl:w-52" : "flex flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				onClick: () => {
					navigator.clipboard.writeText(body);
					toast.success("Copied.");
				},
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1902,
					columnNumber: 9
				}, this), "Copy"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1898,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				onClick: onWord,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1906,
					columnNumber: 9
				}, this), "Word"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1905,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				onClick: onPdf,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1910,
					columnNumber: 9
				}, this), "PDF"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1909,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				onClick: onSave,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1914,
					columnNumber: 9
				}, this), "Save"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1913,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1897,
		columnNumber: 10
	}, this);
}
function TermField({ id, label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			htmlFor: id,
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 1933,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
			id,
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 1934,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1932,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuditPage as component };
