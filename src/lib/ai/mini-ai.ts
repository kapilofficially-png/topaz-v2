import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { aiKeysSchema } from "./providers";
import { aiMeta, chat } from "./chat";
import type { SavedCitation } from "@/lib/drafts/store";

const miniAiInput = z.object({
  host: z.string().min(2).max(200),
  origin: z.string().min(4).max(300),
  homeTitle: z.string().max(300).optional(),
  action: z.enum([
    "cold_mail_full_policy",
    "study_and_analyze",
    "modify_paper",
    "custom_instruction",
  ]),
  selectedPolicyKind: z.string().max(80).optional(),
  selectedPolicyTitle: z.string().max(200).optional(),
  targetField: z
    .enum([
      "coldPaper",
      "findings",
      "refined",
      "gapsPaper",
      "briefPaper",
      "implementPaper",
      "agreementPaper",
      "questionsPaper",
      "emailPaper",
    ])
    .default("coldPaper"),
  userPrompt: z.string().max(4000).optional(),
  sender: z
    .object({
      name: z.string().max(100).optional(),
      city: z.string().max(100).optional(),
      email: z.string().max(150).optional(),
      phone: z.string().max(50).optional(),
      offer: z.string().max(400).optional(),
      proof: z.string().max(300).optional(),
      fee: z.string().max(60).optional(),
      advancePct: z.string().max(10).optional(),
    })
    .optional(),
  pages: z
    .array(
      z.object({
        kind: z.string(),
        label: z.string(),
        url: z.string(),
        title: z.string(),
        text: z.string().max(9000),
        hidden: z.boolean().optional(),
        added: z.boolean().optional(),
      }),
    )
    .max(20)
    .optional(),
  refined: z
    .array(
      z.object({
        kind: z.string(),
        url: z.string().optional(),
        slug: z.string().optional(),
        title: z.string(),
        raw: z.string().max(14000),
      }),
    )
    .max(16)
    .optional(),
  currentContent: z.string().max(16000).optional(),
  findings: z.string().max(8000).optional(),
  gapsPaper: z.string().max(8000).optional(),
  briefPaper: z.string().max(8000).optional(),
  aiKeys: aiKeysSchema.optional(),
});

const SYSTEM_MINI_AI_STUDY = `You are NyayaDraft's Strategic Store Intelligence AI.
You study and analyse an Indian ecommerce store's crawl data, policy gaps, legal compliance issues, and outreach drafts.
You provide an executive, high-leverage legal and commercial analysis tailored to the merchant's exact product category, marketing promises, and checkout model.

Framework grounded in:
- Consumer Protection Act 2019 & E-Commerce Rules 2020 (unfair contract terms, mandatory disclosures, grievance officer)
- Digital Personal Data Protection Act (DPDPA) 2023 (clear withdrawal of consent, notice in clear language)
- Sale of Goods Act & Contract Act 1872 (implied condition of merchantability, unilateral fees)
- Legal Metrology (Packaged Commodities) Rules 2011 (mandatory MRP, net quantity, manufacturer address display)

Output in clean, structured Markdown:
## 1. EXECUTIVE SUMMARY & STORE PROFILE
4–6 bullet points on store type, products, detected platform, and primary risk posture.

## 2. KEY STATUTORY VULNERABILITIES (AUDIT HIGHLIGHTS)
Specific clauses on the live site that expose the store to CCPA / National Consumer Helpline complaints or regulatory notices.

## 3. COMMERCIAL LEVERAGE & CONVERSION FRICTION
Where their current policies repel buyers (e.g. rigid 48-hour return windows, harsh unboxing video demands, buried shipping times, confusing COD refund rules).

## 4. RECOMMENDED DRAFTING & OUTREACH STRATEGY
The single highest-value policy to pitch them first, exact angles to highlight to the founder, and why this policy rewrite will improve their bottom line.`;

