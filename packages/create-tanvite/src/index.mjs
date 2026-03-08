import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const featureKeys = ['openspec', 'openapi', 'playwright', 'pages', 'agents'];
const featurePrompts = {
  openspec: 'Include OpenSpec workflow?',
  openapi: 'Include OpenAPI client generation and mocking?',
  playwright: 'Include Playwright end-to-end tests?',
  pages: 'Include GitHub Pages-compatible build support?',
  agents: 'Include Codex and Claude Code agent assets?',
};

const presetDefaults = {
  minimal: {
    openspec: false,
    openapi: false,
    playwright: false,
    pages: false,
    agents: false,
  },
  full: {
    openspec: true,
    openapi: true,
    playwright: true,
    pages: true,
    agents: true,
  },
};

export async function run(argv) {
  const parsed = parseArgs(argv);
  const targetDirInput =
    parsed.positionals[0] ||
    (parsed.yes ? 'my-tanvite-app' : await promptText('Project directory', 'my-tanvite-app'));
  const targetDir = path.resolve(process.cwd(), targetDirInput);
  const defaultPackageName = sanitizePackageName(path.basename(targetDir));
  const packageName =
    parsed.packageName ||
    (parsed.yes ? defaultPackageName : await promptText('Package name', defaultPackageName));
  const appName =
    parsed.title ||
    (parsed.yes
      ? toTitleCase(packageName)
      : await promptText('App title', toTitleCase(packageName)));
  const preset =
    parsed.preset ||
    (parsed.yes ? 'minimal' : await promptChoice('Starter preset', ['minimal', 'full'], 'minimal'));
  const features = await resolveFeatures(parsed, preset);

  await ensureTargetDirectory(targetDir, parsed.yes);
  await fs.cp(templateDir(), targetDir, { recursive: true });

  await removePath(path.join(targetDir, 'showcase'));
  await removePath(path.join(targetDir, 'README.md'));
  await removePath(path.join(targetDir, 'README.zh-CN.md'));
  await removePath(path.join(targetDir, 'LICENSE'));
  await removePath(path.join(targetDir, 'CHANGELOG.md'));
  await removePath(path.join(targetDir, 'CONTRIBUTING.md'));
  await removePath(path.join(targetDir, '.github'));

  await applyTokens(targetDir, {
    packageName,
    appName,
    pagesBasePath: features.pages ? `/${packageName}/` : '/',
  });
  await applyFeaturePruning(targetDir, features);
  await writePackageJson(targetDir, features);
  await writeEnvExample(targetDir, features);
  await writeStarterDocs(targetDir, { appName, packageName, features });

  console.log('');
  console.log(`Scaffolded ${appName} in ${path.relative(process.cwd(), targetDir) || '.'}`);
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${path.relative(process.cwd(), targetDir) || '.'}`);
  console.log('  pnpm install');
  console.log('  pnpm dev');
}

function templateDir() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../template/base');
}

function parseArgs(argv) {
  const parsed = {
    yes: false,
    preset: '',
    title: '',
    packageName: '',
    with: [],
    toggles: {},
    positionals: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === '-y' || value === '--yes') {
      parsed.yes = true;
      continue;
    }

    if (value === '--preset') {
      parsed.preset = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (value === '--title') {
      parsed.title = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (value === '--package-name') {
      parsed.packageName = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (value === '--with') {
      parsed.with = (argv[index + 1] ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      index += 1;
      continue;
    }

    if (value.startsWith('--no-')) {
      parsed.toggles[value.slice(5)] = false;
      continue;
    }

    if (value.startsWith('--')) {
      parsed.toggles[value.slice(2)] = true;
      continue;
    }

    parsed.positionals.push(value);
  }

  return parsed;
}

async function resolveFeatures(parsed, preset) {
  const featureState = { ...(presetDefaults[preset] ?? presetDefaults.minimal) };

  for (const feature of parsed.with) {
    if (feature in featureState) {
      featureState[feature] = true;
    }
  }

  for (const [feature, enabled] of Object.entries(parsed.toggles)) {
    if (feature in featureState) {
      featureState[feature] = enabled;
    }
  }

  if (parsed.yes) {
    return featureState;
  }

  for (const feature of featureKeys) {
    const defaultValue = featureState[feature];
    featureState[feature] = await promptYesNo(
      featurePrompts[feature] ?? `Include ${feature}?`,
      defaultValue
    );
  }

  return featureState;
}

async function ensureTargetDirectory(targetDir, yes) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(targetDir);

  if (!entries.length) {
    return;
  }

  if (yes) {
    throw new Error(`Target directory is not empty: ${targetDir}`);
  }

  const overwrite = await promptYesNo(
    `Directory ${targetDir} is not empty. Continue anyway?`,
    false
  );
  if (!overwrite) {
    throw new Error('Aborted.');
  }
}

async function applyTokens(targetDir, values) {
  const replacements = [
    ['__PACKAGE_NAME__', values.packageName],
    ['__APP_NAME__', values.appName],
    ['__PAGES_BASE_PATH__', values.pagesBasePath],
  ];

  const files = [
    'package.json',
    'index.html',
    'openspec/config.yaml',
    'public/favicon.svg',
    'src/lib/i18n/config.ts',
    'src/lib/i18n/messages.ts',
    'vite.config.ts',
  ];

  await Promise.all(
    files.map(async (relativePath) => {
      const filePath = path.join(targetDir, relativePath);
      let source = await fs.readFile(filePath, 'utf8');

      for (const [token, replacement] of replacements) {
        source = source.split(token).join(replacement);
      }

      await fs.writeFile(filePath, source, 'utf8');
    })
  );
}

async function applyFeaturePruning(targetDir, features) {
  if (!features.openspec) {
    await removePath(path.join(targetDir, 'openspec'));
  }

  if (!features.openapi) {
    await Promise.all([
      removePath(path.join(targetDir, 'openapi.config.mjs')),
      removePath(path.join(targetDir, 'orval.config.mjs')),
      removePath(path.join(targetDir, 'public/mockServiceWorker.js')),
      removePath(path.join(targetDir, 'src/mocks')),
      removePath(path.join(targetDir, 'tests/scripts')),
      removePath(path.join(targetDir, 'scripts/openapi-check.mjs')),
      removePath(path.join(targetDir, 'scripts/openapi-generate.mjs')),
      removePath(path.join(targetDir, 'scripts/openapi-helpers.mjs')),
      removePath(path.join(targetDir, 'scripts/openapi-mock.mjs')),
    ]);

    await fs.writeFile(path.join(targetDir, 'src/main.tsx'), noOpenApiMainSource(), 'utf8');
    await fs.writeFile(
      path.join(targetDir, 'src/lib/api/config.ts'),
      noOpenApiConfigSource(),
      'utf8'
    );
  }

  if (!features.playwright) {
    await Promise.all([
      removePath(path.join(targetDir, 'playwright.config.ts')),
      removePath(path.join(targetDir, 'tests/e2e')),
    ]);
  }

  if (!features.pages) {
    await removePath(path.join(targetDir, 'scripts/postbuild-pages.mjs'));
  }

  if (!features.agents) {
    await Promise.all([
      removePath(path.join(targetDir, '.agents')),
      removePath(path.join(targetDir, '.claude')),
      removePath(path.join(targetDir, 'AGENTS.md')),
      removePath(path.join(targetDir, 'CLAUDE.md')),
    ]);
  } else {
    await fs.writeFile(path.join(targetDir, 'AGENTS.md'), agentsGuideSource(), 'utf8');
    await fs.writeFile(path.join(targetDir, 'CLAUDE.md'), claudeGuideSource(), 'utf8');
  }
}

async function writePackageJson(targetDir, features) {
  const packageJsonPath = path.join(targetDir, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));

  if (!features.openspec) {
    unsetKeys(packageJson.scripts, [
      'openspec:list',
      'openspec:new',
      'openspec:validate',
      'openspec:spec:list',
    ]);
    unsetKeys(packageJson.devDependencies, ['@fission-ai/openspec']);
  }

  if (!features.openapi) {
    unsetKeys(packageJson.scripts, [
      'openapi:check',
      'openapi:generate',
      'openapi:mock',
      'dev:mock',
    ]);
    unsetKeys(packageJson.devDependencies, [
      '@stoplight/prism-cli',
      'dotenv',
      'dotenv-expand',
      'msw',
      'orval',
      'yaml',
    ]);
    packageJson.msw = undefined;
  }

  if (!features.playwright) {
    unsetKeys(packageJson.scripts, ['test:e2e', 'test:e2e:ui']);
    unsetKeys(packageJson.devDependencies, ['@playwright/test']);
  }

  if (!features.pages) {
    unsetKeys(packageJson.scripts, ['build:pages', 'preview:pages']);
  }

  await fs.writeFile(`${packageJsonPath}`, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
}

async function writeEnvExample(targetDir, features) {
  const lines = ['VITE_API_BASE_URL=http://127.0.0.1:8000'];

  if (features.openapi) {
    lines.unshift('OPENAPI_SCHEMA_URL=https://petstore3.swagger.io/api/v3/openapi.json');
    lines.push('OPENAPI_MOCK_PORT=4010');
  }

  await fs.writeFile(path.join(targetDir, '.env.example'), `${lines.join('\n')}\n`, 'utf8');
}

async function writeStarterDocs(targetDir, context) {
  const featureList = [
    'React 19 + TypeScript + Vite',
    'TanStack Router + TanStack Query',
    'Tailwind CSS + Biome + Vitest',
  ];

  if (context.features.openspec) {
    featureList.push('OpenSpec workflow');
  }

  if (context.features.openapi) {
    featureList.push('OpenAPI / Orval / MSW / Prism');
  }

  if (context.features.playwright) {
    featureList.push('Playwright end-to-end tests');
  }

  if (context.features.pages) {
    featureList.push('GitHub Pages build support');
  }

  if (context.features.agents) {
    featureList.push('Codex and Claude Code agent assets');
  }

  const commandLines = ['pnpm install', 'pnpm dev', 'pnpm build', 'pnpm test:run'];

  if (context.features.openspec) {
    commandLines.push('pnpm openspec:list');
  }

  if (context.features.openapi) {
    commandLines.push('pnpm openapi:check', 'pnpm openapi:generate');
  }

  if (context.features.playwright) {
    commandLines.push('pnpm test:e2e');
  }

  if (context.features.pages) {
    commandLines.push('pnpm build:pages');
  }

  const readme = `# ${context.appName}

This project was scaffolded with \`create-tanvite\`.

## Included Features

${featureList.map((item) => `- ${item}`).join('\n')}

## Quick Start

\`\`\`bash
${commandLines.join('\n')}
\`\`\`

## Project Notes

- Package name: \`${context.packageName}\`
- Add product routes under \`src/routes\`
- Keep shared runtime logic under \`src/lib\`
- Regenerate the TanStack Router tree with \`pnpm routes:generate\`
`;

  await fs.writeFile(path.join(targetDir, 'README.md'), `${readme}\n`, 'utf8');
}

