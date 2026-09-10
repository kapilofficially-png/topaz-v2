import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as cn } from "./badge-BGa2cXzN.mjs";
import { a as Header, c as Paragraph, d as TableRow, f as TextRun, h as convertInchesToTwip, i as Footer, l as Table, m as WidthType, n as BorderStyle, o as Packer, p as VerticalAlign, r as File, s as PageNumber, t as AlignmentType, u as TableCell } from "../_libs/docx.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-export-T-1A9IzR.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_jspdf_node_min = require_jspdf_node_min();
var _jsxFileName = "/app/applet/src/components/draft-paper.tsx";
function inline(line) {
	return line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => part.startsWith("**") && part.endsWith("**") ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
		className: "font-semibold",
		children: part.slice(2, -2)
	}, j, false, {
		fileName: _jsxFileName,
		lineNumber: 8,
		columnNumber: 7
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: part }, j, false, {
		fileName: _jsxFileName,
		lineNumber: 12,
		columnNumber: 7
	}, this));
}
function cells(row) {
	return row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}
function isDivider$1(row) {
	return /^\s*\|?\s*:?-{3,}/.test(row);
}
function renderTable(rows, key) {
	const bodyRows = rows.filter((r) => !isDivider$1(r));
	if (!bodyRows.length) return null;
	const head = cells(bodyRows[0]);
	const rest = bodyRows.slice(1);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "my-4 overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
			className: "w-full min-w-[28rem] border-collapse text-left text-[13px] leading-relaxed",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: head.map((c, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
				className: "border-b border-border px-2 py-2 font-sans text-[11px] font-medium tracking-wide text-muted uppercase",
				children: inline(c)
			}, i, false, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 15
			}, this)) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 39,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: rest.map((r, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: cells(r).map((c, j) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
				className: "border-b border-border/70 px-2 py-2 align-top",
				children: inline(c)
			}, j, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 17
			}, this)) }, i, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 13
			}, this)) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 7
		}, this)
	}, key, false, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 5
	}, this);
}
function renderLine(line, i) {
	if (!line.trim()) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3" }, i, false, {
		fileName: _jsxFileName,
		lineNumber: 67,
		columnNumber: 28
	}, this);
	if (/^#{1,3}\s/.test(line)) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
		className: "mt-6 mb-2 text-center font-display text-lg font-medium tracking-tight first:mt-0",
		children: line.replace(/^#{1,3}\s/, "")
	}, i, false, {
		fileName: _jsxFileName,
		lineNumber: 70,
		columnNumber: 7
	}, this);
	if (/^\s*[-*•]\s+/.test(line) || /^✔/.test(line)) {
		const rest = line.replace(/^\s*[-*•]\s+/, "").replace(/^✔\s*/, "");
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "flex gap-2 pl-1 text-[15px] leading-[1.7]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				"aria-hidden": true,
				className: "mt-1 text-primary",
				children: "•"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 82,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: inline(rest) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 85,
				columnNumber: 9
			}, this)]
		}, i, true, {
			fileName: _jsxFileName,
			lineNumber: 81,
			columnNumber: 7
		}, this);
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		className: "text-[15px] leading-[1.7]",
		children: inline(line)
	}, i, false, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 5
	}, this);
}
function renderBody(body) {
	const lines = body.split("\n");
	const nodes = [];
	let i = 0;
	while (i < lines.length) {
		if (lines[i].trim().startsWith("|")) {
			const rows = [];
			while (i < lines.length && lines[i].trim().startsWith("|")) {
				rows.push(lines[i]);
				i += 1;
			}
			nodes.push(renderTable(rows, nodes.length));
			continue;
		}
		nodes.push(renderLine(lines[i], i));
		i += 1;
	}
	return nodes;
}
function DraftPaper({ title, body, emptyHint, className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: cn("relative overflow-hidden rounded-[var(--radius-lg)] bg-paper text-ink shadow-[var(--shadow-border)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-y-0 left-0 w-2 bg-primary/80"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 134,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-b border-border/80 px-8 py-4 sm:px-12",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[11px] tracking-[0.18em] text-muted uppercase",
					children: "Draft for review"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 9
				}, this), title ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-1 font-display text-xl font-medium tracking-tight",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 143,
					columnNumber: 11
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 138,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "px-8 py-8 sm:px-12",
				children: body ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "font-serif",
					children: renderBody(body)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 150,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-serif text-muted italic",
					children: emptyHint
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 148,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 128,
		columnNumber: 5
	}, this);
}
var NAVY$1 = "1F3A4D";
var STAMP$1 = "7A2E24";
var INK$1 = "1A1A1A";
var MUTED$1 = "5C564C";
var RULE$1 = "C4B8A4";
var PAPER = "F7F3EA";
function runs(text, opts) {
	const parts = text.split(/(\*\*[^*]+\*\*)/g).filter((p) => p.length);
	if (!parts.length) return [new TextRun({
		text: "",
		font: opts?.font ?? "Cambria",
		size: opts?.size ?? 22,
		color: opts?.color ?? INK$1
	})];
	return parts.map((part) => {
		const bold = opts?.bold || part.startsWith("**") && part.endsWith("**");
		const clean = bold && part.startsWith("**") ? part.slice(2, -2) : part;
		return new TextRun({
			text: clean,
			bold,
			italics: opts?.italics,
			font: opts?.font ?? "Cambria",
			size: opts?.size ?? 22,
			color: opts?.color ?? INK$1
		});
	});
}
function cellsOf(row) {
	return row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}
