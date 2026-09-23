---
name: external-research
description: Discover the right public sources for this offering and write a
  full trust-classified research report in one run.
license: Custom terms. See LICENSE.txt
metadata:
  display_name: External Research
  author: AutoRFP.ai
---

# External Research

In one run, discover the right public sources for this offering, search them, and write the full trust-classified research report. Produce `external-source-report.md`.

Do not stop after listing sources or queries. Do not deliver a source map as the result. Sources are a working step. The report is the deliverable: trustworthy research, buyer language, falsifiable facts and stats, and strategic priorities, each classified by trust.

## Start with context

Confirm the target organisation, the user's offering (the vendor and problem they sell), the intended deliverable, and the jurisdiction. Ask only for missing details that change what would count as proof.

If the user supplies authorised vendor facts (their own figures, case studies, or product claims), record them as `Provided`. Do not present them as independently verified.

Do not assume the industry, the offering, or a fixed second set of sources. Learn the high-signal sources from this run.

## Discover sources, then use them immediately

Work in two layers: common sources that ground any organisation, then high-signal sources you infer from this offering. As soon as a source is named, search it. Do not wait for a complete catalogue.

### Common sources

Use these as a starting lens for foundational facts. They are not the output.

#### Website

Look for company values, history, and scale. Prefer the official site, about pages, and current leadership or location pages.

#### Investor Center

Look for annual reports, investor presentations, and statistics. Prefer investor relations, filings, and official results pages. Keep figures with dates, geographies, and units.

#### Job Ads

Look for objectives, areas of focus, and locations of focus. Prefer current careers pages and official job posts. Treat ads as signals of priority, not as proof of a live programme.

#### News

Look for legal and financial issues, brand damage, and initiatives. Prefer the organisation newsroom, named outlets, and dated official statements. Separate the organisation's own announcement from third-party commentary.

### High-signal sources

Infer these from the offering. They are the sources most likely to surface this organisation's real pains rather than generic industry trends.

Do not reuse a remembered industry list. Derive the set now:

1. State the category of pain the offering addresses, in one sentence, using the user's words.
2. Name the official registers, regulators, courts or tribunals, statutory reports, industry bodies, and buyer-side forums that publish proof of that pain in this jurisdiction.
3. Add authorised operating documents or contracts only when the user supplied them. Do not hunt for leaked internal files.
4. Search those sources against this organisation. Keep a source only if it returns material here. Drop the rest.
5. If a promising class of record exists but nothing is found, log it as an open gap. Do not invent the finding.

A useful high-signal source is official or statutory, specific to the offering's problem, and checkable. Reviews and forums are signals until a primary source corroborates them.

### Example only

The cards below show the method for a workforce-management offering such as Workforce.com. Use them only when the user's offering is actually about workforce, payroll, HR, or employment. Do not copy them onto any other deal.

- Employment court cases: underpayments, specific legal risks, penalties or enforcements. Prefer official court, tribunal, or regulator records in the named jurisdiction.
- Wage equality reporting: employee type breakdown, headcount growth, wage cost details. Prefer statutory pay-gap or equivalent public reports.
- Glassdoor reviews: key employee issues, opportunities, what is already working. Quote clusters, not single unverified posts.
- Employee handbooks (user-supplied only): day to day workflow, systems and processes, values and communication channels.
- Employment agreements (user-supplied only): applicable processes and laws, complexities, risks.

For a payments vendor the same method might surface regulator enforcement, scheme rules, and outage reports. For a cyber vendor it might surface breach notifications and assurance filings. Name the equivalents for this offering yourself.

## Search and write in the same run

For each source you kept, write one to three precise queries, run them if browsing is available, open the underlying pages or documents, and log the direct URL. Prefer official domains, `site:`, quoted phrases, `OR`, `filetype:pdf`, and exclusions only when they tighten the result.

```text
Website
site:organisation.example (about OR values OR "our story" OR leadership)

Investor Center
site:organisation.example ("annual report" OR "investor presentation" OR "full year") (filetype:pdf OR filetype:xlsx)

Job Ads
site:organisation.example (careers OR jobs) ("we are looking" OR "you will" OR "this role")

News
"Organisation Name" (investigation OR lawsuit OR "regulatory" OR initiative OR "strategic priority")
```

