import fs from 'node:fs/promises';
import path from 'node:path';
import { removePath } from './paths.mjs';

export async function applyFeaturePruning(targetDir, features) {
  if (!features.openspec) {
    await removePath(path.join(targetDir, 'openspec'));
  }

  if (!features.openapi) {
    await Promise.all([
      removePath(path.join(targetDir, 'openapi.config.mjs')),
      removePath(path.join(targetDir, 'orval.config.mjs')),
      removePath(path.join(targetDir, 'public/mockServiceWorker.js')),
      removePath(path.join(targetDir, 'src/shared/api/mock')),
      removePath(path.join(targetDir, 'tests/scripts')),
      removePath(path.join(targetDir, 'scripts/openapi-check.mjs')),
      removePath(path.join(targetDir, 'scripts/openapi-generate.mjs')),
      removePath(path.join(targetDir, 'scripts/openapi-helpers.mjs')),
      removePath(path.join(targetDir, 'scripts/openapi-mock.mjs')),
    ]);

    await fs.writeFile(path.join(targetDir, 'src/app/main.tsx'), noOpenApiMainSource(), 'utf8');
    await fs.writeFile(
      path.join(targetDir, 'src/shared/api/config.ts'),
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
  }
}

function noOpenApiMainSource() {
  return `import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { AppProviders } from './providers/app-providers';
import { router } from './router';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
);
`;
}

function noOpenApiConfigSource() {
  return `import axios from 'axios';

export const apiBaseUrl = import.meta.env.DEV
  ? ''
  : import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common.Accept = 'application/json';
`;
}
