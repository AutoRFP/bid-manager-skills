import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const SKIP_NAMES = new Set(['.DS_Store', 'Thumbs.db']);
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const parseFrontmatter = (source) => {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source };
  return { data: parseYaml(match[1]) ?? {}, body: match[2] };
};

export const isDenied = (item, denyPackageIds) => {
  const deny = new Set(denyPackageIds);
  return deny.has(item.packageId) || deny.has(item.slug) || (item.workflow && deny.has(item.workflow));
};

export const listCmsItems = (cmsDir) => {
  if (!existsSync(cmsDir)) return [];
  const items = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (SKIP_NAMES.has(entry.name) || entry.name.startsWith('.')) continue;
      const full = join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.mdx?$/.test(entry.name)) continue;
      const source = readFileSync(full, 'utf8');
      const { data } = parseFrontmatter(source);
      if (!data.packageId) continue;
      const slug = relative(cmsDir, full).replace(/\.mdx?$/, '').split('/').pop();
      items.push({
        slug,
        title: typeof data.title === 'string' ? data.title : slug,
        excerpt: typeof data.excerpt === 'string' ? data.excerpt.trim() : '',
        packageId: String(data.packageId),
        workflow: typeof data.workflow === 'string' ? data.workflow : '',
        draft: data.draft === true,
        comingSoon: data.comingSoon === true,
      });
    }
  };
  walk(cmsDir);
  return items;
};

export const publishedItems = (items, denyPackageIds) =>
  items.filter((item) => !item.draft && !item.comingSoon && !isDenied(item, denyPackageIds));

const walkFiles = (directory) => {
  const out = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (SKIP_NAMES.has(entry.name) || entry.name.startsWith('.')) continue;
    const full = join(directory, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else out.push(full);
  }
  return out;
};

const sectionByHeading = (markdown, heading) => {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = markdown.match(new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'));
  return match ? `## ${heading}\n\n${match[1].trim()}` : '';
};

const readSkillMarkdown = (packageDir) => {
  const skillPath = join(packageDir, 'SKILL.md');
  if (!existsSync(skillPath)) {
    throw new Error(`SKILL.md missing in ${packageDir}`);
  }
  return parseFrontmatter(readFileSync(skillPath, 'utf8'));
};

export const materializeWorkflowPackage = (item, sourceDir, destDir) => {
  const workflowPath = join(sourceDir, 'references', `${item.workflow}.md`);
  if (!existsSync(workflowPath)) {
    throw new Error(`Workflow "${item.workflow}" not found in ${sourceDir}`);
  }

  const parent = readSkillMarkdown(sourceDir);
  const evidence = sectionByHeading(parent.body, 'Evidence rules');
  const workflowBody = readFileSync(workflowPath, 'utf8').trim();
  const description = item.excerpt || parent.data.description || item.title;
  const frontmatter = stringifyYaml({
    name: item.slug,
    description,
    license: parent.data.license || 'Custom terms. See LICENSE.txt',
    metadata: {
      display_name: item.title,
      author: 'AutoRFP.ai',
    },
  }).trim();

  mkdirSync(destDir, { recursive: true });
  writeFileSync(
    join(destDir, 'SKILL.md'),
    `---\n${frontmatter}\n---\n\n${workflowBody}\n\n${evidence}\n`.replace(/\n{3,}/g, '\n\n').trim() + '\n',
  );

  const licensePath = join(sourceDir, 'LICENSE.txt');
  if (existsSync(licensePath)) {
    writeFileSync(join(destDir, 'LICENSE.txt'), readFileSync(licensePath));
  }

  if (item.workflow === 'pdf-insight-finder' && existsSync(join(sourceDir, 'scripts'))) {
    cpSync(join(sourceDir, 'scripts'), join(destDir, 'scripts'), { recursive: true });
  }
  if (item.workflow === 'customer-brief-research' && existsSync(join(sourceDir, 'assets'))) {
    cpSync(join(sourceDir, 'assets'), join(destDir, 'assets'), { recursive: true });
  }

  return destDir;
};

const copyFiltered = (src, dest, denyDirNames) => {
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, {
    recursive: true,
    filter: (source) => {
      const name = basename(source);
      if (source !== src && denyDirNames.has(name)) return false;
      if (SKIP_NAMES.has(name) || name.startsWith('.')) return false;
      return true;
    },
  });
};

