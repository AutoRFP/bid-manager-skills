---
name: autorfp-setup
description: Connect the AutoRFP.ai MCP before library, coverage, or blank-response skills. Use when those skills have no AutoRFP tools, when the user asks how to connect AutoRFP.ai, or when a second AutoRFP MCP is already enabled.
---

# AutoRFP setup

The AutoRFP MCP is read-only. It can list tags, projects, requirements, and approved content. It cannot create, edit, or delete anything, and it cannot read the original RFP file.

## One connection

If the AutoRFP MCP plugin is already connected, use that server. Disable this plugin's `autorfp-ai` server so the chat does not call two copies.

## Region

This plugin prompts for an API host. Use the host that matches the AutoRFP.ai login URL.

| Region | Host |
| --- | --- |
| APAC | `api.autorfp.ai` |
| EU | `api.eu.autorfp.ai` |
| US | `api.us.autorfp.ai` |

Copilot and ChatGPT packages pin APAC (`https://api.autorfp.ai/mcp`). For EU or US, change the server URL in the client settings to `https://api.eu.autorfp.ai/mcp` or `https://api.us.autorfp.ai/mcp`.

## Claude

1. Enable this plugin.
2. Set the API host if the default is not your region.
3. Open Settings, then Connectors, and connect AutoRFP.ai.
4. Approve `tags:read`, `projects:read`, and `content:read`.
5. Enable the connector in the next chat.

Each person signs in with their own AutoRFP.ai user. The assistant only sees what that user can see in the product.

## If tools are missing

Stop the AutoRFP skill. Tell the user the connector is not available in this chat, and point them at the steps above. Do not invent library rows, project answers, or URLs.
