import { o as __toESM } from "../_runtime.mjs";
import { c as string, n as array, o as object, r as boolean, t as _enum } from "../_libs/zod.mjs";
import { i as aiKeysSchema } from "./providers-B7LlmDHe.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as persist, r as create } from "../_libs/zustand.mjs";
import { i as cn, r as aiKeysPayload } from "./badge-BGa2cXzN.mjs";
import { E as LoaderCircle, H as Check, R as Copy, T as Mail, U as Brain, c as Sparkles, d as ShieldCheck, g as Save, l as SlidersVertical } from "../_libs/lucide-react.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { n as useStoreArchive, t as useAuditStore } from "./audit-store-DeG2ETsA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-audit-CVIq-TTb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var CLOCK_A = [
	{
		id: "e1",
		day: 0,
		label: "Email 1 — one-pager",
		clock: "A",
		hint: "Observation + layman so-what. Ask them to reply send."
	},
	{
		id: "e2",
		day: 3,
		label: "Email 2 — bump",
		clock: "A",
		hint: "Same thread. One new line. Same ask."
	},
	{
		id: "e3",
		day: 7,
		label: "Email 3 — second gap",
		clock: "A",
		hint: "A different live-page mismatch. Still not a meeting."
	},
	{
		id: "e4",
		day: 14,
		label: "Email 4 — pack and fee",
		clock: "A",
		hint: "Page list + fee. Reply pack."
	},
	{
		id: "e5",
		day: 21,
		label: "Break-up",
		clock: "A",
		hint: "They keep the sample sentence. Park for 60 days."
	}
];
var CLOCK_B = [
	{
		id: "sample",
		day: 0,
		label: "Sample in their inbox",
		clock: "B",
		hint: "Same working day they said send. Watermark SAMPLE."
	},
	{
		id: "call",
		day: 3,
		label: "Call or WhatsApp yes",
		clock: "B",
		hint: "15 minutes. Two time options. Agenda: live page vs sample vs fee."
	},
	{
		id: "scope",
		day: 5,
		label: "Fee and page list agreed",
		clock: "B",
		hint: "One number. WhatsApp is enough. Then send the service agreement."
	},
	{
		id: "questions",
		day: 10,
		label: "Questionnaire back",
		clock: "B",
		hint: "Clock for the full pack starts the next working day."
	},
	{
		id: "draft",
		day: 17,
		label: "First pack delivered",
		clock: "B",
		hint: "Do not start the full pack before fee + answers."
	}
];
var emptyFlags = {
	sampleSent: false,
	replied: false,
	feeAgreed: false,
	questionsIn: false,
	agreementSent: false
};
function blank(host, origin) {
	return {
		host,
		origin,
		startedAt: null,
		repliedAt: null,
		parkedAt: null,
		sent: {},
		flags: { ...emptyFlags },
		notes: ""
	};
}
var usePipelineStore = create()(persist((set, get) => ({
	stores: {},
	ensure: (host, origin) => {
		if (!host) return;
		if (get().stores[host]) return;
		set((s) => ({ stores: {
			...s.stores,
			[host]: blank(host, origin)
		} }));
	},
	startSequence: (host, origin) => {
		if (!host) return;
		set((s) => {
			const prev = s.stores[host] ?? blank(host, origin);
			return { stores: {
				...s.stores,
				[host]: {
					...prev,
					origin: origin || prev.origin,
					startedAt: prev.startedAt ?? Date.now(),
					parkedAt: null
				}
			} };
		});
	},
	markSent: (host, touchId) => {
		set((s) => {
			const prev = s.stores[host];
			if (!prev) return s;
			return { stores: {
				...s.stores,
				[host]: {
					...prev,
					startedAt: prev.startedAt ?? Date.now(),
					sent: {
						...prev.sent,
						[touchId]: Date.now()
					},
					flags: {
						...prev.flags,
						sampleSent: touchId === "sample" ? true : prev.flags.sampleSent
					}
				}
			} };
		});
	},
	unmarkSent: (host, touchId) => {
		set((s) => {
			const prev = s.stores[host];
			if (!prev) return s;
			const sent = { ...prev.sent };
			delete sent[touchId];
			return { stores: {
				...s.stores,
				[host]: {
					...prev,
					sent
				}
			} };
		});
	},
	setFlag: (host, key, value) => {
		set((s) => {
			const prev = s.stores[host];
			if (!prev) return s;
			const flags = {
				...prev.flags,
				[key]: value
			};
			return { stores: {
				...s.stores,
				[host]: {
					...prev,
					flags,
					repliedAt: key === "replied" && value ? prev.repliedAt ?? Date.now() : key === "replied" && !value ? null : prev.repliedAt,
					startedAt: prev.startedAt ?? Date.now()
				}
			} };
		});
	},
	setNotes: (host, notes) => {
		set((s) => {
			const prev = s.stores[host];
			if (!prev) return s;
			return { stores: {
				...s.stores,
				[host]: {
					...prev,
					notes
				}
			} };
		});
	},
	park: (host) => {
		set((s) => {
			const prev = s.stores[host];
			if (!prev) return s;
			return { stores: {
				...s.stores,
				[host]: {
					...prev,
					parkedAt: Date.now()
				}
			} };
		});
	},
	unpark: (host) => {
		set((s) => {
			const prev = s.stores[host];
			if (!prev) return s;
			return { stores: {
				...s.stores,
				[host]: {
					...prev,
					parkedAt: null
				}
			} };
		});
	},
	resetHost: (host) => {
		set((s) => {
			const prev = s.stores[host];
			if (!prev) return s;
			return { stores: {
				...s.stores,
				[host]: blank(host, prev.origin)
			} };
		});
	}
}), { name: "nyayadraft-pipeline" }));
function pipelineStage(p) {
	if (!p || !p.startedAt) return "not_started";
	if (p.parkedAt) return "parked";
	if (p.flags.feeAgreed && p.flags.questionsIn) return "onboarded";
	if (p.flags.feeAgreed) return "scoped";
	if (p.flags.replied) return "talking";
	return "sequence";
}
function daysSince(ts) {
	if (!ts) return 0;
	return Math.floor((Date.now() - ts) / 864e5);
}
function nextClockA(p) {
	if (!p || p.parkedAt || !p.startedAt || p.flags.replied) return null;
	const elapsed = daysSince(p.startedAt);
	return CLOCK_A.find((t) => !p.sent[t.id] && elapsed >= t.day) ?? null;
}
function nextClockB(p) {
	if (!p || p.parkedAt || !p.repliedAt) return null;
	if (p.flags.feeAgreed && p.flags.questionsIn && p.sent.draft) return null;
	const elapsed = daysSince(p.repliedAt);
	return CLOCK_B.find((t) => !p.sent[t.id] && elapsed >= t.day) ?? null;
}
function emailTouchId(heading) {
	const h = heading.toLowerCase();
	if (/break/.test(h) || /day 21/.test(h)) return "e5";
	if (/pack|fee|day 14/.test(h)) return "e4";
	if (/whatsapp|dm/.test(h)) return "wa";
	if (/second gap|day 7/.test(h)) return "e3";
	if (/bump|day 3/.test(h)) return "e2";
	if (/one-pager|day 0|short pitch|email 1/.test(h)) return "e1";
	return null;
}
var STAGE_LABEL = {
	not_started: "Not started",
	sequence: "In the 21-day sequence",
	talking: "They replied — Clock B",
	scoped: "Fee agreed — waiting on facts",
	onboarded: "Onboarded",
	parked: "Parked (60 days)"
};
var miniAiInput = object({
	host: string().min(2).max(200),
	origin: string().min(4).max(300),
	homeTitle: string().max(300).optional(),
	action: _enum([
		"cold_mail_full_policy",
		"study_and_analyze",
		"modify_paper",
		"custom_instruction"
	]),
	selectedPolicyKind: string().max(80).optional(),
	selectedPolicyTitle: string().max(200).optional(),
	targetField: _enum([
		"coldPaper",
		"findings",
		"refined",
		"gapsPaper",
		"briefPaper",
		"implementPaper",
		"agreementPaper",
		"questionsPaper",
		"emailPaper"
	]).default("coldPaper"),
	userPrompt: string().max(4e3).optional(),
	sender: object({
		name: string().max(100).optional(),
		city: string().max(100).optional(),
		email: string().max(150).optional(),
		phone: string().max(50).optional(),
		offer: string().max(400).optional(),
		proof: string().max(300).optional(),
		fee: string().max(60).optional(),
		advancePct: string().max(10).optional()
	}).optional(),
	pages: array(object({
		kind: string(),
		label: string(),
		url: string(),
		title: string(),
		text: string().max(9e3),
		hidden: boolean().optional(),
		added: boolean().optional()
	})).max(20).optional(),
	refined: array(object({
		kind: string(),
		url: string().optional(),
		slug: string().optional(),
		title: string(),
		raw: string().max(14e3)
	})).max(16).optional(),
	currentContent: string().max(16e3).optional(),
	findings: string().max(8e3).optional(),
	gapsPaper: string().max(8e3).optional(),
	briefPaper: string().max(8e3).optional(),
	aiKeys: aiKeysSchema.optional()
});
var miniAiAnalyzeAndModifyFn = createServerFn({ method: "POST" }).validator((input) => miniAiInput.parse(input)).handler(createSsrRpc("44c2c554a644f4f665be8b63a0bdad8e8a18c78c59d76a24b74cd490f0a534af"));
var empty = {
	name: "x",
	city: "",
	email: "",
	phone: "",
	offer: "",
	proof: "",
	address: "",
	pan: "",
	gstin: "",
	fee: "",
	advancePct: "50",
	draftDays: "7",
	revisions: "1",
	responseHours: "24"
};
var useSenderStore = create()(persist((set) => ({
	...empty,
	setField: (key, value) => set({ [key]: value })
}), { name: "nyayadraft-sender" }));
function senderPayload(s) {
	return {
		name: (s.name.trim() || "x").slice(0, 80),
		city: s.city.trim().slice(0, 80) || void 0,
		email: s.email.trim().slice(0, 120) || void 0,
		phone: s.phone.trim().slice(0, 40) || void 0,
		offer: s.offer.trim().slice(0, 400) || void 0,
		proof: s.proof.trim().slice(0, 280) || void 0,
		address: s.address.trim().slice(0, 240) || void 0,
		pan: s.pan.trim().slice(0, 20) || void 0,
		gstin: s.gstin.trim().slice(0, 20) || void 0,
		fee: s.fee.trim().slice(0, 40) || void 0,
		advancePct: s.advancePct.trim().slice(0, 8) || void 0,
		draftDays: s.draftDays.trim().slice(0, 8) || void 0,
		revisions: s.revisions.trim().slice(0, 8) || void 0,
		responseHours: s.responseHours.trim().slice(0, 8) || void 0
	};
}
var _jsxFileName = "/app/applet/src/components/mini-ai-panel.tsx";
function MiniAiPanel({ currentStoreHost, onApplied, className }) {
	const auditStore = useAuditStore();
	const archive = useStoreArchive();
	const sender = useSenderStore();
	const host = currentStoreHost || auditStore.host || archive.activeHost || "";
	const [activeTab, setActiveTab] = (0, import_react.useState)("cold_policy");
	const [selectedPolicyKind, setSelectedPolicyKind] = (0, import_react.useState)("refund");
	const [customPrompt, setCustomPrompt] = (0, import_react.useState)("");
	const [targetField, setTargetField] = (0, import_react.useState)("coldPaper");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [generatedContent, setGeneratedContent] = (0, import_react.useState)(null);
	const [analysisNotes, setAnalysisNotes] = (0, import_react.useState)(null);
	const [lastAction, setLastAction] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const availablePolicies = auditStore.refined.length ? auditStore.refined : archive.cache.get(host)?.refined || [];
	const storeOrigin = auditStore.origin || archive.cache.get(host)?.origin || (host ? `https://${host}` : "");
	const storeTitle = auditStore.homeTitle || archive.cache.get(host)?.homeTitle || host;
	const handleRunColdPolicy = async () => {
		if (!host) {
			toast.error("Please audit or select a store first");
			return;
		}
		setLoading(true);
		setGeneratedContent(null);
		setAnalysisNotes(null);
		try {
			const chosenPolicy = availablePolicies.find((p) => p.kind === selectedPolicyKind || p.slug.includes(selectedPolicyKind));
			const res = await miniAiAnalyzeAndModifyFn({ data: {
				host,
				origin: storeOrigin,
				homeTitle: storeTitle,
				action: "cold_mail_full_policy",
				selectedPolicyKind,
				selectedPolicyTitle: chosenPolicy?.title || `Revised ${selectedPolicyKind} Policy`,
				targetField: "coldPaper",
				userPrompt: customPrompt.trim() || void 0,
				sender: {
					name: sender.name,
					city: sender.city,
					email: sender.email,
					phone: sender.phone,
					fee: sender.fee,
					advancePct: sender.advancePct
				},
				pages: auditStore.pages.map((p) => ({
					kind: p.kind,
					label: p.label,
					url: p.url,
					title: p.title,
					text: p.text.slice(0, 4e3),
					hidden: p.hidden,
					added: p.added
				})),
				refined: availablePolicies.map((r) => ({
					kind: r.kind,
					url: r.url,
					slug: r.slug,
					title: r.title,
					raw: r.raw.slice(0, 9e3)
				})),
				findings: auditStore.findings || archive.cache.get(host)?.findings || "",
				gapsPaper: auditStore.gapsPaper || archive.cache.get(host)?.gapsPaper || "",
				currentContent: auditStore.coldPaper || archive.cache.get(host)?.coldPaper || "",
				aiKeys: aiKeysPayload()
			} });
			if (!res.ok) {
				toast.error(res.error || "Failed to generate outreach sequence");
				return;
			}
			setGeneratedContent(res.modifiedContent);
			setAnalysisNotes(`Generated cold email sequence featuring complete ${res.policyTitle || selectedPolicyKind} policy instead of a single clause.`);
			setLastAction("cold_mail_full_policy");
			toast.success("Mini AI drafted outreach sequence featuring full revised policy!");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Mini AI request failed");
		} finally {
			setLoading(false);
		}
	};
	const handleRunStudy = async () => {
		if (!host) {
			toast.error("Please audit or select a store first");
			return;
		}
		setLoading(true);
		setGeneratedContent(null);
		setAnalysisNotes(null);
		try {
			const res = await miniAiAnalyzeAndModifyFn({ data: {
				host,
				origin: storeOrigin,
				homeTitle: storeTitle,
				action: "study_and_analyze",
				userPrompt: customPrompt.trim() || void 0,
				pages: auditStore.pages.map((p) => ({
					kind: p.kind,
					label: p.label,
					url: p.url,
					title: p.title,
					text: p.text.slice(0, 4e3),
					hidden: p.hidden,
					added: p.added
				})),
				refined: availablePolicies.map((r) => ({
					kind: r.kind,
					url: r.url,
					slug: r.slug,
					title: r.title,
					raw: r.raw.slice(0, 9e3)
				})),
				findings: auditStore.findings || archive.cache.get(host)?.findings || "",
				gapsPaper: auditStore.gapsPaper || archive.cache.get(host)?.gapsPaper || "",
				aiKeys: aiKeysPayload()
			} });
			if (!res.ok) {
				toast.error(res.error || "Failed to analyze store");
				return;
			}
			setGeneratedContent(res.analysis);
			setAnalysisNotes("Store analysis complete.");
			setLastAction("study_and_analyze");
			toast.success("Strategic store analysis complete!");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Study request failed");
		} finally {
			setLoading(false);
		}
	};
	const handleRunCustomModify = async () => {
		if (!host) {
			toast.error("Please audit or select a store first");
			return;
		}
		if (!customPrompt.trim()) {
			toast.error("Please enter instructions on how you want to modify this paper");
			return;
		}
		setLoading(true);
		setGeneratedContent(null);
		setAnalysisNotes(null);
		try {
			let currentContent = "";
			if (targetField === "coldPaper") currentContent = auditStore.coldPaper || archive.cache.get(host)?.coldPaper || "";
			else if (targetField === "findings") currentContent = auditStore.findings || archive.cache.get(host)?.findings || "";
			else if (targetField === "gapsPaper") currentContent = auditStore.gapsPaper || archive.cache.get(host)?.gapsPaper || "";
			else if (targetField === "briefPaper") currentContent = auditStore.briefPaper || archive.cache.get(host)?.briefPaper || "";
			else if (targetField === "implementPaper") currentContent = auditStore.implementPaper || archive.cache.get(host)?.implementPaper || "";
			else if (targetField === "agreementPaper") currentContent = auditStore.agreementPaper || archive.cache.get(host)?.agreementPaper || "";
			const res = await miniAiAnalyzeAndModifyFn({ data: {
				host,
				origin: storeOrigin,
				homeTitle: storeTitle,
				action: "modify_paper",
				targetField,
				userPrompt: customPrompt.trim(),
				currentContent,
				sender: {
					name: sender.name,
					city: sender.city,
					email: sender.email,
					phone: sender.phone,
					fee: sender.fee,
					advancePct: sender.advancePct
				},
				pages: auditStore.pages.map((p) => ({
					kind: p.kind,
					label: p.label,
					url: p.url,
					title: p.title,
					text: p.text.slice(0, 3e3),
					hidden: p.hidden,
					added: p.added
				})),
				refined: availablePolicies.map((r) => ({
					kind: r.kind,
					url: r.url,
					slug: r.slug,
					title: r.title,
					raw: r.raw.slice(0, 5e3)
				})),
				findings: auditStore.findings || archive.cache.get(host)?.findings || "",
				aiKeys: aiKeysPayload()
			} });
			if (!res.ok) {
				toast.error(res.error || "Failed to modify paper");
				return;
			}
			setGeneratedContent(res.modifiedContent);
			setAnalysisNotes(`Modified ${targetField} per instructions.`);
			setLastAction("modify_paper");
			toast.success(`Successfully customized ${targetField}!`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Modification failed");
		} finally {
			setLoading(false);
		}
	};
	const handleApplyToStore = async () => {
		if (!generatedContent || !host) return;
		try {
			if (lastAction === "cold_mail_full_policy" || targetField === "coldPaper") auditStore.setColdPaper(generatedContent, []);
			else if (targetField === "findings") auditStore.setFindings(generatedContent, []);
			else if (targetField === "gapsPaper") auditStore.setGapsPaper(generatedContent, []);
			else if (targetField === "briefPaper") auditStore.setBriefPaper(generatedContent, []);
			else if (targetField === "implementPaper") auditStore.setImplementPaper(generatedContent, []);
			else if (targetField === "agreementPaper") auditStore.setAgreementPaper(generatedContent, []);
			await auditStore.persistToArchive();
			toast.success("Applied and permanently saved to this store review!");
			if (onApplied) onApplied();
		} catch {
			toast.error("Failed to save changes permanently");
		}
	};
	const handleCopy = () => {
		if (!generatedContent) return;
		navigator.clipboard.writeText(generatedContent);
		setCopied(true);
		toast.success("Copied content to clipboard");
		setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("rounded-[var(--radius-md)] border border-primary/20 bg-surface/90 shadow-sm backdrop-blur-sm", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-4 py-3 bg-primary/5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-fg shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 324,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 323,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-sm font-semibold tracking-tight text-ink",
							children: "Mini AI Studio"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 328,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-[var(--radius-sm)] bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary",
							children: "Adaptive Drafter"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 331,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 327,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-muted",
						children: "Studies, analyzes, & modifies store data to your exact specifications"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 335,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 326,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 322,
					columnNumber: 9
				}, this), host ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-border bg-surface-2/60 px-2 py-1 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 343,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-[11px] text-ink",
						children: host
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 344,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 342,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs text-muted italic",
					children: "No store active"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 347,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 321,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex border-b border-border/60 bg-surface-2/30 px-3 pt-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("cold_policy"),
						className: cn("flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors", activeTab === "cold_policy" ? "border-primary text-primary" : "border-transparent text-muted hover:text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 363,
							columnNumber: 11
						}, this), "Full Policy in Cold Mail"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 353,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("study"),
						className: cn("flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors", activeTab === "study" ? "border-primary text-primary" : "border-transparent text-muted hover:text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Brain, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 376,
							columnNumber: 11
						}, this), "Strategic Store Study"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 366,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("custom_modify"),
						className: cn("flex items-center gap-1.5 border-b-2 px-3 py-2 font-medium transition-colors", activeTab === "custom_modify" ? "border-primary text-primary" : "border-transparent text-muted hover:text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersVertical, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 389,
							columnNumber: 11
						}, this), "Modify Any Paper"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 379,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 352,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 space-y-4",
				children: [
					activeTab === "cold_policy" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-[var(--radius-sm)] bg-surface-2/50 border border-border/60 p-3 text-xs text-muted leading-relaxed",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "font-semibold text-ink",
										children: "Feature Complete Policy Teaser: "
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 399,
										columnNumber: 15
									}, this),
									"Ordinarily, the cold outreach sequence sends just 1 sample clause. Use this to restructure the cold mail sequence to present an",
									" ",
									/* @__PURE__ */ (void 0)("strong", {
										className: "text-ink",
										children: "entire revised policy"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 402,
										columnNumber: 15
									}, this),
									" (e.g. Full Revised Refund Policy or Full Terms of Service) as a high-value teaser pack to compel the founder to respond."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 398,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-medium text-ink mb-1",
										children: "Select Revised Policy to Feature:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 409,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("select", {
										value: selectedPolicyKind,
										onChange: (e) => setSelectedPolicyKind(e.target.value),
										className: "w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-primary focus:outline-none",
										children: [
											/* @__PURE__ */ (void 0)("option", {
												value: "refund",
												children: "Revised Refund & Cancellation Policy"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 417,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "terms",
												children: "Revised Terms of Service"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 418,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "privacy",
												children: "Revised Privacy & Consent Policy"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 419,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "shipping",
												children: "Revised Shipping & Delivery Policy"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 420,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "other",
												children: "General E-Commerce Compliance Pack"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 421,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 412,
										columnNumber: 17
									}, this),
									availablePolicies.length > 0 && /* @__PURE__ */ (void 0)("p", {
										className: "text-[11px] text-emerald-600 mt-1 flex items-center gap-1",
										children: [
											/* @__PURE__ */ (void 0)(ShieldCheck, { className: "h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 425,
												columnNumber: 21
											}, this),
											availablePolicies.length,
											" refined policies available in store review"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 424,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 408,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-medium text-ink mb-1",
									children: "Optional Angle / Custom Instruction:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 432,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: customPrompt,
									onChange: (e) => setCustomPrompt(e.target.value),
									placeholder: "e.g. Focus on COD dispute prevention and 48-hr unboxing rule...",
									className: "w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 435,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 431,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 407,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between pt-1",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] text-muted",
									children: "Pitches the complete policy in Email 1, Email 3, WhatsApp DM, and Call Script."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 446,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									disabled: loading || !host,
									onClick: handleRunColdPolicy,
									className: "flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg hover:opacity-90 disabled:opacity-50 transition-opacity",
									children: loading ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 457,
										columnNumber: 21
									}, this), "Synthesizing Sequence..."] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 456,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 462,
										columnNumber: 21
									}, this), "Generate Outreach with Full Policy"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 461,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 449,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 445,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 397,
						columnNumber: 11
					}, this),
					activeTab === "study" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-[var(--radius-sm)] bg-surface-2/50 border border-border/60 p-3 text-xs text-muted leading-relaxed",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-ink",
									children: "Deep Store Intelligence: "
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 475,
									columnNumber: 15
								}, this), "Studies all live pages, policy gaps, and legal metrology disclosures to identify critical statutory vulnerabilities (CPA 2019, E-Commerce Rules 2020, DPDP Act 2023) and commercial leverage angles to present to the store founder."]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 474,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-medium text-ink mb-1",
								children: "Specific Area of Investigation (Optional):"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 482,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								value: customPrompt,
								onChange: (e) => setCustomPrompt(e.target.value),
								placeholder: "e.g. Analyze return and refund bottlenecks, COD risks, or DPDPA compliance...",
								className: "w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 485,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 481,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex justify-end pt-1",
								children: /* @__PURE__ */ (void 0)("button", {
									type: "button",
									disabled: loading || !host,
									onClick: handleRunStudy,
									className: "flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg hover:opacity-90 disabled:opacity-50 transition-opacity",
									children: loading ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 503,
										columnNumber: 21
									}, this), "Studying Store Data..."] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 502,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Brain, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 508,
										columnNumber: 21
									}, this), "Run Strategic Study"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 507,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 495,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 494,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 473,
						columnNumber: 11
					}, this),
					activeTab === "custom_modify" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-medium text-ink mb-1",
									children: "Target Paper / Data Field:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 522,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("select", {
									value: targetField,
									onChange: (e) => setTargetField(e.target.value),
									className: "w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-primary focus:outline-none",
									children: [
										/* @__PURE__ */ (void 0)("option", {
											value: "coldPaper",
											children: "Cold Email Sequence (coldPaper)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 541,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "findings",
											children: "Store Legal Audit Findings (findings)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 542,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "gapsPaper",
											children: "Policy Gap Register (gapsPaper)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 543,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "briefPaper",
											children: "Client Brief & Scoping (briefPaper)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 544,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "implementPaper",
											children: "Implementation Checklist (implementPaper)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 545,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "agreementPaper",
											children: "Service Agreement (agreementPaper)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 546,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 525,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 521,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-medium text-ink mb-1",
									children: "Quick Presets:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 551,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap gap-1",
									children: [
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setCustomPrompt("Tone: direct and assertive. Emphasize CCPA penalty risks under E-Commerce Rules 2020."),
											className: "rounded bg-surface-2 px-2 py-0.5 text-[10px] text-muted hover:text-ink",
											children: "CCPA Risk Focus"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 555,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setCustomPrompt("Shorten all emails by 30%. Add clear WhatsApp one-tap question at the end."),
											className: "rounded bg-surface-2 px-2 py-0.5 text-[10px] text-muted hover:text-ink",
											children: "Shorten & WhatsApp"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 566,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setCustomPrompt("Add clause addressing Indian courier transit damage and 48-hour unboxing video requirements."),
											className: "rounded bg-surface-2 px-2 py-0.5 text-[10px] text-muted hover:text-ink",
											children: "Courier Damage / Video"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 577,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 554,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 550,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 520,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-medium text-ink mb-1",
								children: "How should the Mini AI modify this document?"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 593,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("textarea", {
								rows: 3,
								value: customPrompt,
								onChange: (e) => setCustomPrompt(e.target.value),
								placeholder: "Describe your specific modifications (e.g., 'Rewrite the cold email Day 0 and WhatsApp DM to pitch our revised return policy for apparel brands', or 'Add clauses for cash-on-delivery cancellation fees')...",
								className: "w-full rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 596,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 592,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex justify-end pt-1",
								children: /* @__PURE__ */ (void 0)("button", {
									type: "button",
									disabled: loading || !host || !customPrompt.trim(),
									onClick: handleRunCustomModify,
									className: "flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg hover:opacity-90 disabled:opacity-50 transition-opacity",
									children: loading ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 614,
										columnNumber: 21
									}, this), "Modifying Document..."] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 613,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(SlidersVertical, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 619,
										columnNumber: 21
									}, this), "Execute Custom Modification"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 618,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 606,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 605,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 519,
						columnNumber: 11
					}, this),
					generatedContent && /* @__PURE__ */ (void 0)("div", {
						className: "mt-4 border-t border-border pt-3 space-y-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-1.5 text-xs font-medium text-ink",
								children: [
									/* @__PURE__ */ (void 0)(Check, { className: "h-3.5 w-3.5 text-emerald-600" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 633,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("span", { children: "Mini AI Output" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 634,
										columnNumber: 17
									}, this),
									analysisNotes && /* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] text-muted",
										children: [
											"(",
											analysisNotes,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 636,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 632,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: handleCopy,
									className: "flex items-center gap-1 rounded-[var(--radius-sm)] border border-border bg-surface px-2 py-1 text-xs text-muted hover:text-ink transition-colors",
									children: copied ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Check, { className: "h-3 w-3 text-emerald-600" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 648,
										columnNumber: 23
									}, this), "Copied"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 647,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Copy, { className: "h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 653,
										columnNumber: 23
									}, this), "Copy"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 652,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 641,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: handleApplyToStore,
									className: "flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-emerald-700 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-800 transition-colors shadow-xs",
									children: [/* @__PURE__ */ (void 0)(Save, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 664,
										columnNumber: 19
									}, this), "Apply & Save Permanently"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 659,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 640,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 631,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "max-h-96 overflow-y-auto rounded-[var(--radius-sm)] border border-border bg-surface-2/40 p-3 font-mono text-[11px] leading-relaxed text-ink whitespace-pre-wrap select-text",
							children: generatedContent
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 670,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 630,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 394,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 314,
		columnNumber: 5
	}, this);
}
var researchInput = object({ url: string().min(4).max(500) });
var fetchPageInput = object({
	url: string().min(4).max(500),
	kind: _enum([
		"terms",
		"privacy",
		"consent",
		"return",
		"refund",
		"cancellation",
		"shipping",
		"delivery",
		"contact",
		"other"
	]).optional(),
	hidden: boolean().optional()
});
var auditInput = object({
	origin: string().min(8).max(300),
	host: string().min(3).max(200),
	homeTitle: string().max(200).optional(),
	hints: object({
		emails: array(string()).optional(),
		phones: array(string()).optional(),
		gstins: array(string()).optional(),
		legalName: string().optional()
	}).optional(),
	pages: array(object({
		kind: string(),
		label: string(),
		url: string(),
		title: string(),
		text: string().max(12e3),
		hidden: boolean().optional(),
		added: boolean().optional()
	})).min(1).max(18),
	missing: array(object({
		kind: string(),
		label: string()
	})).optional(),
	aiKeys: aiKeysSchema
});
var refineInput = object({
	kind: _enum([
		"terms",
		"privacy",
		"consent",
		"return",
		"refund",
		"cancellation",
		"shipping",
		"delivery",
		"contact",
		"other"
	]),
	origin: string().min(8).max(300),
	host: string().min(3).max(200),
	pageUrl: string().max(500).optional(),
	pageTitle: string().max(200).optional(),
	findings: string().max(14e3).optional(),
	currentPolicy: string().max(14e3).optional(),
	extraInstruction: string().max(1500).optional(),
	aiKeys: aiKeysSchema
});
function clipRefine(input) {
	if (!input || typeof input !== "object") return input;
	const d = input;
	return {
		...d,
		findings: clip(d.findings, 8e3),
		currentPolicy: clip(d.currentPolicy, 12e3),
		extraInstruction: clip(d.extraInstruction, 1500)
	};
}
function clip(value, max) {
	if (typeof value !== "string") return value;
	return value.length > max ? value.slice(0, max) : value;
}
function clipImproved(input) {
	if (!input || typeof input !== "object") return input;
	const d = input;
	const pages = Array.isArray(d.pages) ? d.pages.map((page) => {
		const p = page;
		return {
			...p,
			title: clip(p.title, 200),
			text: clip(p.text, 9e3)
		};
	}) : d.pages;
	const refined = Array.isArray(d.refined) ? d.refined.slice(0, 12).map((item) => {
		const r = item;
		return {
			...r,
			title: clip(r.title, 200),
			text: clip(r.text, 5e3)
		};
	}) : d.refined;
	const answers = Array.isArray(d.answers) ? d.answers.slice(0, 24).map((item) => {
		const a = item;
		return {
			...a,
			id: clip(a.id, 40),
			title: clip(a.title, 200),
			answer: clip(a.answer, 800)
		};
	}) : d.answers;
	return {
		...d,
		origin: clip(d.origin, 300),
		host: clip(d.host, 200),
		homeTitle: clip(d.homeTitle, 200),
		findings: clip(d.findings, 8e3),
		gapsPaper: clip(d.gapsPaper, 8e3),
		questionnairePaper: clip(d.questionnairePaper, 8e3),
		clientBrief: clip(d.clientBrief, 8e3),
		implementPaper: clip(d.implementPaper, 8e3),
		pages,
		refined,
		answers,
		sender: d.sender && typeof d.sender === "object" ? {
			...d.sender,
			name: clip(d.sender.name, 80),
			city: clip(d.sender.city, 80),
			email: clip(d.sender.email, 120),
			phone: clip(d.sender.phone, 40),
			offer: clip(d.sender.offer, 400),
			proof: clip(d.sender.proof, 280),
			address: clip(d.sender.address, 240),
			pan: clip(d.sender.pan, 20),
			gstin: clip(d.sender.gstin, 20),
			fee: clip(d.sender.fee, 40),
			advancePct: clip(d.sender.advancePct, 8),
			draftDays: clip(d.sender.draftDays, 8),
			revisions: clip(d.sender.revisions, 8),
			responseHours: clip(d.sender.responseHours, 8)
		} : d.sender
	};
}
var improvedInput = object({
	origin: string().min(8).max(300),
	host: string().min(3).max(200),
	homeTitle: string().max(200).optional(),
	hints: auditInput.shape.hints,
	pages: auditInput.shape.pages,
	missing: auditInput.shape.missing,
	findings: string().max(14e3).optional(),
	gapsPaper: string().max(14e3).optional(),
	questionnairePaper: string().max(16e3).optional(),
	clientBrief: string().max(16e3).optional(),
	implementPaper: string().max(16e3).optional(),
	answers: array(object({
		id: string().max(40),
		title: string().max(200),
		answer: string().max(800)
	})).max(24).optional(),
	refined: array(object({
		kind: string(),
		title: string().max(200),
		text: string().max(2e4)
	})).max(12).optional(),
	sender: object({
		name: string().min(1).max(80),
		city: string().max(80).optional(),
		email: string().max(120).optional(),
		phone: string().max(40).optional(),
		offer: string().max(400).optional(),
		proof: string().max(280).optional(),
		address: string().max(240).optional(),
		pan: string().max(20).optional(),
		gstin: string().max(20).optional(),
		fee: string().max(40).optional(),
		advancePct: string().max(8).optional(),
		draftDays: string().max(8).optional(),
		revisions: string().max(8).optional(),
		responseHours: string().max(8).optional()
	}).optional(),
	aiKeys: aiKeysSchema
});
var fetchStorePageFn = createServerFn({ method: "POST" }).validator((input) => fetchPageInput.parse(input)).handler(createSsrRpc("3599ab5b0008c073b5d2aaf34b8bec5add7c5baf750bdcef159d08ef9a7ce1ce"));
var researchStoreFn = createServerFn({ method: "POST" }).validator((input) => researchInput.parse(input)).handler(createSsrRpc("4f7155dd2f550a8b28c4ab89c1fed1b1f906a61b4602753361f7341ef2dbd6e6"));
var auditStoreFn = createServerFn({ method: "POST" }).validator((input) => auditInput.parse(input)).handler(createSsrRpc("7c381e5591386a541903c168e3accc2fa3b43d121ce5b60117a283708d0edc2a"));
var refineStorePolicyFn = createServerFn({ method: "POST" }).validator((input) => refineInput.parse(clipRefine(input))).handler(createSsrRpc("9349d6ebb66212266cbf9e0875c42504b4643a32eadc1fef1e8ee8b143e707ad"));
var findPolicyGapsFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(createSsrRpc("b4e6719e87b0c179f560cf803195605155147dca549f3145d09eb556dddddbb7"));
var writeSellingPointsFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(createSsrRpc("a5fc8baeafad675aa0de68feea6f84486de09fb2a0583d9ffe6942d609e3475c"));
var writeQuestionnaireFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(createSsrRpc("9db5fa05632ccac9d2a4639a77f21e9ce6c24fc80e99090991f9e816357d8836"));
var writeClientBriefFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(createSsrRpc("f509c245be4050eefe37fe33937ce7a367c07ab44c186efccb21254f96d6c5b4"));
var writeImplementationsFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(createSsrRpc("3fb2668851f685aa37a4a76a99d75c1721981a5fdf0111b283560dd62977bb47"));
var writeForwardEmailFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(createSsrRpc("cf9b87416e91d277d94e20cefba312bdcda9778d4ccc075b5e4bdd6c6ddfaad1"));
var writeColdEmailFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(createSsrRpc("207fb66681fdc66a57afd5576674d37ed15d560068f17c16ba716e671a6bb44c"));
var writeServiceAgreementFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(createSsrRpc("56be78f9e0361b1232350a015870f77753d9f7db475a2d48e934c6e3e9224644"));
//#endregion
export { writeSellingPointsFn as C, writeQuestionnaireFn as S, useSenderStore as _, auditStoreFn as a, writeForwardEmailFn as b, fetchStorePageFn as c, nextClockB as d, pipelineStage as f, usePipelineStore as g, senderPayload as h, STAGE_LABEL as i, findPolicyGapsFn as l, researchStoreFn as m, CLOCK_B as n, daysSince as o, refineStorePolicyFn as p, MiniAiPanel as r, emailTouchId as s, CLOCK_A as t, nextClockA as u, writeClientBriefFn as v, writeServiceAgreementFn as w, writeImplementationsFn as x, writeColdEmailFn as y };
