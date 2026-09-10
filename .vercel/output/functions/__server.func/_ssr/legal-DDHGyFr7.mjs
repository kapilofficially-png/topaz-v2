import { a as number, c as string, n as array, o as object, s as record } from "../_libs/zod.mjs";
import { i as aiKeysSchema } from "./providers-B7LlmDHe.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { n as chat, t as aiMeta } from "./chat-CMnDE6ye.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-DDHGyFr7.js
var retrieveInput = object({
	query: string().min(3).max(4e3),
	k: number().int().min(1).max(12).optional(),
	categories: array(string()).optional()
});
var draftInput = object({
	slug: string().min(1).max(80),
	title: string().min(1).max(200),
	instructions: string().min(1).max(4e3),
	facts: record(string(), string()),
	ragQuery: string().min(1).max(4e3),
	aiKeys: aiKeysSchema
});
var refineInput = object({
	slug: string().min(1).max(80),
	title: string().min(1).max(200),
	currentDraft: string().min(20).max(24e3),
	instruction: string().min(3).max(2e3),
	ragQuery: string().min(1).max(4e3),
	aiKeys: aiKeysSchema
});
var askInput = object({
	question: string().min(8).max(2500),
	aiKeys: aiKeysSchema
});
function formatAuthorities(chunks) {
	return chunks.map((c, i) => {
		const note = c.note ? `\nDrafting note: ${c.note}` : "";
		return `[${i + 1}] ${c.citation} — ${c.title} (${c.statute})\n${c.text}${note}`;
	}).join("\n\n");
}
var SYSTEM_DRAFTER = `You are NyayaDraft, an Indian legal drafting aid. You write court-ready and chambers-ready instruments grounded in the RETRIEVED AUTHORITIES supplied with each request.

Hard rules:
- Ground every legal proposition in the retrieved statute or case rows. Never invent AIR, SCC, SCR, or unreported citations. If a holding is not in the retrieved set, do not name the case.
- Prefer BNS / BNSS / BSA (from 1 July 2024) over repealed IPC / CrPC / IEA, and map old section numbers when the facts use them.
- Do not invent facts, dates, amounts, GSTIN, CIN, or party names. Use [TO BE COMPLETED] for blanks.
- Indian English. Numbered clauses. No US/UK boilerplate (as-is waivers, Delaware forum, GDPR legitimate interest) unless the instrument is a store policy and the facts demand an India-law rewrite of that residue.
- This is not a solicitor-client opinion and does not create an advocate–client relationship.

Return EXACTLY three markdown sections, in this order:

## DRAFT
The full instrument.

## AUTHORITIES RELIED ON
Bullets matching the retrieved set only (statute heads and any case rows actually retrieved). If no case was retrieved, write "No case on this point in the local corpus."

## DRAFTING NOTES
Filing/stamping caveats, missing facts, and what an enrolled advocate must verify before the paper leaves chambers.`;
var SYSTEM_ASK = `You are NyayaDraft's library counsel. Answer questions of Indian law using ONLY the retrieved authorities plus uncontroversial procedure. Prefer BNS/BNSS/BSA over repealed IPC/CrPC/IEA. Never invent case citations. If the corpus is thin, say so and answer at a high level.

Structure:
1. Short answer (plain English).
2. Governing provisions (cited).
3. How it plays out in drafting or procedure.
4. Caveats.

Close with: "This is not legal advice. Instruct an enrolled advocate on the facts."`;
var searchAuthorities_createServerFn_handler = createServerRpc({
	id: "fef6b9a14abf3390243bc546041f329f7f4c34640b19142602d5e7dd06359caf",
	name: "searchAuthorities",
	filename: "src/lib/ai/legal.ts"
}, (opts) => searchAuthorities.__executeServer(opts));
var searchAuthorities = createServerFn({ method: "POST" }).validator((input) => retrieveInput.parse(input)).handler(searchAuthorities_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	return { hits: retrieve({
		query: data.query,
		k: data.k ?? 8,
		categories: data.categories
	}).map(({ score: _s, ...rest }) => rest) };
});
var getAuthority_createServerFn_handler = createServerRpc({
	id: "533a8b4c32c06ab444ff7725d6a054040af35976a717f7f732605d9168e68d1f",
	name: "getAuthority",
	filename: "src/lib/ai/legal.ts"
}, (opts) => getAuthority.__executeServer(opts));
var getAuthority = createServerFn({ method: "POST" }).validator((input) => object({ id: string() }).parse(input)).handler(getAuthority_createServerFn_handler, async ({ data }) => {
	const { getChunk } = await import("./retrieve-z2AVaBQ4.mjs");
	return { chunk: getChunk(data.id) ?? null };
});
var listAuthorities_createServerFn_handler = createServerRpc({
	id: "f7e22f2d46bf71f69fff264ae438baf4e0bed29457c15d42a697414a7f8a921a",
	name: "listAuthorities",
	filename: "src/lib/ai/legal.ts"
}, (opts) => listAuthorities.__executeServer(opts));
var listAuthorities = createServerFn({ method: "POST" }).validator((input) => object({
	category: string().optional(),
	q: string().optional()
}).parse(input)).handler(listAuthorities_createServerFn_handler, async ({ data }) => {
	const { listCorpus, retrieve, corpusStats } = await import("./retrieve-z2AVaBQ4.mjs");
	const stats = corpusStats();
	if (data.q && data.q.trim().length >= 2) return {
		stats,
		chunks: retrieve({
			query: data.q,
			k: 24,
			categories: data.category ? [data.category] : void 0
		}).map(({ score: _s, ...c }) => c)
	};
	return {
		stats,
		chunks: listCorpus(data.category)
	};
});
var generateDraft_createServerFn_handler = createServerRpc({
	id: "e01f2916e08d10faea50b5e328a52de250fe16b797113148bf07781efa299c1b",
	name: "generateDraft",
	filename: "src/lib/ai/legal.ts"
}, (opts) => generateDraft.__executeServer(opts));
var generateDraft = createServerFn({ method: "POST" }).validator((input) => draftInput.parse(input)).handler(generateDraft_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const factBlob = Object.entries(data.facts).filter(([, v]) => v && v.trim()).map(([k, v]) => `${k}: ${v}`).join("\n");
	const hits = retrieve({
		query: `${data.ragQuery}\n${data.title}\n${factBlob}`,
		k: 8
	});
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 3200,
		messages: [{
			role: "system",
			content: SYSTEM_DRAFTER
		}, {
			role: "user",
			content: `Instrument: ${data.title} (${data.slug})

Drafting instructions:
${data.instructions}

Facts supplied by the user:
${factBlob || "(none)"}

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
var refineDraft_createServerFn_handler = createServerRpc({
	id: "87860d3d820f6f38f39d1c2f753d6ec6dc7f2142fefac3920dc68b3adc357ebb",
	name: "refineDraft",
	filename: "src/lib/ai/legal.ts"
}, (opts) => refineDraft.__executeServer(opts));
var refineDraft = createServerFn({ method: "POST" }).validator((input) => refineInput.parse(input)).handler(refineDraft_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: `${data.ragQuery}\n${data.instruction}`,
		k: 6
	});
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 3200,
		messages: [{
			role: "system",
			content: SYSTEM_DRAFTER
		}, {
			role: "user",
			content: `Revise the following Indian legal draft (${data.title}).
Revision instruction: ${data.instruction}

Return the full revised document in the same three-section format.

RETRIEVED AUTHORITIES:
${formatAuthorities(hits)}

CURRENT DRAFT:
${data.currentDraft}`
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
var askTheLaw_createServerFn_handler = createServerRpc({
	id: "946f65fb0f70125389cf9076bce1d39727c79c824f29ab692fae036bb8dc46d7",
	name: "askTheLaw",
	filename: "src/lib/ai/legal.ts"
}, (opts) => askTheLaw.__executeServer(opts));
var askTheLaw = createServerFn({ method: "POST" }).validator((input) => askInput.parse(input)).handler(askTheLaw_createServerFn_handler, async ({ data }) => {
	const { retrieve } = await import("./retrieve-z2AVaBQ4.mjs");
	const hits = retrieve({
		query: data.question,
		k: 8
	});
	const result = await chat({
		keys: data.aiKeys,
		maxTokens: 1400,
		temperature: .2,
		messages: [{
			role: "system",
			content: SYSTEM_ASK
		}, {
			role: "user",
			content: `Question: ${data.question}

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
export { askTheLaw_createServerFn_handler, generateDraft_createServerFn_handler, getAuthority_createServerFn_handler, listAuthorities_createServerFn_handler, refineDraft_createServerFn_handler, searchAuthorities_createServerFn_handler };
