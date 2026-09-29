---
name: autorfp-setup
description: Connect the AutoRFP.ai MCP before library, coverage, or blank-response skills. Use when those skills have no AutoRFP tools, when the user asks how to connect AutoRFP.ai, or when a second AutoRFP MCP is already enabled.
---

# AutoRFP setup

The AutoRFP MCP is read-only. It can list tags, projects, requirements, and approved content. It cannot create, edit, or delete anything, and it cannot read the original RFP file.

## One connection

If the AutoRFP MCP plugin is already connected, use that server. Disable this plugin's `autorfp-ai` server so the chat does not call two copies.

## Region

This plugin bundles the registered APAC endpoint. EU and US users should enable the [AutoRFP.ai connector](https://claude.com/connectors/autorfp-ai) in Claude (or add a custom connector) for their region.

| Region | MCP server URL |
| --- | --- |
| APAC | `https://api.app.autorfp.ai/mcp` (bundled with this plugin) |
| EU | `https://api.eu.autorfp.ai/mcp` |
| US | `https://api.us.autorfp.ai/mcp` |

Copilot and ChatGPT packages pin APAC (`https://api.app.autorfp.ai/mcp`). For EU or US, change the server URL in the client settings to `https://api.eu.autorfp.ai/mcp` or `https://api.us.autorfp.ai/mcp`.

## Claude

1. Enable this plugin.
2. Open Settings, then Connectors, and connect AutoRFP.ai.
3. Approve `tags:read`, `projects:read`, and `content:read`.
4. Enable the connector in the next chat.

If the user's workspace is in EU or US, they need the directory connector (or a custom connector) for that region instead of only the bundled APAC server.

Each person signs in with their own AutoRFP.ai user. The assistant only sees what that user can see in the product.

## If tools are missing

Stop the AutoRFP skill. Tell the user the connector is not available in this chat, and point them at the steps above. Do not invent library rows, project answers, or URLs.
