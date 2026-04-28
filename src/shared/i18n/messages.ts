export const messages = {
  en: {
    common: {
      languageLabel: 'Language',
      english: 'EN',
      chinese: '中文',
    },
    starter: {
      badge: 'TanVite Starter',
      title: 'Ship product code on top of a complete FSD baseline.',
      body: 'This starter entry stays intentionally neutral. React 19, Vite 8, TanStack Router, Tailwind CSS v4, Biome 2, Steiger, testing, and shared runtime utilities stay aligned inside the app, while the public showcase remains isolated outside of src.',
      runtimeTitle: 'FSD runtime',
      runtimeBody:
        'Keep TanStack route entries in src/app/routes, compose screens in src/pages, move reusable UI into src/widgets, and keep shared runtime concerns under src/shared.',
      contractTitle: 'Contract stack',
      contractBody:
        'Validate OpenAPI, generate API clients and hooks into src/shared/api/generated, and keep the application wired to the existing Query and mock infrastructure.',
      showcaseTitle: 'Quality workflow',
      showcaseBody:
        'Keep Biome 2, Vitest, CI, optional Playwright coverage, and Steiger-powered FSD checks in place as the codebase grows.',
      openShowcase: 'Open showcase',
      openRepository: 'Open repository',
    },
  },
  'zh-CN': {
    common: {
      languageLabel: '语言',
      english: 'EN',
      chinese: '中文',
    },
    starter: {
      badge: 'TanVite Starter',
      title: '在完整 FSD 基线上直接开始交付业务代码。',
      body: '这个 starter 入口保持中性。React 19、Vite 8、TanStack Router、Tailwind CSS v4、Biome 2、Steiger、测试能力和共享运行时工具在主应用里保持一致，公开展示站则继续隔离在 src 之外。',
      runtimeTitle: 'FSD 运行时',
      runtimeBody:
        '把 TanStack 路由入口放在 src/app/routes，把页面组合放在 src/pages，把可复用页面区块沉淀到 src/widgets，把共享运行时能力放在 src/shared。',
      contractTitle: '契约栈',
      contractBody:
        '校验 OpenAPI、把 API 客户端与 hooks 生成到 src/shared/api/generated，并让应用继续复用现有的 Query 与 Mock 基础设施。',
      showcaseTitle: '质量工作流',
      showcaseBody:
        '保留 Biome 2、Vitest、CI、可选的 Playwright 校验和基于 Steiger 的 FSD 检查，让 starter 在代码规模增长后依然保持面向生产的约束。',
      openShowcase: '打开展示站',
      openRepository: '打开仓库',
    },
  },
} as const;

type MessageTree = (typeof messages)['en'];

type NestedMessageKey<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${NestedMessageKey<T[K]>}`;
}[keyof T & string];

export type MessageKey = NestedMessageKey<MessageTree>;
