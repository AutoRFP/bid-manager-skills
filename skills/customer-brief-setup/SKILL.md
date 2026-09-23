---
name: customer-brief-setup
description: Create a shared customer brief from authorised facts only.
license: Custom terms. See LICENSE.txt
metadata:
  display_name: Customer Brief Setup
  author: AutoRFP.ai
---

# Customer Brief Setup

Create `customer-brief.md` from user-supplied or authorised internal information.

## Default sections

- Account context
- Business relevance: need, use case, alternatives or competition, and measurable value
- Stakeholders and professional relationships: role context and relevant references
- Operational and commercial context: relevant scale, spend, growth, constraints, or delivery model
- Decision criteria and success measures
- Open gaps

Adapt these sections to the user's industry and objective. Omit a default field when it is irrelevant and add domain-specific fields when they affect the decision or deliverable.

For every material fact, retain its source, owner, Claim ID, and status. Mark explicit prompt or authorised internal facts as `Provided`; use `Not provided` for relevant missing information. In fictional scenarios, label invented examples `Illustrative`. Never infer relationships, buying authority, budget, competition, or customer facts. Keep relationship information professional, authorised, and relevant.

## Handoff

Send the brief and open public gaps to External Research or Customer Brief Research. Send verified account context to PDF Insight Finder and Response Insight Enricher.

## Evidence rules

- Map every material claim to a source and Claim ID.
