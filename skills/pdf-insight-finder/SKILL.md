---
name: pdf-insight-finder
description: Find and colour-highlight evidence in supplied PDFs.
license: Custom terms. See LICENSE.txt
metadata:
  display_name: PDF Insight Finder
  author: AutoRFP.ai
---

# PDF Insight Finder

Use the supplied customer brief and research pack as a relevance lens. Create an annotated copy of the PDF and a `pdf-evidence-ledger.md`.

## Workflow

1. Search the PDF for the stated topic, researched themes, and brief priorities.
2. Highlight only exact, self-contained excerpts that the PDF supports:
   - Blue: falsifiable figures, statistics, dates, targets, or measured results.
   - Red: business risks, constraints, cost pressure, compliance exposure, or adverse outcomes.
   - Green: opportunities, investments, growth levers, or strategic initiatives.
3. Record each material highlight with Claim ID, exact quote, physical page, category, source type, confidence, and status (`Verified` or `Needs evidence`).
4. When annotation tools are available, render and inspect annotated pages before handoff. Preserve the original unless replacement is explicitly requested.
5. Return the annotated PDF when generated and at most five bullets on the strongest evidence, risks, opportunities, and numbers.

## Evidence rule

Research guides what to look for; it never proves a claim in the PDF. Retain all qualifiers, dates, geographies, and units. Do not highlight generic boilerplate or keyword matches without a meaningful claim.

## Script

Run `scripts/annotate_pdf.py` when Python 3, local file access, and PyMuPDF are available. It accepts an exact-text JSON manifest with `page`, `category` (`stat`, `risk`, `opportunity`), and `text`; it fails if an excerpt cannot be found.

If the script or PDF editing is unavailable, still produce `pdf-evidence-ledger.md` and the exact-text JSON manifest. State that annotation was not generated and do not imply that a PDF was modified.

## Evidence rules

- Map every material claim to a source and Claim ID.
