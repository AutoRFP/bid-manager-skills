---
name: autorfp-ai-draft-blank-responses
description: Drafts answers for blank AutoRFP.ai project requirements from the approved content library, with source links. Use when the user asks to fill blank responses, draft unanswered requirements, or write answers for empty questions in an AutoRFP project. Drafts stay in the chat. The MCP cannot save them.
---

# Draft blank responses

Find blank requirements in one AutoRFP.ai project and draft answers from approved content. The MCP is read-only. Tell the user to paste accepted drafts back into AutoRFP.ai. Do not claim the drafts were saved.

If `list_projects`, `list_requirements`, or `search_content` is not available, stop and follow `autorfp-setup`.

## Pick the project

Use the project the user named. If they did not name one, call `list_projects` and ask them to pick from the returned projects. Do not draft across every project in one run.

`list_projects` returns `id`, `name`, `issuer`, `status`, `dueAt`, and `description`. Use `id` only as `projectId` on the next call. Do not print it.

Call `get_project` only when you need the header or the requirement counts. It does not return questions. Call `list_requirements` with that `projectId` and `hasAnswer: false`. Page starts at 1, 25 rows per page, and continues while `pagination.hasMore` is true. A blank requirement has a missing or whitespace-only `answer`.

## Draft

For each blank requirement, call `search_content` with `query` set to the question. Do not pass an empty `tagIds` array.

Use rows whose `source` is `qa_pair` when the `answer` actually responds to the question. Use `document` rows only as supporting evidence, not as the approved answer.

Write the draft in the buyer's language. Every factual claim needs the row's `referenceUrl`. If no `qa_pair` supports an answer, write "No approved content" and leave the draft blank. Do not fill the gap from general knowledge.

Cap a single run at 25 blank requirements. If `pagination.total` is higher, say how many were not drafted and wait for the user to ask for the next page.

## Report

For each requirement include the question, the section when present, the draft or "No approved content", and the supporting `referenceUrl` values.

End with how many blanks were drafted, how many had no approved content, and this sentence. "These drafts are not saved. Paste the ones you accept into the AutoRFP.ai project."

Never print `id`, `projectId`, or `contentId`.
