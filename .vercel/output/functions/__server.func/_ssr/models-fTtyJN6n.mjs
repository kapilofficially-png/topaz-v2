import { o as __toESM } from "../_runtime.mjs";
import { a as getProvider, r as PROVIDERS } from "./providers-B7LlmDHe.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as cn, n as Badge, o as useKeysStore, t as AppShell } from "./badge-BGa2cXzN.mjs";
import { E as LoaderCircle, F as EyeOff, H as Check, I as ExternalLink, K as ArrowUp, P as Eye, Y as ArrowDown, c as Sparkles, k as KeyRound, u as Shield, v as RefreshCw } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CWahO9x8.mjs";
import { t as Input } from "./input-DvyoLJy2.mjs";
import { t as Label } from "./label-DbX4wkVX.mjs";
import { a as testProviderFn, i as providerStatusFn, r as fetchGeminiModelsFn } from "./chat-CMnDE6ye.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/models-fTtyJN6n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/models.tsx?tsr-split=component";
function ModelsPage() {
	const store = useKeysStore();
	const [reveal, setReveal] = (0, import_react.useState)({});
	const [testing, setTesting] = (0, import_react.useState)("");
	const [fetchingGemini, setFetchingGemini] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		providerStatusFn({ data: {} }).then((s) => {
			useKeysStore.getState().setGrokEnv(s.grokEnv);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (store.models.gemini === "gemini-2.0-flash" || store.models.gemini === "gemini-1.5-flash") store.setModel("gemini", "gemini-2.5-flash");
	}, [store.models.gemini, store]);
	const fetchGeminiModels = async (silent = false) => {
		setFetchingGemini(true);
		try {
			const res = await fetchGeminiModelsFn({ data: { apiKey: store.keys.gemini } });
			if (!res.ok) {
				if (!silent) toast.error(res.error);
				return;
			}
			store.setGeminiModels(res.models);
			if (!silent) toast.success(`Fetched ${res.models.length} active models from Google AI Studio.`);
			const current = store.models.gemini;
			if (!res.models.some((m) => m.id === current) || current === "gemini-2.0-flash" || current === "gemini-1.5-flash") {
				const best = res.models.find((m) => m.recommended)?.id || res.models[0]?.id || "gemini-2.5-flash";
				store.setModel("gemini", best);
			}
		} catch (err) {
			if (!silent) toast.error(err instanceof Error ? err.message : "Failed to fetch models from Google AI Studio.");
		} finally {
			setFetchingGemini(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (useKeysStore.getState().geminiModels.length === 0) fetchGeminiModels(true);
	}, []);
	const ready = PROVIDERS.filter((p) => {
		if (!store.enabled.includes(p.id)) return false;
		if (p.id === "grok") return Boolean(store.keys.grok?.trim() || store.grokEnv);
		return Boolean(store.keys[p.id]?.trim());
	});
	const readyLabel = ready.length ? ready.map((p) => p.name).join(" → ") : "Add a Gemini key so drafting continues when Grok is exhausted.";
	async function test(id) {
		setTesting(id);
		try {
			const result = await testProviderFn({ data: {
				provider: id,
				aiKeys: store.toPayload()
			} });
			if (!result.ok) {
				store.setLastError(result.error);
				toast.error(result.error);
				return;
			}
			store.setLastUsed(result.provider, result.model, false);
			toast.success(`${getProvider(id)?.name ?? id} replied.`);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Test failed.";
			store.setLastError(msg);
			toast.error(msg);
		} finally {
			setTesting("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[12px] tracking-[0.18em] text-muted uppercase",
				children: "Drafting models"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-2 font-display text-4xl font-medium tracking-tight",
				children: "Models and API keys"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Grok is the primary drafter. When its usage is exhausted, NyayaDraft falls through this list to the next enabled key. Gemini is the recommended free fallback. Keys stay on this device and are sent only to the matching provider for that run — they are not saved in History."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] tracking-wide text-muted uppercase",
								children: "Primary"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 120,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-display text-xl",
								children: "Grok (xAI)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-sm text-muted",
								children: store.grokEnv ? "App key is available." : "No app key detected."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] tracking-wide text-muted uppercase",
								children: "Ready now"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-display text-xl",
								children: ready.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-sm text-muted",
								children: readyLabel
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 133,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] tracking-wide text-muted uppercase",
								children: "Last used"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-display text-xl",
								children: store.lastProvider ? getProvider(store.lastProvider)?.name ?? store.lastProvider : "—"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 139,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-sm text-muted",
								children: store.lastModel ? `${store.lastModel}${store.lastFallback ? " (fallback)" : ""}` : store.lastError || "No drafting run yet."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-paper px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "size-4 text-muted" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 149,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-ink",
						children: "Fall back when Grok is exhausted or errors"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 150,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						size: "sm",
						variant: store.fallback ? "default" : "outline",
						className: "ml-auto",
						onClick: () => store.setFallback(!store.fallback),
						children: store.fallback ? "On" : "Off"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 148,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
				className: "mt-8 space-y-4",
				children: store.order.map((id, index) => {
					const def = getProvider(id);
					if (!def) return null;
					const on = store.enabled.includes(id);
					const key = store.keys[id] ?? "";
					const shown = reveal[id];
					const grokReady = id === "grok" && (Boolean(key.trim()) || store.grokEnv);
					const readyNow = id === "grok" ? grokReady : Boolean(key.trim());
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-start gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex size-8 items-center justify-center rounded-full bg-surface-2 font-display text-sm",
										children: index + 1
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 169,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
														className: "font-display text-xl font-medium tracking-tight",
														children: def.name
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 174,
														columnNumber: 23
													}, this),
													def.primary ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { children: "Primary" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 177,
														columnNumber: 38
													}, this) : null,
													def.recommended ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
														variant: "muted",
														children: "Recommended fallback"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 178,
														columnNumber: 42
													}, this) : null,
													def.id === "gemini" && store.geminiModels.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
														variant: "muted",
														className: "text-[11px] gap-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3 text-primary" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 180,
																columnNumber: 27
															}, this),
															store.geminiModels.length,
															" live models"
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 179,
														columnNumber: 79
													}, this) : null,
													on && readyNow ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
														variant: "muted",
														children: "Ready"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 183,
														columnNumber: 41
													}, this) : on ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
														variant: "outline",
														children: "Needs key"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 183,
														columnNumber: 85
													}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
														variant: "outline",
														children: "Off"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 183,
														columnNumber: 130
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 173,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-1 max-w-2xl text-sm leading-relaxed text-muted",
												children: def.note
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 185,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
												href: def.docs,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "mt-2 inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline",
												children: [
													"Get a key — ",
													def.docsLabel,
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 190,
														columnNumber: 23
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 188,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 172,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												type: "button",
												size: "icon",
												variant: "ghost",
												"aria-label": "Move up",
												disabled: index === 0,
												onClick: () => store.move(id, -1),
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUp, {}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 195,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 194,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												type: "button",
												size: "icon",
												variant: "ghost",
												"aria-label": "Move down",
												disabled: index === store.order.length - 1,
												onClick: () => store.move(id, 1),
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowDown, {}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 198,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 197,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												type: "button",
												size: "sm",
												variant: on ? "default" : "outline",
												onClick: () => store.setEnabled(id, !on),
												children: on ? "Enabled" : "Disabled"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 200,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 193,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: `key-${id}`,
										children: "API key"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1.5 flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											id: `key-${id}`,
											type: shown ? "text" : "password",
											autoComplete: "off",
											spellCheck: false,
											value: key,
											placeholder: id === "grok" ? store.grokEnv ? "Optional — app key will be used" : "xai-…" : id === "gemini" ? "AIza…" : "Paste key",
											onChange: (e) => store.setKey(id, e.target.value)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 210,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											type: "button",
											size: "icon",
											variant: "outline",
											"aria-label": shown ? "Hide key" : "Show key",
											onClick: () => setReveal((r) => ({
												...r,
												[id]: !r[id]
											})),
											children: shown ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 215,
												columnNumber: 34
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 215,
												columnNumber: 47
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 211,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 209,
										columnNumber: 21
									}, this),
									id === "grok" && store.grokEnv && !key.trim() ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1.5 text-[12px] text-muted",
										children: "Using the app’s xAI key until you paste your own."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 218,
										columnNumber: 70
									}, this) : null
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: `model-${id}`,
											children: "Model"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 224,
											columnNumber: 23
										}, this), id === "gemini" && /* @__PURE__ */ (void 0)(Button, {
											type: "button",
											size: "sm",
											variant: "ghost",
											disabled: fetchingGemini,
											onClick: () => void fetchGeminiModels(false),
											className: "h-6 px-2 text-[12px] text-primary hover:text-primary gap-1",
											title: "Fetch latest models directly from Google AI Studio",
											children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: cn("size-3", fetchingGemini && "animate-spin") }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 226,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", { children: fetchingGemini ? "Fetching..." : "Fetch latest models" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 227,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 225,
											columnNumber: 43
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 223,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										id: `model-${id}`,
										className: "mt-1.5 flex h-11 w-full rounded-[var(--radius-sm)] border border-border bg-paper px-3 text-sm text-ink shadow-[var(--shadow-border)]",
										value: store.models[id] || def.defaultModel,
										onChange: (e) => store.setModel(id, e.target.value),
										children: id === "gemini" && store.geminiModels.length > 0 ? store.geminiModels.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: m.id,
											children: [
												m.name,
												" (",
												m.id,
												")",
												" ",
												m.recommended ? "★ Recommended" : ""
											]
										}, m.id, true, {
											fileName: _jsxFileName,
											lineNumber: 233,
											columnNumber: 103
										}, this)) : def.models.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: m,
											children: m
										}, m, false, {
											fileName: _jsxFileName,
											lineNumber: 236,
											columnNumber: 62
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 232,
										columnNumber: 21
									}, this),
									id === "gemini" && /* @__PURE__ */ (void 0)("p", {
										className: "mt-1.5 flex items-center gap-1 text-[12px] text-muted",
										children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-3 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 241,
											columnNumber: 25
										}, this), store.geminiModels.length > 0 ? /* @__PURE__ */ (void 0)("span", { children: [store.geminiModels.length, " live models available from Google AI Studio."] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 242,
											columnNumber: 58
										}, this) : /* @__PURE__ */ (void 0)("span", { children: "Click “Fetch latest models” to query Google AI Studio for all active models." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 245,
											columnNumber: 37
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 240,
										columnNumber: 41
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									disabled: !readyNow || testing === id,
									onClick: () => void test(id),
									children: [testing === id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 255,
										columnNumber: 39
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 255,
										columnNumber: 78
									}, this), "Test connection"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 17
							}, this)
						]
					}, id, true, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 158,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 rounded-[var(--radius-lg)] border border-border bg-paper px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "flex items-center gap-2 font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 265,
						columnNumber: 13
					}, this), "How fallback works"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 264,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
					className: "mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Every draft, audit, rewrite, email or ask tries Grok first (if enabled)." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 269,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "If Grok is rate-limited, out of quota, or missing, the next enabled key in this list is used — Gemini if you pasted one." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 270,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
							"Get a free Gemini key at",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: "https://aistudio.google.com/apikey",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-primary underline-offset-4 hover:underline",
								children: "Google AI Studio"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 276,
								columnNumber: 15
							}, this),
							", paste it above, leave Gemini enabled, and keep fallback on."
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 274,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Your keys never go into History, Word, PDF, or the store papers." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 281,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 268,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 263,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 104,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 103,
		columnNumber: 10
	}, this);
}
//#endregion
export { ModelsPage as component };
