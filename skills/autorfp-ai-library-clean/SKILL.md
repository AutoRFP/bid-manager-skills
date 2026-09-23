---
name: autorfp-ai-library-clean
description: Flags AutoRFP.ai content-library rows that are blank, untagged, or stale and heavily reused. Use when the user asks to clean the content library, find empty answers, find untagged content, or check library hygiene. This skill only flags. It does not edit AutoRFP.ai.
---

# Library clean

Audit the connected AutoRFP.ai content library and return a punch list. Flag rows. Do not rewrite them. The MCP cannot save edits.

If `list_tags` or `list_content` is not available, stop and follow `autorfp-setup`.

## Scope

Ask which of these to include. Default to all three when the user says "clean the library".

1. Blank. Q&A rows with a missing or whitespace-only answer.
2. Untagged. Rows whose `tagIds` array is empty.
3. Stale and reused. `usageCount` is at least 5 and `updatedAt` is older than 12 months, unless the user sets a different age or usage floor.

Call `list_tags` before you name a topic. Use the returned tag ids. Omit `tagIds` when you are not filtering. An empty `tagIds` array is rejected.

## Pull

`list_content` returns 25 rows per page, sorted by `updatedAt`. Pass `page` starting at 1 and continue while `pagination.hasMore` is true. `pagination.total` is the filtered count.

- Blank. `list_content` with `fileType: ["QA"]` and `hasAnswer: false`.
- Untagged. `list_content` with no `tagIds` filter. Keep rows where `tagIds` is empty. Stop after 60 untagged rows or 10 pages, whichever comes first, and say the rest was not scanned.
- Stale. `list_content` with `updatedBefore` set to the cutoff as an ISO 8601 timestamp. Keep rows with `usageCount` at or above the floor. Stop after 60 kept rows.

`usageCount` is on the `list_content` row. Do not call `list_content_usage` to rank the library. That tool needs one `contentId` and lists projects that reused that item. Call it only when the user asks where a flagged row was reused.

## Report

For every flagged row include the question or file name, tag labels from `list_tags`, `updatedAt`, `usageCount`, the flag (blank, untagged, or stale), and `referenceUrl` when the row has one.

Never print `id` or `contentId`. If `referenceUrl` is missing, say so on that row.

Group the reply into Blank, Untagged, and Stale. End with the counts and any truncation note.

## Do not

- Do not edit, delete, or propose a silent overwrite.
- Do not treat two different answers as a contradiction. That audit belongs in the AutoRFP MCP plugin, not here.
- Do not draft replacement answers. Point the user at `autorfp-ai-draft-blank-responses` for blank project requirements.
