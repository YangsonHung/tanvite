import fs from 'node:fs/promises';
import path from 'node:path';
import { unsetKeys } from './utils.mjs';

export async function writePackageJson(targetDir, features) {
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
      '@faker-js/faker',
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

  applyLintCheckScripts(packageJson, features);

  await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
}

export async function writeEnvExample(targetDir, features) {
  const lines = ['VITE_API_BASE_URL=http://127.0.0.1:8000'];

  if (features.openapi) {
    lines.unshift('OPENAPI_SCHEMA_URL=https://petstore3.swagger.io/api/v3/openapi.json');
    lines.push('OPENAPI_MOCK_PORT=4010');
  }

  await fs.writeFile(path.join(targetDir, '.env.example'), `${lines.join('\n')}\n`, 'utf8');
}

function applyLintCheckScripts(packageJson, features) {
  if (!packageJson.scripts) return;

  const extras = [];

  if (features.lintFileNaming) {
    packageJson.scripts['check:file-naming'] = 'node ./scripts/check-file-naming.mjs';
    extras.push('pnpm check:file-naming');
  }

  if (features.lintMaxLines) {
    packageJson.scripts['check:max-lines'] = 'node ./scripts/check-max-lines.mjs';
    extras.push('pnpm check:max-lines');
  }

  if (extras.length > 0 && typeof packageJson.scripts.check === 'string') {
    packageJson.scripts.check = appendChain(packageJson.scripts.check, extras);
  }
}

function appendChain(existing, additions) {
  const filtered = additions.filter((cmd) => !existing.includes(cmd));
  if (filtered.length === 0) return existing;
  return `${existing} && ${filtered.join(' && ')}`;
}
