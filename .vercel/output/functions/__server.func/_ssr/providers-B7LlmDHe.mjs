import { c as string, n as array, o as object, r as boolean, s as record } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/providers-B7LlmDHe.js
var PROVIDERS = [
	{
		id: "grok",
		name: "Grok (xAI)",
		kind: "openai",
		url: "https://api.x.ai/v1/chat/completions",
		models: [
			"grok-4.5",
			"grok-4-fast-non-reasoning",
			"grok-3-mini"
		],
		defaultModel: "grok-4.5",
		docs: "https://console.x.ai",
		docsLabel: "xAI console",
		note: "Primary. NyayaDraft uses the app’s xAI key first. Paste your own only if you have a separate xAI key.",
		primary: true,
		envKey: "XAI_API_KEY"
	},
	{
		id: "gemini",
		name: "Gemini (Google)",
		kind: "gemini",
		models: [
			"gemini-2.5-flash",
			"gemini-3.8-flash",
			"gemini-3.1-pro-preview",
			"gemini-3.1-flash-lite",
			"gemini-2.5-pro",
			"gemini-flash-latest",
			"gemini-pro-latest"
		],
		defaultModel: "gemini-2.5-flash",
		docs: "https://aistudio.google.com/apikey",
		docsLabel: "Google AI Studio",
		note: "Google AI Studio key. Pre-configured when running in Google AI Studio or set via GEMINI_API_KEY.",
		primary: true,
		recommended: true,
		envKey: "GEMINI_API_KEY"
	},
	{
		id: "groq",
		name: "Groq",
		kind: "openai",
		url: "https://api.groq.com/openai/v1/chat/completions",
		models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"],
		defaultModel: "llama-3.3-70b-versatile",
		docs: "https://console.groq.com/keys",
		docsLabel: "Groq console",
		note: "Fast free-tier OpenAI-compatible API. Good second fallback."
	},
	{
		id: "openai",
		name: "OpenAI",
		kind: "openai",
		url: "https://api.openai.com/v1/chat/completions",
		models: [
			"gpt-4o-mini",
			"gpt-4.1-mini",
			"gpt-4o"
		],
		defaultModel: "gpt-4o-mini",
		docs: "https://platform.openai.com/api-keys",
		docsLabel: "OpenAI platform",
		note: "Paid. gpt-4o-mini is the cheapest drafting model."
	},
	{
		id: "anthropic",
		name: "Claude (Anthropic)",
		kind: "anthropic",
		url: "https://api.anthropic.com/v1/messages",
		models: ["claude-3-5-haiku-latest", "claude-sonnet-4-5"],
		defaultModel: "claude-3-5-haiku-latest",
		docs: "https://console.anthropic.com/settings/keys",
		docsLabel: "Anthropic console",
		note: "Paid. Haiku is enough for policy drafts."
	},
	{
		id: "openrouter",
		name: "OpenRouter",
		kind: "openai",
		url: "https://openrouter.ai/api/v1/chat/completions",
		models: [
			"google/gemini-2.5-flash",
			"openai/gpt-4o-mini",
			"anthropic/claude-3.5-haiku"
		],
		defaultModel: "google/gemini-2.5-flash",
		docs: "https://openrouter.ai/keys",
		docsLabel: "OpenRouter keys",
		note: "One key, many models. Free Gemini route is a spare fallback."
	},
	{
		id: "mistral",
		name: "Mistral",
		kind: "openai",
		url: "https://api.mistral.ai/v1/chat/completions",
		models: ["mistral-small-latest", "mistral-large-latest"],
		defaultModel: "mistral-small-latest",
		docs: "https://console.mistral.ai/api-keys",
		docsLabel: "Mistral console",
		note: "EU-hosted. Small is the free/cheap drafting model."
	},
	{
		id: "deepseek",
		name: "DeepSeek",
		kind: "openai",
		url: "https://api.deepseek.com/chat/completions",
		models: ["deepseek-chat"],
		defaultModel: "deepseek-chat",
		docs: "https://platform.deepseek.com/api_keys",
		docsLabel: "DeepSeek platform",
		note: "Low-cost OpenAI-compatible chat model."
	}
];
var DEFAULT_ORDER = [
	"gemini",
	"grok",
	"groq",
	"openai",
	"anthropic",
	"openrouter",
	"mistral",
	"deepseek"
];
var DEFAULT_ENABLED = ["gemini", "grok"];
function getProvider(id) {
	return PROVIDERS.find((p) => p.id === id);
}
var aiKeysSchema = object({
	grok: string().max(240).optional(),
	gemini: string().max(240).optional(),
	openai: string().max(240).optional(),
	anthropic: string().max(240).optional(),
	groq: string().max(240).optional(),
	openrouter: string().max(240).optional(),
	mistral: string().max(240).optional(),
	deepseek: string().max(240).optional(),
	order: array(string().max(32)).max(12).optional(),
	enabled: array(string().max(32)).max(12).optional(),
	models: record(string(), string().max(80)).optional(),
	fallback: boolean().optional()
}).optional();
//#endregion
export { getProvider as a, aiKeysSchema as i, DEFAULT_ORDER as n, PROVIDERS as r, DEFAULT_ENABLED as t };
