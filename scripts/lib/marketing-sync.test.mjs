import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import {
  importMarketingSkills,
  isDenied,
  listCmsItems,
  publishedItems,
  removeStaleSyncedSkills,
} from './marketing-sync.mjs';

const write = (path, contents) => {
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, contents);
};

test('published items drop drafts, coming-soon packs, and the MCP plugin denylist', () => {
  const root = mkdtempSync(join(tmpdir(), 'cms-'));
  write(
    join(root, 'en/keep.md'),
    '---\ntitle: Keep\npackageId: keep-skill\nexcerpt: Keep this.\n---\n\nbody\n',
  );
  write(
    join(root, 'en/later.md'),
    '---\ntitle: Later\npackageId: later-skill\ncomingSoon: true\nexcerpt: Not yet.\n---\n\n',
  );
  write(
    join(root, 'en/denied.md'),
    '---\ntitle: Denied\npackageId: rfp-contradiction-checker-agent-skill\nexcerpt: No.\n---\n\n',
  );
  const items = listCmsItems(root);
  assert.equal(items.length, 3);
  assert.equal(isDenied(items.find((item) => item.slug === 'denied'), ['rfp-contradiction-checker-agent-skill']), true);
  const published = publishedItems(items, ['rfp-contradiction-checker-agent-skill']);
  assert.deepEqual(published.map((item) => item.slug), ['keep']);
  rmSync(root, { recursive: true, force: true });
});

test('import copies a package, drops nested rfp-shredder, and stamps the source sha', () => {
  const root = mkdtempSync(join(tmpdir(), 'import-'));
  const packages = join(root, 'packages');
  const cms = join(root, 'cms');
  const out = join(root, 'out');
  write(
    join(packages, 'ai-go-no-go-agent-skill/SKILL.md'),
    '---\nname: ai-go-no-go\ndescription: Score a tender.\n---\n\n# Go\n\nRead references/go-no-go-framework.md.\n',
  );
  write(join(packages, 'ai-go-no-go-agent-skill/references/go-no-go-framework.md'), '# Framework\n');
  write(
    join(packages, 'ai-go-no-go-agent-skill/rfp-shredder/SKILL.md'),
    '---\nname: rfp-shredder\ndescription: Owned by the MCP plugin.\n---\n\nnope\n',
  );
  write(
    join(cms, 'ai-go-no-go-agent-skill.md'),
    '---\ntitle: AI Go/No-Go\npackageId: ai-go-no-go-agent-skill\nexcerpt: Score a tender.\n---\n\n',
  );
  write(
    join(packages, 'customer-insights-skills/SKILL.md'),
    '---\nname: customer-insights-skills\ndescription: Pack.\nlicense: Custom terms. See LICENSE.txt\n---\n\n## Evidence rules\n\nMap every claim.\n\n## Other\n\nIgnore.\n',
  );
  write(join(packages, 'customer-insights-skills/LICENSE.txt'), 'custom\n');
  write(join(packages, 'customer-insights-skills/references/build-google-dork.md'), '# Build Google Dork\n\nWrite queries.\n');
  write(
    join(cms, 'build-google-dork.md'),
    '---\ntitle: Build Google Dork\npackageId: customer-insights-skills\nworkflow: build-google-dork\nexcerpt: Produce precise queries.\n---\n\n',
  );

  const imported = importMarketingSkills({
    packagesDir: packages,
    cmsDir: cms,
    outDir: out,
    repo: 'ConquestCapital/site',
    sha: 'abc123',
    denyPackageIds: ['rfp-shredder'],
    denyDirNames: ['rfp-shredder'],
  });

  assert.deepEqual(imported.sort(), ['ai-go-no-go-agent-skill', 'build-google-dork']);
  assert.equal(existsSync(join(out, 'ai-go-no-go-agent-skill/rfp-shredder/SKILL.md')), false);
  const goSkill = readFileSync(join(out, 'ai-go-no-go-agent-skill/SKILL.md'), 'utf8');
  assert.match(goSkill, /name: ai-go-no-go-agent-skill/);
  assert.match(readFileSync(join(out, 'ai-go-no-go-agent-skill/SOURCE.md'), 'utf8'), /sha: abc123/);
  const dork = readFileSync(join(out, 'build-google-dork/SKILL.md'), 'utf8');
  assert.match(dork, /name: build-google-dork/);
  assert.match(dork, /Write queries/);
  assert.match(dork, /Map every claim/);
  assert.equal(readFileSync(join(out, 'build-google-dork/LICENSE.txt'), 'utf8'), 'custom\n');
  rmSync(root, { recursive: true, force: true });
});

test('stale synced skills are removed and protected skills stay', () => {
  const root = mkdtempSync(join(tmpdir(), 'stale-'));
  write(join(root, 'old-skill/SKILL.md'), '---\nname: old-skill\ndescription: Old.\n---\n\n');
  write(join(root, 'old-skill/SOURCE.md'), '# Source\n');
  write(join(root, 'autorfp-setup/SKILL.md'), '---\nname: autorfp-setup\ndescription: Setup.\n---\n\n');
  write(join(root, 'autorfp-setup/SOURCE.md'), '# Source\n');
  const removed = removeStaleSyncedSkills(root, new Set(), new Set(['autorfp-setup']));
  assert.deepEqual(removed, ['old-skill']);
  assert.equal(readFileSync(join(root, 'autorfp-setup/SKILL.md'), 'utf8').includes('Setup'), true);
  rmSync(root, { recursive: true, force: true });
});
