---
name: conversational-intelligence-analyzer
description: Analyzes sales conversations, call transcripts, and meeting notes to extract prospect intelligence for RFP responses -- including incumbent solutions, current processes, pain points, decision criteria, and stakeholder dynamics. Use this skill when a user wants to analyze call transcripts, meeting recordings, or conversational data to inform an RFP response. Also trigger when users say "analyze this call", "what did we learn from the meeting", "pull insights from Grain/Gong", "transcript analysis for the bid", "what are their pain points", or upload a transcript file. Works with MCP connections to Grain, Gong, or Chorus, or accepts raw transcripts, meeting notes, and conversation summaries.
---

# Conversational Intelligence Analyzer for RFP

Extracts actionable prospect intelligence from sales conversations, discovery calls, demo recordings, and meeting notes to inform stronger, more targeted RFP responses. Turns raw conversation data into structured intelligence about the prospect's current state, pain points, decision process, and what they actually care about.

## Works Well With

- **Win Theme Generator** - Use the intelligence brief to develop win themes grounded in what the prospect actually said
- **Executive Summary Generator** - Prospect quotes and pain points from this analysis make executive summaries significantly more persuasive
- **RFP Contradiction Checker** - After incorporating conversation insights into your RFP, check that new content does not contradict existing answers

## Why This Matters for RFP

The best RFP responses do not just answer the questions. They demonstrate understanding of the prospect's real situation -- the problems behind the requirements, the politics behind the evaluation criteria, the frustrations with their current approach. This intelligence lives in sales conversations, not in the RFP document itself.

## Input Sources (Priority Order)

### Option 1: MCP-Connected Conversational Intelligence Platform
If the user has an MCP connection to a conversational intelligence tool (Grain, Gong, Chorus, Clarity, Fireflies, etc.):
- Ask for the prospect/company name or deal name
- Search for relevant meetings and recordings
- Pull transcripts from the most relevant calls (discovery, demo, technical deep-dive, procurement)
- Prioritize recent calls and calls with senior stakeholders

### Option 2: Transcript Files
If no MCP connection is available, accept:
- `.txt` files containing call transcripts
- `.docx` or `.pdf` transcript exports
- Copy-pasted transcript text directly in the conversation
- Multiple transcripts from different calls with the same prospect

### Option 3: Meeting Notes or Summaries
If full transcripts are not available:
- Notion pages or links containing meeting summaries
- CRM notes or deal notes
- Email threads summarizing key conversations
- Any written record of prospect conversations

Always ask the user what they have available. If they have an MCP connection, use it first since transcripts are richer than summaries.

## Workflow

### Step 1: Gather and Ingest Conversations

Collect all available conversation data for the prospect. If using an MCP:
- Search for the prospect by company name or contact name
- List all relevant meetings chronologically
- Pull full transcripts for the most relevant calls
- Note which stakeholders were on each call and their roles

If using uploaded files, read all provided transcripts/notes.

Confirm with the user: "I found [X] calls/transcripts for [prospect]. I'll analyze these. Is there anything else I should include?"

### Step 2: Analyze for RFP Intelligence

Work through each conversation and extract intelligence across these categories:

**Incumbent Solution & Current State**
- What system(s) are they currently using?
- How long have they had the current solution?
- Who is the incumbent vendor?
- What does their current workflow/process look like?
- What is working well with their current approach? (This is important -- know what they want to keep, not just what they want to change)

**Pain Points & Frustrations**
- What specific problems did they describe?
- What triggered the decision to go to market? (The "why now" is critical for RFP responses)
- Which pain points were mentioned by multiple stakeholders?
- Which pain points generated the most emotional response or emphasis?
- What is the business impact of these pain points? (Time lost, revenue affected, risk exposure, compliance gaps)

**Decision Criteria & Priorities**
- What did they say matters most in evaluating solutions?
- What questions did they ask repeatedly? (Repetition signals priority)
- What concerns or objections did they raise?
- Who are the key decision-makers and what does each one care about?
- Is there a formal evaluation process or scoring methodology mentioned?

**Process & Timeline**
- What is their decision timeline?
- What is their implementation timeline expectation?
- Are there internal deadlines or triggers driving urgency? (Regulatory changes, contract expirations, board mandates)
- Who needs to approve the decision?

**Stakeholder Map**
- Who was on each call and what is their role?
- Who appears to have the most influence?
- Are there champions? Skeptics? Blockers?
- What does each stakeholder care about differently?

**Competitive Intelligence**
- Did they mention other vendors they are evaluating?
- Did they compare features or approaches to other solutions?
- What did they say about previous vendor experiences (good or bad)?

### Step 3: Synthesize and Present

Organize the intelligence into a structured brief. Use direct quotes from transcripts wherever possible -- verbatim language from the prospect is more valuable than paraphrased summaries.

**Output Structure:**

```
## Prospect Intelligence Brief: [Company Name]

### Sources Analyzed
List of calls/transcripts reviewed with dates and participants

### Current State
- Incumbent solution and how they use it
- Current process workflow
- What is working (preserve these in your proposal)
- What is failing (address these directly)

### Pain Points (Ranked by Emphasis)
1. [Pain point] - Who mentioned it, how often, business impact
   > "Direct quote from transcript"
2. [Pain point] ...

### The Trigger: Why Now?
What is driving the decision to change, and why now specifically

### Decision Criteria
What they said matters, in their words, mapped to likely evaluation weightings

### Stakeholder Map
| Name | Role | Priority | Sentiment | Key Quote |
For each key person involved in the decision

### Competitive Landscape (from Conversations)
What they revealed about other options they are considering

### RFP Response Recommendations
Based on this intelligence, specific recommendations for how to shape the RFP response:
- Lead with [X] because [stakeholder] emphasized it repeatedly
- Address [concern] directly because [context]
- Use their language: they say "[term]" not "[our term]"
- Avoid [topic] because [reason from conversations]
- Reference [their specific use case] rather than generic capabilities
```

### Step 4: Connect to RFP Response

After presenting the intelligence brief, ask the user:

"Do you want me to map these insights to specific sections of your RFP response? If you share the RFP questions or your draft response, I can show exactly where to incorporate this intelligence."

If they provide an RFP or draft:
- Map each intelligence finding to the relevant RFP section
- Suggest specific language changes that mirror the prospect's own words
- Identify questions where the prospect's stated pain points can be directly addressed
- Flag any RFP answers that contradict what the prospect said in conversations

## Output Format

- Intelligence brief: structured markdown in conversation or as `.md` file
- If the user wants a formal document: create as `.md` or `.docx`
- Inline RFP mapping: conversational suggestions tied to specific sections

## Important Principles

- Direct quotes are gold. Whenever a finding comes from a transcript, include the exact quote. An RFP response that uses the prospect's own language back to them is significantly more persuasive.
- Distinguish between what was said by one person once versus what multiple stakeholders emphasized. Weight your recommendations accordingly.
- Note contradictions between stakeholders. If the CTO wants flexibility and the CISO wants lockdown, that tension matters for how you position your response.
- Be honest about gaps. If the conversations do not cover a topic, say "Not discussed in available transcripts" rather than speculating.
- Privacy matters. If transcripts contain sensitive personal information, flag it and handle appropriately. The intelligence brief should focus on business context, not personal details.
