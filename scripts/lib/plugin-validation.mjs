import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const HTTPS = /^https:\/\/.+/;

export const normalizePrompt = (value) =>
  value.trim().replace(/\s+/g, ' ').normalize('NFKC').toLowerCase();

export const validateSemver = (version, fail) => {
  if (typeof version !== 'string' || !SEMVER.test(version)) {
    fail('plugin version must be semantic versioning such as 1.0.6');
  }
};

export const validateVersionParity = (expected, values, fail) => {
  for (const [label, value] of values) {
    if (value !== expected) fail(`${label} version must be ${expected}, got ${value ?? 'missing'}`);
  }
};

export const validateHttpsUrl = (label, url, fail, maxLength = 2048) => {
  if (typeof url !== 'string' || !HTTPS.test(url)) fail(`${label} must be an HTTPS URL`);
  if (url.length > maxLength) fail(`${label} must be at most ${maxLength} characters`);
};

export const validateOpenAiExtension = (agentPlugin, repoRoot, fail) => {
  const ext = agentPlugin.extensions?.['com.openai'];
  if (!ext || typeof ext !== 'object') {
    fail('plugin.json must declare extensions.com.openai');
    return;
  }
  const iface = ext.interface;
  if (!iface || typeof iface !== 'object') fail('extensions.com.openai.interface is required');

  const displayName = iface.displayName;
  if (typeof displayName !== 'string' || !displayName.trim()) {
    fail('interface.displayName is required');
  } else if (displayName.length > 30) {
    fail('interface.displayName must be 30 characters or fewer for directory submission');
  }

  const shortDescription = iface.shortDescription;
  if (typeof shortDescription !== 'string' || !shortDescription.trim()) {
    fail('interface.shortDescription is required');
  } else if (shortDescription.length > 30) {
    fail('interface.shortDescription must be 30 characters or fewer for directory submission');
  } else if (shortDescription.includes('\n')) {
    fail('interface.shortDescription must be a single line');
  }

  const longDescription = iface.longDescription;
  if (typeof longDescription !== 'string' || !longDescription.trim()) {
    fail('interface.longDescription is required');
  } else if (longDescription.length > 4000) {
    fail('interface.longDescription must be 4000 characters or fewer');
  }

  if (iface.developerName !== agentPlugin.author?.name) {
    fail('interface.developerName must match author.name');
  }

  if (iface.category !== 'Productivity') fail('interface.category must be Productivity');

  const capabilities = iface.capabilities;
  if (!Array.isArray(capabilities) || capabilities.length === 0) {
    fail('interface.capabilities must be a non-empty array');
  } else if (capabilities.length > 20) {
    fail('interface.capabilities must contain at most 20 entries');
  } else {
    for (const cap of capabilities) {
      if (typeof cap !== 'string' || !cap.trim()) fail('each capability must be a non-empty string');
      else if (cap.length > 120) fail(`capability exceeds 120 characters: ${cap.slice(0, 40)}…`);
    }
  }

  validateHttpsUrl('interface.websiteURL', iface.websiteURL, fail, 1024);
  validateHttpsUrl('interface.supportURL', iface.supportURL, fail, 1024);
  validateHttpsUrl('interface.privacyPolicyURL', iface.privacyPolicyURL, fail, 1024);
  validateHttpsUrl('interface.termsOfServiceURL', iface.termsOfServiceURL, fail, 1024);

  if (iface.privacyPolicyURL !== 'https://autorfp.ai/legal/privacy') {
    fail('interface.privacyPolicyURL must be https://autorfp.ai/legal/privacy');
  }
  if (iface.termsOfServiceURL !== 'https://autorfp.ai/legal/msa') {
    fail('interface.termsOfServiceURL must be https://autorfp.ai/legal/msa');
  }
  if (iface.supportURL !== 'https://autorfp.ai/contact') {
    fail('interface.supportURL must be https://autorfp.ai/contact');
  }

  const prompts = Array.isArray(iface.defaultPrompt)
    ? iface.defaultPrompt
    : typeof iface.defaultPrompt === 'string'
      ? [iface.defaultPrompt]
      : [];
  if (prompts.length === 0) fail('interface.defaultPrompt must include at least one prompt');
  if (prompts.length > 3) fail('interface.defaultPrompt must contain at most three prompts');
  const seen = new Set();
  for (const prompt of prompts) {
    if (typeof prompt !== 'string' || !prompt.trim()) fail('each defaultPrompt must be non-empty');
    if (prompt.length > 128) fail('each defaultPrompt must be 128 characters or fewer for directory submission');
    if (prompt.includes('\n')) fail('each defaultPrompt must be a single line');
    if (/@\w/.test(prompt)) fail('defaultPrompt must not contain MCP @mentions');
    const key = normalizePrompt(prompt);
    if (seen.has(key)) fail('defaultPrompt entries must be unique');
    seen.add(key);
  }

  for (const assetField of ['logo', 'composerIcon']) {
    const rel = iface[assetField];
    if (typeof rel !== 'string' || !rel.startsWith('./')) {
      fail(`interface.${assetField} must be a ./-prefixed relative path`);
      continue;
    }
    const abs = join(repoRoot, rel.slice(2));
    if (!existsSync(abs)) fail(`interface.${assetField} file is missing: ${rel}`);
    else validateSquareSvg(abs, fail, assetField);
  }

  const review = ext.review;
  if (!review?.test_cases) {
    fail('extensions.com.openai.review.test_cases is required for MCP directory packaging');
  } else {
    const positive = review.test_cases.positive;
    const negative = review.test_cases.negative;
    if (!Array.isArray(positive) || positive.length !== 5) {
      fail('review.test_cases.positive must contain exactly five cases');
    }
    if (!Array.isArray(negative) || negative.length !== 3) {
      fail('review.test_cases.negative must contain exactly three cases');
    }
    for (const [index, testCase] of (positive ?? []).entries()) {
      if (!testCase?.prompt || !testCase?.description) {
        fail(`positive test case ${index + 1} must include description and prompt`);
      }
      if (!testCase?.expected_behavior) {
        fail(`positive test case ${index + 1} must include expected_behavior`);
      }
    }
    for (const [index, testCase] of (negative ?? []).entries()) {
      if (!testCase?.prompt || !testCase?.description) {
        fail(`negative test case ${index + 1} must include description and prompt`);
      }
    }
  }

  if (ext.onboardingSkill !== './skills/autorfp-setup/SKILL.md') {
    fail('onboardingSkill must point at ./skills/autorfp-setup/SKILL.md');
  }
  if (!existsSync(join(repoRoot, 'skills/autorfp-setup/SKILL.md'))) {
    fail('onboarding skill autorfp-setup/SKILL.md is missing');
  }
};

