---
name: build-google-dork
description: Produce precise, public-source Google search queries.
license: Custom terms. See LICENSE.txt
metadata:
  display_name: Build Google Dork
  author: AutoRFP.ai
---

# Build Google Dork

Consume the organisation aliases, jurisdictions, document types, and open evidence gaps from Customer Brief Research or the source log in `external-source-report.md`. Produce `public-discovery-queries.md` with three to six labelled, copy-ready queries.

## Defaults

Use `site:`, `filetype:`, quoted phrases, `OR`, and exclusions only when they improve precision. Prefer official and government sources.

```text
Official reports
site:organisation.example ("annual report" OR "impact report" OR strategy) (filetype:pdf OR filetype:xlsx)

Topic signals
"Organisation Name" ("Primary topic" OR "Related term") (filetype:pdf OR filetype:xlsx)
```

Replace every placeholder and choose terms that fit the user's industry, organisation type, language, and jurisdiction. Do not assume workforce management, software, or a commercial company.

## Boundary

Use only publicly indexed business, regulatory, or academic material. Do not search for credentials, exposed secrets, personal data, private systems, or access-control bypasses. Search results are leads only: External Research or Customer Brief Research must validate them before they become evidence.

## Evidence rules

- Map every material claim to a source and Claim ID.
