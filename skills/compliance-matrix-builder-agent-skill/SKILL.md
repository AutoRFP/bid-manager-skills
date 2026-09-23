---
name: compliance-matrix-builder-agent-skill
description: Parses RFP, ITT, and tender documents to extract every requirement,
  evaluation criterion, and submission instruction into a structured compliance
  matrix. Use this skill when a user uploads an RFP and needs a compliance
  matrix, requirements register, or evaluation criteria breakdown. Also trigger
  when users say "build a compliance matrix", "extract requirements from this
  RFP", "what are the mandatory requirements", "parse this tender",
  "requirements register", "evaluation criteria", "submission checklist", or
  upload an RFP and need to understand what is being asked. This is the first
  step in any organized bid response.
---

# Compliance Matrix Builder

Parses RFP and tender documents to extract every requirement, evaluation criterion, and submission instruction into a structured, actionable compliance matrix. This is the foundation of an organized bid response -- you cannot respond to what you have not catalogued.

## Works Well With

- **AI Go/No-Go Analyzer** - Run Go/No-Go first for a quick viability check, then build the full compliance matrix if pursuing
- **RFP Contradiction Checker** - After completing the response, use the contradiction checker as a pre-submission quality gate

## Why This Matters

Most bid teams start responding to RFPs by reading through the document and dividing up sections. This leads to missed requirements, duplicated effort, and last-minute discovery of mandatory criteria buried in appendices. A compliance matrix forces you to catalogue everything upfront, before a single word of response is written.

## Input Requirements

Accepted formats:
- `.pdf` - RFP documents, annexes, schedules
- `.xlsx` / `.csv` - Requirements tables, evaluation scorecards
- `.docx` - Tender narratives, terms and conditions
- Multiple documents (tender packages often include 5-20 separate files)

Accept all documents the user provides. Tender packages typically include a main RFP document plus annexes, schedules, terms and conditions, evaluation methodology, and submission instructions as separate files.

## Workflow

### Step 1: Ingest All Documents

Read every provided document. For each document, note:
- Document name and type
- Number of pages/rows
- Primary content category (scope, requirements, legal, evaluation, submission instructions, pricing)

Present a summary of what was received: "I've ingested [X] documents totaling approximately [Y] pages. Here's what each contains: [brief summary]. Shall I proceed with extraction?"

### Step 2: Extract Requirements

Scan every document for requirements. Look for:

**Language signals:**
- Mandatory: "must", "shall", "mandatory", "required", "minimum", "essential", "pass/fail", "prerequisite"
- Desirable: "should", "desirable", "preferred", "ideal", "advantageous", "nice to have"
- Informational: "may", "optional", "for information only"

**Structural signals:**
- Numbered requirement lists
- Tables with requirement columns
- Sections titled "Requirements", "Specifications", "Scope of Work", "Technical Requirements"
- Compliance tables asking for "Compliant / Non-Compliant / Partial"
- Evaluation scorecards with criteria and weightings

**Commonly overlooked locations:**
- Appendices and annexes (often contain the most specific technical requirements)
- Terms and conditions (contain legal and commercial requirements that are technically mandatory)
- Submission instructions (contain format requirements that can disqualify if missed)
- Evaluation methodology (contains implicit requirements -- what gets scored)
- Data sheets and schedules (contain specific performance metrics and SLAs)

For each requirement found, extract:
1. **Requirement ID** - Original reference number from the document, or assign one if not provided (e.g., REQ-001)
2. **Source** - Document name, section, and page number
3. **Requirement text** - Exact wording from the document
4. **Category** - Technical, functional, security, compliance, commercial, legal, implementation, support, submission
5. **Priority** - Mandatory, desirable, or informational (based on language signals)
6. **Evaluation weight** - If the RFP states weightings, include them
7. **Response type needed** - Narrative, yes/no, evidence upload, pricing, reference, certification

### Step 3: Extract Evaluation Criteria

Separately catalogue the evaluation methodology:
- Evaluation criteria and their weightings
- Scoring methodology (how points are awarded)
- Pass/fail gates (any criteria that must be met to proceed)
- Evaluation stages (e.g., written evaluation, shortlist, presentation, BAFO)

### Step 4: Extract Submission Instructions

Catalogue every submission requirement:
- Deadline (date and time, including timezone)
- Submission format (portal, email, physical)
- Document format requirements (page limits, font sizes, file types)
- Structure requirements (required sections, order, naming conventions)
- Number of copies or format versions required
- Pricing format requirements (often submitted separately)
- Clarification process and deadlines
- Any mandatory pre-submission activities (site visits, briefings, registrations)

### Step 5: Build the Compliance Matrix

Organize everything into a structured matrix:

## Compliance Matrix: [RFP Name / Reference]

### Overview
- Issuing organization: [X]
- Submission deadline: [Date, Time, Timezone]
- Total requirements extracted: [X]
  - Mandatory: [X]
  - Desirable: [X]
  - Informational: [X]
- Evaluation criteria: [X] categories

### Submission Checklist
Every submission instruction as a checklist item, ordered by deadline.

### Requirements Matrix
| Req ID | Source | Requirement | Category | Priority | Weight | Response Type | Owner | Status | Notes |
Owner and Status columns left blank for the bid team to fill in.

### Evaluation Criteria
| Criterion | Weight | Scoring Method | Source |

### Key Dates
| Date | Event | Source |
All dates from submission deadline to project start, chronologically.

### Observations
- Requirements that are ambiguous and may need clarification
- Requirements that appear duplicated across documents
- Requirements that seem to contradict each other
- Any gaps where you would expect requirements but none were stated

### Step 6: Deliver and Discuss

Present the matrix to the user. Highlight:
- Total requirement count and the mandatory/desirable split
- Any requirements that are ambiguous or need clarification from the issuer
- Any potential deal-breakers (requirements that may be hard to meet)
- The evaluation weighting -- where the most points are available
- Submission requirements that need early action (registrations, site visits)

Ask: "Would you like me to export this as a spreadsheet (.xlsx) so your team can assign owners and track progress? Or would you prefer to keep it as a document?"

## Output Format

- Quick overview: structured markdown in conversation
- Full compliance matrix: create as `.xlsx` (preferred for team use) or `.md`
- If the user prefers a document: create as `.docx`

The `.xlsx` format is recommended because bid teams need to filter, sort, assign owners, and track completion status -- spreadsheets are the natural format for this.

## Important Principles

- Extract everything. It is better to include a requirement that turns out to be unimportant than to miss a mandatory requirement buried in an appendix. Evaluators have disqualified bids for missing a single mandatory submission instruction.
- Preserve exact wording. The requirement text should be quoted directly from the document, not paraphrased. Paraphrasing introduces interpretation that may be wrong.
- When in doubt about priority, classify as mandatory. It is safer to treat an ambiguous requirement as mandatory and confirm with the issuer than to assume it is desirable and get disqualified.
- Flag ambiguity. If a requirement can be interpreted multiple ways, note this and suggest submitting a clarification question to the issuer.
- Requirements are often spread across multiple documents and may be stated differently in each. Cross-reference and flag duplicates or conflicts.
