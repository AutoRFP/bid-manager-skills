# Bid Manager Skills

Skills for bid managers. Qualification, compliance, competitor research, customer insight, and three AutoRFP.ai workflows that use the read-only AutoRFP MCP.

The AutoRFP MCP plugin stays in [AutoRFP/autorfp-ai-plugin](https://github.com/AutoRFP/autorfp-ai-plugin). This repo does not include the shredder, executive summary, or contradiction-checker skills from that plugin.

If both plugins are installed, keep one AutoRFP MCP enabled.

## Install in Claude Code

```bash
claude plugin marketplace add AutoRFP/bid-manager-skills
claude plugin install bid-manager-skills@bid-manager-skills
```

Local check:

```bash
claude --plugin-dir .
```

On first enable, set the AutoRFP API host. The default is APAC, `api.autorfp.ai`. EU is `api.eu.autorfp.ai`. US is `api.us.autorfp.ai`. Then connect the AutoRFP connector and approve `tags:read`, `projects:read`, and `content:read`. The setup skill `autorfp-setup` walks through that.

The MCP cannot write back to AutoRFP.ai. Blank-response drafts stay in the chat until someone pastes them into the project.

## Skills that need the AutoRFP MCP

- `autorfp-ai-library-clean` flags blank, untagged, and stale reused library rows.
- `autorfp-ai-project-coverage` scores one project against the approved library before anyone drafts.
- `autorfp-ai-draft-blank-responses` drafts blank project answers from approved content and cites `referenceUrl`.

General skills are synced from the marketing site. See `skills/*/SOURCE.md`.

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

Copilot and ChatGPT pin the APAC MCP URL `https://api.autorfp.ai/mcp`. Change that URL in the client for EU or US.

VS Code can add the same GitHub repo under `chat.plugins.marketplaces`.

GitHub's default catalogs are `copilot-plugins` and `awesome-copilot`. There is no separate AutoRFP submit form. Install from this repository. A later pull request to `awesome-copilot` is optional.

## ChatGPT and Codex

The same Agent Plugins files are the package. ChatGPT can also read `.agents/plugins/marketplace.json`.

1. In ChatGPT, open Settings, then Security and login, and turn on Developer mode.
2. Add the MCP server `https://api.autorfp.ai/mcp` (or the EU or US host).
3. Install this plugin from the repo marketplace, or from a personal marketplace pointed at this checkout.
4. Start a new chat before using the skills.

Public listing in the ChatGPT and Codex plugin directory is a review on the OpenAI side. Self-serve publishing is still rolling out. Workspace admins can publish a tested local plugin from ChatGPT Plugins to their workspace without listing it publicly.

The ChatGPT App Directory is a different submission. It takes the hosted MCP URL, privacy policy, screenshots, and test prompts at the OpenAI dashboard. It does not take this git repo. That submission is product work on the AutoRFP MCP, tracked in [AutoRFP/mcp](https://github.com/AutoRFP/mcp).

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

The claude.ai form needs a Team or Enterprise organization. Console is the path for an individual author. After approval, new commits on this repo are picked up without another form. Bump `version` in `.claude-plugin/plugin.json` and `plugin.json` when you want a named release.

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
