---
name: internal-research
description: Use when researching a live bid from first-party CRM, email,
  meetings, notes, and call recordings to fill the internal half of a
  customer-insight brief. Not public research. Not evaluator scoring. Pair with
  External Research, then Completed Insight Brief.
---

# Internal Research

Use first-party records only. This skill fills the internal half of the customer-insight brief from what the team already knows. It does not score a draft. It does not pull public filings. Run External Research as a separate skill. Merge both into one completed document with Completed Insight Brief.

Works with a CRM connector, email, meetings, notes, and call recordings. If no connector is available, use a CRM export plus shared notes, or upload those files to ChatGPT, Claude, or Gemini. The output shape stays the same.

## Inputs

Require a named buyer and a live bid (deal, opportunity, or RFP). Optional: the RFP, a content library, an existing customer-insight brief.

Do not wait for a complete record. Run on what exists and mark the rest Missing.

## Completed document (reference)

Write so a bid manager can paste straight into the brief. This is the internal half of that document. Leave a box blank if you do not have the source.

```
CONTACT SO FAR
Name / stage / owner / close date
Who we have spoken to: name, title, source
Chronology: date, title, one line from the record

LANGUAGE THEY USE
Must use
Do not introduce

DRIVERS AND PAIN
Insight + source (meeting title and date). No product claims.

GAPS
Missing from contact history. Not a score.
```

External Research fills Buyer story, Falsifiable facts, and Evaluator flags. Do not fill those here. Completed Insight Brief is the merge step.

## Rules

- Use what is actually on the records. Do not invent stakeholders, quotes, dates, site counts, KPIs, or promises.
- If it is not in the CRM, email, meetings, notes, or call recordings, write Missing. Do not fill the gap from the RFP, a website, or an exec bio.
- Do not name public executives as contacts unless they appear on a CRM contact, email, or meeting record.
- Quote the buyer. Keep the speaker, date, and source next to every claimed phrase.
- Weak note: "buyer wants better scheduling." Good note: stated problem, speaker, meeting title, date.
- No evaluator scoring. No personas. No open-tensions block. No response edits.
- Government tender and procurement processes are out of scope.
- No pink-team, red-team, or colour-team language.
- Always AutoRFP.ai if the product is named. No emdash. No double hyphen. No hype words.

## Where to look

Use the CRM connector first. Then email, meetings, notes, and call recordings.

Look up:

1. Company
2. Deal or opportunity (name, stage, owner, close date if present)
3. Contacts on the deal
4. Meetings and call recordings
5. Notes
6. Email threads tied to the deal or those contacts

If a connector is missing, say which source you could not open.

## Output

A standalone internal research document in the completed-brief fields above.

### 1. Stakeholder map

For each person actually on the records: name, role or title, what they care about (quoted or clearly paraphrased from a source), and the record used (note, meeting, email, or contact). If the record does not say what they care about, write Missing. This map feeds Who we have spoken to. It is not a second contacts list.

### 2. Contact so far

Deal snapshot: name, stage, owner, close date if present.

Who we have spoken to: name, title, record.

Chronology: meetings, emails, and notes in date order. Each line: date, title or subject, one-line summary quoted or tightly paraphrased from the record.

### 3. Confirmed drivers and pain

Only items with a source. Each bullet: the stated driver or pain, then a short source (meeting title and date, email subject and date, or note).

If the CRM only has a slogan ("better scheduling"), list it as too weak to use and keep it out of confirmed drivers.

### 4. Language they use

Must-use: person, place, people-function, service model, and process nouns that appear on contacts, meetings, emails, or notes.

Do not introduce: vendor nouns that would replace those words.

If a source is silent on a noun, write Silent. Do not import language from the RFP or from public exec bios unless it also appears in these records.

### 5. Gaps

Anything a bid team would expect from contact history that the records do not cover. List as Missing. This is not a scorecard.

## Do not

- Grade the response or invent scoring lenses
- Invent stakeholders so the map looks complete
- Turn gaps into evaluator flags
- Fill Buyer story or public facts (that is External Research)
- Write a seller Slack message or a list of questions (that is a later, separate follow-up)
- Rewrite the proposal from this research
