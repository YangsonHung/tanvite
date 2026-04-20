export const messages = {
  en: {
    common: {
      languageLabel: 'Language',
      english: 'EN',
      chinese: '中文',
    },
    starter: {
      badge: '__APP_NAME__ Starter',
      title: 'Ship product code on top of a Route-FSD baseline.',
      body: '__APP_NAME__ starts with React 19, Vite 8, TanStack Router, Tailwind CSS v4, Biome 2, testing, and shared agent assets already aligned. Optional capabilities like OpenSpec, OpenAPI, Playwright, GitHub Pages, and agent assets can be included when you scaffold the project.',
      runtimeTitle: 'Route runtime',
      runtimeBody:
        'Define route entries in src/routes, move reusable UI into src/widgets, and keep shared runtime concerns under src/shared while the route tree stays generated.',
      contractTitle: 'Contract stack',
      contractBody:
        'Connect your backend through axios today, then generate clients, hooks, and mock handlers into src/shared/api/generated when your product needs contracts.',
      showcaseTitle: 'Quality workflow',
      showcaseBody:
        'Keep Biome 2, Vitest, CI, optional Playwright coverage, and Route-FSD boundary checks in place as the codebase grows.',
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
      title: '在 Route-FSD 基线上直接开始交付业务代码。',
      body: '__APP_NAME__ 已经预置了 React 19、Vite 8、TanStack Router、Tailwind CSS v4、Biome 2、测试链路和共享 agent 资产。OpenSpec、OpenAPI、Playwright、GitHub Pages 等能力可以在初始化项目时按需选择。',
      runtimeTitle: '路由运行时',
      runtimeBody:
        '把路由入口放在 src/routes，把可复用页面区块沉淀到 src/widgets，把共享运行时能力放在 src/shared，并把生成出来的 route tree 作为稳定基线。',
      contractTitle: '契约栈',
      contractBody:
        '你可以先直接使用 axios 接入后端，再在需要时把客户端、hooks 和 mock handlers 生成到 src/shared/api/generated。',
      showcaseTitle: '质量工作流',
      showcaseBody:
        '保留 Biome 2、Vitest、CI、可选的 Playwright 校验和 Route-FSD 边界检查，让 starter 在代码规模增长后依然保持面向生产的约束。',
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
