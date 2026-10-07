#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const staging = mkdtempSync(join(tmpdir(), 'claude-plugin-'));

try {
  mkdirSync(join(staging, '.claude-plugin'), { recursive: true });
  cpSync(join(repoRoot, '.claude-plugin/plugin.json'), join(staging, '.claude-plugin/plugin.json'));
  cpSync(join(repoRoot, '.claude-plugin/marketplace.json'), join(staging, '.claude-plugin/marketplace.json'));
  cpSync(join(repoRoot, '.claude-plugin/icon.svg'), join(staging, '.claude-plugin/icon.svg'));
  cpSync(join(repoRoot, 'skills'), join(staging, 'skills'), { recursive: true });
  cpSync(join(repoRoot, '.mcp.json'), join(staging, '.mcp.json'));
  execFileSync('claude', ['plugin', 'validate', repoRoot], { stdio: 'inherit' });
  execFileSync('claude', ['plugin', 'validate', staging], { stdio: 'inherit' });
} finally {
  rmSync(staging, { recursive: true, force: true });
}
