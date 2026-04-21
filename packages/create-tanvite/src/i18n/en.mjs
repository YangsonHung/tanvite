const featureLabels = {
  openspec: 'OpenSpec workflow',
  openapi: 'OpenAPI / Orval / MSW / Prism',
  playwright: 'Playwright end-to-end tests',
  pages: 'GitHub Pages build support',
  agents: 'Codex and Claude Code agent assets',
  lintFileNaming: 'kebab-case file naming check script',
  lintMaxLines: 'Per-file line limit check script',
};

function readmeTemplate({ appName, packageName, featureList, commandLines }) {
  return `# ${appName}

This project was scaffolded with \`create-tanvite\`.

## Included Features

${featureList.map((item) => `- ${item}`).join('\n')}

## Quick Start

\`\`\`bash
${commandLines.join('\n')}
\`\`\`

## Project Notes

- Package name: \`${packageName}\`
- Keep route entries under \`src/routes\`
- Move reusable screen blocks into \`src/widgets\`
- Keep app-wide runtime logic under \`src/shared\`
- Regenerate the TanStack Router tree with \`pnpm routes:generate\`
`;
}

function agentsTemplate() {
  return `# AGENTS.md

Project instructions for Codex, Claude Code, and other AI coding agents.

## Working Rules

- Always use pnpm for scripts and package management.
- Prefer editing source files over generated files.
- Regenerate \`src/routeTree.gen.ts\` instead of editing it by hand.
- Keep route entries in \`src/routes\`, reusable UI in \`src/widgets\`, and shared runtime logic in \`src/shared\`.
- Keep changes focused and verify with the smallest useful command set.

## Verification Commands

- Type or UI changes: \`pnpm build\`
- Lint and format: \`pnpm check\`
- Unit tests: \`pnpm test:run\`
`;
}

const messages = {
  promptLanguage: 'Language / 语言',
  promptDirectory: 'Project directory',
  promptPackageName: 'Package name',
  promptAppTitle: 'App title',
  promptPreset: 'Starter preset',
  promptMaxLines: 'Max lines per file (100-1000, inclusive)',
  errorMaxLinesRange: 'Please enter an integer between 100 and 1000 (inclusive).',
  presetLabels: { minimal: 'minimal', full: 'full' },
  promptOverwrite: (dir) => `Directory ${dir} is not empty. Continue anyway?`,
  errorTargetNotEmpty: (dir) => `Target directory is not empty: ${dir}`,
  errorAborted: 'Aborted.',

  features: {
    openspec: 'Include OpenSpec workflow?',
    openapi: 'Include OpenAPI client generation and mocking?',
    playwright: 'Include Playwright end-to-end tests?',
    pages: 'Include GitHub Pages-compatible build support?',
    agents: 'Include Codex and Claude Code agent assets?',
    lintFileNaming: 'Include kebab-case file naming check script?',
    lintMaxLines: 'Include per-file line limit check script?',
  },

  featureLabels,

  baseFeatures: [
    'React 19 + TypeScript + Vite 8',
    'TanStack Router + TanStack Query',
    'Route-FSD starter structure',
    'Tailwind CSS v4 + Biome 2 + Vitest',
  ],

  yesHint: 'Y/n',
  noHint: 'y/N',

  scaffoldedSummary: ({ appName, dirRel }) => `Scaffolded ${appName} in ${dirRel}`,
  nextStepsHeader: 'Next steps:',
  nextStepsCd: (dirRel) => `  cd ${dirRel}`,
  nextStepsInstall: '  pnpm install',
  nextStepsDev: '  pnpm dev',

  readmeTemplate,
  agentsTemplate,
  claudeFile: '@AGENTS.md\n',

  lintScripts: {
    fileNamingPass: 'File naming check passed (kebab-case).',
    fileNamingFail: 'File naming check failed (kebab-case required):',
    maxLinesPass: (max) => `File line count check passed (limit ${max} lines).`,
    maxLinesFail: (max) => `File line count check failed (limit ${max} lines):`,
    maxLinesEntryTemplate: '- __FILE__ (__LINES__ lines)',
    fileNamingHeaderComment: '/** Match biome.json / check-max-lines ignore list */',
    routeFileComment:
      '/**\n * kebab-case naming rule:\n * - lowercase letters, digits, hyphens\n * - allows leading double underscore (TanStack Router convention, e.g. __root.tsx)\n * - allows .d suffix (e.g. vite-env.d.ts)\n * - allows compound suffixes such as .msw / .test / .spec\n */',
  },
};

export default messages;
