const featureLabels = {
  openspec: 'OpenSpec 工作流',
  openapi: 'OpenAPI / Orval / MSW / Prism',
  playwright: 'Playwright 端到端测试',
  pages: 'GitHub Pages 构建支持',
  agents: 'Codex 与 Claude Code 智能体资源',
  hooks: 'AI 代理钩子（pnpm 强制、上下文注入、边界检查）',
  lintFileNaming: 'kebab-case 文件命名检查脚本',
  lintMaxLines: '单文件行数上限检查脚本',
};

function readmeTemplate({ appName, packageName, featureList, commandLines, hooksSection }) {
  const hooksBlock = hooksSection ? `\n${hooksSection}\n` : '';
  return `# ${appName}

本项目由 \`create-tanvite\` 脚手架生成。

## 已包含特性

${featureList.map((item) => `- ${item}`).join('\n')}

## 快速开始

\`\`\`bash
${commandLines.join('\n')}
\`\`\`
${hooksBlock}
## 项目说明

- 包名：\`${packageName}\`
- 路由文件统一放在 \`src/routes\`
- 可复用的页面级 UI 模块放在 \`src/widgets\`
- 应用全局运行时逻辑放在 \`src/shared\`
- 通过 \`pnpm routes:generate\` 重新生成 TanStack Router 路由树
`;
}

function agentsTemplate() {
  return `# AGENTS.md

面向 Codex、Claude Code 等 AI 编码代理的项目说明。

## 工作约定

- 所有脚本与依赖管理统一使用 pnpm。
- 优先编辑源文件而非生成产物。
- \`src/routeTree.gen.ts\` 通过命令重新生成，不要手工编辑。
- 路由文件放在 \`src/routes\`，可复用 UI 放在 \`src/widgets\`，全局运行时逻辑放在 \`src/shared\`。
- 修改保持聚焦，并使用最小的有效命令进行验证。

## 验证命令

- 类型或 UI 改动：\`pnpm build\`
- Lint 与格式化：\`pnpm check\`
- 单元测试：\`pnpm test:run\`
`;
}

