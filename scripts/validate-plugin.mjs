#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const repoRoot = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const errors = [];
const fail = (message) => errors.push(message);

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

const plugin = readJson(join(repoRoot, '.claude-plugin/plugin.json'));
const marketplace = readJson(join(repoRoot, '.claude-plugin/marketplace.json'));
const agentPlugin = readJson(join(repoRoot, 'plugin.json'));
const claudeMcp = readJson(join(repoRoot, '.mcp.json'));
const agentMcp = readJson(join(repoRoot, 'mcp.json'));
const copilotMarketplace = readJson(join(repoRoot, '.github/plugin/marketplace.json'));
const config = readJson(join(repoRoot, 'scripts/sync-config.json'));

if (plugin.name !== 'bid-manager-skills') fail('Claude plugin name must be bid-manager-skills');
if (plugin.displayName !== 'Bid Manager Skills') fail('Claude plugin displayName must be Bid Manager Skills');
if (plugin.privacyPolicyUrl !== 'https://autorfp.ai/privacy') {
  fail('Claude plugin privacyPolicyUrl must be https://autorfp.ai/privacy');
}
if (!existsSync(join(repoRoot, '.claude-plugin/icon.svg'))) fail('.claude-plugin/icon.svg is required');
if (!plugin.description) fail('Claude plugin description is required');
if (plugin.userConfig?.api_host?.default !== 'api.autorfp.ai') {
  fail('api_host default must be api.autorfp.ai');
}
if (plugin.userConfig?.api_host?.options !== undefined) {
  fail('api_host must not use options; the Claude directory rejects that key');
}
if (marketplace.name !== 'bid-manager-skills') fail('marketplace name must be bid-manager-skills');
if (marketplace.description) fail('marketplace description must live under metadata for claude plugin validate');
if (!marketplace.metadata?.description) fail('marketplace metadata.description is required');
if (marketplace.plugins?.[0]?.source !== './') fail('marketplace plugin source must be ./');
if (marketplace.plugins?.[0]?.name !== plugin.name) fail('marketplace plugin name must match plugin.json');
if (agentPlugin.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json') {
  fail('root plugin.json must declare the Agent Plugins schema');
}
if (agentPlugin.name !== plugin.name) fail('Agent Plugins name must match the Claude plugin name');
if (agentMcp.$schema !== 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json') {
  fail('mcp.json must declare the Agent Plugins MCP schema');
}
if (agentMcp.mcpServers?.['autorfp-ai']?.url !== 'https://api.autorfp.ai/mcp') {
  fail('Agent Plugins MCP URL must be the APAC AutoRFP endpoint');
}
if (claudeMcp.mcpServers?.['autorfp-ai']?.url !== 'https://${user_config.api_host}/mcp') {
  fail('Claude MCP URL must use the region userConfig host');
}
if (copilotMarketplace.plugins?.[0]?.name !== plugin.name) fail('Copilot marketplace plugin name drifted');

const requiredSkills = [
  'autorfp-ai-library-clean',
  'autorfp-ai-draft-blank-responses',
  'autorfp-ai-project-coverage',
  'autorfp-setup',
];
const skillsDir = join(repoRoot, 'skills');
const skillDirs = readdirSync(skillsDir).filter((name) => statSync(join(skillsDir, name)).isDirectory());

for (const name of requiredSkills) {
  if (!skillDirs.includes(name)) fail(`missing required skill ${name}`);
}

for (const denied of config.denyPackageIds) {
  if (skillDirs.includes(denied)) fail(`denied skill folder is present: ${denied}`);
}

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
for (const name of skillDirs) {
  const skillPath = join(skillsDir, name, 'SKILL.md');
  if (!existsSync(skillPath)) {
    fail(`${name} is missing SKILL.md`);
    continue;
  }
  const source = readFileSync(skillPath, 'utf8');
  const match = source.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) {
    fail(`${name} SKILL.md is missing frontmatter`);
    continue;
  }
  const data = parseYaml(match[1]) ?? {};
  if (typeof data.name !== 'string' || !kebab.test(data.name) || data.name.length > 64) {
    fail(`${name} has an invalid skill name`);
  }
  if (data.name !== name) fail(`${name} frontmatter name must match the folder`);
  if (typeof data.description !== 'string' || !data.description.trim()) {
    fail(`${name} is missing a description`);
  } else if (data.description.length > 1024) {
    fail(`${name} description is ${data.description.length} chars (max 1024)`);
  }
  const shredder = join(skillsDir, name, 'rfp-shredder');
  if (existsSync(shredder)) fail(`${name} still contains rfp-shredder`);
}

const findDocx = (directory) => {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...findDocx(full));
    else if (entry.name.toLowerCase().endsWith('.docx')) found.push(full);
  }
  return found;
};
for (const docxPath of findDocx(repoRoot)) {
  fail(`plugin must not ship .docx files: ${docxPath.replace(`${repoRoot}/`, '')}`);
}

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exit(1);
}

console.log(`validated ${skillDirs.length} skills`);
