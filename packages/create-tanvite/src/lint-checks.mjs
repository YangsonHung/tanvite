import fs from 'node:fs/promises';
import path from 'node:path';

export async function writeLintCheckScripts(targetDir, features, messages, options = {}) {
  const writes = [];

  if (features.lintFileNaming) {
    writes.push(writeScript(targetDir, 'check-file-naming.mjs', renderFileNamingScript(messages)));
  }

  if (features.lintMaxLines) {
    const limit = Number.isInteger(options.maxLinesLimit) ? options.maxLinesLimit : 300;
    writes.push(
      writeScript(targetDir, 'check-max-lines.mjs', renderMaxLinesScript(messages, limit))
    );
  }

  if (writes.length === 0) return;

  await fs.mkdir(path.join(targetDir, 'scripts'), { recursive: true });
  await Promise.all(writes);
}

async function writeScript(targetDir, filename, source) {
  const dest = path.join(targetDir, 'scripts', filename);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, source, 'utf8');
}

function renderFileNamingScript(messages) {
  const { fileNamingPass, fileNamingFail, fileNamingHeaderComment, routeFileComment } =
    messages.lintScripts;

  return `import { glob } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SRC_DIR = path.join(process.cwd(), 'src');

${fileNamingHeaderComment}
const IGNORE_PREFIXES = [
  path.join('src', 'routeTree.gen.ts'),
  path.join('src', 'shared', 'api', 'generated'),
];

${routeFileComment}
const KEBAB_CASE_RE = /^_{0,2}[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:\\.[\\da-z]+)*$/;
const ROUTE_FILE_RE =
  /^(__root|_{1,2}[a-z][a-z0-9]*(?:-[a-z0-9]+)*|[a-z][a-z0-9]*(?:-[a-z0-9]+)*)(?:\\.(?:[a-z][a-z0-9]*(?:-[a-z0-9]+)*|\\$[a-z][A-Za-z0-9]*))*$/;

function stripExtensions(filename) {
  return filename.replace(/\\.(d\\.)?[tj]sx?$/, '').replace(/\\.css$/, '');
}

function isIgnored(filePath) {
  const rel = path.relative(process.cwd(), filePath);
  return IGNORE_PREFIXES.some((prefix) => rel.startsWith(prefix));
}

function isRouteFile(filePath) {
  const rel = path.relative(process.cwd(), filePath);
  return rel.startsWith(path.join('src', 'routes'));
}

async function main() {
  const violations = [];

  for await (const entry of glob(path.join(SRC_DIR, '**/*.{ts,tsx,css}'))) {
    if (isIgnored(entry)) continue;

    const filename = path.basename(entry);
    const stem = stripExtensions(filename);

    const isValidStem = isRouteFile(entry) ? ROUTE_FILE_RE.test(stem) : KEBAB_CASE_RE.test(stem);

    if (!isValidStem) {
      const rel = path.relative(process.cwd(), entry);
      violations.push(rel);
    }
  }

  if (violations.length === 0) {
    console.log(${JSON.stringify(fileNamingPass)});
    return;
  }

  violations.sort();

  console.error(${JSON.stringify(fileNamingFail)});
  for (const file of violations) {
    console.error(\`- \${file}\`);
  }

  process.exitCode = 1;
}

void main();
`;
}

function renderMaxLinesScript(messages, limit) {
  const { maxLinesPass, maxLinesFail, maxLinesEntryTemplate } = messages.lintScripts;
  const passText = maxLinesPass(limit);
  const failText = maxLinesFail(limit);

  return `import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const MAX_LINES = ${limit};
const SRC_DIR = path.join(process.cwd(), 'src');
const ENTRY_TEMPLATE = ${JSON.stringify(maxLinesEntryTemplate)};

const IGNORE_PATTERNS = [
  'src/routeTree.gen.ts',
  'src/shared/api/generated/**/*',
];

function isIgnored(filePath) {
  const rel = path.relative(process.cwd(), filePath);
  return IGNORE_PATTERNS.some((pattern) => {
    const prefix = pattern.replace(/\\*\\*\\/\\*$/, '');
    return rel === pattern || rel.startsWith(prefix);
  });
}

async function getAllTsFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllTsFiles(fullPath)));
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatEntry(file, lines) {
  return ENTRY_TEMPLATE.replace('__FILE__', file).replace('__LINES__', String(lines));
}

async function main() {
  const violations = [];

  const tsFiles = await getAllTsFiles(SRC_DIR);
  for (const entry of tsFiles) {
    if (isIgnored(entry)) continue;

    const content = await readFile(entry, 'utf8');
    const lineCount = content.split('\\n').length;

    if (lineCount > MAX_LINES) {
      const rel = path.relative(process.cwd(), entry);
      violations.push({ file: rel, lines: lineCount });
    }
  }

  if (violations.length === 0) {
    console.log(${JSON.stringify(passText)});
    return;
  }

  violations.sort((a, b) => b.lines - a.lines);

  console.error(${JSON.stringify(failText)});
  for (const { file, lines } of violations) {
    console.error(formatEntry(file, lines));
  }

  process.exitCode = 1;
}

void main();
`;
}
