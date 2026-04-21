import fs from 'node:fs/promises';
import path from 'node:path';

export async function writeStarterDocs(targetDir, context) {
  const { appName, packageName, features, messages } = context;

  const featureList = [...messages.baseFeatures];

  for (const key of ['openspec', 'openapi', 'playwright', 'pages', 'agents', 'lintFileNaming', 'lintMaxLines']) {
    if (features[key] && messages.featureLabels[key]) {
      featureList.push(messages.featureLabels[key]);
    }
  }

  const commandLines = ['pnpm install', 'pnpm dev', 'pnpm build', 'pnpm test:run'];

  if (features.openspec) commandLines.push('pnpm openspec:list');
  if (features.openapi) commandLines.push('pnpm openapi:check', 'pnpm openapi:generate');
  if (features.playwright) commandLines.push('pnpm test:e2e');
  if (features.pages) commandLines.push('pnpm build:pages');
  if (features.lintFileNaming) commandLines.push('pnpm check:file-naming');
  if (features.lintMaxLines) commandLines.push('pnpm check:max-lines');

  const readme = messages.readmeTemplate({ appName, packageName, featureList, commandLines });
  await fs.writeFile(path.join(targetDir, 'README.md'), `${readme}\n`, 'utf8');
}

export async function writeAgentFiles(targetDir, features, messages) {
  if (!features.agents) return;

  await fs.writeFile(path.join(targetDir, 'AGENTS.md'), messages.agentsTemplate(), 'utf8');
  await fs.writeFile(path.join(targetDir, 'CLAUDE.md'), messages.claudeFile, 'utf8');
}
