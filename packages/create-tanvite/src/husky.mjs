import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_PRE_COMMIT = [
  '#!/usr/bin/env sh',
  'set -eu',
  '',
  'pnpm exec lint-staged',
  'pnpm typecheck',
  'pnpm check:boundaries',
];

const COMMIT_MSG = `#!/usr/bin/env sh
set -eu

pnpm exec commitlint --edit "$1"
`;

export async function writeHuskyHooks(targetDir, features) {
  const huskyDir = path.join(targetDir, '.husky');
  await fs.mkdir(huskyDir, { recursive: true });

  const preCommitLines = [...BASE_PRE_COMMIT];
  if (features.lintFileNaming) preCommitLines.push('pnpm check:file-naming');
  if (features.lintMaxLines) preCommitLines.push('pnpm check:max-lines');

  await fs.writeFile(path.join(huskyDir, 'pre-commit'), `${preCommitLines.join('\n')}\n`, 'utf8');
  await fs.writeFile(path.join(huskyDir, 'commit-msg'), COMMIT_MSG, 'utf8');
}
