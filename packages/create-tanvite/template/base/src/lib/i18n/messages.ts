export const messages = {
  en: {
    common: {
      languageLabel: 'Language',
      english: 'EN',
      chinese: '中文',
    },
    starter: {
      badge: '__APP_NAME__ Starter',
      title: 'Ship product code without rebuilding your frontend foundation.',
      body: '__APP_NAME__ starts with routing, query state, TypeScript, Tailwind CSS, testing, and quality tooling already wired. Optional capabilities like OpenSpec, OpenAPI, Playwright, GitHub Pages, and agent assets can be included when you scaffold the project.',
      runtimeTitle: 'Application runtime',
      runtimeBody:
        'Add product routes under src/routes, keep shared logic in src/lib, and use the generated route tree as the baseline for feature work.',
      contractTitle: 'API and contracts',
      contractBody:
        'Connect your backend through axios today, then layer in OpenAPI generation and mock tooling whenever your product needs it.',
      showcaseTitle: 'Quality workflow',
      showcaseBody:
        'Keep Biome, Vitest, CI, and optional Playwright coverage in place so the starter remains production-oriented as the codebase grows.',
      openShowcase: 'Start building',
      openRepository: 'Review commands',
    },
  },
  'zh-CN': {
    common: {
      languageLabel: '语言',
      english: 'EN',
      chinese: '中文',
    },
    starter: {
      badge: '__APP_NAME__ Starter',
      title: '不用重搭前端基线，直接开始交付业务代码。',
      body: '__APP_NAME__ 已经预置了路由、Query 状态、TypeScript、Tailwind CSS、测试和代码质量工具。OpenSpec、OpenAPI、Playwright、GitHub Pages 和 agent 资产等能力可以在初始化项目时按需选择。',
      runtimeTitle: '应用运行时',
      runtimeBody:
        '把业务路由放在 src/routes，共享逻辑放在 src/lib，并把生成出来的 route tree 作为功能开发的稳定基线。',
      contractTitle: '接口与契约',
      contractBody: '你可以先直接使用 axios 接入后端，再在需要时叠加 OpenAPI 生成和 mock 工具链。',
      showcaseTitle: '质量工作流',
      showcaseBody:
        '保留 Biome、Vitest、CI 和可选的 Playwright 校验，让 starter 在代码规模增长后依然保持面向生产的约束。',
      openShowcase: '开始开发',
      openRepository: '查看命令',
    },
  },
} as const;

type MessageTree = (typeof messages)['en'];

type NestedMessageKey<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${NestedMessageKey<T[K]>}`;
}[keyof T & string];

export type MessageKey = NestedMessageKey<MessageTree>;
