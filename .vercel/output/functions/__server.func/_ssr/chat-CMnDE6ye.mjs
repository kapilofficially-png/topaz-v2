import { c as string, o as object } from "../_libs/zod.mjs";
import { a as getProvider, i as aiKeysSchema, n as DEFAULT_ORDER, t as DEFAULT_ENABLED } from "./providers-B7LlmDHe.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-CMnDE6ye.js
function aiMeta(result) {
	return {
		provider: result.provider,
		model: result.model,
		fallback: result.fallback
	};
}
function envGrokKey() {
	return process.env.XAI_API_KEY?.trim() || "";
}
function keyFor(id, keys) {
	const pasted = keys?.[id]?.trim() ?? "";
	if (pasted) return pasted;
	if (id === "gemini") return process.env.GEMINI_API_KEY?.trim() || "";
	if (id === "grok") return envGrokKey();
	if (id === "openai") return process.env.OPENAI_API_KEY?.trim() || "";
	if (id === "anthropic") return process.env.ANTHROPIC_API_KEY?.trim() || "";
	if (id === "groq") return process.env.GROQ_API_KEY?.trim() || "";
	return "";
}
function modelFor(def, keys) {
	const chosen = keys?.models?.[def.id]?.trim();
	if (chosen) {
		if (chosen === "gemini-2.0-flash" || chosen === "gemini-1.5-flash") return def.defaultModel;
		if (def.models.includes(chosen) || def.id === "gemini" && (chosen.startsWith("gemini") || chosen.startsWith("gemma"))) return chosen;
	}
	return def.defaultModel;
}
function shouldFallback(status, body) {
	if ([
		401,
		402,
		403,
		429,
		500,
		502,
		503,
		529
	].includes(status)) return true;
	const t = body.toLowerCase();
	return t.includes("quota") || t.includes("resource_exhausted") || t.includes("resource exhausted") || t.includes("rate limit") || t.includes("insufficient") || t.includes("billing") || t.includes("usage") || t.includes("credits") || t.includes("overloaded");
}
function queue(keys, force) {
	if (force && getProvider(force)) return [force];
	const enabled = new Set((keys?.enabled?.length ? keys.enabled : DEFAULT_ENABLED).filter((id) => getProvider(id)));
	const listed = (keys?.order?.length ? keys.order : DEFAULT_ORDER).filter((id) => getProvider(id)).filter((id) => enabled.has(id));
	for (const id of DEFAULT_ORDER) if (enabled.has(id) && !listed.includes(id)) listed.push(id);
	return listed;
}
async function callOpenAi(def, apiKey, model, messages, maxTokens, temperature) {
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${apiKey}`
	};
	if (def.id === "openrouter") {
		headers["HTTP-Referer"] = "https://nyayadraft.app";
		headers["X-Title"] = "NyayaDraft";
	}
	const res = await fetch(def.url ?? "", {
		method: "POST",
		headers,
		body: JSON.stringify({
			model,
			messages,
			max_tokens: maxTokens,
			temperature
		})
	});
	const raw = await res.text();
	if (!res.ok) return {
		ok: false,
		error: `${def.name} returned ${res.status}.`,
		retry: shouldFallback(res.status, raw)
	};
	return {
		ok: true,
		text: JSON.parse(raw).choices?.[0]?.message?.content ?? ""
	};
}
async function callAnthropic(def, apiKey, model, messages, maxTokens, temperature) {
	const system = messages.filter((m) => m.role === "system").map((m) => m.content).join("\n\n");
	const rest = messages.filter((m) => m.role !== "system");
	const res = await fetch(def.url ?? "", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": apiKey,
			"anthropic-version": "2023-06-01"
		},
		body: JSON.stringify({
			model,
			max_tokens: maxTokens,
			temperature,
			system: system || void 0,
			messages: rest.map((m) => ({
				role: m.role,
				content: m.content
			}))
		})
	});
	const raw = await res.text();
	if (!res.ok) return {
		ok: false,
		error: `${def.name} returned ${res.status}.`,
		retry: shouldFallback(res.status, raw)
	};
	return {
		ok: true,
		text: (JSON.parse(raw).content ?? []).filter((p) => p.type === "text").map((p) => p.text ?? "").join("")
	};
}
async function callGemini(def, apiKey, preferred, messages, maxTokens, temperature) {
	const system = messages.filter((m) => m.role === "system").map((m) => m.content).join("\n\n");
	const contents = [];
	for (const m of messages) {
		if (m.role === "system") continue;
		const role = m.role === "assistant" ? "model" : "user";
		const last = contents[contents.length - 1];
		if (last && last.role === role) last.parts[0].text += `\n\n${m.content}`;
		else contents.push({
			role,
			parts: [{ text: m.content }]
		});
	}
	if (!contents.length) contents.push({
		role: "user",
		parts: [{ text: "Continue." }]
	});
	const tryModels = [
		preferred,
		def.defaultModel,
		"gemini-2.5-flash",
		"gemini-3.8-flash"
	].filter((m) => Boolean(m) && m !== "gemini-2.0-flash" && m !== "gemini-1.5-flash").filter((m, i, arr) => arr.indexOf(m) === i);
	let lastError = `${def.name} returned an error.`;
	let lastRetry = true;
	for (const model of tryModels) {
		const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-goog-api-key": apiKey
			},
			body: JSON.stringify({
				systemInstruction: system ? { parts: [{ text: system }] } : void 0,
				contents,
				generationConfig: {
					maxOutputTokens: maxTokens,
					temperature
				}
			})
		});
		const raw = await res.text();
		if (res.status === 404) {
			lastError = `${def.name} model ${model} was not found.`;
			lastRetry = true;
			continue;
		}
		if (!res.ok) {
			lastError = `${def.name} returned ${res.status}.`;
			lastRetry = shouldFallback(res.status, raw);
			if (!lastRetry) return {
				ok: false,
				error: lastError,
				retry: false
			};
			continue;
		}
		const body = JSON.parse(raw);
		const text = (body.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("");
		if (!text.trim()) {
			lastError = body.promptFeedback?.blockReason ? `${def.name} blocked the prompt.` : `${def.name} returned an empty reply.`;
			lastRetry = true;
			continue;
		}
		return {
			ok: true,
			text,
			model
		};
	}
	return {
		ok: false,
		error: lastError,
		retry: lastRetry
	};
}
async function chat(options) {
	const keys = options.keys;
	const allowFallback = keys?.fallback !== false && !options.forceProvider;
	const ids = queue(keys, options.forceProvider);
	const tried = [];
	const temperature = options.temperature ?? .2;
	let lastError = "No drafting model is available.";
	for (let i = 0; i < ids.length; i += 1) {
		const id = ids[i];
		const def = getProvider(id);
		if (!def) continue;
		const apiKey = keyFor(id, keys);
		if (!apiKey) {
			if (id === "grok") lastError = "Grok is not available. Add a Gemini API key under Models to keep drafting.";
			continue;
		}
		const model = modelFor(def, keys);
		tried.push(def.name);
		try {
			let outcome;
			if (def.kind === "gemini") outcome = await callGemini(def, apiKey, model, options.messages, options.maxTokens, temperature);
			else if (def.kind === "anthropic") outcome = await callAnthropic(def, apiKey, model, options.messages, options.maxTokens, temperature);
			else outcome = await callOpenAi(def, apiKey, model, options.messages, options.maxTokens, temperature);
			if (outcome.ok && outcome.text.trim()) return {
				ok: true,
				text: outcome.text,
				provider: id,
				model: "model" in outcome && outcome.model ? outcome.model : model,
				fallback: i > 0
			};
			if (outcome.ok) lastError = `${def.name} returned an empty reply.`;
			else {
				lastError = outcome.error;
				if (!outcome.retry || !allowFallback) return {
					ok: false,
					error: lastError,
					tried
				};
			}
		} catch (err) {
			lastError = err instanceof Error ? err.message : `${def.name} failed.`;
			if (!allowFallback) return {
				ok: false,
				error: lastError,
				tried
			};
		}
	}
	if (!tried.length) return {
		ok: false,
		error: "No drafting model is ready. Grok usage may be exhausted — add a Gemini API key under Models.",
		tried
	};
	return {
		ok: false,
		error: `${lastError} Tried: ${tried.join(", ")}. Add or enable another key under Models.`,
		tried
	};
}
var providerStatusFn = createServerFn({ method: "POST" }).validator((input) => input && typeof input === "object" ? input : {}).handler(createSsrRpc("3aa7874f159443a71e910f8e470884ad747e6f0ac8655d87345502f3bbabf915"));
var testProviderFn = createServerFn({ method: "POST" }).validator((input) => object({
	provider: string().min(2).max(32),
	aiKeys: aiKeysSchema
}).parse(input)).handler(createSsrRpc("4fbc98f425424428229c18156fd4f05a1329fb68d2be5bee2c75b53ef5842f7f"));
var fetchGeminiModelsFn = createServerFn({ method: "POST" }).validator((input) => object({ apiKey: string().max(240).optional() }).parse(input)).handler(createSsrRpc("94b272f0eeb8c6cd6a44aa936db7cea6b7fb569652a71336346d129900a85b97"));
//#endregion
export { testProviderFn as a, providerStatusFn as i, chat as n, fetchGeminiModelsFn as r, aiMeta as t };
