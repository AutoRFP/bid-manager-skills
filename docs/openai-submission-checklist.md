# OpenAI Plugins Directory checklist (Bid Manager Skills)

This repository is the shared source for Claude, Copilot, and ChatGPT. Public listing in the universal ChatGPT and Codex plugin directory is a **ZIP upload plus MCP setup in the OpenAI dashboard**, not a direct GitHub listing.

## Build the package

```bash
npm install
npm test
npm run validate
npm run package:openai
```

Artifact: `dist/bid-manager-skills-openai.zip` (root contains `plugin.json`, `mcp.json`, `assets/`, `skills/`, `LICENSE`).

## Duplicate MCP endpoint (intentional)

This plugin bundles the same production AutoRFP MCP URL as the existing AutoRFP directory app (`https://api.app.autorfp.ai/mcp`). That is deliberate for a separate **Bid Manager Skills** listing focused on skills.

- Do **not** enable this plugin’s bundled MCP and the standalone AutoRFP MCP plugin in the same chat (see `autorfp-setup`).
- Domain verification for OpenAI may require an **eligible parent origin** or distinct hostname for `/.well-known/openai-apps-challenge` when the endpoint is already published on another plugin. Coordinate with whoever owns DNS for `autorfp.ai` / `api.app.autorfp.ai`.

## Portal steps (human)

1. Complete **verified developer** identity in the OpenAI platform.
2. **Upload** `dist/bid-manager-skills-openai.zip` → fix any metadata/skill scan issues → re-upload if needed.
3. **MCPs** → Connect `https://api.app.autorfp.ai/mcp` → complete **domain verification** → **Scan tools** → resolve annotation or schema findings on the server ([AutoRFP/mcp](https://github.com/AutoRFP/mcp)).
4. **Review details** (not in the ZIP): dedicated **demo account** (no MFA wall), **demo recording URL**, and confirm imported test cases from `plugin.json`.
5. **Submit for review** → after approval, **Publish** the package version.

## Release gates before submit

| Gate | Owner |
| --- | --- |
| Tool annotations (`readOnlyHint`, `destructiveHint`, `openWorldHint`) on production MCP | MCP server repo |
| OAuth demo user with sample tags, projects, and library content | AutoRFP ops |
| Desktop and mobile smoke test after local marketplace install | Plugin maintainers |
| Walkthrough video URL | Product/marketing |
| Bump `version` in all manifests when shipping a named release | This repo |

## Manifest locations

| Platform | Files |
| --- | --- |
| ChatGPT / Codex (portable) | [`plugin.json`](../plugin.json), [`mcp.json`](../mcp.json), [`.agents/plugins/marketplace.json`](../.agents/plugins/marketplace.json) |
| Claude directory | [`.claude-plugin/plugin.json`](../.claude-plugin/plugin.json), [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json) |
| Copilot | [`.github/plugin/marketplace.json`](../.github/plugin/marketplace.json) |

Listing URLs for MCP review: `websiteURL`, `supportURL`, `privacyPolicyURL`, and `termsOfServiceURL` live under `extensions.com.openai.interface` in root `plugin.json`.

## References

- [Package your plugin](https://developers.openai.com/plugins/build/plugins)
- [Plugin guidelines](https://developers.openai.com/plugins/plugin-guidelines)
- [Upload and submit your plugin](https://developers.openai.com/plugins/deploy/submission)
