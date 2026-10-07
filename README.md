# Bid Manager Skills

Agent skills for bid and proposal teams, built by [AutoRFP.ai](https://autorfp.ai?utm_campaign=54747189-Github%20Plugin%20Bid%20Manager%20Skills&utm_source=github&utm_medium=bid-manager-skills-plugin&utm_content=readme). Install the plugin in Claude Code, GitHub Copilot, or ChatGPT and invoke skills in chat when you are qualifying opportunities, building compliance registers, researching buyers and competitors, or accelerating drafts from your content library.

## What you get

### Qualify and decide

**AI Go/No-Go** — Upload tender packages, RFPs, or ITTs and get a structured bid/no-bid recommendation. The skill scores the opportunity against your company profile and a clear decision framework so leadership can commit resources with evidence, not gut feel.

**Compliance Matrix Builder** — Turn dense procurement documents into a requirements register: mandatory clauses, evaluation criteria, and submission instructions in one matrix. Use it as the first structured step before anyone starts writing.

### Competitive positioning

**Competitor Intelligence** — Build battlecards and competitor profiles for a specific deal: products, pricing signals, strengths, weaknesses, and positioning. Works for named rivals or for discovering who you are likely to face in a market.

**Win Theme Generator** — Develop differentiated win themes through a guided conversation: your proof points, the incumbent, evaluator priorities, and how to weave themes into the response you are already drafting.

**Conversational Intelligence Analyzer** — Mine sales calls, Grain/Gong transcripts, and meeting notes for bid-ready insight: pain points, process, decision criteria, stakeholders, and incumbent solutions. Connect meeting tools via MCP or paste transcripts directly.

### Responding to RFPs

**Customer Brief Setup** — Start a shared customer brief using only facts your team is authorised to use, so research and drafting stay aligned and defensible.

**Customer Brief Research** — Gather and source the customer brief from public or approved material when you need a solid foundation before the bid team writes.

**Internal Research** — Fill the internal half of the customer-insight brief from CRM, email, meetings, notes, and recordings—what your team already knows about the account and opportunity.

**External Research** — In one run, find the right public sources for the offering and produce a full trust-classified research report with buyer language and falsifiable facts for the external half of the brief.

**Completed Insight Brief** — Merge internal and external research into one completed customer-insight brief the bid team can work from. Not a response rewrite—one authoritative brief document.

**Response Insight Enricher** — Rewrite a draft answer with verified customer insight so responses sound specific to the buyer without inventing facts.

**PDF Insight Finder** — Locate evidence in supplied PDFs and highlight it so writers and reviewers can cite the right passages quickly.

**Build Google Dork** — Generate precise public-source Google queries when you need to find filings, announcements, or other open-web evidence efficiently.

### AutoRFP.ai workflows

These skills use the read-only [AutoRFP.ai MCP](https://learn.autorfp.ai/en/articles/15029444-how-to-connect-to-ai-assistants-mcp-server) when it is connected in your assistant. **AutoRFP Setup** is the onboarding skill; **Library Clean**, **Project Coverage**, and **Draft Blank Responses** are the three MCP-backed workflows.

**AutoRFP Setup** — Connect AutoRFP.ai before library, coverage, or blank-response skills. Use it when tools are missing or you need the right connector for your region.

**Library Clean** — Flag content-library rows that are blank, untagged, or stale but heavily reused so you can improve library hygiene before the next bid.

**Project Coverage** — See how much of a project is already covered by approved library content, including gaps and weak matches, before drafting starts.

**Draft Blank Responses** — Draft answers for unanswered project requirements from approved library content, with source links. Review in chat, then paste into AutoRFP.ai when you are ready.

## Install in Claude Code

```bash
claude plugin marketplace add AutoRFP/bid-manager-skills
claude plugin install bid-manager-skills@bid-manager-skills
```

Local check:

```bash
claude --plugin-dir .
```

See [How to Integrate with Claude](https://learn.autorfp.ai/en/articles/15031130-how-to-integrate-with-claude) for connector setup.

## Copilot

This repo is an Agent Plugins package (`plugin.json`, `skills/`, `mcp.json`) and a Copilot marketplace (`.github/plugin/marketplace.json`).

```bash
copilot plugin marketplace add AutoRFP/bid-manager-skills
copilot plugin install bid-manager-skills@bid-manager-skills
```

A local install:

```bash
copilot plugin install .
```

VS Code can add the same GitHub repo under `chat.plugins.marketplaces`.

GitHub's default catalogs are `copilot-plugins` and `awesome-copilot`. There is no separate AutoRFP submit form. Install from this repository. A later pull request to `awesome-copilot` is optional.

## ChatGPT and Codex

The same Agent Plugins files are the package: root [`plugin.json`](plugin.json), [`mcp.json`](mcp.json), [`skills/`](skills/), and [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) for repo-scoped discovery.

**Local testing**

1. In ChatGPT, open Settings → Security and login, and turn on Developer mode.
2. Install from this repo’s marketplace entry (or point a personal marketplace at this checkout).
3. Connect and authenticate the bundled MCP (`https://api.app.autorfp.ai/mcp` for APAC). EU/US: change the server URL in client settings per [AutoRFP Setup](skills/autorfp-setup/SKILL.md).
4. Start a new chat before using the skills.

Do not enable this plugin’s bundled AutoRFP MCP and the separate AutoRFP directory MCP plugin in the same chat.

**Public directory (OpenAI)**

Listing uses the universal Plugins Directory shared by ChatGPT and Codex: build a ZIP, upload it in the OpenAI dashboard, connect and scan the MCP server, then submit for review. This GitHub repo is the source of truth; it is not submitted by URL alone.

```bash
npm test
npm run validate
npm run package:openai
```

See [docs/openai-submission-checklist.md](docs/openai-submission-checklist.md) for duplicate-MCP notes, domain verification, demo credentials, and release gates. MCP tool metadata and OAuth demo accounts are maintained on the production server ([AutoRFP/mcp](https://github.com/AutoRFP/mcp)).

## Claude plugin directory

The public GitHub repo is the submission artifact. Validate, then a human with directory access submits the repo URL.

```bash
npm test
npm run validate
claude plugin validate .
```

Submit one of these while signed in as an owner, admin, or a Console role that can manage the directory:

- https://platform.claude.com/plugins/submit
- https://claude.ai/admin-settings/directory/submissions/plugins/new

The claude.ai form needs a Team or Enterprise organization. Console is the path for an individual author. After approval, new commits on this repo are picked up without another form. Bump `version` in `.claude-plugin/plugin.json`, root `plugin.json`, and both marketplace entries when you want a named release.

Listing metadata lives in `.claude-plugin/plugin.json`: `displayName`, `homepage` at `https://autorfp.ai/skills/`, `documentationUrl` for the [MCP setup article](https://learn.autorfp.ai/en/articles/15029444-how-to-connect-to-ai-assistants-mcp-server), `privacyPolicyUrl` at `https://autorfp.ai/legal/privacy`, `termsOfServiceUrl` at `https://autorfp.ai/legal/msa`, and `.claude-plugin/icon.svg`. OpenAI listing URLs and review test cases live under `extensions.com.openai` in root `plugin.json`.

Some directory policy holds are expected and need a reviewer note, not a repo change:

- **Lockfile.** `package.json` and `package-lock.json` exist so CI can install `yaml` for the marketing-site sync. Enabling the plugin does not launch an npm server. The directory hold `LOCKFILE_AUTO_INSTALL` is for a reviewer to clear.
- **Credential.** The only credential string in the repo is `MARKETING_SITE_READ_TOKEN` in `.github/workflows/sync-marketing-skills.yml`. That GitHub Actions secret clones the marketing site during sync. It is not read when the plugin is installed, and it is not sent to `https://api.app.autorfp.ai/mcp`. The MCP uses per-user OAuth (`tags:read`, `projects:read`, `content:read`), which matches the [directory policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy) for a remote server.
- **Name.** `bid-manager-skills` is a fuzzy match for the unrelated directory connector `all-manager` and publisher `AllManager`. It is not that product. Keep the plugin id. The listing title stays **Bid Manager Skills**.

## Sync from the marketing site

Published skills come from `ConquestCapital/site` `frontend/src/data/skill-packages`, using the same CMS rules as autorfp.ai/skills. Drafts, coming-soon packs, and the MCP-plugin denylist are skipped. `win-theme-generator` and `conversational-intelligence-analyzer` are copied from `ConquestCapital/bid-manager-rfp-skills` until the marketing site publishes them.

```bash
npm install
npm test
npm run sync
```

`npm run sync` needs `gh` auth that can read `ConquestCapital/site`.

A fortnightly GitHub Action (`.github/workflows/sync-marketing-skills.yml`) opens a pull request when those sources change. It needs a repository secret `MARKETING_SITE_READ_TOKEN` with read access to `ConquestCapital/site` and `ConquestCapital/bid-manager-rfp-skills`. Set it with:

```bash
gh secret set MARKETING_SITE_READ_TOKEN --repo AutoRFP/bid-manager-skills
```

The cloud-agent prompt for the same job is `docs/fortnightly-sync.md`.

## License

Plugin code is Apache-2.0. Imported skill folders keep their own `LICENSE.txt` when the marketing package has one.
