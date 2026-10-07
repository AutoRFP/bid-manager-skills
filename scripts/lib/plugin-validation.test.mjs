import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import {
  combinedSkillIdentityLength,
  normalizePrompt,
  skillBodyAfterFrontmatter,
  validateOpenAiExtension,
  validateSemver,
  validateSquareSvg,
  validateVersionParity,
} from './plugin-validation.mjs';

test('normalizePrompt collapses whitespace for duplicate detection', () => {
  assert.equal(normalizePrompt('  Hello   world '), 'hello world');
});

test('validateSemver accepts release versions', () => {
  const errors = [];
  validateSemver('1.0.6', (message) => errors.push(message));
  assert.deepEqual(errors, []);
});

test('validateVersionParity reports drift', () => {
  const errors = [];
  validateVersionParity('1.0.6', [['root', '1.0.5']], (message) => errors.push(message));
  assert.match(errors[0], /root version must be 1.0.6/);
});

test('skillBodyAfterFrontmatter requires instructions after YAML', () => {
  const body = skillBodyAfterFrontmatter('---\nname: x\ndescription: y\n---\n\nDo the work.\n');
  assert.equal(body, 'Do the work.');
  assert.equal(skillBodyAfterFrontmatter('---\nname: x\ndescription: y\n---\n'), '');
});

test('combined skill identity stays within directory limit', () => {
  assert.ok(combinedSkillIdentityLength('bid-manager-skills', 'autorfp-ai-library-clean') <= 64);
});

test('validateSquareSvg accepts plugin icon dimensions', () => {
  const root = mkdtempSync(join(tmpdir(), 'svg-'));
  const icon = join(root, 'icon.svg');
  writeFileSync(
    icon,
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128"></svg>',
  );
  const errors = [];
  validateSquareSvg(icon, (message) => errors.push(message));
  assert.deepEqual(errors, []);
  rmSync(root, { recursive: true, force: true });
});

test('validateOpenAiExtension rejects long subtitles', () => {
  const root = mkdtempSync(join(tmpdir(), 'openai-'));
  mkdirSync(join(root, 'assets'));
  writeFileSync(join(root, 'assets/icon.svg'), '<svg viewBox="0 0 128 128" width="128" height="128"></svg>');
  mkdirSync(join(root, 'skills/autorfp-setup'), { recursive: true });
  writeFileSync(join(root, 'skills/autorfp-setup/SKILL.md'), '---\nname: autorfp-setup\ndescription: Setup.\n---\n\n');
  const errors = [];
  validateOpenAiExtension(
    {
      author: { name: 'AutoRFP.ai' },
      extensions: {
        'com.openai': {
          interface: {
            displayName: 'Bid Manager Skills',
            shortDescription: 'This subtitle is definitely too long for OpenAI',
            longDescription: 'Long enough.',
            developerName: 'AutoRFP.ai',
            category: 'Productivity',
            capabilities: ['One'],
            websiteURL: 'https://autorfp.ai/skills/',
            supportURL: 'https://autorfp.ai/contact',
            privacyPolicyURL: 'https://autorfp.ai/legal/privacy',
            termsOfServiceURL: 'https://autorfp.ai/legal/msa',
            defaultPrompt: ['Hello'],
            logo: './assets/icon.svg',
            composerIcon: './assets/icon.svg',
          },
          onboardingSkill: './skills/autorfp-setup/SKILL.md',
          review: {
            test_cases: {
              positive: Array.from({ length: 5 }, (_, index) => ({
                description: `Case ${index}`,
                prompt: `Prompt ${index}`,
                tools_triggered: 'list_tags',
                expected_behavior: 'Works',
              })),
              negative: Array.from({ length: 3 }, (_, index) => ({
                description: `No ${index}`,
                prompt: `Stop ${index}`,
              })),
            },
          },
        },
      },
    },
    root,
    (message) => errors.push(message),
  );
  assert.ok(errors.some((message) => message.includes('shortDescription')));
  rmSync(root, { recursive: true, force: true });
});
