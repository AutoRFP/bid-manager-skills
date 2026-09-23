---
name: competitor-intelligence-agent-skill
description: Researches and builds structured competitive intelligence profiles
  for use in RFP responses, bid strategy, and sales positioning. Analyzes
  competitor products, pricing, strengths, weaknesses, and market positioning to
  help you differentiate. Use this skill when a user wants to research a
  competitor, build a competitive battlecard, understand a competitor's
  weaknesses for a bid, or needs competitive positioning for an RFP. Also
  trigger when users say "research [competitor name]", "competitive analysis",
  "battlecard", "how do we compare to [competitor]", "competitor weaknesses",
  "what does [competitor] do", or need to understand the competitive landscape
  for a specific deal. Works for both known competitors and for identifying
  likely competitors in a market.
---

# Competitor Intelligence for RFP & Sales

Researches competitors and produces structured intelligence profiles that directly inform RFP win strategy, bid positioning, and sales conversations. This is not generic market research -- it is tactical intelligence designed to help you win specific deals.

## Works Well With

- **AI Go/No-Go Analyzer** - Competitive landscape understanding improves the accuracy of Go/No-Go scoring

## How Competitive Intelligence Feeds RFP Work

Competitor intelligence serves three purposes in the bid process:
1. **Win theme development** - Understanding competitor weaknesses helps you position your strengths as differentiators
2. **Objection anticipation** - Knowing what competitors claim helps you preempt evaluator questions
3. **Trap-setting** - Understanding where competitors fall short lets you include requirements or proof points in your response that they cannot match

## Workflow

### Step 1: Define the Intelligence Need

Ask the user what they need:

**Option A: Specific competitor deep-dive**
- "I need to understand [Competitor Name] for an upcoming bid"
- Research that specific competitor in depth

**Option B: Competitive landscape for a deal**
- "Who are we likely competing against for [opportunity/sector]?"
- Identify likely competitors, then profile each one

**Option C: Battlecard update**
- "Update our intelligence on [Competitor Name]"
- Refresh existing knowledge with current information

Also ask:
- What is the deal or RFP context? (Sector, requirements, geography)
- Do you already have intelligence on this competitor, or starting from scratch?
- Are there specific areas you need to focus on? (Pricing, technical capabilities, security posture, implementation approach)

### Step 2: Research

Use web search to gather intelligence from these source categories:

**Official sources:**
- Competitor's website (product pages, pricing, case studies, documentation)
- Press releases and news articles
- Job postings (reveal technology stack, expansion plans, and capability gaps)
- SEC filings or Companies House data (if public)
- Patent filings (reveal R&D direction)

**Third-party sources:**
- G2, Gartner Peer Insights, TrustRadius reviews (real user feedback)
- Analyst reports and market guides
- Industry publications and trade press
- LinkedIn (company size, growth trajectory, key hires)

**Community sources:**
- Reddit, community forums, Stack Overflow discussions
- Conference presentations and webinar recordings
- Podcast appearances by competitor leadership

**RFP-specific intelligence:**
- Public contract awards (government procurement databases)
- Case studies that reveal their implementation approach
- Partner ecosystem (who they integrate with, who they resell through)

For each piece of intelligence, note the source and how recent it is. Intelligence older than 12 months should be flagged as potentially outdated.

### Step 3: Build the Intelligence Profile

Organize findings into this structure:

```
## Competitor Intelligence: [Competitor Name]

### Company Overview
- Founded, HQ, headcount, funding/revenue (if known)
- Target market and ICP
- Growth trajectory (hiring trends, funding rounds, market expansion)

### Product & Capabilities
- Core product description
- Key features and modules
- Deployment model (SaaS, on-prem, hybrid)
- Technology stack (if known)
- Integration ecosystem
- Recent product launches or roadmap signals

### Strengths (Be Honest)
What they genuinely do well. Ignoring competitor strengths leads to bad strategy.
- [Strength 1] - Evidence and source
- [Strength 2] - Evidence and source

### Weaknesses & Vulnerabilities
Where they fall short, with evidence.
- [Weakness 1] - Evidence (user reviews, known limitations, architectural constraints)
- [Weakness 2] - Evidence

### Pricing & Commercial Model
- Pricing structure (per user, per transaction, platform fee, etc.)
- Typical deal sizes (if known from reviews or contract databases)
- Common commercial terms or restrictions
- Free tier or trial availability

### Security & Compliance Posture
- Known certifications
- Data residency capabilities
- Notable security incidents or gaps

### Customer Base & References
- Named customers (from case studies, press releases)
- Sectors they are strongest in
- Customer sentiment from review sites (summarize patterns, not individual reviews)

### Key Personnel
- CEO, CTO, VP Sales -- relevant for understanding strategy and approach
- Recent leadership changes that signal strategic shifts

### Win/Loss Intelligence
If the user has any internal win/loss data or anecdotal knowledge, incorporate it here.

### RFP Positioning Recommendations

Based on this intelligence, specific tactical recommendations:

**Lead with:**
Areas where you have clear advantages over this competitor

**Neutralize:**
Areas where the competitor is strong -- how to minimize the gap in the evaluator's mind

**Trap questions:**
Requirements or proof points to emphasize in your RFP response that this competitor cannot easily match

**Language to use:**
Phrases that highlight your differentiators without naming the competitor directly (RFP responses should never name competitors)

**Watch out for:**
Claims this competitor is likely to make that you should be prepared to counter
```

### Step 4: Validate and Refine

Present the profile to the user and ask:
- Does this match your experience with this competitor?
- Is there internal intelligence (from lost deals, customer feedback, partner channels) that contradicts or supplements anything here?
- Are there specific areas where you need deeper research?

Refine based on their input. Internal intelligence from the user's own experience is often more valuable than public sources.

## Output Format

- Quick competitive overview: structured markdown in conversation
- Full intelligence profile: create as `.md` file
- If user requests a formal battlecard: create as `.md` or `.docx`

## Important Principles

- Be honest about competitor strengths. A competitive profile that only lists weaknesses is useless -- it leads to overconfidence and poor positioning. Know what they do well so you can neutralize it.
- Cite sources for every claim. "They have poor customer support" is worthless. "They have a 3.2/5 rating for customer support on G2 based on 150+ reviews, with common complaints about response time for technical issues" is actionable.
- Distinguish between facts and inferences. If a job posting for "Senior On-Prem Engineer" suggests they are building an on-prem offering, say that explicitly rather than stating it as fact.
- Intelligence has a shelf life. Flag anything older than 12 months and recommend refreshing it before a major bid.
- Never recommend naming competitors in RFP responses. The positioning recommendations should help the user highlight their advantages without direct competitor references, which evaluators typically view negatively.
- This skill can be used for your own competitive positioning too, not just RFP-specific intelligence. If a user wants to understand their market generally, the same framework applies.
