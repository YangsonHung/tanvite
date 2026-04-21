import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promptYesNo } from './prompts.mjs';

export function templateDir() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../template/base');
}

export async function removePath(targetPath) {
  await fs.rm(targetPath, { recursive: true, force: true });
}

export async function restoreDotfiles(targetDir) {
  const mappings = [['gitignore', '.gitignore']];

  for (const [sourceName, targetName] of mappings) {
    const sourcePath = path.join(targetDir, sourceName);
    const targetPath = path.join(targetDir, targetName);
    await fs.rename(sourcePath, targetPath).catch((error) => {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    });
  }
}

export async function ensureTargetDirectory(targetDir, yes, messages) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(targetDir);

  if (!entries.length) {
    return;
  }

  if (yes) {
    throw new Error(messages.errorTargetNotEmpty(targetDir));
  }

  const overwrite = await promptYesNo(messages.promptOverwrite(targetDir), false, messages);
  if (!overwrite) {
    throw new Error(messages.errorAborted);
  }
}
