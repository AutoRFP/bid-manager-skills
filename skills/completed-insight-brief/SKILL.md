---
name: completed-insight-brief
description: >-
  Use when Internal and External research exist and you need one filled
  customer-insight brief (the completed document for the bid team). Merges both
  research passes into the brief template. Not a response rewrite. Not evaluator
  scoring.
---
# Completed Insight Brief

Turn Internal Research and External Research into one filled customer-insight brief. That filled brief is the completed document. It is for the bid team. It is not the response.

This skill does not grade a draft. It does not rewrite answers. If Internal or External is missing, fill what you have and write Missing on the rest.

Portable: works in ChatGPT, Claude, Gemini, or AutoRFP.ai. If an MCP or connector can reach the CRM, email, meetings, or the RFP workspace, use it. If not, upload the CRM export, notes, call transcripts, public source files, and any draft of the brief.

## Inputs

1. Internal Research output (or raw CRM, email, meetings, notes, calls)
2. External Research output (or named public sources)
3. Optional: the blank brief, the RFP, buyer / opportunity / date

Do not invent a row to make the page look complete. A blank box with Missing is correct.

## The completed document (reference)

Match this shape. Page 2 of the customer-insight brief is the internal half. External research adds the public half on the same document. Leave a box blank if you do not have the source.

```
Customer insight brief
Buyer:                 Opportunity:            Date:
Circulation: Seller, bid manager, SMEs, exec reviewer
Insight for the bid team. Not the response.

CONTACT SO FAR                          (from Internal Research)
Name / stage / owner / close date
Who we have spoken to: name, title, source
Chronology: date, title, one line from the record

LANGUAGE THEY USE                       (Internal first, then External public nouns)
Must use
Do not introduce
Only words that appear in CRM, calls, notes, or a named public source. If silent, write Silent.

DRIVERS AND PAIN                        (from Internal Research)
Insight + source (meeting title and date). No product claims.

GAPS                                    (Internal contact gaps + External unanswered public questions)
Missing from the record. Not a score.

BUYER STORY                             (from External Research)
Today, pressure, buyer direction. Public language only. Every claim must reappear under facts.

FALSIFIABLE FACTS AND SOURCES           (from External Research)
Fact | source title | date | URL or filing. One fact per row.

EVALUATOR FLAGS                         (from External Research)
Green: sourced buyer nouns and facts a generic vendor cannot copy
Red: logo-swap language, missing proof, claims that fight the public strategy
```

Internal Research and External Research each fill their columns of this document. This skill merges them. Do not run a second research pass here.

## How to merge

| Brief field | Source | Rule |
| --- | --- | --- |
| Contact so far | Internal | Deal snapshot, people on the records, chronology. Never add a public exec who is not on a CRM, email, or meeting record. |
| Language they use | Internal, then External | Internal nouns win when both exist. Add an External noun only if a named public source uses it. Mark each noun Internal or External. |
| Drivers and pain | Internal | Stated problem + speaker + meeting date. Public strategy is not pain unless the buyer said it on a call or note. |
| Gaps | Both | List Missing items. Do not turn them into scores. |
| Buyer story | External | Three to five sentences. Public language only. |
| Falsifiable facts | External | Omit anything you cannot source. |
| Evaluator flags | External | Flags, not a grade of the draft. |

If Internal and External disagree on a noun or a number, keep both lines, each with its source. Do not pick a winner.

## Rules

- Use what is on the inputs. Do not invent stakeholders, quotes, dates, site counts, or KPIs.
- Quote the buyer or the filing. Keep speaker or source title, date, and record next to every claimed phrase.
- Weak note stays out of Drivers: "buyer wants better scheduling." Good note: stated problem, speaker, meeting title, date.
- No product claims in Drivers and pain.
- No evaluator scoring. No rewrite of the response.
- Government tender processes are out of scope.
- No pink-team, red-team, or colour-team language.
- Always AutoRFP.ai if the product is named. No emdash. No double hyphen. No hype words.
- If you cite the 2026 Proposal Win Rate Report, say 100+ bid professionals, not 97. Keep exact percentages.

## Output

One completed brief in the reference shape above. Then a short routing line: which gaps the seller, bid manager, or SME owns next.

Do not attach a rewritten response.

## Do not

- Fill a box to look finished
- Mix the blank lead-magnet worksheet with a named-buyer specimen and ship them as one file
- Grade or rewrite the draft
- Import RFP language into Must use unless it also appears in Internal or External sources
