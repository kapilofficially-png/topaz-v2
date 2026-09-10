//#region node_modules/.nitro/vite/services/ssr/assets/types-BWR_EVh8.js
var POLICY_KINDS = [
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
];
var POLICY_LABELS = {
	terms: "Terms of service / T&C",
	privacy: "Privacy policy",
	consent: "Consent / cookies",
	return: "Return policy",
	refund: "Refund policy",
	cancellation: "Cancellation policy",
	shipping: "Shipping policy",
	delivery: "Delivery policy",
	contact: "Contact / legal entity",
	other: "Other legal page"
};
var REQUIRED_STORE_POLICIES = [
	"terms",
	"privacy",
	"return",
	"refund",
	"shipping"
];
/** Kinds that are the same commercial subject if the store split them across URLs. */
var POLICY_PAIRS = [
	[
		"return",
		"refund",
		"cancellation"
	],
	["shipping", "delivery"],
	["privacy", "consent"],
	["terms"]
];
function missingFromPages(pages) {
	return REQUIRED_STORE_POLICIES.filter((kind) => !pairSatisfied(pages, kind)).map((kind) => ({
		kind,
		label: POLICY_LABELS[kind]
	}));
}
function pairSatisfied(pages, kind) {
	if (pages.some((p) => p.kind === kind)) return true;
	const group = POLICY_PAIRS.find((g) => g.includes(kind));
	if (!group) return false;
	return group.some((other) => {
		if (other === kind) return false;
		return pages.some((p) => {
			const blob = `${p.url ?? ""} ${p.title ?? ""}`.toLowerCase();
			if (kind === "refund" && other === "return" && /refund/.test(blob) && /return/.test(blob)) return true;
			if (kind === "return" && other === "refund" && /refund/.test(blob) && /return/.test(blob)) return true;
			if ((kind === "shipping" || kind === "delivery") && /shipping/.test(blob) && /delivery/.test(blob)) return true;
			if ((kind === "privacy" || kind === "consent") && /privacy/.test(blob) && /cookie|consent/.test(blob)) return true;
			return false;
		});
	});
}
function pageUrlKey(url) {
	return url.replace(/\/+$/, "").toLowerCase();
}
//#endregion
export { pageUrlKey as i, POLICY_LABELS as n, missingFromPages as r, POLICY_KINDS as t };
