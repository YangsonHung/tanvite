import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { writeAgentHooks } from './agent-hooks.mjs';
import { parseArgs } from './args.mjs';
import { writeAgentFiles, writeStarterDocs } from './docs.mjs';
import { resolveFeatures, resolveHooksAgents, resolveMaxLinesLimit } from './features.mjs';
import { writeHuskyHooks } from './husky.mjs';
import {
  DEFAULT_LOCALE,
  getMessages,
  isSupportedLocale,
  normalizeLocale,
  SUPPORTED_LOCALES,
} from './i18n/index.mjs';
import { writeLintCheckScripts } from './lint-checks.mjs';
import { writeEnvExample, writePackageJson } from './package-json.mjs';
import { ensureTargetDirectory, removePath, restoreDotfiles, templateDir } from './paths.mjs';
import { promptChoice, promptText } from './prompts.mjs';
import { applyFeaturePruning } from './prune.mjs';
import { applyTokens } from './tokens.mjs';
import { sanitizePackageName, toTitleCase } from './utils.mjs';

const LOCALE_DISPLAY = {
  en: 'English',
  'zh-CN': '简体中文',
};

export async function run(argv) {
  const parsed = parseArgs(argv);

  const locale = await resolveLocale(parsed);
  const messages = getMessages(locale);

  const targetDirInput =
    parsed.positionals[0] ||
    (parsed.yes ? 'my-tanvite-app' : await promptText(messages.promptDirectory, 'my-tanvite-app'));
  const targetDir = path.resolve(process.cwd(), targetDirInput);
  const defaultPackageName = sanitizePackageName(path.basename(targetDir));

  const packageName =
    parsed.packageName ||
    (parsed.yes
      ? defaultPackageName
      : await promptText(messages.promptPackageName, defaultPackageName));

  const appName =
    parsed.title ||
    (parsed.yes
      ? toTitleCase(packageName)
      : await promptText(messages.promptAppTitle, toTitleCase(packageName)));

  const preset =
    parsed.preset ||
    (parsed.yes
      ? 'minimal'
      : await promptChoice(
          messages.promptPreset,
          ['minimal', 'full'],
          'minimal',
          messages.presetLabels
        ));

  const features = await resolveFeatures(parsed, preset, messages);
  const maxLinesLimit = await resolveMaxLinesLimit(parsed, features, messages);
  const hooksAgents = await resolveHooksAgents(parsed, features, messages);

  await ensureTargetDirectory(targetDir, parsed.yes, messages);
  await fs.cp(templateDir(), targetDir, { recursive: true });
  await restoreDotfiles(targetDir);

  await pruneRepoOnlyArtifacts(targetDir);

  await applyTokens(targetDir, {
    packageName,
    appName,
    pagesBasePath: features.pages ? `/${packageName}/` : '/',
  });
  await applyFeaturePruning(targetDir, features);
  await writeLintCheckScripts(targetDir, features, messages, { maxLinesLimit });
  await writePackageJson(targetDir, features);
  await writeEnvExample(targetDir, features);
  await writeHuskyHooks(targetDir, features);
  await writeStarterDocs(targetDir, { appName, packageName, features, hooksAgents, messages });
  await writeAgentFiles(targetDir, features, messages);
  await writeAgentHooks(targetDir, features, hooksAgents, messages);

  printNextSteps({ messages, appName, targetDir });
}

async function resolveLocale(parsed) {
  if (parsed.lang) {
    return normalizeLocale(parsed.lang);
  }

  if (parsed.yes) {
    return DEFAULT_LOCALE;
  }

  const choice = await promptChoice(
    'Language / 语言',
    SUPPORTED_LOCALES,
    DEFAULT_LOCALE,
    LOCALE_DISPLAY
  );
  return isSupportedLocale(choice) ? choice : DEFAULT_LOCALE;
}

async function pruneRepoOnlyArtifacts(targetDir) {
  await Promise.all([
    removePath(path.join(targetDir, 'showcase')),
    removePath(path.join(targetDir, 'README.md')),
    removePath(path.join(targetDir, 'README.zh-CN.md')),
    removePath(path.join(targetDir, 'LICENSE')),
    removePath(path.join(targetDir, 'CHANGELOG.md')),
    removePath(path.join(targetDir, 'CONTRIBUTING.md')),
    removePath(path.join(targetDir, '.github')),
  ]);
}

function printNextSteps({ messages, appName, targetDir }) {
  const dirRel = path.relative(process.cwd(), targetDir) || '.';
  console.log('');
  console.log(messages.scaffoldedSummary({ appName, dirRel }));
  console.log('');
  console.log(messages.nextStepsHeader);
  console.log(messages.nextStepsCd(dirRel));
  console.log(messages.nextStepsInstall);
  console.log(messages.nextStepsDev);
}
