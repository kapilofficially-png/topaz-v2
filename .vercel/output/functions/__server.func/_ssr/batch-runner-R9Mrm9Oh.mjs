import { n as toast } from "../_libs/sonner.mjs";
import { n as persist, r as create } from "../_libs/zustand.mjs";
import { a as rememberProvider, r as aiKeysPayload } from "./badge-BGa2cXzN.mjs";
import { i as pageUrlKey, n as POLICY_LABELS } from "./types-BWR_EVh8.mjs";
import { n as useStoreArchive, t as useAuditStore } from "./audit-store-DeG2ETsA.mjs";
import { C as writeSellingPointsFn, S as writeQuestionnaireFn, _ as useSenderStore, a as auditStoreFn, b as writeForwardEmailFn, g as usePipelineStore, h as senderPayload, l as findPolicyGapsFn, m as researchStoreFn, p as refineStorePolicyFn, v as writeClientBriefFn, x as writeImplementationsFn, y as writeColdEmailFn } from "./store-audit-CVIq-TTb.mjs";
import { a as parseDraftOutput } from "./parse-X7WrXe75.mjs";
import { i as useDraftStore } from "./store-C7MjJ_c6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batch-runner-R9Mrm9Oh.js
function notifySequenceComplete(opts) {
	const ok = opts.failed.length === 0;
	const title = ok ? `Sequence complete — ${opts.host}` : `Sequence finished with gaps — ${opts.host}`;
	const body = [opts.rewriteTotal ? `Policies rewritten: ${opts.rewriteOk} of ${opts.rewriteTotal}.` : "No policy pages to rewrite.", opts.failed.length ? `Still open: ${opts.failed.join(", ")}.` : "All ten steps finished."].join(" ");
	toast[ok ? "success" : "error"](title, {
		description: body,
		duration: 2e4
	});
	try {
		if (typeof document !== "undefined") document.title = `NyayaDraft · ${title}`;
		if (typeof window === "undefined" || !("Notification" in window)) return;
		const show = () => new Notification(title, {
			body,
			tag: `nyayadraft-sequence-${opts.host}`
		});
		if (Notification.permission === "granted") show();
		else if (Notification.permission !== "denied") Notification.requestPermission().then((perm) => {
			if (perm === "granted") show();
		});
	} catch {}
}
function notifyBatchComplete(opts) {
	const title = opts.errors === 0 ? `Batch complete — ${opts.done} stores` : `Batch finished — ${opts.done} of ${opts.total} saved`;
	const body = opts.errors === 0 ? "Every store in the queue finished and was saved to History." : `${opts.errors} store${opts.errors === 1 ? "" : "s"} failed. Open Batch for the list.`;
	toast[opts.errors ? "error" : "success"](title, {
		description: body,
		duration: 2e4
	});
	try {
		if (typeof document !== "undefined") document.title = `NyayaDraft · ${title}`;
		if (typeof window === "undefined" || !("Notification" in window)) return;
		const show = () => new Notification(title, {
			body,
			tag: "nyayadraft-batch"
		});
		if (Notification.permission === "granted") show();
		else if (Notification.permission !== "denied") Notification.requestPermission().then((perm) => {
			if (perm === "granted") show();
		});
	} catch {}
}
var PAYLOAD_CLIP = 8e3;
function pause(ms) {
	return new Promise((resolve) => {
		window.setTimeout(resolve, ms);
	});
}
function throwIfAborted(signal) {
	if (signal?.aborted) {
		const err = /* @__PURE__ */ new Error("Batch stopped.");
		err.name = "AbortError";
		throw err;
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
		sender: senderPayload(send),
		aiKeys: aiKeysPayload()
	};
}
function rewriteCards() {
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
async function refinePage(page) {
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
		if (!result.ok) return null;
		rememberProvider(result);
		const item = {
			kind: page.kind,
			url: page.url,
			slug: result.slug,
			title: result.title,
			raw: result.text
		};
		s.setRefined(item);
		return item;
	} catch {
		return null;
	}
}
async function rewriteAllPolicies(opts) {
	const s = useAuditStore.getState();
	const cards = rewriteCards();
	if (!s.findings || !cards.length) return {
		ok: false,
		rewriteOk: 0,
		rewriteTotal: cards.length,
		failed: ["Revise policies"]
	};
	const written = [];
	const failed = [];
	for (let i = 0; i < cards.length; i += 1) {
		throwIfAborted(opts?.signal);
		const page = cards[i];
		opts?.onProgress?.({
			current: i + 1,
			total: cards.length,
			title: page.title || POLICY_LABELS[page.kind]
		});
		let item = await refinePage(page);
		if (!item) {
			await pause(800);
			item = await refinePage(page);
		}
		if (item) written.push(item);
		else failed.push(page.title || POLICY_LABELS[page.kind]);
		if (i < cards.length - 1) await pause(400);
	}
	useAuditStore.getState().replaceRefined(written);
	return {
		ok: failed.length === 0,
		rewriteOk: written.length,
		rewriteTotal: cards.length,
		failed
	};
}
function saveSessionPapers() {
	const s = useAuditStore.getState();
	const save = useDraftStore.getState().save;
	if (!s.host) return 0;
	const facts = {
		website: s.origin,
		host: s.host
	};
	let n = 0;
	if (s.pages.length) {
		save({
			id: `store-research::${s.host}`,
			slug: "store-research",
			title: `Research — ${s.host}`,
			createdAt: Date.now(),
			facts,
			draftText: s.pages.map((p) => `## ${p.label}\n${p.title}\n${p.url}\n(${p.chars.toLocaleString("en-IN")} characters)${p.hidden ? " · hidden" : ""}\n\n${p.text.slice(0, 12e3)}`).join("\n\n"),
			notes: s.missing.map((m) => m.label).join(", "),
			citations: s.citations
		});
		n += 1;
	}
	if (s.findings) {
		save({
			id: `store-audit::${s.host}`,
			slug: "store-audit",
			title: `Store audit — ${s.host}`,
			createdAt: Date.now(),
			facts,
			draftText: s.findings,
			notes: s.missing.map((m) => m.label).join(", "),
			citations: s.citations
		});
		n += 1;
	}
	for (const item of s.refined) {
		const parsed = parseDraftOutput(item.raw);
		save({
			id: `${item.slug}::${s.host}::${item.url || item.kind}`,
			slug: item.slug,
			title: `${item.title} — ${s.host}`,
			createdAt: Date.now(),
			facts: {
				...facts,
				url: item.url,
				kind: item.kind,
				pageTitle: item.title
			},
			draftText: parsed.draft,
			notes: parsed.notes,
			citations: s.citations
		});
		n += 1;
	}
	const papers = [
		[
			"store-gaps",
			"Gap register",
			s.gapsPaper
		],
		[
			"store-brief",
			"Client brief",
			s.briefPaper
		],
		[
			"store-questions",
			"Legal facts",
			s.questionsPaper
		],
		[
			"store-implement",
			"Implementations",
			s.implementPaper
		],
		[
			"store-selling",
			"Selling points",
			s.sellingPaper
		],
		[
			"store-email",
			"Forwarding emails",
			s.emailPaper
		],
		[
			"store-cold",
			"Cold email",
			s.coldPaper
		],
		[
			"store-agreement",
			"Service agreement",
			s.agreementPaper
		]
	];
	for (const [slug, title, body] of papers) {
		if (!body) continue;
		save({
			id: `${slug}::${s.host}`,
			slug,
			title: `${title} — ${s.host}`,
			createdAt: Date.now(),
			facts,
			draftText: body,
			notes: "",
			citations: s.citations
		});
		n += 1;
	}
	return n;
}
function researchAttempts(url) {
	const raw = url.trim();
	const out = [];
	const add = (u) => {
		const t = u.trim();
		if (t && !out.includes(t)) out.push(t);
	};
	add(raw);
	const stripped = raw.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
	add(stripped);
	add(`https://${stripped.replace(/^www\./i, "")}`);
	add(`https://www.${stripped.replace(/^www\./i, "")}`);
	return out;
}
async function researchWithRetry(url, signal) {
	let last = null;
	for (const candidate of researchAttempts(url)) for (let attempt = 0; attempt < 2; attempt += 1) {
		throwIfAborted(signal);
		try {
			const result = await researchStoreFn({ data: { url: candidate } });
			last = result;
			if (result.ok && result.pages.length) return result;
		} catch (err) {
			if (err.name === "AbortError") throw err;
			last = {
				ok: false,
				error: err instanceof Error ? err.message : "Could not read that website."
			};
		}
		await pause(1400 * (attempt + 1));
	}
	return last ?? {
		ok: false,
		error: "Could not read that website."
	};
}
async function paper(name, write, failed, signal) {
	throwIfAborted(signal);
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			if (await write()) return;
		} catch (err) {
			if (err.name === "AbortError") throw err;
		}
		await pause(1200 * (attempt + 1));
	}
	failed.push(name);
}
async function runStoreSequence(url, opts) {
	const mark = (step, title, rewrite) => {
		opts?.onProgress?.({
			step,
			total: 10,
			title,
			rewrite
		});
	};
	const empty = () => ({
		url,
		host: "",
		origin: "",
		ok: false,
		failed: ["Research live pages"],
		rewriteOk: 0,
		rewriteTotal: 0,
		pages: 0,
		saved: 0
	});
	const failed = [];
	let rewriteOk = 0;
	let rewriteTotal = 0;
	try {
		mark(1, "Research live pages");
		throwIfAborted(opts?.signal);
		const cleanHost = (h) => h.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0].toLowerCase().trim();
		const candidateHost = cleanHost(url);
		const existingArchived = candidateHost ? useStoreArchive.getState().cache.get(candidateHost) : null;
		const currentSession = useAuditStore.getState();
		const previousKnownPages = currentSession.host && cleanHost(currentSession.host) === candidateHost ? currentSession.pages : existingArchived?.pages || [];
		useAuditStore.getState().setUrlInput(url);
		const researched = await researchWithRetry(url, opts?.signal);
		if (!researched.ok || !("pages" in researched) || !researched.pages.length) return {
			...empty(),
			host: researched.ok ? researched.host : "",
			origin: researched.ok ? researched.origin : ""
		};
		const byKey = new Map(previousKnownPages.map((p) => [pageUrlKey(p.url), p]));
		const mergedPages = researched.pages.map((p) => {
			const old = byKey.get(pageUrlKey(p.url));
			return old ? {
				...p,
				hidden: old.hidden,
				added: old.added
			} : p;
		});
		for (const old of previousKnownPages) if (old.added && !mergedPages.some((p) => pageUrlKey(p.url) === pageUrlKey(old.url))) mergedPages.push(old);
		useAuditStore.getState().setResearch({
			origin: researched.origin,
			host: researched.host,
			homeTitle: researched.homeTitle,
			pages: mergedPages,
			missing: researched.missing,
			hints: researched.hints
		});
		usePipelineStore.getState().ensure(researched.host, researched.origin);
		mark(2, "Audit against Indian law");
		throwIfAborted(opts?.signal);
		let auditOk = false;
		for (let attempt = 0; attempt < 2 && !auditOk; attempt += 1) {
			try {
				const s0 = useAuditStore.getState();
				const audited = await auditStoreFn({ data: {
					origin: s0.origin,
					host: s0.host,
					homeTitle: s0.homeTitle,
					hints: s0.hints ?? void 0,
					pages: s0.pages.map((p) => ({
						kind: p.kind,
						label: p.label,
						url: p.url,
						title: p.title,
						text: p.text.slice(0, 9e3),
						hidden: Boolean(p.hidden),
						added: Boolean(p.added)
					})),
					missing: s0.missing,
					aiKeys: aiKeysPayload()
				} });
				if (audited.ok) {
					rememberProvider(audited);
					useAuditStore.getState().setFindings(audited.text, audited.citations);
					auditOk = true;
				} else if (attempt === 1) useAuditStore.getState().setFindings("", audited.citations);
			} catch (err) {
				if (err.name === "AbortError") throw err;
			}
			if (!auditOk) await pause(1400 * (attempt + 1));
		}
		if (!auditOk) failed.push("Audit");
		mark(3, "Revise policies");
		if (useAuditStore.getState().findings) try {
			const rewritten = await rewriteAllPolicies({
				signal: opts?.signal,
				onProgress: (rewrite) => mark(3, "Revise policies", rewrite)
			});
			rewriteOk = rewritten.rewriteOk;
			rewriteTotal = rewritten.rewriteTotal;
			if (!rewritten.ok) failed.push(`Revise policies (${rewritten.rewriteOk}/${rewritten.rewriteTotal}${rewritten.failed.length ? ` — ${rewritten.failed.join(", ")}` : ""})`);
		} catch (err) {
			if (err.name === "AbortError") throw err;
			failed.push("Revise policies");
		}
		else failed.push("Revise policies");
		mark(4, "Gaps");
		await paper("Gaps", async () => {
			const result = await findPolicyGapsFn({ data: improvedPayload() });
			if (!result.ok) return false;
			rememberProvider(result);
			useAuditStore.getState().setGapsPaper(result.text, result.citations);
			return true;
		}, failed, opts?.signal);
		mark(5, "Client brief");
		await paper("Client brief", async () => {
			const result = await writeClientBriefFn({ data: improvedPayload() });
			if (!result.ok) return false;
			rememberProvider(result);
			useAuditStore.getState().setBriefPaper(result.text, result.citations);
			return true;
		}, failed, opts?.signal);
		mark(6, "Legal facts");
		await paper("Legal facts", async () => {
			const result = await writeQuestionnaireFn({ data: improvedPayload() });
			if (!result.ok) return false;
			rememberProvider(result);
			useAuditStore.getState().setQuestionsPaper(result.text, result.citations);
			return true;
		}, failed, opts?.signal);
		mark(7, "Implementations");
		await paper("Implementations", async () => {
			const result = await writeImplementationsFn({ data: improvedPayload() });
			if (!result.ok) return false;
			rememberProvider(result);
			useAuditStore.getState().setImplementPaper(result.text, result.citations);
			return true;
		}, failed, opts?.signal);
		mark(8, "Selling points");
		await paper("Selling points", async () => {
			const result = await writeSellingPointsFn({ data: improvedPayload() });
			if (!result.ok) return false;
			rememberProvider(result);
			useAuditStore.getState().setSellingPaper(result.text, result.citations);
			return true;
		}, failed, opts?.signal);
		mark(9, "Forwarding emails");
		await paper("Forwarding emails", async () => {
			const result = await writeForwardEmailFn({ data: improvedPayload() });
			if (!result.ok) return false;
			rememberProvider(result);
			useAuditStore.getState().setEmailPaper(result.text, result.citations);
			return true;
		}, failed, opts?.signal);
		mark(10, "Cold email");
		await paper("Cold email", async () => {
			const result = await writeColdEmailFn({ data: improvedPayload() });
			if (!result.ok) return false;
			rememberProvider(result);
			const st = useAuditStore.getState();
			st.setColdPaper(result.text, result.citations);
			usePipelineStore.getState().startSequence(st.host, st.origin);
			return true;
		}, failed, opts?.signal);
		const saved = saveSessionPapers();
		await useAuditStore.getState().persistToArchive();
		const st = useAuditStore.getState();
		return {
			url,
			host: st.host,
			origin: st.origin,
			ok: failed.length === 0,
			failed,
			rewriteOk,
			rewriteTotal,
			pages: st.pages.length,
			saved
		};
	} catch (err) {
		if (err.name === "AbortError") throw err;
		const st = useAuditStore.getState();
		const saved = st.host ? saveSessionPapers() : 0;
		if (st.host) useAuditStore.getState().persistToArchive();
		return {
			url,
			host: st.host,
			origin: st.origin,
			ok: false,
			failed: failed.length ? failed : [err instanceof Error ? err.message : "Sequence failed"],
			rewriteOk,
			rewriteTotal,
			pages: st.pages.length,
			saved
		};
	}
}
function parseStoreList(text, limit = 50) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const raw of text.split(/[\n\r,;|]+/)) {
		const line = raw.trim().replace(/^<|>$/g, "");
		if (!line || line.startsWith("#")) continue;
		const key = line.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/+$/, "").toLowerCase();
		if (key.length < 4 || seen.has(key)) continue;
		seen.add(key);
		out.push(line);
		if (out.length >= limit) break;
	}
	return out;
}
function mergeStoreLists(current, extra, limit = 50) {
	return parseStoreList(`${current}\n${extra}`, limit).join("\n");
}
var useBatchStore = create()(persist((set) => ({
	listText: "",
	jobs: [],
	running: false,
	stopAfterCurrent: false,
	currentIndex: -1,
	startedAt: null,
	progress: null,
	setListText: (listText) => set({ listText }),
	setJobs: (jobs) => set({
		jobs,
		currentIndex: -1,
		stopAfterCurrent: false
	}),
	patchJob: (index, patch) => set((s) => ({ jobs: s.jobs.map((j, i) => i === index ? {
		...j,
		...patch
	} : j) })),
	setRunning: (running) => set({ running }),
	setStopAfterCurrent: (stopAfterCurrent) => set({ stopAfterCurrent }),
	setCurrentIndex: (currentIndex) => set({ currentIndex }),
	setStartedAt: (startedAt) => set({ startedAt }),
	setProgress: (progress) => set({ progress }),
	clearResults: () => set({
		jobs: [],
		running: false,
		stopAfterCurrent: false,
		currentIndex: -1,
		startedAt: null,
		progress: null
	})
}), {
	name: "nyayadraft-batch",
	partialize: (s) => ({
		listText: s.listText,
		jobs: s.jobs
	}),
	onRehydrateStorage: () => (state) => {
		if (!state) return;
		state.jobs = state.jobs.map((j) => j.status === "running" ? {
			...j,
			status: "error",
			error: "Interrupted. Run the remaining URLs again."
		} : j);
	}
}));
function jobNeedsRetry(job) {
	if (job.status === "stopped") return false;
	if (job.status === "error") return true;
	if (!job.pages) return true;
	if (!job.saved) return true;
	if (job.failed.some((f) => f === "Research live pages" || f === "Audit" || f.startsWith("Revise policies"))) return true;
	return false;
}
var abort = null;
var loop = null;
function applyReport(index, report, pass) {
	useBatchStore.getState().patchJob(index, {
		status: report.pages ? "done" : "error",
		host: report.host,
		failed: report.failed,
		rewriteOk: report.rewriteOk,
		rewriteTotal: report.rewriteTotal,
		pages: report.pages,
		saved: report.saved,
		finishedAt: Date.now(),
		pass,
		error: report.pages ? report.failed.length ? report.failed.join(", ") : void 0 : report.failed.join(", ") || "No live pages"
	});
}
async function runOne(index, url, pass) {
	const store = useBatchStore.getState();
	store.setCurrentIndex(index);
	store.patchJob(index, {
		status: "running",
		pass,
		error: void 0
	});
	store.setProgress({
		step: 1,
		total: 10,
		title: "Starting…"
	});
	const report = await runStoreSequence(url, {
		signal: abort?.signal,
		onProgress: (p) => useBatchStore.getState().setProgress(p)
	});
	applyReport(index, report, pass);
	return report;
}
async function startBatch() {
	if (loop) return;
	const urls = parseStoreList(useBatchStore.getState().listText, 50);
	if (!urls.length) return {
		ok: false,
		error: "Paste store URLs — new lines or commas, up to 50."
	};
	const jobs = urls.map((url) => ({
		url,
		host: "",
		status: "queued",
		failed: [],
		rewriteOk: 0,
		rewriteTotal: 0,
		pages: 0,
		saved: 0
	}));
	const store = useBatchStore.getState();
	store.setJobs(jobs);
	store.setRunning(true);
	store.setStopAfterCurrent(false);
	store.setStartedAt(Date.now());
	abort = new AbortController();
	loop = (async () => {
		try {
			for (let i = 0; i < jobs.length; i += 1) {
				if (useBatchStore.getState().stopAfterCurrent) {
					for (let j = i; j < jobs.length; j += 1) useBatchStore.getState().patchJob(j, { status: "stopped" });
					break;
				}
				try {
					await runOne(i, jobs[i].url, "first");
				} catch (err) {
					if (err.name === "AbortError") {
						useBatchStore.getState().patchJob(i, { status: "stopped" });
						break;
					}
					useBatchStore.getState().patchJob(i, {
						status: "error",
						error: err instanceof Error ? err.message : "Sequence failed",
						finishedAt: Date.now(),
						pass: "first"
					});
				}
				if (i < jobs.length - 1 && !useBatchStore.getState().stopAfterCurrent) {
					const last = useBatchStore.getState().jobs[i];
					const wait = last && (last.status === "error" || last.failed.length) ? 3200 : 1400;
					await new Promise((r) => window.setTimeout(r, wait));
				}
			}
			if (!useBatchStore.getState().stopAfterCurrent) {
				const snapshot = useBatchStore.getState().jobs;
				const retryIdx = snapshot.map((job, i) => jobNeedsRetry(job) && job.pass !== "retry" ? i : -1).filter((i) => i >= 0);
				for (const i of retryIdx) {
					if (useBatchStore.getState().stopAfterCurrent) break;
					useBatchStore.getState().setProgress({
						step: 1,
						total: 10,
						title: `Retry ${snapshot[i].url}`
					});
					try {
						await runOne(i, snapshot[i].url, "retry");
					} catch (err) {
						if (err.name === "AbortError") break;
						useBatchStore.getState().patchJob(i, {
							status: "error",
							error: err instanceof Error ? err.message : "Retry failed",
							finishedAt: Date.now(),
							pass: "retry"
						});
					}
					await new Promise((r) => window.setTimeout(r, 2e3));
				}
			}
			const final = useBatchStore.getState().jobs;
			notifyBatchComplete({
				done: final.filter((j) => j.status === "done").length,
				total: final.length,
				errors: final.filter((j) => j.status === "error").length
			});
		} finally {
			useBatchStore.getState().setRunning(false);
			useBatchStore.getState().setCurrentIndex(-1);
			useBatchStore.getState().setStopAfterCurrent(false);
			useBatchStore.getState().setProgress(null);
			abort = null;
			loop = null;
		}
	})();
	return { ok: true };
}
function stopBatch() {
	useBatchStore.getState().setStopAfterCurrent(true);
}
function isBatchRunning() {
	return useBatchStore.getState().running || Boolean(loop);
}
//#endregion
export { runStoreSequence as a, stopBatch as c, parseStoreList as i, useBatchStore as l, mergeStoreLists as n, saveSessionPapers as o, notifySequenceComplete as r, startBatch as s, isBatchRunning as t };
