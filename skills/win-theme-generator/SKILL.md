---
name: win-theme-generator
description: Develops competitive win themes for RFP and bid responses through an interactive conversation that analyzes your differentiators, the competitive landscape, the incumbent solution, and the prospect's priorities. Use this skill when a user wants to develop win themes, create a bid strategy, figure out their competitive positioning for a specific RFP, or needs help articulating why they should win. Also trigger when users say "what's our win theme", "how do we position against", "bid strategy", "why should we win this", "competitive positioning for this RFP", or "differentiators for this bid". After generating win themes, the skill helps users incorporate them into an existing RFP response.
---

# Win Theme Generator

Develops compelling, defensible win themes for RFP and bid responses through a structured conversation. Win themes are the 2-4 core reasons the evaluator should choose you over every other option, woven consistently throughout your entire proposal.

A good win theme is not a feature list or a tagline. It is a specific, evidence-backed argument that connects your unique capability to the prospect's stated priority in a way competitors cannot replicate.

## Works Well With

- **Competitor Intelligence** - Research competitors before developing win themes so your positioning is grounded in reality
- **Conversational Intelligence Analyzer** - Use prospect conversation insights to validate which themes will resonate
- **Executive Summary Generator** - Feed your win themes into the exec summary to set the proposal narrative

## What Makes a Strong Win Theme

Strong win themes share these characteristics:
- **Specific to this opportunity** - Not generic marketing language, but tied to what this prospect cares about based on their RFP
- **Defensible** - Backed by evidence (case studies, certifications, architecture, team experience)
- **Differentiating** - Competitors cannot make the same claim, or cannot make it as credibly
- **Evaluator-relevant** - Mapped to stated evaluation criteria or known decision drivers
- **Concise** - Expressible in a single sentence that an evaluator could repeat back

Weak win themes sound like: "We are the market leader with 20 years of experience."
Strong win themes sound like: "Our pre-built integration with [their core system] eliminates the 6-month custom build every other vendor will propose, getting them live before their regulatory deadline."

## Workflow

### Phase 1: Discovery Conversation

This is an interactive phase. Ask the user these questions in a conversational flow, not as a form. Group related questions naturally and adapt based on their answers.

**About the opportunity:**
- What is the RFP for? (brief description of scope)
- Who is the issuing organization and what sector are they in?
- What are the stated evaluation criteria or weightings, if known?
- What does the prospect care about most? (Speed to value? Risk reduction? Cost? Innovation? Compliance?)

**About the competitive landscape:**
- Who is the incumbent, if there is one? What system/process are they replacing or augmenting?
- What are the known or suspected competitors for this bid?
- What is the incumbent or leading competitor's biggest weakness from the prospect's perspective?
- What do competitors typically claim in their proposals that you could counter?

**About your strengths:**
- What are 2-3 things you do that competitors genuinely cannot match for this specific opportunity?
- Do you have relevant case studies, references, or proof points in this sector?
- Is there anything about your team, technology, or approach that is uniquely suited to this prospect?
- What is your relationship with the prospect? Any inside knowledge of their priorities?

**About your constraints:**
- Where are you weaker than competitors for this specific opportunity?
- Are there requirements you can only partially meet?

Do not ask all of these in one message. Have a conversation. Listen to what the user says and follow up on the most promising threads. The goal is to surface 2-4 genuine differentiators that matter to this specific evaluator.

### Phase 2: Win Theme Development

Based on the discovery conversation, develop 2-4 win themes. For each win theme:

1. **Theme statement** - One sentence that an evaluator could read and immediately understand the argument
2. **Why it matters to the prospect** - Connect the theme to a specific stated requirement, evaluation criterion, or known priority
3. **Evidence** - The proof points that make this credible (case studies, certifications, architecture details, team credentials)
4. **Competitive contrast** - Why competitors cannot make the same claim, or cannot make it as credibly (without naming competitors directly in the proposal)
5. **Where to use it** - Which sections of a typical RFP response this theme should appear in (executive summary, technical approach, implementation plan, case studies, etc.)

Present the win themes to the user and discuss. Refine based on their feedback. They know their market better than you do -- your job is to structure their knowledge into persuasive, consistent themes.

### Phase 3: RFP Incorporation

Once the user is satisfied with their win themes, ask if they have an existing RFP response or draft they want to incorporate the themes into.

**If they provide an RFP response:**
- Review the document
- Identify the specific sections where each win theme should be reinforced
- Provide concrete suggestions for how to weave each theme into existing content -- specific paragraphs to add, sentences to modify, or sections to restructure
- Flag any sections where the current content contradicts or undermines a win theme
- Suggest an executive summary structure that leads with the win themes

**If they do not have a response yet:**
- Provide a win theme integration guide: a section-by-section breakdown of how to embed the themes throughout a standard RFP response structure
- Suggest opening and closing statements for key sections that reinforce the themes
- Recommend a "theme map" showing which theme appears in which section, so the bid team can ensure consistent coverage

## Output Format

- Win theme development: conversational markdown in the chat
- If the user wants a formal win theme document: create as `.md` file
- If the user provides an RFP for incorporation: provide inline suggestions in conversation, or create an annotated version as a file

## Important Principles

- Win themes are about the prospect, not about you. Every theme should answer "so what?" from the evaluator's perspective.
- Avoid superlatives and unsubstantiated claims. "Best-in-class" means nothing without evidence. "Our pre-built connector to SAP reduces implementation by 8 weeks based on our last 3 deployments in banking" means something.
- Themes should be consistent but not repetitive. Each section of the RFP should reinforce themes in a way that feels natural to that section's context, not like copy-paste.
- If the user's differentiators are weak or the competitive landscape is unfavorable, say so. Better to know before investing weeks of bid effort.
- The number of win themes matters. Two is often better than four. Proposals that try to be everything to everyone win nothing.
