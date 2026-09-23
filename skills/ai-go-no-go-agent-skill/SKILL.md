---
name: ai-go-no-go-agent-skill
description: Performs AI-powered Go/No-Go analysis on tender and RFP documents
  against your company profile and a structured decision framework. Use this
  skill whenever a user uploads tender documents, RFP packages, or ITT files and
  wants to determine whether to bid. Also trigger when users say "should we bid
  on this", "analyze this tender", "go no-go", "bid decision", "evaluate this
  RFP opportunity", or upload multiple procurement documents for assessment.
  Works with any company by analyzing their website and matching against tender
  requirements.
---

# AI Go/No-Go Tender Analyzer

Analyzes uploaded tender/RFP documents against a company's profile and a structured Go/No-Go decision framework to produce an actionable bid/no-bid recommendation with evidence-based scoring.

## Works Well With

- **Compliance Matrix Builder** - Run after Go/No-Go to extract every requirement from the tender into a structured matrix
- **Competitor Intelligence** - Research competitors identified during the Go/No-Go to inform bid strategy

## How This Skill Works

This skill takes two primary inputs: a company's website URL (or company profile) and one or more tender documents. It evaluates the opportunity through seven weighted categories and produces a scored recommendation with document-level evidence for every finding.

## Reference Files

Before starting any analysis, read the reference files:

- `references/go-no-go-framework.md` - The scoring framework with seven weighted categories, scoring guidance, and decision thresholds. Users should customize this to match their risk appetite and organizational priorities.

If the user has not provided a company URL or profile, ask for one before proceeding. The company profile is essential -- without it, the analysis is guesswork.

## Supported Input Formats

- `.pdf` - Tender documents, annexes, schedules
- `.xlsx` / `.csv` - Requirements matrices, pricing schedules, evaluation criteria
- `.docx` - Tender narratives, terms and conditions, scope documents
- `.txt` - Plain text extracts or notes

Tender packages often contain multiple documents. Accept and process all of them. If the user references a number of documents (e.g., "10 tender documents"), confirm you have received all of them before starting analysis.

## Workflow

### Step 1: Build the Company Profile

If the user provides a company URL, use web search/fetch to understand:
- Products and services offered
- Target market and industry focus
- Deployment model (SaaS, on-prem, hybrid)
- Geographic presence and data residency capabilities
- Key certifications and compliance posture
- Notable customers and case studies

If the user provides a capabilities document or company profile instead, use that as the primary source. Summarize the company profile back to the user for confirmation before proceeding.

### Step 2: Ingest and Summarize the Tender

Read through all provided tender documents. Produce a brief tender overview covering:

- Issuing organization
- Opportunity name / reference number
- Submission deadline
- Estimated contract value (stated or implied)
- Contract duration
- Sector / industry
- Evaluation methodology (if stated)
- Number of documents reviewed

### Step 3: Extract Key Tender Intelligence

Scan all documents to answer these questions with direct evidence. For each answer, cite the specific document and section where the information was found.

**Budget & Commercial:**
- What is the stated budget or estimated financial scope? If not explicitly stated, note that.
- What is the contract term and any renewal options?

**Key Dates:**
- List all critical dates: submission deadline, Q&A period close, clarification windows, decision date, project start date, implementation milestones.

**Technical Requirements:**
- Hosting requirements: Is on-premise hosting mandatory, preferred, or flexible?
- Data residency: Must data be stored in specific geographic locations?
- Integration points: What systems, platforms, or APIs must the solution integrate with?
- Key functional requirements: What are the core capabilities being sought?

**Security & Compliance:**
- Summarize mandatory InfoSec requirements including certifications (ISO 27001, SOC 2, PCI DSS, etc.), data handling protocols, and security standards.
- Note any regulatory framework requirements specific to the jurisdiction.

**Legal & Contractual:**
- Flag any notable liability, indemnity, SLA, or penalty clauses.
- Note any unusual or onerous contractual terms.

For each finding, include a reference in this format:
> Reference: [Document name], [Section/Page], "[Brief quote]"

### Step 4: Score Against the Go/No-Go Framework

Read `references/go-no-go-framework.md`. Work through every category and question using:
- The tender documents as the primary source
- The company profile from Step 1 as the capability baseline

For each question:
1. State the question
2. Provide your assessment based on evidence from the documents and company profile
3. Assign a score from 1-5 per the scoring guidance
4. Cite the relevant source (document section or company profile element)

Questions that require internal knowledge the user would have (team bandwidth, relationship strength, internal priorities) should be flagged as **REQUIRES USER INPUT** with a clear note about what information is needed. Do not guess.

### Step 5: Calculate the Recommendation

1. Calculate the weighted score per category
2. Calculate the overall weighted percentage
3. Apply the decision thresholds from the framework:
   - **80%+ = Strong Go** - Pursue with confidence
   - **65-79% = Conditional Go** - Pursue, but address flagged risks
   - **50-64% = Executive Review** - Escalate; significant risks present
   - **Below 50% = No-Go** - Do not pursue unless strategic override justified
4. Identify any hard deal-breakers (requirements the company fundamentally cannot meet)
5. List all items flagged as REQUIRES USER INPUT that could materially shift the score

### Step 6: Output the Report

Present using this structure:

```
## AI Go/No-Go Analysis Report

### 1. Company Profile Summary
Brief summary of the company's relevant capabilities and positioning

### 2. Tender Overview
Issuing org, opportunity name, deadline, value, duration, sector, documents reviewed

### 3. Key Tender Intelligence
Budget & Commercial | Key Dates | Technical Requirements | Security & Compliance | Legal
Each with document references

### 4. Go/No-Go Scorecard
Table: Category | Weight | Score (1-5) | Weighted Score | Key Evidence
Total weighted score and decision threshold

### 5. Deal-Breaker Assessment
Any mandatory requirements the company cannot meet, with evidence

### 6. Items Requiring Your Input
Questions that need internal knowledge to answer accurately, with context on how they could shift the score

### 7. Overall Recommendation
- Decision: [Strong Go / Conditional Go / Executive Review / No-Go]
- Confidence level based on information completeness
- Top 3-5 risks
- If Go or Conditional Go: 2-3 potential win themes based on strongest capability alignment

### 8. Suggested Next Steps
Actionable next steps based on the recommendation
```

## Output Format

- Quick assessments: structured markdown directly in conversation
- Formal reports: create as `.md` file and present to user
- If user requests DOCX or PDF, use the appropriate creation skill

## Important Principles

- This skill provides a structured, evidence-based recommendation. It does not make the final bid decision -- that remains with the bid team and leadership.
- Always surface uncertainty. If a tender document is vague or the company profile lacks detail in an area, say so explicitly rather than assuming.
- Cite everything. Every score should trace back to either a document reference or a company capability.
- If the tender contains evaluation criteria with explicit weightings, include them in the report since they should directly influence where the bid team invests effort.
- When in doubt, flag it. Better to surface a potential risk the user can dismiss than to miss something that costs them the bid.
