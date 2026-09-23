---
name: response-insight-enricher
description: Rewrite a response with verified customer insight.
license: Custom terms. See LICENSE.txt
metadata:
  display_name: Response Insight Enricher
  author: AutoRFP.ai
---

# Response Insight Enricher

Consume the target reader's question or draft, `customer-brief.md`, `research-pack.md`, `pdf-evidence-ledger.md`, and `external-source-report.md` when present. Produce `response-insight-pack.md`.

## Review and rewrite

Diagnose only material issues: audience language missing, unverifiable claim, generic wording, strategy mismatch, or unsupported insight. Then rewrite the answer directly, using the target reader's documented language and success measures.

- Map every material claim to a `Verified` or `Provided` Claim ID and source; never describe a `Provided` claim as independently verified.
- Preserve scope, qualifiers, and units.
- Use a qualified capability statement when proof is unavailable.
- Never fabricate account facts, product capabilities, outcomes, competitor claims, or financial extrapolations.

## Output

1. Draft diagnosis: up to four bullets.
2. Enriched response: ready to use and no longer than the original unless supported detail is necessary.
3. Claim-to-evidence map: Claim ID, source, and status, or `Needs evidence`.
4. Open gaps: only facts needed to improve the answer.

Send missing facts to Customer Brief Research.

## Evidence rules

- Map every material claim to a source and Claim ID.
