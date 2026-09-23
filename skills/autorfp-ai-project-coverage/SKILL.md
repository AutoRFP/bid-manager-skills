---
name: autorfp-ai-project-coverage
description: Reports how much of an AutoRFP.ai project is already answered by the approved content library, including blanks and weak matches. Use before drafting, when the user asks about coverage, unanswered requirements, or what is due soon. Read-only.
---

# Project coverage

Show how much of a project the approved content library can already answer. This is the check before `autorfp-ai-draft-blank-responses`. Do not draft answers in this skill.

If `list_projects`, `list_requirements`, or `search_content` is not available, stop and follow `autorfp-setup`.

## Pick the project

Use the project the user named. If they say "due soon" and do not name a project, call `list_projects` with `dueBefore` set 14 days from today as an ISO 8601 timestamp. If more than one project matches, ask which one to score. Score one project per run.

Call `get_project` with `projectId`. Read `requirements.total` and `requirements.byStatus`. That payload has counts, not questions.

Call `list_requirements` with the same `projectId` and `hasAnswer: false`. Read `pagination.total` for the blank count. Page size is 25. Fetch further pages only for the blanks you will score.

Answered count is `requirements.total` minus the blank total. Do not treat a missing status key as a blank. `hasAnswer: false` is the blank test.

## Score blanks

For each blank, call `search_content` with `query` set to the question. Omit `tagIds` unless the user asked to filter, and never pass an empty array.

- Covered. A `qa_pair` answer responds to the question.
- Partial. A `qa_pair` or `document` is related but missing a fact the question asks for.
- Gap. Nothing answers it.

Score at most 40 blanks. If more remain, list them as not scored. Prefer blanks in document order (`questionNumber`).

## Report

Lead with the project name, issuer, and `dueAt`. Then the counts. Total, answered, covered, partial, gap, not scored.

Then a table with question number, question, status (answered, covered, partial, gap), and `referenceUrl` for covered or partial rows. Do not search requirements that already have an answer.

Coverage percent is `(answered + covered) / total`, rounded to the nearest percent. Partial and gap stay out of the numerator. If total is 0, say the project has no requirements.

If the user wants drafts next, tell them to run `autorfp-ai-draft-blank-responses`. Do not start that draft in this turn.

Never print `id` or `projectId`. Do not invent URLs. `search_content` rows include `referenceUrl`. `list_requirements` rows do not.