export const validateSquareSvg = (path, fail, label = 'icon') => {
  const source = readFileSync(path, 'utf8');
  if (!source.includes('<svg')) fail(`${label} must be SVG`);
  const viewBox = source.match(/viewBox="\s*0\s+0\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*"/);
  if (viewBox) {
    const w = Number(viewBox[1]);
    const h = Number(viewBox[2]);
    if (w !== h || w < 48) fail(`${label} viewBox must be square and at least 48×48`);
  } else {
    const width = source.match(/\bwidth="(\d+(?:\.\d+)?)"/);
    const height = source.match(/\bheight="(\d+(?:\.\d+)?)"/);
    if (!width || !height || width[1] !== height[1] || Number(width[1]) < 48) {
      fail(`${label} must declare square dimensions of at least 48×48`);
    }
  }
};

export const validateAgentsMarketplace = (marketplace, agentPlugin, fail) => {
  if (marketplace.name !== agentPlugin.name) fail('.agents/plugins/marketplace.json name must match plugin name');
  if (marketplace.interface?.displayName !== 'Bid Manager Skills') {
    fail('.agents marketplace interface.displayName must be Bid Manager Skills');
  }
  const entry = marketplace.plugins?.[0];
  if (!entry) fail('.agents marketplace must include one plugin entry');
  if (entry.name !== agentPlugin.name) fail('.agents marketplace plugin name must match plugin.json');
  if (entry.version !== agentPlugin.version) fail('.agents marketplace plugin version must match plugin.json');
  if (entry.category !== 'Productivity') fail('.agents marketplace category must be Productivity');
  if (entry.policy?.installation !== 'AVAILABLE') fail('.agents marketplace policy.installation must be AVAILABLE');
  if (entry.policy?.authentication !== 'ON_INSTALL') {
    fail('.agents marketplace policy.authentication must be ON_INSTALL');
  }
  const url = entry.source?.url;
  if (entry.source?.source !== 'url' || url !== agentPlugin.repository) {
    fail('.agents marketplace source.url must match plugin repository');
  }
};

export const skillBodyAfterFrontmatter = (source) => {
  const closed = source.match(/^---\s*\n[\s\S]*?\n---\s*\n?([\s\S]*)$/);
  return closed ? closed[1].trim() : '';
};

export const combinedSkillIdentityLength = (pluginName, skillName) =>
  `${pluginName}:${skillName}`.length;
