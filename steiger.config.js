import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    ignores: ['./src/routeTree.gen.ts', './src/shared/api/generated/**', '**/.gitkeep'],
  },
  {
    files: ['./src/**'],
    rules: {
      'fsd/insignificant-slice': 'off',
      'fsd/no-processes': 'error',
    },
  },
]);