function noOpenApiMainSource() {
  return `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { I18nProvider } from "./lib/i18n";
import { queryClient } from "./lib/query-client";
import "./index.css";

const routerBasepath = import.meta.env.BASE_URL.replace(/\\/$/, "") || "/";

const router = createRouter({
  basepath: routerBasepath,
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </I18nProvider>
  </StrictMode>
);
`;
}

function noOpenApiConfigSource() {
  return `import axios from "axios";

export const apiBaseUrl = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common.Accept = "application/json";
`;
}

function agentsGuideSource() {
  return `# AGENTS.md

Project instructions for Codex and other agents.

## Working Rules

- Always use pnpm for scripts and package management.
- Prefer editing source files over generated files.
- Regenerate \`src/routeTree.gen.ts\` instead of editing it by hand.
- Keep changes focused and verify with the smallest useful command set.
`;
}

function claudeGuideSource() {
  return `# CLAUDE.md

Claude Code guidance for this starter project.

## Working Rules

- Use pnpm for all scripts.
- Treat \`src/routeTree.gen.ts\` as generated output.
- Prefer source or config changes over patching generated files.
- Run the smallest useful verification command before finishing.
`;
}

function sanitizePackageName(input) {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-._/]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'my-tanvite-app'
  );
}

function unsetKeys(record, keys) {
  for (const key of keys) {
    record[key] = undefined;
  }
}

function toTitleCase(value) {
  return value
    .split(/[-_./]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

async function removePath(targetPath) {
  await fs.rm(targetPath, { recursive: true, force: true });
}

async function promptText(label, defaultValue) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await rl.question(`${label} (${defaultValue}): `);
  rl.close();
  return answer.trim() || defaultValue;
}

async function promptYesNo(label, defaultValue) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const hint = defaultValue ? 'Y/n' : 'y/N';
  const answer = await rl.question(`${label} [${hint}]: `);
  rl.close();

  if (!answer.trim()) {
    return defaultValue;
  }

  return /^y(es)?$/i.test(answer.trim());
}

async function promptChoice(label, choices, defaultValue) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await rl.question(`${label} (${choices.join('/')}) [${defaultValue}]: `);
  rl.close();
  const resolved = answer.trim() || defaultValue;

  if (choices.includes(resolved)) {
    return resolved;
  }

  return defaultValue;
}
