import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SRC_ROOT = 'src';
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);
const IMPORT_PATTERN =
  /(?:import|export)\s+(?:type\s+)?(?:[^"'`]*?\s+from\s+)?["'`]([^"'`]+)["'`]|import\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
const EXCLUDED_SEGMENTS = ['routeTree.gen', `${path.sep}generated${path.sep}`];
const LAYER_ORDER = ['shared', 'entities', 'features', 'widgets', 'routes', 'app'];

export function getLayerFromPath(filePath) {
  const normalized = filePath.split(path.sep);
  const srcIndex = normalized.indexOf(SRC_ROOT);

  if (srcIndex === -1) {
    return null;
  }

  const layer = normalized[srcIndex + 1];
  return LAYER_ORDER.includes(layer) ? layer : null;
}

export function resolveImportTarget(sourceFile, specifier, projectRoot = process.cwd()) {
  if (!specifier.startsWith('.') && !specifier.startsWith('@/')) {
    return null;
  }

  if (specifier.startsWith('@/')) {
    return path.resolve(projectRoot, SRC_ROOT, specifier.slice(2));
  }

  return path.resolve(path.dirname(sourceFile), specifier);
}

export function checkImportBoundary(sourceFile, specifier, projectRoot = process.cwd()) {
  const sourceLayer = getLayerFromPath(sourceFile);

  if (!sourceLayer) {
    return null;
  }

  const targetPath = resolveImportTarget(sourceFile, specifier, projectRoot);

  if (!targetPath) {
    return null;
  }

  if (EXCLUDED_SEGMENTS.some((segment) => targetPath.includes(segment))) {
    return null;
  }

  const targetLayer = getLayerFromPath(targetPath);

  if (!targetLayer) {
    return null;
  }

  const sourceRank = LAYER_ORDER.indexOf(sourceLayer);
  const targetRank = LAYER_ORDER.indexOf(targetLayer);

  if (targetRank <= sourceRank) {
    return null;
  }

  const relativeSource = path.relative(projectRoot, sourceFile);
  const relativeTarget = path.relative(projectRoot, targetPath);

  return {
    sourceLayer,
    targetLayer,
    relativeSource,
    relativeTarget,
    specifier,
  };
}

async function collectSourceFiles(rootDir) {
  const discovered = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === 'generated') {
          continue;
        }

        await walk(absolutePath);
        continue;
      }

      if (entry.name.endsWith('.d.ts')) {
        continue;
      }

      if (EXCLUDED_SEGMENTS.some((segment) => absolutePath.includes(segment))) {
        continue;
      }

      if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
        discovered.push(absolutePath);
      }
    }
  }

  await walk(rootDir);
  return discovered;
}

async function readViolations(projectRoot = process.cwd()) {
  const sourceRoot = path.join(projectRoot, SRC_ROOT);
  const files = await collectSourceFiles(sourceRoot);
  const violations = [];

  for (const filePath of files) {
    const source = await fs.readFile(filePath, 'utf8');

    for (const match of source.matchAll(IMPORT_PATTERN)) {
      const specifier = match[1] ?? match[2];

      if (!specifier) {
        continue;
      }

      const violation = checkImportBoundary(filePath, specifier, projectRoot);

      if (violation) {
        violations.push(violation);
      }
    }
  }

  return violations;
}

async function main() {
  const violations = await readViolations();

  if (!violations.length) {
    return;
  }

  console.error('Route-FSD boundary violations found:');

  for (const violation of violations) {
    console.error(
      `- ${violation.relativeSource} (${violation.sourceLayer}) cannot import ${violation.specifier} -> ${violation.relativeTarget} (${violation.targetLayer})`
    );
  }

  process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
