#!/usr/bin/env python3
"""Add colour-coded highlight annotations from a verified evidence manifest."""

import argparse
import json
from pathlib import Path

try:
    import pymupdf as fitz
except ImportError:
    try:
        import fitz
    except ImportError as exc:
        raise SystemExit(
            "PDF annotation requires PyMuPDF. Install it with "
            "`python -m pip install -r scripts/requirements.txt`, or use the "
            "evidence-ledger fallback documented in references/pdf-insight-finder.md."
        ) from exc

COLOURS = {
    "stat": (0.20, 0.55, 0.95),
    "risk": (0.92, 0.24, 0.24),
    "opportunity": (0.18, 0.66, 0.34),
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--manifest", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    entries = json.loads(args.manifest.read_text(encoding="utf-8"))
    if not isinstance(entries, list) or not entries:
        raise ValueError("Manifest must be a non-empty JSON array.")

    doc = fitz.open(args.input)
    missing = []
    count_by_category = {category: 0 for category in COLOURS}

    for index, entry in enumerate(entries, start=1):
        try:
            page_number = int(entry["page"])
            category = entry["category"]
            text = entry["text"]
        except (KeyError, TypeError, ValueError) as exc:
            raise ValueError(f"Invalid manifest entry {index}: {entry}") from exc
        if category not in COLOURS:
            raise ValueError(f"Unknown category at entry {index}: {category}")
        if not 1 <= page_number <= len(doc):
            raise ValueError(f"Page out of range at entry {index}: {page_number}")

        page = doc[page_number - 1]
        rects = page.search_for(text, quads=True)
        if not rects:
            missing.append(f"#{index} page {page_number}: {text!r}")
            continue
        annot = page.add_highlight_annot(rects)
        annot.set_colors(stroke=COLOURS[category])
        annot.set_opacity(0.36)
        annot.set_info(content=category.title())
        annot.update()
        count_by_category[category] += 1

    if missing:
        doc.close()
        raise RuntimeError("No output written; excerpts not found:\n" + "\n".join(missing))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    doc.save(args.output, garbage=4, deflate=True)
    doc.close()
    print(json.dumps({"output": str(args.output), "annotations": count_by_category}))


if __name__ == "__main__":
    main()
