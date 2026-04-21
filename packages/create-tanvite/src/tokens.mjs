import fs from 'node:fs/promises';
import path from 'node:path';

const TOKEN_FILES = [
  'package.json',
  'index.html',
  'openspec/config.yaml',
  'public/favicon.svg',
  'src/shared/i18n/config.ts',
  'src/shared/i18n/messages.ts',
  'vite.config.ts',
];

export async function applyTokens(targetDir, values) {
  const replacements = [
    ['__PACKAGE_NAME__', values.packageName],
    ['__APP_NAME__', values.appName],
    ['__PAGES_BASE_PATH__', values.pagesBasePath],
  ];

  await Promise.all(
    TOKEN_FILES.map(async (relativePath) => {
      const filePath = path.join(targetDir, relativePath);
      let source;
      try {
        source = await fs.readFile(filePath, 'utf8');
      } catch (error) {
        if (error.code === 'ENOENT') return;
        throw error;
      }

      for (const [token, replacement] of replacements) {
        source = source.split(token).join(replacement);
      }

      await fs.writeFile(filePath, source, 'utf8');
    })
  );
}
