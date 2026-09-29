#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  importExtraSkill,
  importMarketingSkills,
  removeStaleSyncedSkills,
} from './lib/marketing-sync.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(repoRoot, 'scripts/sync-config.json'), 'utf8'));
const checkOnly = process.argv.includes('--check');

const run = (command, args, options = {}) => {
  execFileSync(command, args, { stdio: 'inherit', ...options });
};

const capture = (command, args, options = {}) =>
  execFileSync(command, args, { encoding: 'utf8', ...options }).trim();

const cloneRepo = (repo, ref, args) => {
  const dir = mkdtempSync(join(tmpdir(), 'bid-skills-src-'));
  run('git', ['clone', '--depth', '1', '--branch', ref, ...args, `https://github.com/${repo}.git`, dir]);
  const sha = capture('git', ['rev-parse', 'HEAD'], { cwd: dir });
  return { dir, sha };
};

const cloneSparse = (repo, ref, paths) => {
  const checkout = cloneRepo(repo, ref, ['--filter=blob:none', '--sparse']);
  run('git', ['sparse-checkout', 'set', ...paths], { cwd: checkout.dir });
  const sha = capture('git', ['rev-parse', 'HEAD'], { cwd: checkout.dir });
  return { dir: checkout.dir, sha };
};

const cloneFull = (repo, ref) => cloneRepo(repo, ref, []);

const skillsDir = join(repoRoot, 'skills');
const stagingDir = checkOnly ? mkdtempSync(join(tmpdir(), 'bid-skills-check-')) : skillsDir;
if (checkOnly && existsSync(skillsDir)) {
  cpSync(skillsDir, stagingDir, { recursive: true });
}
const cleanups = [];

try {
  const marketing = cloneSparse(config.marketingRepo, config.marketingRef, [
    config.packagesPath,
    config.cmsPath,
  ]);
  cleanups.push(marketing.dir);

  const customerBriefWorksheetMarkdown = readFileSync(
    join(repoRoot, 'skills/customer-brief-research/assets/Customer-Brief-Research-Worksheet.md'),
    'utf8',
  );
  const imported = importMarketingSkills({
    packagesDir: join(marketing.dir, config.packagesPath),
    cmsDir: join(marketing.dir, config.cmsPath),
    outDir: stagingDir,
    repo: config.marketingRepo,
    sha: marketing.sha,
    denyPackageIds: config.denyPackageIds,
    denyDirNames: config.denyDirNames,
    customerBriefWorksheetMarkdown,
  });

  const extraRepos = new Map();
  for (const extra of config.extraSkills) {
    if (imported.includes(extra.folder)) {
      console.log(`skip extra ${extra.folder}; marketing site already published it`);
      continue;
    }
    if (!extraRepos.has(extra.repo)) {
      extraRepos.set(extra.repo, cloneFull(extra.repo, extra.ref));
      cleanups.push(extraRepos.get(extra.repo).dir);
    }
    const checkout = extraRepos.get(extra.repo);
    importExtraSkill({
      srcDir: join(checkout.dir, extra.path),
      destDir: join(stagingDir, extra.folder),
      folder: extra.folder,
      repo: extra.repo,
      sha: checkout.sha,
      path: extra.path,
    });
    imported.push(extra.folder);
  }

  const removed = removeStaleSyncedSkills(stagingDir, new Set(imported), new Set(config.protected));

  if (checkOnly) {
    let diff = '';
    try {
      diff = execFileSync('diff', ['-rq', skillsDir, stagingDir], { encoding: 'utf8' });
    } catch (error) {
      diff = `${error.stdout || ''}${error.stderr || ''}`;
      if (error.status !== 1) throw error;
    }
    if (diff.trim()) {
      console.error(diff);
      console.error('marketing skill sync is stale. Run npm run sync.');
      process.exitCode = 1;
    } else {
      console.log(`sync check ok (${imported.length} skills)`);
    }
  } else {
    console.log(`imported ${imported.length} skills`);
    if (removed.length) console.log(`removed stale: ${removed.join(', ')}`);
  }
} finally {
  for (const dir of cleanups) rmSync(dir, { recursive: true, force: true });
  if (checkOnly) rmSync(stagingDir, { recursive: true, force: true });
}
