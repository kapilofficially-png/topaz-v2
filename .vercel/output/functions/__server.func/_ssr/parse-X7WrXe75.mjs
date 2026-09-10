//#region node_modules/.nitro/vite/services/ssr/assets/parse-X7WrXe75.js
function sliceSection(source, heading, next) {
	const match = new RegExp(`^##\\s*${heading}\\s*$`, "im").exec(source);
	if (!match || match.index === void 0) return "";
	const start = match.index + match[0].length;
	let end = source.length;
	if (next) {
		const n = new RegExp(`^##\\s*${next}\\s*$`, "im").exec(source.slice(start));
		if (n && n.index !== void 0) end = start + n.index;
	}
	return source.slice(start, end).trim();
}
function parseDraftOutput(text) {
	return {
		draft: sliceSection(text, "DRAFT", "AUTHORITIES RELIED ON") || sliceSection(text, "DRAFT") || text.trim(),
		authorities: sliceSection(text, "AUTHORITIES RELIED ON", "DRAFTING NOTES"),
		notes: sliceSection(text, "DRAFTING NOTES"),
		raw: text
	};
}
function parseStoreQuestions(md) {
	const chunks = md.split(/^###\s+/m).slice(1);
	const out = [];
	for (const chunk of chunks) {
		const [first, ...rest] = chunk.split("\n");
		const head = (first ?? "").trim();
		if (!/^[QC]\d+/i.test(head) && !/HIGH|MEDIUM|LOW/i.test(head)) continue;
		const m = head.match(/^([QC]\d+)\s*[—–-]\s*(HIGH|MEDIUM|LOW)\s*[—–-]\s*(.+)$/i);
		const id = (m?.[1] ?? `C${out.length + 1}`).toUpperCase();
		const severity = (m?.[2] ?? "MEDIUM").toUpperCase();
		const title = (m?.[3] ?? head.replace(/^[QC]\d+\s*[—–-]\s*/i, "")).trim();
		const body = rest.join("\n");
		const why = body.match(/\*\*Why[^*]*:\*\*\s*([\s\S]*?)(?=\n\*\*|$)/i)?.[1]?.trim() ?? "";
		const hint = body.match(/\*\*(?:Good answer looks like|Hint|Placeholder)[^*]*:\*\*\s*([\s\S]*?)(?=\n\*\*|$)/i)?.[1]?.trim() ?? "";
		out.push({
			id,
			severity,
			title,
			why,
			hint
		});
	}
	return out.slice(0, 12);
}
function applyQuestionnaireAnswers(md, answers) {
	return md.split(/^(?=###\s+)/m).map((chunk) => {
		const head = chunk.match(/^###\s+([QC]\d+)/i)?.[1]?.toUpperCase();
		if (!head) return chunk;
		const answer = answers[head]?.trim();
		if (!answer) return chunk;
		if (/\*\*Your answer:\*\*/i.test(chunk)) return chunk.replace(/\*\*Your answer:\*\*[\s\S]*?(?=\n###|\n##|$)/i, `**Your answer:** ${answer}\n\n`);
		return `${chunk.trimEnd()}\n\n**Your answer:** ${answer}\n\n`;
	}).join("");
}
function parseForwardEmails(md) {
	const chunks = md.split(/^##\s+/m).slice(1);
	const out = [];
	for (const chunk of chunks) {
		const [first, ...rest] = chunk.split("\n");
		const heading = (first ?? "").trim();
		if (!/email|notice|developer|advocate|customer|whatsapp|follow|pitch|outreach|dm|bump|break|pack|one-pager|day \d+/i.test(heading)) continue;
		if (/call script|sample clause|hooks|layman|authorities|drafting notes|sequence|do not claim|cover|schedule/i.test(heading)) continue;
		const bodyMd = rest.join("\n");
		const field = (label) => bodyMd.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*([^\\n]+)`, "i"))?.[1]?.trim() ?? "";
		let body = sliceLoose(bodyMd, "Body") || sliceLoose(bodyMd, "Email body");
		if (!body) body = bodyMd.replace(/\*\*To:\*\*[^\n]*\n?/i, "").replace(/\*\*Subject:\*\*[^\n]*\n?/i, "").trim();
		out.push({
			heading,
			to: field("To").replace(/^mailto:/i, ""),
			subject: field("Subject"),
			body: body.trim()
		});
	}
	return out;
}
function sliceLoose(source, heading) {
	const match = new RegExp(`\\*\\*${heading}:\\*\\*\\s*`, "i").exec(source);
	if (!match || match.index === void 0) return "";
	const start = match.index + match[0].length;
	const next = source.slice(start).search(/\n\*\*[A-Za-z].{0,24}:\*\*/);
	return source.slice(start, next === -1 ? void 0 : start + next).trim();
}
function mailtoHref(to, subject, body) {
	const addr = to && !/\[|placeholder|to be/i.test(to) ? to : "";
	const params = new URLSearchParams();
	if (subject) params.set("subject", subject.slice(0, 180));
	if (body) params.set("body", body.slice(0, 1600));
	const q = params.toString();
	return `mailto:${addr}${q ? `?${q}` : ""}`;
}
function sampleClauseText(md) {
	return (sliceSection(md, "SAMPLE CLAUSE — NOT FOR PUBLICATION", "EMAIL 1") || sliceSection(md, "SAMPLE CLAUSE — NOT FOR PUBLICATION") || sliceSection(md, "SAMPLE CLAUSE", "EMAIL 1") || "").trim();
}
function callScriptText(md) {
	return (sliceSection(md, "CALL SCRIPT", "DO NOT CLAIM") || sliceSection(md, "CALL SCRIPT") || "").trim();
}
function emailCta(heading) {
	const h = heading.toLowerCase();
	if (/whatsapp|dm/.test(h)) return "Open WhatsApp";
	if (/day 21|break/.test(h)) return "Open break-up";
	if (/day 14|pack|fee/.test(h)) return "Open pack email";
	if (/day 7|second gap/.test(h)) return "Open day 7";
	if (/day 3|bump/.test(h)) return "Open bump";
	if (/day 0|one-pager|short pitch|email 1/.test(h)) return "Open day 0";
	return "Open mail";
}
//#endregion
export { parseDraftOutput as a, sampleClauseText as c, mailtoHref as i, callScriptText as n, parseForwardEmails as o, emailCta as r, parseStoreQuestions as s, applyQuestionnaireAnswers as t };
