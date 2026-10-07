#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const outDir = join(repoRoot, 'dist');
const zipPath = join(outDir, 'bid-manager-skills-openai.zip');

const includePaths = ['plugin.json', 'mcp.json', 'LICENSE', 'assets', 'skills'];

const assertSafeRelative = (relativePath) => {
  if (relativePath.startsWith('/') || relativePath.includes('..')) {
    throw new Error(`unsafe archive path: ${relativePath}`);
  }
};

const copyTree = (sourceRelative, destRoot) => {
  assertSafeRelative(sourceRelative);
  const sourceAbs = join(repoRoot, sourceRelative);
  if (!existsSync(sourceAbs)) throw new Error(`missing packaging path: ${sourceRelative}`);
  const destAbs = join(destRoot, sourceRelative);
  const stats = statSync(sourceAbs);
  if (stats.isDirectory()) {
    mkdirSync(destAbs, { recursive: true });
    for (const entry of readdirSync(sourceAbs, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      copyTree(join(sourceRelative, entry.name), destRoot);
    }
  } else {
    mkdirSync(join(destAbs, '..'), { recursive: true });
    cpSync(sourceAbs, destAbs);
  }
};

const listZipEntries = (root) => {
  const entries = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const full = join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else entries.push(relative(root, full));
    }
  };
  walk(root);
  return entries.sort();
};

mkdirSync(outDir, { recursive: true });
if (existsSync(zipPath)) rmSync(zipPath);

const staging = mkdtempSync(join(tmpdir(), 'openai-plugin-'));
try {
  for (const path of includePaths) copyTree(path, staging);

  const plugin = JSON.parse(readFileSync(join(staging, 'plugin.json'), 'utf8'));
  execFileSync('zip', ['-r', zipPath, '.'], { cwd: staging, stdio: 'inherit' });

  const entries = listZipEntries(staging);
  if (!entries.includes('plugin.json')) throw new Error('ZIP must contain plugin.json at archive root');
  if (!entries.includes('mcp.json')) throw new Error('ZIP must contain mcp.json at archive root');
  if (!entries.some((entry) => entry.startsWith('skills/') && entry.endsWith('/SKILL.md'))) {
    throw new Error('ZIP must include at least one skill SKILL.md');
  }
  for (const entry of entries) assertSafeRelative(entry);

  console.log(`created ${zipPath} (plugin version ${plugin.version}, ${entries.length} files)`);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
