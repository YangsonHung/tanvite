export const messages = {
  en: {
    common: {
      languageLabel: "Language",
      english: "EN",
      chinese: "中文",
    },
    starter: {
      badge: "TanVite Starter",
      title: "Keep product code in src. Keep the public showcase outside of it.",
      body:
        "This starter entry stays intentionally neutral. Routing, query client, OpenAPI tooling, OpenSpec workflow, testing, and shared runtime utilities remain in the starter app. The marketing landing page and guide now live under the separate showcase app.",
      runtimeTitle: "Starter runtime",
      runtimeBody:
        "Add product routes under src/routes, keep shared app logic in src/lib, and use the generated route tree as the application baseline.",
      contractTitle: "Contract workflow",
      contractBody:
        "Validate OpenAPI, generate API clients, and keep the application wired to the existing Query and mock infrastructure.",
      showcaseTitle: "Public showcase",
      showcaseBody:
        "The landing page and guide are isolated in showcase/ and published through pnpm build:pages.",
      openShowcase: "Open showcase",
      openRepository: "Open repository",
    },
  },
  "zh-CN": {
    common: {
      languageLabel: "语言",
      english: "EN",
      chinese: "中文",
    },
    starter: {
      badge: "TanVite Starter",
      title: "业务代码放在 src，公开展示站独立放在外部。",
      body:
        "这个 starter 入口保持中性。路由、Query Client、OpenAPI 工具链、OpenSpec 工作流、测试能力和共享运行时工具仍然在主应用里，营销落地页和指南则被拆到独立的 showcase 应用中。",
      runtimeTitle: "Starter 运行时",
      runtimeBody:
        "把业务路由放在 src/routes，共享逻辑放在 src/lib，并以生成出来的 route tree 作为应用基线。",
      contractTitle: "契约工作流",
      contractBody:
        "校验 OpenAPI、生成 API 客户端，并让应用继续复用现有的 Query 与 Mock 基础设施。",
      showcaseTitle: "公开展示站",
      showcaseBody: "落地页和指南被隔离在 showcase/ 下，并通过 pnpm build:pages 发布。",
      openShowcase: "打开展示站",
      openRepository: "打开仓库",
    },
  },
} as const;

type MessageTree = (typeof messages)["en"];

type NestedMessageKey<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${NestedMessageKey<T[K]>}`;
}[keyof T & string];

export type MessageKey = NestedMessageKey<MessageTree>;