const messages = {
  promptLanguage: 'Language / 语言',
  promptDirectory: '项目目录',
  promptPackageName: '包名',
  promptAppTitle: '应用标题',
  promptPreset: '预设',
  promptMaxLines: '单文件行数上限（100 至 1000，含两端）',
  promptHooksAgents: '为哪些代理生成钩子？',
  hooksAgentsLabels: { claude: 'Claude Code', codex: 'Codex' },
  errorMaxLinesRange: '请输入一个介于 100 到 1000 之间的整数（含 100 与 1000）。',
  presetLabels: { minimal: '最小化', full: '完整版' },
  promptOverwrite: (dir) => `目录 ${dir} 非空，是否继续？`,
  errorTargetNotEmpty: (dir) => `目标目录非空：${dir}`,
  errorAborted: '已取消。',

  features: {
    openspec: '是否包含 OpenSpec 工作流？',
    openapi: '是否包含 OpenAPI 客户端生成与 Mock？',
    playwright: '是否包含 Playwright 端到端测试？',
    pages: '是否包含 GitHub Pages 构建支持？',
    agents: '是否包含 Codex 与 Claude Code 智能体资源？',
    hooks: '是否包含 AI 代理钩子（Claude Code / Codex）？',
    lintFileNaming: '是否包含 kebab-case 文件命名检查脚本？',
    lintMaxLines: '是否包含单文件行数上限检查脚本？',
  },

  featureLabels,

  baseFeatures: [
    'React 19 + TypeScript + Vite 8',
    'TanStack Router + TanStack Query',
    'Route-FSD 起步项目结构',
    'Tailwind CSS v4 + Biome 2 + Vitest',
  ],

  yesHint: 'Y/n',
  noHint: 'y/N',
  multiSelectHint: '逗号分隔的编号或名称',

  scaffoldedSummary: ({ appName, dirRel }) => `已在 ${dirRel} 中生成 ${appName}`,
  nextStepsHeader: '后续步骤：',
  nextStepsCd: (dirRel) => `  cd ${dirRel}`,
  nextStepsInstall: '  pnpm install',
  nextStepsDev: '  pnpm dev',

  readmeTemplate,
  agentsTemplate,
  claudeFile: '@AGENTS.md\n',

  lintScripts: {
    fileNamingPass: '文件命名检查通过（kebab-case）。',
    fileNamingFail: '文件命名检查失败（应使用 kebab-case）：',
    maxLinesPass: (max) => `文件行数检查通过（上限 ${max} 行）。`,
    maxLinesFail: (max) => `文件行数检查失败（上限 ${max} 行）：`,
    maxLinesEntryTemplate: '- __FILE__（__LINES__ 行）',
    fileNamingHeaderComment: '/** 与 biome.json / check-max-lines 保持一致的忽略列表 */',
    routeFileComment:
      '/**\n * kebab-case 命名规则：\n * - 允许小写字母、数字、短横线\n * - 允许前缀双下划线（TanStack Router 约定，如 __root.tsx）\n * - 允许 .d 后缀（如 vite-env.d.ts）\n * - 允许 .msw / .test / .spec 等复合后缀\n */',
  },

  hooks: {
    enforcePnpmBlocked: '已阻止：本项目统一使用 pnpm。请改用 pnpm。',
    protectFilesBlocked: (file) => `已阻止：${file} 是生成/受保护文件。请修改源文件而非生成产物。`,
    protectFilesPatterns: ['src/routeTree.gen.ts', 'src/shared/api/generated/', '.env', 'package-lock.json'],
    contextHeader: '[TanVite 项目规则]',
    contextRules: [
      '包管理器：仅使用 pnpm（禁止 npm/yarn/bun）',
      '格式化/Lint：使用 Biome（禁止 Prettier/ESLint）',
      '生成文件：src/routeTree.gen.ts 和 src/shared/api/generated/ 为自动生成 — 请勿手工编辑',
      '导入边界：shared < entities < features < widgets < routes < app（由 check:boundaries 强制）',
      '验证：代码改动后运行 pnpm check；运行时改动后运行 pnpm test:run && pnpm build',
      '提交风格：commitlint 强制使用约定式提交',
    ],
    stopBoundaryFail: '导入边界检查失败。运行 pnpm check:boundaries 查看违规。',
    notificationTitle: 'Claude Code',
    notificationBody: 'Claude Code 需要你的关注',
    readmeSection: {
      heading: '## 代理钩子',
      claude: {
        label: '### Claude Code',
        items: [
          '**pnpm 强制**（`PreToolUse`）：阻止 `npm`、`yarn`、`bun` 的安装命令。',
          '**文件保护**（`PreToolUse`）：阻止编辑生成/受保护文件（`src/routeTree.gen.ts`、`src/shared/api/generated/`、`.env`、`package-lock.json`）。',
          '**自动格式化**（`PostToolUse`）：每次文件编辑后自动运行 `biome check --write`。',
          '**上下文注入**（`SessionStart`）：会话启动及上下文压缩后注入项目规则。',
          '**边界检查**（`Stop`）：代理停止前运行 `pnpm check:boundaries`，防止遗留违规。',
          '**桌面通知**（`Notification`）：代理需要输入时发送 macOS 通知。',
        ],
      },
      codex: {
        label: '### Codex',
        items: [
          '**pnpm 强制**（`PreToolUse`）：阻止 `npm`、`yarn`、`bun` 的安装命令。',
          '**上下文注入**（`SessionStart`）：会话启动时注入项目规则。',
          '**边界检查**（`Stop`）：代理停止前运行 `pnpm check:boundaries`。',
        ],
      },
    },
  },
};

export default messages;