function isDivider(row) {
	return /^\s*\|?\s*:?-{3,}/.test(row);
}
function hairline() {
	return {
		style: BorderStyle.SINGLE,
		size: 6,
		color: RULE$1
	};
}
function letterhead(subtitle, dateLine) {
	return new Table({
		width: {
			size: 100,
			type: WidthType.PERCENTAGE
		},
		borders: {
			top: {
				style: BorderStyle.NONE,
				size: 0,
				color: "FFFFFF"
			},
			left: {
				style: BorderStyle.NONE,
				size: 0,
				color: "FFFFFF"
			},
			right: {
				style: BorderStyle.NONE,
				size: 0,
				color: "FFFFFF"
			},
			bottom: {
				style: BorderStyle.SINGLE,
				size: 12,
				color: STAMP$1
			},
			insideHorizontal: {
				style: BorderStyle.NONE,
				size: 0,
				color: "FFFFFF"
			},
			insideVertical: {
				style: BorderStyle.NONE,
				size: 0,
				color: "FFFFFF"
			}
		},
		rows: [new TableRow({ children: [new TableCell({
			width: {
				size: 62,
				type: WidthType.PERCENTAGE
			},
			verticalAlign: VerticalAlign.CENTER,
			margins: {
				bottom: 80,
				top: 40
			},
			children: [new Paragraph({ children: [new TextRun({
				text: "NYAYADRAFT",
				bold: true,
				font: "Calibri",
				size: 22,
				color: NAVY$1,
				characterSpacing: 240
			})] }), new Paragraph({ children: [new TextRun({
				text: "India-law drafting  ·  working draft",
				font: "Calibri",
				size: 16,
				color: MUTED$1,
				italics: true
			})] })]
		}), new TableCell({
			width: {
				size: 38,
				type: WidthType.PERCENTAGE
			},
			verticalAlign: VerticalAlign.CENTER,
			margins: {
				bottom: 80,
				top: 40
			},
			children: [
				new Paragraph({
					alignment: AlignmentType.RIGHT,
					children: [new TextRun({
						text: "CONFIDENTIAL",
						bold: true,
						font: "Calibri",
						size: 16,
						color: STAMP$1,
						characterSpacing: 120
					})]
				}),
				new Paragraph({
					alignment: AlignmentType.RIGHT,
					children: [new TextRun({
						text: dateLine,
						font: "Calibri",
						size: 16,
						color: MUTED$1
					})]
				}),
				new Paragraph({
					alignment: AlignmentType.RIGHT,
					children: [new TextRun({
						text: subtitle,
						font: "Calibri",
						size: 16,
						color: MUTED$1
					})]
				})
			]
		})] })]
	});
}
function tableFrom(rows) {
	const bodyRows = rows.filter((r) => !isDivider(r));
	if (!bodyRows.length) return null;
	const head = cellsOf(bodyRows[0]);
	const rest = bodyRows.slice(1);
	const colW = Math.floor(100 / Math.max(head.length, 1));
	const border = hairline();
	const makeCell = (text, header) => new TableCell({
		width: {
			size: colW,
			type: WidthType.PERCENTAGE
		},
		shading: header ? {
			type: "clear",
			fill: PAPER,
			color: "auto"
		} : void 0,
		margins: {
			top: 60,
			bottom: 60,
			left: 80,
			right: 80
		},
		borders: {
			top: border,
			bottom: border,
			left: border,
			right: border
		},
		children: [new Paragraph({ children: runs(text, {
			bold: header,
			size: header ? 16 : 18,
			font: "Calibri",
			color: header ? MUTED$1 : INK$1
		}) })]
	});
	return new Table({
		width: {
			size: 100,
			type: WidthType.PERCENTAGE
		},
		rows: [new TableRow({
			tableHeader: true,
			children: head.map((c) => makeCell(c, true))
		}), ...rest.map((r) => new TableRow({ children: cellsOf(r).map((c) => makeCell(c, false)) }))]
	});
}
function bodyChildren(markdown) {
	const lines = markdown.replace(/\r\n/g, "\n").split("\n");
	const out = [];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i];
		if (!line.trim()) {
			out.push(new Paragraph({
				spacing: { after: 80 },
				children: []
			}));
			i += 1;
			continue;
		}
		if (line.trim().startsWith("|")) {
			const rows = [];
			while (i < lines.length && lines[i].trim().startsWith("|")) {
				rows.push(lines[i]);
				i += 1;
			}
			const table = tableFrom(rows);
			if (table) out.push(table);
			out.push(new Paragraph({
				spacing: { after: 120 },
				children: []
			}));
			continue;
		}
		if (/^#{1,3}\s/.test(line)) {
			const level = line.startsWith("###") ? 3 : 2;
			const text = line.replace(/^#{1,3}\s+/, "").replace(/\*+/g, "");
			out.push(new Paragraph({
				spacing: {
					before: level === 2 ? 280 : 200,
					after: 80
				},
				border: level === 2 ? { bottom: {
					style: BorderStyle.SINGLE,
					size: 6,
					color: RULE$1,
					space: 4
				} } : void 0,
				children: [new TextRun({
					text: text.toUpperCase(),
					bold: true,
					font: "Calibri",
					size: level === 2 ? 22 : 20,
					color: level === 2 ? NAVY$1 : STAMP$1,
					characterSpacing: level === 2 ? 80 : 40
				})]
			}));
			i += 1;
			continue;
		}
		if (/^\s*[-*•]\s+/.test(line) || /^✔/.test(line)) {
			const text = line.replace(/^\s*[-*•]\s+/, "").replace(/^✔\s*/, "");
			out.push(new Paragraph({
				indent: {
					left: convertInchesToTwip(.25),
					hanging: convertInchesToTwip(.18)
				},
				spacing: {
					after: 60,
					line: 276
				},
				children: [new TextRun({
					text: "•  ",
					font: "Calibri",
					size: 22,
					color: STAMP$1
				}), ...runs(text)]
			}));
			i += 1;
			continue;
		}
		if (/^\s*\d+[.)]\s+/.test(line)) {
			const m = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
			const n = m?.[1] ?? "1";
			const text = m?.[2] ?? line;
			out.push(new Paragraph({
				indent: {
					left: convertInchesToTwip(.32),
					hanging: convertInchesToTwip(.28)
				},
				spacing: {
					after: 80,
					line: 288
				},
				children: [new TextRun({
					text: `${n}.  `,
					bold: true,
					font: "Cambria",
					size: 22,
					color: NAVY$1
				}), ...runs(text)]
			}));
			i += 1;
			continue;
		}
		out.push(new Paragraph({
			spacing: {
				after: 120,
				line: 288
			},
			alignment: AlignmentType.JUSTIFIED,
			children: runs(line)
		}));
		i += 1;
	}
	return out;
}
function footerPara() {
	return new Paragraph({
		border: { top: {
			style: BorderStyle.SINGLE,
			size: 6,
			color: RULE$1,
			space: 8
		} },
		spacing: { before: 80 },
		children: [
			new TextRun({
				text: "NyayaDraft working draft — not a solicitor-client opinion. Review before publication.   ",
				font: "Calibri",
				size: 14,
				italics: true,
				color: MUTED$1
			}),
			new TextRun({
				text: "Page ",
				font: "Calibri",
				size: 14,
				color: MUTED$1
			}),
			new TextRun({
				children: [PageNumber.CURRENT],
				font: "Calibri",
				size: 14,
				color: MUTED$1
			}),
			new TextRun({
				text: " of ",
				font: "Calibri",
				size: 14,
				color: MUTED$1
			}),
			new TextRun({
				children: [PageNumber.TOTAL_PAGES],
				font: "Calibri",
				size: 14,
				color: MUTED$1
			})
		]
	});
}
async function downloadDraftDocx(matter) {
	const dateLine = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
	const matterLine = [matter.host, "internal use only"].filter(Boolean).join("  ·  ");
	const doc = new File({
		styles: { default: { document: { run: {
			font: "Cambria",
			size: 22,
			color: INK$1
		} } } },
		sections: [{
			properties: { page: {
				size: {
					width: convertInchesToTwip(8.27),
					height: convertInchesToTwip(11.69)
				},
				margin: {
					top: convertInchesToTwip(.85),
					bottom: convertInchesToTwip(.9),
					left: convertInchesToTwip(.95),
					right: convertInchesToTwip(.95)
				}
			} },
			headers: { default: new Header({ children: [letterhead(matter.subtitle || matterLine, dateLine)] }) },
			footers: { default: new Footer({ children: [footerPara()] }) },
			children: [
				new Paragraph({
					spacing: { after: 80 },
					children: []
				}),
				new Paragraph({
					alignment: AlignmentType.CENTER,
					spacing: { after: 60 },
					children: [new TextRun({
						text: matter.title,
						bold: true,
						font: "Cambria",
						size: 36,
						color: NAVY$1
					})]
				}),
				matter.subtitle ? new Paragraph({
					alignment: AlignmentType.CENTER,
					spacing: { after: 200 },
					children: [new TextRun({
						text: matter.subtitle,
						italics: true,
						font: "Calibri",
						size: 20,
						color: MUTED$1
					})]
				}) : new Paragraph({
					spacing: { after: 160 },
					children: []
				}),
				...bodyChildren(matter.body.trim() || " ")
			]
		}]
	});
	const blob = await Packer.toBlob(doc);
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = matter.filename.endsWith(".docx") ? matter.filename : `${matter.filename}.docx`;
	a.click();
	URL.revokeObjectURL(url);
}
async function downloadMasterDocx(input) {
	const filled = input.sections.filter((s) => s.body.trim());
	const body = [
		"## Store profile",
		input.profile,
		...filled.flatMap((s) => [`## ${s.title}`, s.body])
	].join("\n\n");
	await downloadDraftDocx({
		title: input.title ?? `${input.homeTitle || input.host} — master file`,
		subtitle: "CONFIDENTIAL  ·  every paper from this store",
		host: input.host,
		body,
		filename: input.filename ?? `NyayaDraft-${input.host.replace(/[^\w.-]+/g, "-")}-master.docx`
	});
}
var PAGE_W = 210;
var MARGIN_X = 18;
var MARGIN_TOP = 22;
var CONTENT_W = 174;
var NAVY = [
	31,
	58,
	77
];
var STAMP = [
	122,
	46,
	36
];
var MUTED = [
	92,
	86,
	76
];
var RULE = [
	196,
	184,
	164
];
var INK = [
	26,
	26,
	26
];
var CHAR_MAP = {
	"₹": "Rs. ",
	"—": "-",
	"–": "-",
	"“": "\"",
	"”": "\"",
	"‘": "'",
	"’": "'",
	"…": "...",
	"•": "-",
	"✔": "[x]",
	"×": "x",
	"\xA0": " ",
	" ": " "
};
function pdfSafe(raw) {
	return raw.replace(/[\u2018\u2019\u201A]/g, "'").replace(/[\u201C\u201D\u201E]/g, "\"").replace(/./gu, (ch) => {
		if (CHAR_MAP[ch]) return CHAR_MAP[ch];
		const code = ch.charCodeAt(0);
		if (code === 9 || code === 10 || code === 13) return ch;
		if (code >= 32 && code <= 126) return ch;
		if (code >= 160 && code <= 255) return ch;
		return "";
	}).replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
}
function stripMd(line) {
	return pdfSafe(line.replace(/\*\*/g, "").replace(/^#{1,3}\s+/, ""));
}
async function downloadMasterPdf(input) {
	const doc = new import_jspdf_node_min.jsPDF({
		unit: "mm",
		format: "a4",
		compress: true
	});
	const dateLine = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
	const filled = input.sections.filter((s) => s.body.trim());
	drawCover(doc, input, dateLine, ["Store profile", ...filled.map((s) => s.title)]);
	addProfile(doc, input.profile, dateLine, input.host);
	for (const section of filled) addSection(doc, section.title, section.body, dateLine, input.host);
	stampFooters(doc, input.host, dateLine);
	const filename = input.filename ?? `NyayaDraft-${input.host.replace(/[^\w.-]+/g, "-")}-master.pdf`;
	doc.save(filename);
}
function drawCover(doc, input, dateLine, contents) {
	doc.setFillColor(...NAVY);
	doc.rect(0, 0, PAGE_W, 48, "F");
	doc.setFillColor(...STAMP);
	doc.rect(0, 48, PAGE_W, 2.2, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFont("times", "bold");
	doc.setFontSize(11);
	doc.text("NYAYADRAFT", MARGIN_X, 18);
	doc.setFont("times", "italic");
	doc.setFontSize(10);
	doc.text("India-law drafting", MARGIN_X, 24);
	doc.setFont("times", "bold");
	doc.setFontSize(9);
	doc.text(input.kicker ?? "CONFIDENTIAL  ·  MASTER FILE", 192, 18, { align: "right" });
	doc.setFont("times", "normal");
	doc.text(dateLine, 192, 24, { align: "right" });
	doc.setTextColor(...INK);
	doc.setFont("times", "bold");
	doc.setFontSize(22);
	const title = pdfSafe(input.homeTitle || input.host);
	const titleLines = doc.splitTextToSize(title, CONTENT_W);
	doc.text(titleLines, MARGIN_X, 72);
	const afterTitle = 72 + titleLines.length * 9;
	doc.setFont("times", "normal");
	doc.setFontSize(12);
	doc.setTextColor(...NAVY);
	doc.text(pdfSafe(input.host), MARGIN_X, afterTitle + 6);
	doc.setTextColor(...MUTED);
	doc.setFontSize(10);
	doc.text(pdfSafe(input.origin), MARGIN_X, afterTitle + 12);
	doc.setDrawColor(...RULE);
	doc.setLineWidth(.3);
	doc.line(MARGIN_X, afterTitle + 18, 192, afterTitle + 18);
	doc.setTextColor(...STAMP);
	doc.setFont("times", "bold");
	doc.setFontSize(9);
	doc.text("CONTENTS", MARGIN_X, afterTitle + 28);
	doc.setTextColor(...INK);
	doc.setFont("times", "normal");
	doc.setFontSize(11);
	let y = afterTitle + 36;
	contents.forEach((item, i) => {
		if (y > 257) return;
		doc.text(`${i + 1}.  ${pdfSafe(item)}`, MARGIN_X, y);
		y += 7;
	});
	doc.setFont("times", "italic");
	doc.setFontSize(9);
	doc.setTextColor(...MUTED);
	doc.text(doc.splitTextToSize("Working draft compiled from this session. Not a solicitor-client opinion. Review before publication or filing.", CONTENT_W), MARGIN_X, 269);
}
function addProfile(doc, profile, dateLine, host) {
	addSection(doc, "Store profile", profile, dateLine, host);
}
function addSection(doc, title, body, _dateLine, _host) {
	doc.addPage();
	writeSectionHeading(doc, title, body);
}
function writeSectionHeading(doc, title, body, yStart) {
	let y = yStart ?? MARGIN_TOP;
	doc.setFillColor(...NAVY);
	doc.rect(MARGIN_X, y - 6, CONTENT_W, 10, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFont("times", "bold");
	doc.setFontSize(11);
	doc.text(pdfSafe(title).toUpperCase(), 21, y + 1);
	y += 12;
	writeBody(doc, body, y);
}
async function downloadPaperPdf(opts) {
	const doc = new import_jspdf_node_min.jsPDF({
		unit: "mm",
		format: "a4",
		compress: true
	});
	const dateLine = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
	writeSectionHeading(doc, opts.title, opts.body);
	stampFooters(doc, opts.host, dateLine);
	doc.save(opts.filename);
}
function ensureSpace(doc, y, need) {
	if (y + need <= 279) return y;
	doc.addPage();
	return MARGIN_TOP;
}
function writeBody(doc, markdown, startY) {
	const lines = markdown.replace(/\r\n/g, "\n").split("\n");
	let y = startY;
	let i = 0;
	while (i < lines.length) {
		const raw = lines[i];
		if (!raw.trim()) {
			y += 3;
			i += 1;
			continue;
		}
		if (raw.trim().startsWith("|")) {
			const rows = [];
			while (i < lines.length && lines[i].trim().startsWith("|")) {
				if (!/^\s*\|?\s*:?-{3,}/.test(lines[i])) rows.push(lines[i]);
				i += 1;
			}
			y = writeTable(doc, rows, y);
			continue;
		}
		if (/^#{1,3}\s/.test(raw)) {
			y = ensureSpace(doc, y, 10);
			const level = raw.startsWith("###") ? 3 : 2;
			doc.setFont("times", "bold");
			doc.setFontSize(level === 2 ? 12 : 11);
			doc.setTextColor(...level === 2 ? NAVY : STAMP);
			const wrapped = doc.splitTextToSize(stripMd(raw), CONTENT_W);
			doc.text(wrapped, MARGIN_X, y);
			y += wrapped.length * 5.4 + 3;
			i += 1;
			continue;
		}
		if (/^\s*[-*•]\s+/.test(raw) || /^✔/.test(raw)) {
			const text = stripMd(raw.replace(/^\s*[-*•]\s+/, "").replace(/^✔\s*/, ""));
			y = ensureSpace(doc, y, 8);
			doc.setFont("times", "normal");
			doc.setFontSize(10.5);
			doc.setTextColor(...INK);
			const wrapped = doc.splitTextToSize(text, 168);
			doc.setTextColor(...STAMP);
			doc.text("-", MARGIN_X, y);
			doc.setTextColor(...INK);
			doc.text(wrapped, 23, y);
			y += wrapped.length * 5 + 1.5;
			i += 1;
			continue;
		}
		if (/^\s*\d+(?:\.\d+)*[.)]\s+/.test(raw)) {
			const m = raw.match(/^\s*(\d+(?:\.\d+)*)[.)]\s+(.*)$/);
			const n = m?.[1] ?? "1";
			const text = stripMd(m?.[2] ?? raw);
			const nested = n.includes(".");
			y = ensureSpace(doc, y, 8);
			doc.setFont("times", nested ? "normal" : "bold");
			doc.setFontSize(nested ? 10.5 : 11);
			doc.setTextColor(...nested ? INK : NAVY);
			const mark = `${n}.`;
			const indent = nested ? 6 : 0;
			doc.text(mark, MARGIN_X + indent, y);
			doc.setFont("times", "normal");
			doc.setTextColor(...INK);
			const wrapped = doc.splitTextToSize(text, 164 - indent);
			doc.text(wrapped, 26 + indent + (n.length > 2 ? n.length : 0), y);
			y += wrapped.length * 5 + 1.8;
			i += 1;
			continue;
		}
		y = ensureSpace(doc, y, 8);
		doc.setFont("times", "normal");
		doc.setFontSize(10.5);
		doc.setTextColor(...INK);
		const wrapped = doc.splitTextToSize(stripMd(raw), CONTENT_W);
		for (const line of wrapped) {
			y = ensureSpace(doc, y, 6);
			doc.text(line, MARGIN_X, y);
			y += 5;
		}
		y += 1.5;
		i += 1;
	}
	return y;
}
function writeTable(doc, rows, startY) {
	let y = startY + 2;
	doc.setFontSize(9);
	for (let r = 0; r < rows.length; r++) {
		const line = rows[r].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => stripMd(c.trim())).join("  |  ");
		const wrapped = doc.splitTextToSize(line, CONTENT_W);
		y = ensureSpace(doc, y, wrapped.length * 4.5 + 2);
		doc.setFont("times", r === 0 ? "bold" : "normal");
		doc.setTextColor(...r === 0 ? MUTED : INK);
		doc.text(wrapped, MARGIN_X, y);
		y += wrapped.length * 4.5 + 1.5;
	}
	return y + 3;
}
function stampFooters(doc, host, dateLine) {
	const total = doc.getNumberOfPages();
	for (let p = 1; p <= total; p++) {
		doc.setPage(p);
		doc.setDrawColor(...RULE);
		doc.setLineWidth(.25);
		doc.line(MARGIN_X, 285, 192, 285);
		doc.setFont("times", "italic");
		doc.setFontSize(8);
		doc.setTextColor(...MUTED);
		const left = pdfSafe(`NyayaDraft  ·  ${host}  ·  ${dateLine}`);
		doc.text(left, MARGIN_X, 290);
		doc.text(`Page ${p} of ${total}`, 192, 290, { align: "right" });
	}
}
async function downloadOriginalPoliciesPdf(input) {
	const pages = input.pages.filter((p) => p.text.trim());
	if (!pages.length) throw new Error("No original policy text to export.");
	const profile = [
		`Store: ${input.homeTitle || input.host}`,
		`Host: ${input.host}`,
		`URL: ${input.origin}`,
		`Captured: ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN")}`,
		"",
		"These are the live pages as NyayaDraft crawled them — not a rewrite.",
		"",
		"Pages in this file",
		...pages.map((p) => `- ${p.label} — ${p.title}\n  ${p.url} (${p.chars.toLocaleString("en-IN")} characters)`)
	].join("\n");
	await downloadMasterPdf({
		host: input.host,
		homeTitle: `${input.homeTitle || input.host} — original policies`,
		origin: input.origin,
		profile,
		kicker: "ORIGINAL POLICIES  ·  AS CRAWLED",
		filename: input.filename ?? `NyayaDraft-${input.host.replace(/[^\w.-]+/g, "-")}-original-policies.pdf`,
		sections: pages.map((p) => ({
			title: policySectionTitle(p),
			body: `${p.title}\n${p.url}\n\nAs crawled. Not a NyayaDraft rewrite.\n\n${p.text}`
		}))
	});
}
function policySectionTitle(p) {
	const t = p.title.replace(/\s+/g, " ").trim();
	if (t && t.length <= 80 && /policy|terms|privacy|refund|return|shipping|delivery|consent|cancellation|conditions|cookies/i.test(t) && !/refer\s*&\s*earn|superpower|lorem/i.test(t)) return t;
	return p.label;
}
//#endregion
export { downloadOriginalPoliciesPdf as a, downloadMasterPdf as i, downloadDraftDocx as n, downloadPaperPdf as o, downloadMasterDocx as r, DraftPaper as t };
