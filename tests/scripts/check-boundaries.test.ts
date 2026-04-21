import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkImportBoundary, getLayerFromPath } from '../../scripts/check-boundaries.mjs';

const projectRoot = '/repo';

describe('check-boundaries', () => {
  it('识别 Route-FSD 层级', () => {
    expect(getLayerFromPath(path.join(projectRoot, 'src/routes/index.tsx'))).toBe('routes');
    expect(getLayerFromPath(path.join(projectRoot, 'src/shared/lib/utils.ts'))).toBe('shared');
  });

  it('允许 routes 依赖 widgets', () => {
    const violation = checkImportBoundary(
      path.join(projectRoot, 'src/routes/index.tsx'),
      '@/widgets/starter-home',
      projectRoot
    );

    expect(violation).toBeNull();
  });

  it('阻止 widgets 依赖 routes', () => {
    const violation = checkImportBoundary(
      path.join(projectRoot, 'src/widgets/hero/ui.tsx'),
      '@/routes/index',
      projectRoot
    );

    expect(violation).toMatchObject({
      sourceLayer: 'widgets',
      targetLayer: 'routes',
    });
  });

  it('阻止 shared 依赖 features', () => {
    const violation = checkImportBoundary(
      path.join(projectRoot, 'src/shared/lib/utils.ts'),
      '@/features/auth',
      projectRoot
    );

    expect(violation).toMatchObject({
      sourceLayer: 'shared',
      targetLayer: 'features',
    });
  });
});