Build high-signal queries from the sources you just inferred. Point them at the regulator, register, statutory report, or buyer-side forum that applies. Replace every placeholder with this organisation's aliases, language, and jurisdiction.

Search results stay leads until you open the source and record a locator. Then keep going: classify the finding and place it in the report. Do not pause to hand the user a query list.

If browsing is unavailable, still write the report. Mark findings `Needs evidence`, list the queries you would run, and leave those items as open gaps. Do not invent URLs, case names, quotes, or figures.

For extra query precision on remaining public gaps, Build Google Dork can refine them later. Do not delay the report for that step.

## Classify by trust, then extract the foundation

Compare the same claim across source types. Classify every material finding. Then write the foundation sections from those classified findings. Do not write generic industry commentary.

### Trust bands

Use these bands in the source log. They sit on top of the shared evidence contract (`Claim ID`, source type, confidence, status).

| Band | What qualifies | Typical status |
|---|---|---|
| Official | Filings, statutory reports, court or regulator records, the organisation newsroom, the official website | `Verified` when the locator supports the scoped claim |
| Corroborated | Two or more independent source types agree on the same scoped fact | `Verified` |
| Independent | A named outlet, analyst, or third-party report that cites a primary source | `Verified` only after the primary source is checked; otherwise `Needs evidence` |
| Signal | Job ads, review-site clusters, a single news item, or an undated deck | Lead; quote as a signal, not as proof of a live programme |
| Unverified | A single comment, an undated claim, or no locator | `Needs evidence`; never present as fact |

Cross-check rules:

- An official first-party figure with a date, geography, and unit can be `Verified` from that one official source.
- Interpretive claims (pains, priorities, culture, risk) need a second source type before you call them `Verified`.
- When sources disagree, keep both wordings, record the conflict, and do not pick a winner.
- Review sites and job ads never graduate past Signal on their own.
- Retain dates, qualifiers, geographies, sample sizes, and units. Do not widen a claim.

### Foundation extracts

These sections are the report. Write them from classified findings, not from general knowledge.

#### Trustworthy Research

Use only Official or Corroborated findings about this organisation's real pains, constraints, and initiatives. Speak to what they are dealing with, not generic industry trends. Each bullet needs a Claim ID and a locator.

#### Buyer Language

Quote phrases the organisation uses for itself: values, role language, strategy labels, and how they describe the problem. Prefer wording that appears more than once. Cite the source. The aim is to speak as a peer already working with them, not as an outsider. Do not invent voice.

#### Falsifiable Facts and Stats

List dated, scoped figures you can check. Include their numbers from official sources and, when the user supplied them, the vendor's own numbers as `Provided`. Trust sits in the details (year, unit, geography, sample), not in generalities. Never invent a statistic.

#### Strategic Priorities

List three to seven priorities in the organisation's own language. Tie each to a source and a trust band. Job-ad objectives and investor themes are signals until an official strategy document or results commentary corroborates them.

Also capture, when the sources support them: risks, opportunities, and what is already working. Keep those labelled with their trust band.

## Output

Write the full report in this run as `external-source-report.md`:

```markdown
# External Source Report: [Organisation]
## Trustworthy research
## Buyer language
## Falsifiable facts and stats
## Strategic priorities
## Source log
## Open evidence gaps
```

The source log uses the shared evidence table plus a Trust band column. It supports the extracts. It is not a substitute for them.

If file creation is unavailable, return the same report inline under that filename.

## Boundary

Use only public or authorised material. Do not search for credentials, personal data, private systems, or access-control bypasses. Review sites, news, and job ads stay leads until the underlying source is validated.

## Handoff

The report is the handoff. Send verified claims, buyer language, and priorities to Customer Brief Research and Response Insight Enricher. Send remaining public gaps to Build Google Dork. Send supplied PDFs to PDF Insight Finder.

## Evidence rules

- Map every material claim to a source and Claim ID.