export const normalizeSkillName = (skillDir, folderName) => {
  const skillPath = join(skillDir, 'SKILL.md');
  const source = readFileSync(skillPath, 'utf8');
  const { data, body } = parseFrontmatter(source);
  const current = typeof data.name === 'string' ? data.name : '';
  if (current === folderName && KEBAB.test(current)) return;
  if (!KEBAB.test(folderName) || folderName.length > 64) {
    throw new Error(`Folder name is not a valid skill name: ${folderName}`);
  }
  data.name = folderName;
  if (typeof data.description !== 'string' || !data.description.trim()) {
    throw new Error(`Skill ${folderName} is missing a description`);
  }
  const frontmatter = stringifyYaml(data).trim();
  writeFileSync(skillPath, `---\n${frontmatter}\n---\n${body.startsWith('\n') ? body : `\n${body}`}`);
};

export const writeSourceStamp = (skillDir, stamp) => {
  const lines = [
    '# Source',
    '',
    'Generated by `scripts/sync-marketing-skills.mjs`. Do not edit by hand.',
    '',
    `- repo: ${stamp.repo}`,
    `- sha: ${stamp.sha}`,
    `- path: ${stamp.path}`,
    `- slug: ${stamp.slug}`,
    `- packageId: ${stamp.packageId || ''}`,
    `- workflow: ${stamp.workflow || ''}`,
    `- originalName: ${stamp.originalName || ''}`,
  ];
  writeFileSync(join(skillDir, 'SOURCE.md'), `${lines.join('\n')}\n`);
};

export const importMarketingSkills = ({
  packagesDir,
  cmsDir,
  outDir,
  repo,
  sha,
  denyPackageIds,
  denyDirNames,
}) => {
  const denyDirs = new Set(denyDirNames);
  const items = publishedItems(listCmsItems(cmsDir), denyPackageIds);
  const imported = [];

  for (const item of items) {
    const sourceDir = join(packagesDir, item.packageId);
    if (!existsSync(join(sourceDir, 'SKILL.md'))) {
      throw new Error(`CMS skill "${item.slug}" points at missing package ${item.packageId}`);
    }
    const destDir = join(outDir, item.slug);
    const original = readSkillMarkdown(sourceDir);
    if (item.workflow) {
      materializeWorkflowPackage(item, sourceDir, destDir);
    } else {
      copyFiltered(sourceDir, destDir, denyDirs);
      normalizeSkillName(destDir, item.slug);
    }
    writeSourceStamp(destDir, {
      repo,
      sha,
      path: item.workflow
        ? `${relative(packagesDir, sourceDir)}/references/${item.workflow}.md`
        : relative(packagesDir, sourceDir),
      slug: item.slug,
      packageId: item.packageId,
      workflow: item.workflow,
      originalName: typeof original.data.name === 'string' ? original.data.name : '',
    });
    imported.push(item.slug);
  }

  return imported;
};

export const importExtraSkill = ({ srcDir, destDir, folder, repo, sha, path }) => {
  copyFiltered(srcDir, destDir, new Set());
  const original = readSkillMarkdown(srcDir);
  normalizeSkillName(destDir, folder);
  writeSourceStamp(destDir, {
    repo,
    sha,
    path,
    slug: folder,
    packageId: '',
    workflow: '',
    originalName: typeof original.data.name === 'string' ? original.data.name : '',
  });
};

export const removeStaleSyncedSkills = (skillsDir, keep, protectedNames) => {
  if (!existsSync(skillsDir)) return [];
  const removed = [];
  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (protectedNames.has(entry.name) || keep.has(entry.name)) continue;
    const skillDir = join(skillsDir, entry.name);
    if (!existsSync(join(skillDir, 'SOURCE.md'))) continue;
    rmSync(skillDir, { recursive: true, force: true });
    removed.push(entry.name);
  }
  return removed;
};