const SYSTEM_MINI_AI_COLD_FULL_POLICY = `You are NyayaDraft's Senior Cold Outreach Strategist.
The user wants to send a SPECIFIC COMPLETE REVISED POLICY (e.g., Full Revised Refund Policy, Full Revised Terms of Service, Full Privacy Policy, or Full Shipping Policy) as part of the outreach sequence, INSTEAD of merely one isolated sample sentence.

Your job is to restructure the complete Cold Outreach sequence for this store:
- Feature the chosen complete revised policy prominently as a comprehensive "SAMPLE REVIEW PACK / TEASER".
- Explain to the founder why this specific rewritten policy is essential under current Indian law (CPA 2019, E-Commerce Rules 2020, DPDP 2023).
- Format Email 1, Email 2, Email 3, WhatsApp DM, Email 5, and Call Script so they pitch this entire revised policy draft as an exclusive teaser.

Structure your markdown output EXACTLY with these sections:

## OUTREACH STRATEGY OVERVIEW
Brief explanation of why pitching this specific full revised policy is more compelling for this store than a generic clause.

## COMPLETE REVISED POLICY (TEASER PACK)
**Policy Title:** (e.g. Revised Refund & Cancellation Policy / Terms of Service)
**Watermark Notice:** SAMPLE DRAFT — Prepared by Indian Legal Drafter for review. Not for public deployment prior to execution of engagement.
**Complete Policy Text:**
(Provide the full, clean, clause-by-clause revised policy tailored to this store's real catalog, COD, delivery promises, and Indian statute).

## EMAIL 1 — DAY 0 — TEASER PACK OFFER
**Subject:**
**Body:** (80–130 words. Observes live site issue, introduces the complete revised policy teaser attached or provided, explains the legal risk, asks to reply "send").

## EMAIL 2 — DAY 3 — BUMP ON FULL REVISED POLICY
**Subject:**
**Body:** (40–70 words. Points to one specific section of the revised policy draft).

## EMAIL 3 — DAY 7 — SECOND ANGLE & POLICY HIGHLIGHT
**Subject:**
**Body:** (80–110 words. Explains how this complete revised policy prevents CCPA consumer notices or COD disputes).

## EMAIL 4 — WHATSAPP / INSTAGRAM DM
**To:** WhatsApp / Founder DM
**Body:** (50–80 words. High-impact note highlighting the full revised draft).

## EMAIL 5 — DAY 14 — COMPLETE STORE PACK & RETAINER
**Subject:**
**Body:** (80–110 words. They can keep the complete revised sample policy. The full engagement covers all remaining legal pages, aligned).

## CALL SCRIPT — FULL POLICY HOOK
(Spoken script for a phone call referencing the complete revised policy draft).`;

const SYSTEM_MINI_AI_MODIFY = `You are NyayaDraft's Master Legal Editor and Customizer AI.
You study the store's data, the existing paper, and the user's specific instructions, and modify or rewrite the content EXACTLY according to the user's needs.

Guidelines:
- Ground any legal alterations in Indian statute (CPA 2019, E-Commerce Rules 2020, DPDP Act 2023, Contract Act 1872).
- Follow the user's specific instructions precisely. If they ask to emphasize certain clauses, tone down legal jargon, add commercial incentives, or restructure an email draft, execute it faithfully.
- Maintain professional, persuasive, and publication-ready drafting standards.

Return your response in clean Markdown with:
1. An initial ## MODIFICATION NOTES section (brief bullet list of what you modified based on user request).
2. The full revised paper content.`;

export const miniAiAnalyzeAndModifyFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => miniAiInput.parse(input))
  .handler(async ({ data }) => {
    const { retrieve } = await import("@/lib/rag/retrieve");
    const hits: SavedCitation[] = retrieve({
      query: `Consumer Protection E-Commerce Rules DPDP Act 2023 refund cancellation terms shipping grievance officer ${data.host} ${data.homeTitle ?? ""}`,
      k: 6,
    });

    const sender = data.sender;
    const senderName = sender?.name?.trim() || "Legal Drafter";
    const senderInfo = `Drafter: ${senderName}, City: ${sender?.city || "[City]"}, Email: ${sender?.email || "[Email]"}, Phone: ${sender?.phone || "[Phone]"}, Fee: ${sender?.fee || "₹15,000"}, Advance: ${sender?.advancePct || "50"}%`;

    // 1. Prepare target policy if full policy action is selected
    let targetPolicy = "";
    let policyTitle = "";
    if (data.action === "cold_mail_full_policy" || data.selectedPolicyKind) {
      const match = data.refined?.find(
        (r) =>
          (data.selectedPolicyKind && r.kind === data.selectedPolicyKind) ||
          (data.selectedPolicyTitle && r.title.toLowerCase().includes(data.selectedPolicyTitle.toLowerCase())),
      ) || data.refined?.[0];

      if (match) {
        policyTitle = match.title;
        targetPolicy = match.raw;
      }
    }

    let systemPrompt = SYSTEM_MINI_AI_MODIFY;
    let userPrompt = "";

    if (data.action === "study_and_analyze") {
      systemPrompt = SYSTEM_MINI_AI_STUDY;
      userPrompt = `Please study and analyze this store in detail.
Store: ${data.host} (${data.origin})
Title: ${data.homeTitle || "Ecommerce store"}

Live Pages Crawled (${data.pages?.length || 0}):
${(data.pages || []).map((p) => `- ${p.label} (${p.url}): ${p.text.slice(0, 500)}...`).join("\n")}

Audit Findings:
${(data.findings || "").slice(0, 4000) || "No initial audit findings recorded yet."}

Gap Register:
${(data.gapsPaper || "").slice(0, 3000) || "No gap register recorded yet."}

Refined Policies Available:
${(data.refined || []).map((r) => `- ${r.title} (${r.kind})`).join("\n") || "None yet"}

User Instruction / Focus:
${data.userPrompt || "Provide full legal audit study and strategic commercial recommendations."}`;
    } else if (data.action === "cold_mail_full_policy") {
      systemPrompt = SYSTEM_MINI_AI_COLD_FULL_POLICY;
      userPrompt = `Store: ${data.host} (${data.origin})
Sender: ${senderInfo}

CHOSEN REVISED POLICY TO FEATURE IN OUTREACH:
Title: ${policyTitle || data.selectedPolicyTitle || "Full Revised Policy"}
Policy Text:
${targetPolicy || data.currentContent || "(Create a high-impact, compliant revised policy draft tailored to this store's product catalogue and live page issues)"}

STORE CONTEXT & LIVE PAGES:
${(data.pages || []).map((p) => `${p.label} (${p.url}): ${p.text.slice(0, 600)}`).join("\n\n")}

PRIOR AUDIT GAPS:
${(data.findings || data.gapsPaper || "").slice(0, 3000)}

USER REQUEST:
${data.userPrompt || "I want to send this specific complete revised policy as the centerpiece of my cold mail sequence instead of just one small clause, so the store owner immediately sees the full value of the work."}`;
    } else {
      // modify_paper or custom_instruction
      systemPrompt = SYSTEM_MINI_AI_MODIFY;
      userPrompt = `Store: ${data.host} (${data.origin})
Sender: ${senderInfo}
Target Field: ${data.targetField}

EXISTING PAPER / CONTENT TO MODIFY:
${data.currentContent?.slice(0, 8000) || data.findings?.slice(0, 4000) || "(empty)"}

AVAILABLE REFINED POLICIES:
${(data.refined || []).map((r) => `### ${r.title}\n${r.raw.slice(0, 1000)}`).join("\n\n")}

USER'S CUSTOM INSTRUCTIONS:
${data.userPrompt || "Analyze and refine this paper according to current Indian e-commerce legal standards and clear commercial writing."}`;
    }

    const result = await chat({
      keys: data.aiKeys,
      maxTokens: 3800,
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    if (!result.ok) {
      return {
        ok: false as const,
        error: result.error,
        citations: hits,
      };
    }

    return {
      ok: true as const,
      modifiedContent: result.text,
      analysis: result.text,
      targetField: data.targetField,
      policyTitle: policyTitle || undefined,
      citations: hits,
      ...aiMeta(result),
    };
  });
