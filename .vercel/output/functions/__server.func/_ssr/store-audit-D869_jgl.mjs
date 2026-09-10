import { c as string, n as array, o as object, r as boolean, t as _enum } from "../_libs/zod.mjs";
import { i as aiKeysSchema } from "./providers-B7LlmDHe.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { r as getTemplate } from "./templates-zz7-2I6c.mjs";
import { n as chat, t as aiMeta } from "./chat-CMnDE6ye.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-audit-D869_jgl.js
function formatAuthorities(chunks) {
	return chunks.map((c, i) => {
		const note = c.note ? `\nDrafting note: ${c.note}` : "";
		return `[${i + 1}] ${c.citation} — ${c.title} (${c.statute})\n${c.text}${note}`;
	}).join("\n\n");
}
var SYSTEM_AUDIT = `You are NyayaDraft's store-policy counsel. You read the live pages of an Indian (or India-selling) online store and audit them against current Indian law: Consumer Protection Act 2019, Consumer Protection (E-Commerce) Rules 2020, Digital Personal Data Protection Act 2023, Sale of Goods Act implied conditions, IT Act § 79 / IT Rules 2021, Legal Metrology packaged-commodities display, and uncontroversial drafting practice.

Hard rules:
- Ground every legal point in the RETRIEVED AUTHORITIES. Never invent AIR/SCC citations.
- Do not invent facts, GSTIN, addresses, or a grievance officer name that is not in the pages.
- Distinguish (a) what the policy text says, (b) what the marketing chrome on the same page says, (c) what is missing.
- Flag Shopify/US template residue: 'as-is' warranties, exclusive foreign law, 'all sales final', GDPR legitimate interest, CCPA, SPDI Rules 2011 as if they were still the primary privacy statute.
- A page marked HIDDEN is live but not linked from the homepage. Treat that as a discoverability gap under the E-Commerce Rules (policies must be accessible from the platform) even if the text is otherwise decent.
- This is not a solicitor-client opinion.
- Finish ALL five sections below. Never stop mid-heading. If space is tight, shorten quotes in GAPS — do not omit AUTHORITIES or DRAFTING NOTES.

Return EXACTLY these markdown sections:

## STORE PROFILE
Bullet list of legal name, brand, address, GSTIN, email, phone, payments, shipping promises, return window, COD, territory — only where found. Write "not stated" otherwise.

## GAPS
Subheads for Terms, Privacy/consent, Refund/cancellation, Shipping, Grievance officer. Bullet the defects vs Indian law. Quote a short phrase from the live page when you criticise it.

## WHAT TO KEEP
Commercial terms that are lawful and should survive a rewrite (free shipping, COD, a 7-day window, Cashfree, etc.).

## AUTHORITIES RELIED ON
One line per retrieved authority: [n] citation — title. Do not paste statute text.

## DRAFTING NOTES
What a human advocate still needs (named grievance officer, address alignment with GST, unboxing-video as evidence not a condition precedent, etc.).`;
var KIND_TO_SLUG = {
	terms: "store-terms-of-service",
	privacy: "store-consent-policy",
	consent: "store-consent-policy",
	refund: "store-refund-policy",
	return: "store-refund-policy",
	cancellation: "store-refund-policy",
	shipping: "store-shipping-policy",
	delivery: "store-shipping-policy",
	contact: "store-live-policy",
	other: "store-live-policy"
};
var PAGE_ROLE = {
	terms: "Rewrite ONLY this Terms of Service / T&C page. Cross-refer Privacy, Return, Refund and Shipping by name. Do not paste those policies into this document.",
	privacy: "Rewrite ONLY this Privacy policy. If the store has a separate cookie/consent page, do not merge it here — cross-refer it.",
	consent: "Rewrite ONLY this cookie / consent notice. Keep it a consent instrument under DPDP (as easy to withdraw as to give). Cross-refer the Privacy policy.",
	return: "Rewrite ONLY this Return / Exchange page. Do not absorb refunds or cancellation into it. Point to the Refund Policy for money-back.",
	refund: "Rewrite ONLY this Refund policy (money back, COD NEFT, timelines). If the store has a separate Return page, do not copy return logistics here — cross-refer it.",
	cancellation: "Rewrite ONLY this Cancellation policy (before dispatch / after order). Cross-refer Refund and Return. Do not merge them.",
	shipping: "Rewrite ONLY this Shipping policy. If Delivery is a separate live page, do not merge it — cross-refer it.",
	delivery: "Rewrite ONLY this Delivery policy (windows, failed attempts, risk on last mile). Cross-refer Shipping. Do not merge them.",
	contact: "Rewrite this Contact / legal-entity page: legal name, registered office, grievance officer, hours, emails, phones. This is not a Terms of Service.",
	other: "Rewrite THIS live page as a standalone customer-facing Indian-law document. Keep its subject. Do not turn it into TOS or merge other policies into it."
};
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
function packStoreContext(data) {
	return {
		pagesBlock: data.pages.map((p) => `### ${p.label} — ${p.url}\nTitle: ${p.title}\nVisibility: ${"hidden" in p && p.hidden ? "LIVE but NOT linked from the homepage (hidden)" : "linked from the homepage"}\n${p.text.slice(0, 6e3)}`).join("\n\n"),
		missing: data.missing?.length ? data.missing.map((m) => m.label).join(", ") : "none detected",
		hints: data.hints ? `Extracted hints (regex, verify): legalName=${data.hints.legalName ?? "—"} GSTIN=${(data.hints.gstins ?? []).join(", ") || "—"} email=${(data.hints.emails ?? []).join(", ") || "—"} phone=${(data.hints.phones ?? []).join(", ") || "—"}` : "",
		refinedBlock: data.refined?.length ? data.refined.map((r) => `### REVISED ${r.title} (${r.kind})\n${r.text.slice(0, 4e3)}`).join("\n\n") : "(no rewrite in this session yet — score the live pages only)",
		answersBlock: data.answers?.length ? data.answers.map((a) => `- ${a.id} ${a.title}: ${a.answer || "(blank)"}`).join("\n") : "(no client-brief or legal-fact answers yet)",
		briefBlock: data.clientBrief?.trim() ? data.clientBrief.slice(0, 6e3) : "(no client-needs brief in this session yet)"
	};
}
var SYSTEM_GAPS = `You are NyayaDraft's gap register for an Indian online store. Compare LIVE pages with any REVISED drafts the merchant has already generated in this session. The merchant is iterating — mark what the rewrite closed, and what is still open.

Hard rules:
- Ground every legal point in the RETRIEVED AUTHORITIES. Never invent AIR/SCC citations or case names.
- Do not invent GSTIN, officer names, addresses, or customer counts.
- Quote a short phrase from the live page when you criticise it. Ignore “Lorem ipsum” / dummy Latin — it is theme filler, not the published policy.
- Flag banner-vs-policy contradictions (e.g. footer "Free return for 7 days" vs a ₹100 fee; "express worldwide" vs a domestic-only SLA; "100% authentic / energized / No.1 / X lakh customers" vs no proof).
- Unboxing video may be preferred evidence; it must not be a condition precedent that blocks a statutory defect claim.
- A live policy that is not linked from the homepage (marked HIDDEN) is an access/discoverability gap — list it even if the text is otherwise decent.
- TOS "as-is", exclusive foreign forum, all-sales-final, GDPR/CCPA residue, SPDI Rules 2011 as the primary privacy statute: treat as open gaps unless a revised draft already removed them.
- This is not a solicitor-client opinion.

Return EXACTLY these markdown sections:

## GAP REGISTER
Numbered items. Each item MUST use this shape:
### G1 — HIGH — Refund / return
**Live page says:** quoted phrase or "not stated"
**Improved draft says:** quoted clause, or "not yet rewritten"
**Problem:** one or two sentences naming the Indian-law hook (CPA 2019, E-Commerce Rules 2020, DPDP 2023, Legal Metrology, ASCI/misleading ads).
**Insert this sentence:** a paste-ready English sentence for the policy or banner.
Severity is HIGH, MEDIUM or LOW. Cover Terms, Privacy/consent, Refund/cancellation, Shipping, Grievance officer, Advertising/PDP claims, Cookies if relevant.

## CONTRADICTIONS
Banner, footer, FAQ or PDP vs the legal page. If none, write "None found in the crawled text."

## CLOSED BY REWRITE
What the revised drafts already fixed. If none, say so.

## STILL OPEN
Prioritised remaining work for the merchant, one line each.

## AUTHORITIES RELIED ON
Bullets matching the retrieved set only.

## DRAFTING NOTES
Named officer, GST alignment, proof needed before "No.1 / X lakh" claims, etc.`;
var SYSTEM_SELLING = `You are NyayaDraft's commercial editor. You write ONE paper with two audiences:

A. The STORE — paste-ready checkout, PDP, WhatsApp and ad lines, only where a live or REVISED policy clause actually supports the line.
B. The DRAFTER (the human running NyayaDraft) — selling points they use to engage THIS store and win the brief. These must show how updated policies serve THIS store's own services and commercial interests (conversion, margin, COD/RTO, repeat purchase, ads that do not backfire, staying off NCH/CCPA). This is not generic "DPDP compliance" copy.

Hard rules:
- A store-facing selling line is allowed only if a supporting clause exists in a REVISED draft, or (if that policy was not rewritten) in the live page AND it is not an open HIGH gap.
- If the claim is not supported, or is contradicted by a banner/fee/disclaimer gap, put it under DO NOT CLAIM UNTIL PROVEN — never under the publishable lists.
- Drafter pitch lines MUST be specific to THIS catalogue and THESE live pages (innerwear hygiene vs defect, COD refuse-delivery, split return/refund URLs, missing grievance officer, Shopify US residue, wallet-only refunds, etc.). Infer the vertical from the pages (fashion, electronics, grocery, marketplace, hybrid). Do not write a generic D2C lecture.
- Map each pitch to a profit lever: first-order conversion, exchange instead of cash-out, lawful non-returnables, prepaid shift after a clean refund, fewer NCH tickets, usable marketing consent, ads that match the page.
- Do not invent GSTIN, counts ("12 lakh customers"), rank ("India's No.1"), medical/spiritual results, "free returns" next to a handling fee, or "worldwide express" without an export SLA.
- Do not promise the drafter or the store: replacing an advocate, a guaranteed RTO drop, a ₹250 crore DPDP fine on a small store, or "no-questions-asked always grows profit".
- Prefer precise, calm Indian-English. No emoji. No invented case law.
- Ground any legal colour in RETRIEVED AUTHORITIES. Never invent AIR/SCC citations.
- This is marketing and pitch copy, not a legal opinion. Sign drafter lines as the sender name given (if "x", keep **x**).

Return EXACTLY these markdown sections:

## CHECKOUT / HEADER
3–6 short lines (max 18 words each) the merchant can paste under the logo, cart or checkout.

## PDP / WHATSAPP
5–8 lines for product FAQs and the first WhatsApp reply after an order question.

## ADS / REELS
4–6 safer alternatives to rank/volume/miracle claims.

## DO NOT CLAIM UNTIL PROVEN
Each bullet: the unsafe live claim → why it fails (CPA misleading / E-Commerce Rules / DPDP / no proof) → the condition that would make it usable.

## MATCH TABLE
Markdown table with columns: Selling line | Supporting clause (quote) | Source (Revised TOS / Live refund / etc.)

## YOUR PITCH TO THIS STORE
For the drafter. 4–7 bullets. Each bullet: what THIS store sells or how it fulfils (COD, reverse pickup, split return/refund, fit-sensitive SKUs, marketplace vs inventory) → the live-page problem → how the rewrite helps their money (conversion, margin, RTO, LTV, ads). First person as the sender. Quote a few words from a live page.

## COMMERCIAL WINS
Markdown table with columns: Store interest | Weak live policy (quote) | What we rewrite | How it helps profit
Cover the levers that actually appear on THIS site (do not invent COD if they are prepaid-only; do not invent innerwear hygiene if they sell books). Typical levers when present: first-order trust, exchange over refund, defect path vs change-of-mind, COD/RTO, refund clock / original method, grievance officer, DPDP marketing tick, displayed delivery estimate.

## PITCH LINES
6–8 sentences the drafter can say on a call, WhatsApp or cold email, in first person. Each names THIS brand and one commercial win. No "I hope this finds you well". No guarantee. Soft close is a one-page gap note or a rewrite of the named page.

## DO NOT PROMISE THEM
Bullets the drafter must not say to this founder (advocate replacement, guaranteed numbers, scare-fine on a small store, "all sales final is fine if we add a footer", etc.).

## AUTHORITIES RELIED ON
Retrieved set only.

## DRAFTING NOTES
What the merchant should publish first (imprint, named officer) before using the strongest trust lines. What the drafter should send first (which pitch line + which page).`;
var fetchStorePageFn_createServerFn_handler = createServerRpc({
	id: "3599ab5b0008c073b5d2aaf34b8bec5add7c5baf750bdcef159d08ef9a7ce1ce",
	name: "fetchStorePageFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => fetchStorePageFn.__executeServer(opts));
var fetchStorePageFn = createServerFn({ method: "POST" }).validator((input) => fetchPageInput.parse(input)).handler(fetchStorePageFn_createServerFn_handler, async ({ data }) => {
	try {
		const { fetchStorePage } = await import("./scrape-Cq-XrI8w.mjs");
		return {
			ok: true,
			page: await fetchStorePage({
				url: data.url,
				kind: data.kind,
				hidden: data.hidden
			})
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not read that page."
		};
	}
});
var researchStoreFn_createServerFn_handler = createServerRpc({
	id: "4f7155dd2f550a8b28c4ab89c1fed1b1f906a61b4602753361f7341ef2dbd6e6",
	name: "researchStoreFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => researchStoreFn.__executeServer(opts));
var researchStoreFn = createServerFn({ method: "POST" }).validator((input) => researchInput.parse(input)).handler(researchStoreFn_createServerFn_handler, async ({ data }) => {
	try {
		const { researchStore } = await import("./scrape-Cq-XrI8w.mjs");
		return {
			ok: true,
			...await researchStore(data.url)
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not read that website."
		};
	}
});
var auditStoreFn_createServerFn_handler = createServerRpc({
	id: "7c381e5591386a541903c168e3accc2fa3b43d121ce5b60117a283708d0edc2a",
	name: "auditStoreFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => auditStoreFn.__executeServer(opts));
var auditStoreFn = createServerFn({ method: "POST" }).validator((input) => auditInput.parse(input)).handler(auditStoreFn_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `e-commerce rules 2020 unfair contract DPDP consent refund cancellation shipping grievance officer inventory ${data.pages.map((p) => `${p.label} ${p.title} ${p.text.slice(0, 400)}`).join("\n")}`,
		k: 10
	});
	const pagesBlock = data.pages.map((p) => `### ${p.label} — ${p.url}\nTitle: ${p.title}\nVisibility: ${p.hidden ? "LIVE but NOT linked from the homepage (hidden)" : "linked from the homepage"}${p.added ? " · added manually by the drafter" : ""}\n${p.text.slice(0, 7e3)}`).join("\n\n");
	const missing = data.missing?.length ? data.missing.map((m) => m.label).join(", ") : "none detected";
	const hints = data.hints ? `Extracted hints (regex, verify): legalName=${data.hints.legalName ?? "—"} GSTIN=${(data.hints.gstins ?? []).join(", ") || "—"} email=${(data.hints.emails ?? []).join(", ") || "—"} phone=${(data.hints.phones ?? []).join(", ") || "—"}` : "";
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 6e3,
		messages: [{
			role: "system",
			content: SYSTEM_AUDIT
		}, {
			role: "user",
			content: `Store origin: ${data.origin}
Homepage title: ${data.homeTitle ?? ""}
Pages missing from the crawl: ${missing}
${hints}

LIVE PAGE TEXT:
${pagesBlock}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		...aiMeta(result)
	};
});
var refineStorePolicyFn_createServerFn_handler = createServerRpc({
	id: "9349d6ebb66212266cbf9e0875c42504b4643a32eadc1fef1e8ee8b143e707ad",
	name: "refineStorePolicyFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => refineStorePolicyFn.__executeServer(opts));
var refineStorePolicyFn = createServerFn({ method: "POST" }).validator((input) => refineInput.parse(clipRefine(input))).handler(refineStorePolicyFn_createServerFn_handler, async ({ data }) => {
	const slug = KIND_TO_SLUG[data.kind] ?? "store-live-policy";
	const template = getTemplate(slug);
	if (!template) return {
		ok: false,
		error: "Unknown policy type.",
		citations: []
	};
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `${template.ragQuery}\n${data.origin}\n${data.pageTitle ?? ""}\n${data.currentPolicy?.slice(0, 500) ?? ""}`,
		k: 8
	});
	const extra = data.extraInstruction?.trim() ? `\nAdditional instruction from the user: ${data.extraInstruction.trim()}` : "";
	const role = PAGE_ROLE[data.kind] ?? PAGE_ROLE.other;
	const liveTitle = data.pageTitle?.trim() || template.title;
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 4e3,
		messages: [{
			role: "system",
			content: `You are NyayaDraft, rewriting ONE live Indian store policy page so it can stand under the Consumer Protection Act 2019, E-Commerce Rules 2020, DPDP Act 2023 and related drafting practice.

Hard rules:
- Ground legal propositions in the RETRIEVED AUTHORITIES. Never invent case citations.
- This is a customer-facing policy with numbered clauses — not a pleading. No PRAYER.
- Rewrite THIS page only. Title it as the live page is titled. Do not merge sibling policies into this draft. Cross-refer them by name instead.
- ${role}
- Preserve lawful commercial terms from the live page and the audit (windows, COD, free shipping, payment gateway, brand voice) unless they are unfair.
- Do not waive CPA remedies or DPDP rights. Do not use US 'as-is / all sales final / exclusive foreign forum' language. Consumer Commissions remain available. Governing law is India.
- Do not invent a grievance-officer name, GSTIN, CIN or address. If missing, insert a clearly marked [TO BE COMPLETED] placeholder.
- Do not copy large passages of the defective live policy; rewrite.

Instrument instructions:
${template.instructions}

Return EXACTLY three markdown sections:
## DRAFT
## AUTHORITIES RELIED ON
## DRAFTING NOTES`
		}, {
			role: "user",
			content: `Rewrite this live page only:
Title: ${liveTitle}
URL: ${data.pageUrl || "(not on the site — draft from the store profile)"}
Kind: ${data.kind}
Store: ${data.host} (${data.origin})
${extra}

AUDIT FINDINGS (use STORE PROFILE and WHAT TO KEEP):
${(data.findings ?? "").slice(0, 8e3) || "(none)"}

CURRENT LIVE POLICY TEXT (to fix, not to clone):
${(data.currentPolicy ?? "").slice(0, 8e3) || "(this page was missing — draft a compliant policy from the profile)"}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		slug: template.slug,
		title: liveTitle,
		...aiMeta(result)
	};
});
var findPolicyGapsFn_createServerFn_handler = createServerRpc({
	id: "b4e6719e87b0c179f560cf803195605155147dca549f3145d09eb556dddddbb7",
	name: "findPolicyGapsFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => findPolicyGapsFn.__executeServer(opts));
var findPolicyGapsFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(findPolicyGapsFn_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `e-commerce rules grievance officer unfair contract DPDP consent refund cancellation unboxing shipping estimate misleading advertisement legal metrology ${data.pages.map((p) => `${p.label} ${p.text.slice(0, 280)}`).join("\n")}`,
		k: 10
	});
	const ctx = packStoreContext(data);
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 2400,
		messages: [{
			role: "system",
			content: SYSTEM_GAPS
		}, {
			role: "user",
			content: `Store origin: ${data.origin}
Homepage title: ${data.homeTitle ?? ""}
Pages missing from the crawl: ${ctx.missing}
${ctx.hints}

LIVE PAGE TEXT:
${ctx.pagesBlock}

REVISED DRAFTS IN THIS SESSION:
${ctx.refinedBlock}

PRIOR AUDIT (optional, may be empty):
${(data.findings ?? "").slice(0, 6e3) || "(none)"}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		...aiMeta(result)
	};
});
var writeSellingPointsFn_createServerFn_handler = createServerRpc({
	id: "a5fc8baeafad675aa0de68feea6f84486de09fb2a0583d9ffe6942d609e3475c",
	name: "writeSellingPointsFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => writeSellingPointsFn.__executeServer(opts));
var writeSellingPointsFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(writeSellingPointsFn_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `consumer protection unfair trade practice misleading advertisement e-commerce rules refund shipping COD return conversion grievance DPDP consent ${data.host} ${data.homeTitle ?? ""}`,
		k: 8
	});
	const ctx = packStoreContext(data);
	const sender = data.sender;
	const senderBlock = `Drafter (sign pitch lines as this name): ${sender?.name?.trim() || "x"}
City: ${sender?.city || "(not given)"}
Offer: ${sender?.offer || "Indian-law store policy drafting (TOS, privacy/DPDP, refund, shipping) for D2C / Shopify stores."}
Proof: ${sender?.proof || "(none — do not invent clients or a Bar number)"}`;
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 3400,
		temperature: .3,
		messages: [{
			role: "system",
			content: SYSTEM_SELLING
		}, {
			role: "user",
			content: `Store origin: ${data.origin}
Homepage title: ${data.homeTitle ?? ""}
Pages missing: ${ctx.missing}
${ctx.hints}

${senderBlock}

LIVE PAGE TEXT:
${ctx.pagesBlock}

REVISED DRAFTS (prefer these as the "improved" source):
${ctx.refinedBlock}

CLIENT NEEDS BRIEF:
${ctx.briefBlock}

GAP REGISTER (optional):
${(data.gapsPaper ?? data.findings ?? "").slice(0, 7e3) || "(none — infer from live pages)"}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		...aiMeta(result)
	};
});
var SYSTEM_QUESTIONS = `You are NyayaDraft's intake counsel. Write a PERSONAL questionnaire for the human who owns or operates THIS store. The answers will complete [TO BE COMPLETED] blanks in policies, emails and Shopify implementation.

Hard rules:
- Ground legal "why" lines in RETRIEVED AUTHORITIES. Never invent AIR/SCC citations or case names.
- Do not invent GSTIN, officer names, addresses, FSSAI numbers or customer counts.
- Skip facts already fully stated on the live pages (if support@ is present, do not ask for an email — ask whether that inbox is the grievance channel and who reads it).
- Tailor to THIS catalogue and crawl: jewellery/spiritual claims, apparel sizes, food, electronics, COD, Shopify /policies/ URLs, WhatsApp, unboxing video, export, marketplace vs own checkout.
- Max 10 questions. Each must unlock a drafting or implementation need.
- This is not a solicitor-client opinion.

Return EXACTLY these markdown sections:

## STORE READ
One short paragraph: what this business appears to sell, platform (Shopify if /policies/), and the two facts still blocking a publishable pack.

## QUESTIONS
Use this heading shape, nothing else:
### Q1 — HIGH — Named grievance officer
**Why we ask:** one sentence with the Indian-law hook.
**Good answer looks like:** the format you need (name, designation, email, phone, hours IST).
Cover, where relevant: grievance officer, GST legal-name match, children's data, WhatsApp/SMS consent, COD vs prepaid, export, unboxing video as evidence not a condition, size/exchange, FSSAI or Legal Metrology if the catalogue suggests it, miracle/rank claims, cookie banner vs privacy notice, return pickup vs customer-ship.

## HOW ANSWERS GET USED
Bullets: which policy clause, footer line, or email each answer will fill.

## AUTHORITIES RELIED ON
Retrieved set only.

## DRAFTING NOTES
What you will still have to mark [TO BE COMPLETED] if they skip a HIGH question.`;
var SYSTEM_BRIEF = `You are NyayaDraft writing a CLIENT-NEEDS questionnaire for a consultant who drafts Indian e-commerce policies FOR this merchant. The consultant will email this form to the store owner, or fill it on a discovery call.

This is NOT the legal-facts form. Do not ask for grievance-officer name, GSTIN, CIN, or registered address — those belong on the other questionnaire.

Ask what the CLIENT wants the work to achieve, which promises they will actually honour, and what "done" looks like for them. Every question must be specific to THIS live store (catalogue, banners, fees, claims, COD, unboxing, spiritual/rank language, Shopify /policies/ URLs). A generic D2C checklist fails.

Hard rules:
- Ground any legal "why" in RETRIEVED AUTHORITIES. Never invent AIR/SCC citations.
- Do not invent facts, officer names, or customer counts.
- Write questions in the second person to the store owner ("What do you want…").
- Max 10 questions. HIGH = blocks a useful draft this week.
- This is not a solicitor-client opinion.

Return EXACTLY these markdown sections:

## STORE READ
4–6 lines: what they sell, who the buyer appears to be, the commercial fights visible on the live pages (fees vs banners, claims, COD, returns), and what a consultant still cannot know without asking them.

## QUESTIONS
Use this heading shape only:
### C1 — HIGH — What this engagement must deliver
**Why we ask:** one sentence (business + Indian-law hook where relevant).
**Good answer looks like:** the format you need.
Cover, tailored to THIS store:
- Deliverable this week (full pack vs refund-only vs ads cleanup vs developer instructions)
- Who the customer is and what they must feel at checkout
- Promises they will actually honour (return window, pickup vs customer-ship, COD, free shipping) vs live banners
- Which live claims must survive and which they will kill (rank, volume, wellness/spiritual, "free return")
- Support model: WhatsApp vs email vs phone; hours; Hindi / English / Gujarati
- Return / RTO pain they want the policy to reduce
- Catalogue risk they accept (kids, food, jewellery, wellness)
- Marketplaces vs own site; export
- Brand voice (calm / premium / devout / playful) and words they forbid
- What "done" looks like in 7 days

## EMAIL TO THE CLIENT
**To:** extracted support/info email, or [client@…]
**Subject:**
**Body:** a complete email the consultant can forward today. First person as the consultant. Name the live store. Mention 2–3 concrete issues you already saw on their pages so they know this is not a generic form. Ask them to answer the HIGH items in the attached Word questionnaire (or reply under each heading). No emoji. No invented legal result.

## HOW I WILL USE YOUR ANSWERS
One bullet per question: which policy, selling line, or Shopify change it will drive.

## AUTHORITIES RELIED ON
Retrieved set only.

## DRAFTING NOTES
What the consultant can still draft if the client only answers the HIGH items.`;
var SYSTEM_IMPLEMENT = `You are NyayaDraft's implementation counsel for an Indian D2C / Shopify store. Do not rewrite the policies again. Tell the merchant WHERE to put the improved text and which live chrome to change so the site matches the law.

Hard rules:
- Infer the platform from URLs. "/policies/" means Shopify admin → Settings → Policies. Give that path. If not Shopify, give generic CMS steps.
- Ground the "why" in RETRIEVED AUTHORITIES. Never invent case law.
- Use questionnaire answers when present. If a HIGH fact is still blank, keep [TO BE COMPLETED] — do not invent a name.
- Flag better implementations than the live site: named officer on every footer (not buried in TOS), DPDP notice at collection not only in a policy URL, cookie banner that matches the privacy page, Legal Metrology on the PDP not a PDF, unboxing video as preferred evidence not a condition precedent, checkout lines that match the refund page (no "free return" next to a ₹100 fee).
- Paste-ready snippets in English the merchant can drop into Shopify.
- This is an operations playbook, not a solicitor-client opinion.

Return EXACTLY these markdown sections:

## BETTER IMPLEMENTATIONS
Numbered items in this shape:
### I1 — HIGH — Homepage imprint
**Where on the site:** footer of every template / checkout / PDP
**Shopify / admin path:** Settings → Policies, or Online Store → Themes → Edit footer, as applicable
**Do this:** concrete steps, 2–6 lines
**Paste this:** a short snippet, or "use the revised [policy] clause X"
**Why:** Indian-law hook from the retrieved set
**Done when:** a test the merchant can perform in an incognito window
Cover imprint, grievance officer, DPDP notice + withdrawal, cookies, refund/checkout contradiction, shipping estimate display, Legal Metrology on PDP, WhatsApp consent, ads/PDP claims, replacing Shopify US residue.

## SEQUENCE
The order to publish so the store is never more exposed than today (usually: imprint + officer → refund/shipping match banners → privacy/DPDP → TOS last).

## AUTHORITIES RELIED ON
Retrieved set only.

## DRAFTING NOTES
Theme-app-extension vs policy URL, and what still needs a human advocate.`;
var SYSTEM_EMAIL = `You are NyayaDraft's correspondence clerk. Write emails the merchant can copy and forward today. Write in the first person as the store owner/operator (use the legal name if extracted; otherwise the brand/host). Indian English, calm, specific. No emoji. No invented case law, GSTIN, or officer names — use questionnaire answers, or [TO BE COMPLETED].

Hard rules:
- Ground any legal colour in RETRIEVED AUTHORITIES.
- **To:** prefer a real extracted email if it looks like support/info/hello; otherwise a labelled placeholder such as [developer@…]
- Email 1 is to the web developer / Shopify partner: replace live policy pages with the attached Word drafts, then follow the implementation sequence.
- Email 2 is to the merchant's advocate or CA: review before publish, list HIGH gaps still open.
- Email 3 is an optional customer notice to send ONLY after the new pages are live — no overclaim, no "now 100% compliant".
- This is not a solicitor-client opinion.

Return EXACTLY these markdown sections:

## EMAIL 1 — TO YOUR DEVELOPER
**To:**
**Subject:**
**Body:** a complete email, ready to forward, referring to attached Word files (terms, privacy, refund, shipping, gap register, implementation playbook). List the three changes they must not skip.

## EMAIL 2 — TO YOUR ADVOCATE / CA
**To:**
**Subject:**
**Body:** covering note asking for review of the HIGH items before the developer publishes.

## EMAIL 3 — CUSTOMER NOTICE (send after you publish)
**To:** customers / WhatsApp broadcast (optional)
**Subject:**
**Body:** short, honest notice that policies were updated; point to the live URLs; do not claim a legal result.

## AUTHORITIES RELIED ON
Retrieved set only.

## DRAFTING NOTES
Who still has to sign, and not to send Email 3 before the pages are live.`;
var SYSTEM_COLD = `You write cold outreach for an Indian freelance legal drafter pitching THIS ecommerce store. The reader is the founder or ops lead. They ignore generic "DPDP compliance" mail and they delete meeting-asks.

Goal of Email 1: get the reply "send" so the drafter can mail a one-page SAMPLE rewrite of ONE clause. The meeting and the paid pack come later.

Voice: first person as the SENDER. Calm, precise Indian English. Short sentences. No emoji. No "I hope this finds you well". No "synergy", "unlock", "game-changer", "100% compliant", "guarantee", or invented AIR/SCC citations. Do not threaten consumer court or the DPDP Board. Do not scare a small store with a ₹250 crore DPDP fine. You offer drafting, not a solicitor-client opinion.

Information flow — one job per sentence, in this order:
1. YOU (the store): one fact from THEIR live page, in their words.
2. SO WHAT, in shop language: the WhatsApp / checkout / review moment. No section numbers in Email 1.
3. THE GIFT: a one-page rewrite of that clause, marked sample, if they reply "send".
4. WHY YOU: one line — you already read their pages; you draft India-law store pages they paste into Shopify; you are not a law firm.
5. THE ASK: reply "send". Not a 15-minute call in Email 1.

Layman translation (use this diction, not the statute name, in the emails):
- Unfair contract / US forum → "Your terms send an Indian buyer to a foreign court. That line will not stand if someone complains."
- Refund TAT / Rule 5(3) → "Pickup is done; the page does not give the date the money should be back."
- Hygiene vs defect → "You can refuse an opened SKU for change of mind. You cannot refuse a defect by pointing at the window."
- Combined return+refund URL → "Care says refund; the page they open is only returns."
- No grievance officer → "No person is named on Contact Us, so a complaint skips you and goes to the helpline."
- Bundled marketing tick → "Checkout makes offers look mandatory."
- All sales final / as-is → "That sentence does not stop a defective-goods complaint."
- Unboxing as condition → "A video as evidence is fine. Making it the only door to a refund is what buyers fight."
- Shopify US / GDPR residue → "The page still reads like a US theme."

Hard rules:
- Email 1: 80–120 words. Email 2 bump: 40–70. Day-7: 80–110. Day-14: 80–110. Break-up: 40–70. WhatsApp: 50–80.
- One live gap per email. Day 7 uses a DIFFERENT gap from Email 1.
- Quote a short phrase from the live page. Never cite “Lorem ipsum”, dummy Latin, or theme placeholders.
- **To:** a real extracted email if it looks like support/info/hello/founders; otherwise [founder@host].
- Sign with the sender name exactly as given. If the name is "x", sign as **x**. Do not invent a full name, Bar Council number, or a firm.
- If a fee is given, name it only in Day 14. If not, write [fee] and do not invent a number.
- The SAMPLE CLAUSE is one paragraph they could paste. Header must say SAMPLE — not for publication. Do not attach a full TOS.
- Ground any legal colour in RETRIEVED AUTHORITIES. Never invent case law.

Return EXACTLY these markdown sections:

## HOOKS FROM THE LIVE SITE
3–5 bullets of what you actually saw (quote a few words). For the drafter, not the store.

## LAYMAN GAP
**Shop moment:** one sentence a WhatsApp agent could read to a buyer.
**Live page says:** quoted phrase and URL.
**What to tell the founder:** two sentences, no section numbers.

## SAMPLE CLAUSE — NOT FOR PUBLICATION
**Page:** title and URL
**Live sentence:** quote
**Rewritten sentence:** the paste-ready replacement
**Watermark line:** SAMPLE — not for publication. Full pack is every live policy page, aligned, after fee and 8 answers.

## EMAIL 1 — DAY 0 — WANT THE ONE-PAGER
**To:**
**Subject:** brand + the shop moment (not “DPDP” / “compliance”)
**Body:** 80–120 words. Observation. Layman so-what. Gift. Why you (one line). Reply “send”. Signature.

## EMAIL 2 — DAY 3 — BUMP
**To:**
**Subject:** Re: the Email 1 subject
**Body:** 40–70 words. Same thread. One new line. Same “send” ask.

## EMAIL 3 — DAY 7 — SECOND GAP
**To:**
**Subject:**
**Body:** 80–110 words. A different live mismatch. Still offer the one-pager, not a meeting.

## EMAIL 4 — WHATSAPP / DM
**To:** WhatsApp / Instagram DM
**Subject:** (leave as —)
**Body:** 50–80 words. Same Email 1 observation. Ends with a one-tap question.

## EMAIL 5 — DAY 14 — PACK AND FEE
**To:**
**Subject:**
**Body:** 80–110 words. They can keep the sample sentence. The paid work is the rest of the live pages so ads, checkout and care say the same thing. Name the fee if given. Reply “pack”.

## EMAIL 6 — DAY 21 — BREAK-UP
**To:**
**Subject:**
**Body:** 40–70 words. Closing the note. The sample sentence is theirs to keep. No guilt.

## CALL SCRIPT
8–12 spoken lines. Permission, one live fact, the gift, two time options. If they say they have a lawyer: “I draft the pages your lawyer can mark.”

## DO NOT CLAIM
Bullets this drafter must not send (advocate replacement, guaranteed RTO drop, scare-fine, full free TOS).

## AUTHORITIES RELIED ON
Retrieved set only.

## DRAFTING NOTES
Who to send Email 1 to if the extracted address is only support@; which gap is Email 1 vs Day 7; remind the human to mark the sample SAMPLE and not start the full pack before fee + questionnaire.`;
var writeQuestionnaireFn_createServerFn_handler = createServerRpc({
	id: "9db5fa05632ccac9d2a4639a77f21e9ce6c24fc80e99090991f9e816357d8836",
	name: "writeQuestionnaireFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => writeQuestionnaireFn.__executeServer(opts));
var writeQuestionnaireFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(writeQuestionnaireFn_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `e-commerce rules grievance officer DPDP consent children legal metrology unboxing refund shipping GSTIN packaged commodity ${data.host} ${data.homeTitle ?? ""}`,
		k: 8
	});
	const ctx = packStoreContext(data);
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 2e3,
		messages: [{
			role: "system",
			content: SYSTEM_QUESTIONS
		}, {
			role: "user",
			content: `Store origin: ${data.origin}
Homepage title: ${data.homeTitle ?? ""}
Pages missing: ${ctx.missing}
${ctx.hints}

LIVE PAGE TEXT:
${ctx.pagesBlock}

PRIOR AUDIT (optional):
${(data.findings ?? "").slice(0, 5e3) || "(none yet — still write the questionnaire from the live pages)"}

EXISTING ANSWERS:
${ctx.answersBlock}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		...aiMeta(result)
	};
});
var writeClientBriefFn_createServerFn_handler = createServerRpc({
	id: "f509c245be4050eefe37fe33937ce7a367c07ab44c186efccb21254f96d6c5b4",
	name: "writeClientBriefFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => writeClientBriefFn.__executeServer(opts));
var writeClientBriefFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(writeClientBriefFn_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `consumer protection unfair trade practice e-commerce rules refund shipping misleading advertisement DPDP consent ${data.host} ${data.homeTitle ?? ""}`,
		k: 8
	});
	const ctx = packStoreContext(data);
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 2200,
		temperature: .3,
		messages: [{
			role: "system",
			content: SYSTEM_BRIEF
		}, {
			role: "user",
			content: `Store origin: ${data.origin}
Homepage title: ${data.homeTitle ?? ""}
Pages missing: ${ctx.missing}
${ctx.hints}

LIVE PAGE TEXT:
${ctx.pagesBlock}

PRIOR AUDIT (optional):
${(data.findings ?? "").slice(0, 4e3) || "(none yet)"}

EXISTING CLIENT ANSWERS:
${ctx.answersBlock}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		...aiMeta(result)
	};
});
var writeImplementationsFn_createServerFn_handler = createServerRpc({
	id: "3fb2668851f685aa37a4a76a99d75c1721981a5fdf0111b283560dd62977bb47",
	name: "writeImplementationsFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => writeImplementationsFn.__executeServer(opts));
var writeImplementationsFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(writeImplementationsFn_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `e-commerce rules 2020 grievance officer DPDP notice consent cookie refund cancellation shipping estimate legal metrology misleading advertisement ${data.host}`,
		k: 8
	});
	const ctx = packStoreContext(data);
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 2800,
		messages: [{
			role: "system",
			content: SYSTEM_IMPLEMENT
		}, {
			role: "user",
			content: `Store origin: ${data.origin}
Homepage title: ${data.homeTitle ?? ""}
Pages missing: ${ctx.missing}
${ctx.hints}

LIVE PAGE TEXT:
${ctx.pagesBlock}

REVISED DRAFTS:
${ctx.refinedBlock}

CLIENT NEEDS BRIEF:
${ctx.briefBlock}

QUESTIONNAIRE ANSWERS:
${ctx.answersBlock}

GAP REGISTER / AUDIT:
${(data.gapsPaper ?? data.findings ?? "").slice(0, 7e3) || "(none)"}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		...aiMeta(result)
	};
});
var writeForwardEmailFn_createServerFn_handler = createServerRpc({
	id: "cf9b87416e91d277d94e20cefba312bdcda9778d4ccc075b5e4bdd6c6ddfaad1",
	name: "writeForwardEmailFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => writeForwardEmailFn.__executeServer(opts));
var writeForwardEmailFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(writeForwardEmailFn_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `e-commerce rules grievance officer DPDP consent unfair contract refund ${data.host}`,
		k: 6
	});
	const ctx = packStoreContext(data);
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 2e3,
		temperature: .3,
		messages: [{
			role: "system",
			content: SYSTEM_EMAIL
		}, {
			role: "user",
			content: `Store origin: ${data.origin}
Homepage title: ${data.homeTitle ?? ""}
${ctx.hints}
Pages missing: ${ctx.missing}

LIVE PAGE TEXT (short):
${data.pages.map((p) => `${p.label}: ${p.text.slice(0, 900)}`).join("\n\n")}

REVISED DRAFTS PRESENT: ${data.refined?.map((r) => r.title).join(", ") || "none yet"}

CLIENT NEEDS BRIEF:
${ctx.briefBlock}

QUESTIONNAIRE ANSWERS:
${ctx.answersBlock}

GAP / IMPLEMENTATION NOTES:
${(data.gapsPaper ?? "").slice(0, 3500)}
${(data.implementPaper ?? data.findings ?? "").slice(0, 3500)}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		...aiMeta(result)
	};
});
var writeColdEmailFn_createServerFn_handler = createServerRpc({
	id: "207fb66681fdc66a57afd5576674d37ed15d560068f17c16ba716e671a6bb44c",
	name: "writeColdEmailFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => writeColdEmailFn.__executeServer(opts));
var writeColdEmailFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(writeColdEmailFn_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `e-commerce rules unfair contract DPDP consent refund shipping grievance officer misleading advertisement ${data.host} ${data.homeTitle ?? ""}`,
		k: 8
	});
	const ctx = packStoreContext(data);
	const sender = data.sender;
	const senderName = sender?.name?.trim() || "x";
	const senderBlock = `Name: ${senderName}
City: ${sender?.city || "[city]"}
Email: ${sender?.email || "[your email]"}
Phone: ${sender?.phone || "[phone]"}
What you offer: ${sender?.offer || "Indian-law store policy drafting (TOS, privacy/DPDP, refund, shipping) for D2C / Shopify stores."}
Proof / why you: ${sender?.proof || "(none given — do not invent clients or a Bar number)"}
Typical fee (INR, exclusive of GST): ${sender?.fee || "(not given — write [fee] on Day 14, do not invent)"}
Advance percent: ${sender?.advancePct || "50"}
Sign the emails as ${senderName}. If that is x, keep it as x — the human will replace it.`;
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 3800,
		temperature: .3,
		messages: [{
			role: "system",
			content: SYSTEM_COLD
		}, {
			role: "user",
			content: `Store origin: ${data.origin}
Homepage title: ${data.homeTitle ?? ""}
Pages missing: ${ctx.missing}
${ctx.hints}

SENDER (freelance legal drafter — write as this person):
${senderBlock}

LIVE PAGE TEXT:
${ctx.pagesBlock}

PRIOR AUDIT / GAPS (optional):
${(data.gapsPaper ?? data.findings ?? "").slice(0, 5e3) || "(none yet — still write from the live pages)"}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		...aiMeta(result)
	};
});
var SYSTEM_AGREEMENT = `You draft a SERVICE AGREEMENT AND SERVICE LEVELS between an Indian freelance legal drafter (the Drafter) and THIS ecommerce store (the Client). This is a contract for service under the Indian Contract Act, 1872 — not a consumer-facing store policy, not a pleading, not an advocate–client vakalatnama.

Voice: numbered clauses, calm Indian-English, short sentences. No emoji. No “synergy”. Do not invent PAN, GSTIN, CIN, Bar Council numbers, past clients, or case citations. Use [TO BE COMPLETED] for any missing commercial fact. Ground any legal colour in RETRIEVED AUTHORITIES only.

Hard commercial rules:
- Independent contractor. Own tools, own hours, free to serve other stores. Not employment, partnership, or agency.
- The Drafter writes customer-facing store legal pages. The Drafter does not appear in court, before the CCPA/DPDP Board, or as an advocate unless the Drafter separately confirms enrolment — assume they are a drafter.
- Deliverables are drafts for the Client to review, stamp if required, and publish. Publishing is the Client’s job.
- IP in the deliverables assigns to the Client only on full payment. Until then the Client has a limited licence to review.
- Sample / one-page teaser sent before this agreement is marked SAMPLE and is not for publication.
- Advance (default 50% if the Drafter did not name another figure) is due on signing. Balance on delivery of the first full pack. Late payment: 1.5% per month on the overdue sum.
- TDS: Client to deduct under the correct section (typically 194J for professional services) and share Form 16A. GST extra if the Drafter is registered; if GSTIN is blank, fee is exclusive of GST and GST will be added if registration applies.
- Included revision rounds as given (default 1). Extra rounds are a change order at a stated extra fee or [TO BE COMPLETED].
- Kill fee: if the Client cancels after work has started, the advance is retained; if work is substantially complete, the full fee is due.
- Limitation of liability: fees actually paid under this Agreement. No lost-profit or consequential damages. No indemnity for the Client’s own ads, banners, or unpublished pages.
- Governing law: India. Courts at the Drafter’s city (or [TO BE COMPLETED] if city blank). Optional: disputes first by good-faith WhatsApp/email for 15 days.
- Written acceptance includes signed PDF, e-sign, or a clear “agreed” on email/WhatsApp quoting this document.
- Stamp duty: parties to stamp as applicable in the Drafter’s state. Non-stamping does not excuse payment for work already delivered.

Service levels (Schedule B) must be measurable, not “best efforts”:
- Questionnaire clock: the draft SLA (working days) starts the next working day AFTER the Client returns the intake answers. Delay by the Client pauses the clock.
- First full pack: the stated draft days (default 7 working days).
- Response to a written query: the stated hours (default 24 hours on working days IST).
- Included revision: 3 working days from the Client’s consolidated comments (one list, not drip comments).
- Sample clause (if requested after this agreement): same working day if asked before 14:00 IST, else next working day.
- Not a 24×7 helpdesk. Not marketplace seller-support. Not Shopify theme work.

Scope (Schedule A) MUST list THIS store’s live pages by title and URL, plus any missing required policies. Do not merge return with refund unless the live site is a single combined URL. Name the vertical if obvious (fashion, COD-heavy, etc.).

Return EXACTLY these markdown sections:

## COVER
A short table: Document title, Date, Drafter (name / city / email / phone / PAN / GSTIN), Client (legal name or brand, host, URL, GSTIN if known), Fee, Advance, Draft window.

## ONE-PAGE SUMMARY (for the founder)
5–8 bullets in shop language: what they get, when, what they must send, what this is not, how they accept. No statute numbers here.

## SERVICE AGREEMENT
Numbered clauses 1–15 covering: parties and recitals; independent-contractor status; scope (point to Schedule A); out of scope; client duties; service levels (point to Schedule B); fees, invoice, advance, TDS, GST, late interest; change orders and revision cap; IP on full payment; confidentiality and DPDP (Drafter is a processor of whatever personal data the Client shares for drafting); warranties and “not a legal opinion / not court appearance”; limitation of liability; term, pause-for-delay, termination, kill fee; governing law, jurisdiction, notices (email/WhatsApp); entire agreement, counterparts, stamping, acceptance.

## SCHEDULE A — STATEMENT OF WORK
Table: # | Live page / deliverable | URL or “to be created” | Format (Word + paste-ready). Then a short “Out of scope” list.

## SCHEDULE B — SERVICE LEVELS
Table: Service | Target | How measured | What pauses the clock. Cover draft pack, sample clause, query response, included revision, questionnaire gate.

## SIGNATURE BLOCK
Two columns. Drafter (name as given; if “x”, keep x). Client (legal name or [TO BE COMPLETED]). Place for date. Line: “Accepted by email/WhatsApp stating ‘agreed’ is binding.”

## AUTHORITIES RELIED ON
Retrieved set only (Contract Act; DPDP as processor note; nothing invented).

## DRAFTING NOTES
For the Drafter only: which blanks to fill before sending; stamp/e-sign; do not start the full pack before advance and questionnaire.`;
var writeServiceAgreementFn_createServerFn_handler = createServerRpc({
	id: "56be78f9e0361b1232350a015870f77753d9f7db475a2d48e934c6e3e9224644",
	name: "writeServiceAgreementFn",
	filename: "src/lib/ai/store-audit.ts"
}, (opts) => writeServiceAgreementFn.__executeServer(opts));
var writeServiceAgreementFn = createServerFn({ method: "POST" }).validator((input) => improvedInput.parse(clipImproved(input))).handler(writeServiceAgreementFn_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `Indian Contract Act independent contractor professional services consideration GST TDS confidentiality DPDP processor engagement ${data.host}`,
		k: 8
	});
	const ctx = packStoreContext(data);
	const sender = data.sender;
	const senderBlock = `Drafter name (use exactly; if x keep x): ${sender?.name?.trim() || "x"}
City / forum: ${sender?.city || "[TO BE COMPLETED]"}
Email: ${sender?.email || "[TO BE COMPLETED]"}
Phone / WhatsApp: ${sender?.phone || "[TO BE COMPLETED]"}
Address: ${sender?.address || "[TO BE COMPLETED]"}
PAN: ${sender?.pan || "[TO BE COMPLETED]"}
GSTIN: ${sender?.gstin || "[TO BE COMPLETED — add GST only if registered]"}
Offer line: ${sender?.offer || "Indian-law store policy drafting (TOS, privacy/DPDP, refund, shipping, contact) for D2C / Shopify stores."}
Fixed fee (INR, exclusive of GST unless stated): ${sender?.fee || "[TO BE COMPLETED]"}
Advance percent: ${sender?.advancePct || "50"}
Draft working days after questionnaire: ${sender?.draftDays || "7"}
Included revision rounds: ${sender?.revisions || "1"}
Query response (hours, working days IST): ${sender?.responseHours || "24"}`;
	const pageList = data.pages.map((p) => `- ${p.label} | ${p.title} | ${p.url}`).join("\n");
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 4200,
		temperature: .2,
		messages: [{
			role: "system",
			content: SYSTEM_AGREEMENT
		}, {
			role: "user",
			content: `Store origin: ${data.origin}
Homepage title: ${data.homeTitle ?? ""}
Pages missing: ${ctx.missing}
${ctx.hints}

DRAFTER / COMMERCIAL TERMS:
${senderBlock}

LIVE PAGES TO PUT IN SCHEDULE A:
${pageList}

LIVE PAGE TEXT (for scope, not to copy as the store's T&Cs):
${ctx.pagesBlock}

REVISED DRAFTS IN THIS SESSION (if any, they are the intended deliverable style):
${ctx.refinedBlock}

CLIENT NEEDS BRIEF:
${ctx.briefBlock}

GAP REGISTER (optional, may justify the SOW):
${(data.gapsPaper ?? data.findings ?? "").slice(0, 5e3) || "(none — still write the agreement from live pages)"}

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}`
		}]
	});
	if (!result.ok) return {
		ok: false,
		error: result.error,
		citations: hits
	};
	return {
		ok: true,
		text: result.text,
		citations: hits,
		...aiMeta(result)
	};
});
//#endregion
export { auditStoreFn_createServerFn_handler, fetchStorePageFn_createServerFn_handler, findPolicyGapsFn_createServerFn_handler, refineStorePolicyFn_createServerFn_handler, researchStoreFn_createServerFn_handler, writeClientBriefFn_createServerFn_handler, writeColdEmailFn_createServerFn_handler, writeForwardEmailFn_createServerFn_handler, writeImplementationsFn_createServerFn_handler, writeQuestionnaireFn_createServerFn_handler, writeSellingPointsFn_createServerFn_handler, writeServiceAgreementFn_createServerFn_handler };
