export const showcaseMessages = {
  en: {
    common: {
      english: 'EN',
      chinese: '中文',
    },
    controls: {
      switchToEnglish: 'Switch language to English',
      switchToChinese: '切换语言为中文',
      switchToLightTheme: 'Switch to light theme',
      switchToDarkTheme: 'Switch to dark theme',
      repoLabel: 'Open GitHub repository',
    },
    home: {
      heroBadge: 'AI-ready Web Starter',
      heroTitle:
        'Build sharp React apps with specs, shared agent skills, contracts, and testing already wired.',
      heroBody:
        'TanVite is a focused front-end baseline for teams that want to start from `npm create tanvite@latest` and still keep OpenSpec, shared agent skills, React 19, TanStack Router, TanStack Query, OpenAPI tooling, Tailwind CSS, Biome, Vitest, and Playwright aligned without dragging the full maintenance repository into every new app.',
      primaryCta: 'Explore the stack',
      guideCta: 'Read the guide',
      supportCta: 'Codex + Claude Code',
      startHere: 'Start here',
      toolchainLabel: 'Toolchain',
      toolchainTitle: 'Production-minded defaults',
      workflowLabel: 'Workflow',
      workflowTitle: 'Starter mechanics without starter chaos',
      commandsLabel: 'CLI Quickstart',
      commandsTitle: 'Commands you actually need on day one',
      snapshotLabel: 'Project Snapshot',
      snapshotTitle: 'File layout that stays legible as the app grows',
      snapshotBody:
        'The published scaffolder, starter template, spec artifacts, routes, shared utilities, and generated contracts are separated clearly, so starter users get a curated app while maintainers keep the full repository context.',
      codePreview: `src/
├── routes/
│   ├── __root.tsx
│   └── index.tsx
├── lib/
│   ├── api/
│   ├── query-client.ts
│   └── utils.ts
└── routeTree.gen.ts

openspec/
├── changes/
├── specs/
└── config.yaml

.agents/
└── skills/
    ├── frontend-design/
    ├── react-expert/
    └── webapp-testing/

packages/
└── create-tanvite/
    ├── bin/
    ├── src/
    └── template/

npm create tanvite@latest
pnpm openapi:generate
pnpm routes:generate
pnpm dev`,
      stats: {
        item1: {
          index: '01',
          title: 'React 19 + TypeScript',
          body: 'Current React APIs with a strict TS baseline.',
        },
        item2: {
          index: '02',
          title: 'OpenSpec + Agent Skills',
          body: 'Spec-driven change tracking, .agents/skills for Codex, and .claude/skills for Claude Code are prepared together.',
        },
        item3: {
          index: '03',
          title: 'OpenAPI + Testing',
          body: 'Contract generation, mock workflows, unit tests, and E2E checks are already part of the flow.',
        },
      },
      toolchain: {
        item1: {
          label: 'Spec',
          title: 'OpenSpec',
          body: 'Spec-driven change proposals and baseline specs live inside the repository from day one.',
        },
        item2: {
          label: 'Skills',
          title: '.agents/skills + .claude/skills',
          body: 'Codex reads .agents/skills, while Claude Code uses .claude/skills and OPSX commands for design, review, testing, React, TypeScript, and git workflows.',
        },
        item3: {
          label: 'Routing',
          title: 'TanStack Router',
          body: 'File-based routes with generated route tree support.',
        },
        item4: {
          label: 'Data',
          title: 'TanStack Query + OpenAPI',
          body: 'Shared query defaults plus generated API hooks, clients, and mocks.',
        },
        item5: {
          label: 'Quality',
          title: 'Biome + Playwright',
          body: 'Linting, formatting, unit tests, E2E checks, and mock flows are already scripted.',
        },
      },
      workflow: {
        item1: {
          title: 'Bootstrap',
          body: 'Scaffold a new project with npm create tanvite@latest, then install dependencies and start the Vite dev server with one predictable path.',
        },
        item2: {
          title: 'Specify and build',
          body: 'Track changes in openspec/, reuse Codex skills from .agents/skills, keep Claude Code assets in .claude/skills and .claude/commands/opsx, add routes under src/routes, and regenerate API clients from OpenAPI.',
        },
        item3: {
          title: 'Verify and ship',
          body: 'Run Biome, unit tests, Playwright, and mock flows before production builds so starter quality stays enforceable.',
        },
      },
      commands: {
        item1: { label: 'Create', command: 'npm create tanvite@latest' },
        item2: { label: 'Develop', command: 'pnpm dev' },
        item3: { label: 'OpenSpec', command: 'pnpm openspec:list' },
        item4: { label: 'OpenAPI', command: 'pnpm openapi:generate' },
        item5: { label: 'Generate routes', command: 'pnpm routes:generate' },
        item6: { label: 'Test once', command: 'pnpm test:run' },
        item7: { label: 'Build', command: 'pnpm build' },
        item8: { label: 'E2E', command: 'pnpm test:e2e' },
      },
    },
    guide: {
      pageLabel: 'TanVite Guide',
      title: 'Lightweight docs for a spec-driven, AI-ready starter',
      titleSecondary: '',
      backToLanding: 'Back to landing',
      overviewLabel: 'Overview',
      overviewBody:
        'Use this page as the fast path into TanVite. It shows the create-command onboarding path, the starter positioning, .agents/skills for Codex, .claude/skills and OPSX commands for Claude Code, backend contract wiring, and the boundary between the generated app and the maintainer-only source repository.',
      commandsLabel: 'Commands',
      commandsTitle: 'Starter commands',
      linksLabel: 'Project links',
      linksTitle: 'Open the project, the code, or the issue tracker',
      linksBody:
        'Start with the public site for the polished overview, use the create command for new product work, and open the repository only when you want to maintain TanVite itself or contribute back.',
      openSite: 'Open site',
      openRepository: 'Open repository',
      reportIssue: 'Report an issue',
      sections: {
        gettingStarted: {
          title: 'Getting started',
          point1: 'Create a new app with npm create tanvite@latest my-app.',
          point2:
            'Change into the generated project, run pnpm install, then copy .env.example to .env.local when you need OpenAPI tooling.',
          point3:
            'Validate the contract with pnpm openapi:check and generate clients with pnpm openapi:generate.',
          point4: 'Start the local development environment with pnpm dev.',
          point5: 'Use pnpm build for the standard production bundle.',
          point6:
            'Treat the TanVite repository as maintainer-only source for the starter, scaffolder, and public showcase.',
        },
        stack: {
          title: 'Included stack',
          point1: 'React 19 + TypeScript + Vite 5',
          point2:
            'OpenSpec in spec-driven mode, .agents/skills for Codex, and .claude/skills for Claude Code',
          point3:
            'Codex and Claude Code support on top of TanStack Router, TanStack Query, Orval, MSW, Prism, Biome, Vitest, and Playwright',
        },
        workflow: {
          title: 'Spec and agent workflow',
          point1:
            'Track proposals under openspec/, keep Codex skills under .agents/skills, keep Claude Code skills under .claude/skills, and version them with the project.',
          point2:
            'Use Codex skills plus Claude Code skills and OPSX commands for frontend design, code review, browser testing, React and TypeScript guidance, and git delivery.',
          point3:
            'Regenerate OpenAPI clients on demand and keep product code on top of the existing routing, styling, testing, and CI baseline.',
        },
      },
      commands: {
        item1: { label: 'Create', command: 'npm create tanvite@latest' },
        item2: { label: 'OpenSpec', command: 'pnpm openspec:list' },
        item3: { label: 'Check schema', command: 'pnpm openapi:check' },
        item4: { label: 'Generate API', command: 'pnpm openapi:generate' },
        item5: { label: 'Develop', command: 'pnpm dev' },
        item6: { label: 'Mock in app', command: 'pnpm dev:mock' },
      },
    },
  },
  'zh-CN': {
    common: {
      english: 'EN',
      chinese: '中文',
    },
    controls: {
      switchToEnglish: 'Switch language to English',
      switchToChinese: '切换语言为中文',
      switchToLightTheme: '切换到亮色主题',
      switchToDarkTheme: '切换到暗色主题',
      repoLabel: '打开 GitHub 仓库',
    },
    home: {
      heroBadge: 'AI 协作型 Web Starter',
      heroTitle: '把规格、共享技能、接口契约和测试链路一次性接好的 React 项目基线。',
      heroBody:
        'TanVite 是一个聚焦型前端工程基线，适合希望从 `npm create tanvite@latest` 启动新项目，同时又把 OpenSpec、共享 agent 技能、React 19、TanStack Router、TanStack Query、OpenAPI 工具链、Tailwind CSS、Biome、Vitest 和 Playwright 一起用起来的团队，而不是把整个维护仓库复制进每一个新应用。',
      primaryCta: '查看技术栈',
      guideCta: '阅读指南',
      supportCta: '支持 Codex / Claude Code',
      startHere: '从这里开始',
      toolchainLabel: '工具链',
      toolchainTitle: '面向生产环境的默认配置',
      workflowLabel: '工作流',
      workflowTitle: '保留工程秩序，不保留模板噪音',
      commandsLabel: 'CLI 快速开始',
      commandsTitle: '第一天真正会用到的命令',
      snapshotLabel: '项目快照',
      snapshotTitle: '随着项目变大依然清晰可读的文件结构',
      snapshotBody:
        '已发布的脚手架、starter 模板、规格资产、路由、公共工具和生成产物分层清晰，让 starter 使用者拿到整理后的应用骨架，同时维护者继续保有完整仓库上下文。',
      codePreview: `src/
├── routes/
│   ├── __root.tsx
│   └── index.tsx
├── lib/
│   ├── api/
│   ├── query-client.ts
│   └── utils.ts
└── routeTree.gen.ts

openspec/
├── changes/
├── specs/
└── config.yaml

.agents/
└── skills/
    ├── frontend-design/
    ├── react-expert/
    └── webapp-testing/

packages/
└── create-tanvite/
    ├── bin/
    ├── src/
    └── template/

npm create tanvite@latest
pnpm openapi:generate
pnpm routes:generate
pnpm dev`,
      stats: {
        item1: {
          index: '01',
          title: 'React 19 + TypeScript',
          body: '基于当前 React API 与严格 TypeScript 约束。',
        },
        item2: {
          index: '02',
          title: 'OpenSpec + 技能层',
          body: 'Spec-driven 变更管理、面向 Codex 的 .agents/skills 与面向 Claude Code 的 .claude/skills 已经一并准备好。',
        },
        item3: {
          index: '03',
          title: 'OpenAPI + 测试',
          body: '接口生成、Mock 工作流、单测和 E2E 校验已经纳入仓库默认链路。',
        },
      },
      toolchain: {
        item1: {
          label: '规格',
          title: 'OpenSpec',
          body: '变更提案与基础规格从第一天开始就沉淀在仓库内部。',
        },
        item2: {
          label: '技能',
          title: '.agents/skills + .claude/skills',
          body: 'Codex 读取 .agents/skills，Claude Code 使用 .claude/skills 与 OPSX commands，覆盖前端设计、评审、测试、React、TypeScript 和 Git 工作流。',
        },
        item3: {
          label: '路由',
          title: 'TanStack Router',
          body: '文件路由与生成式路由树已经接好。',
        },
        item4: {
          label: '数据',
          title: 'TanStack Query + OpenAPI',
          body: '共享 Query 默认配置，以及基于契约生成的 API hooks、client 和 mock。',
        },
        item5: {
          label: '质量',
          title: 'Biome + Playwright',
          body: 'Lint、格式化、单测、E2E 与 mock 工作流都已经脚本化。',
        },
      },
      workflow: {
        item1: {
          title: '初始化',
          body: '先通过 npm create tanvite@latest 初始化项目，再安装依赖并启动 Vite 开发服务器，让起步路径保持可预测。',
        },
        item2: {
          title: '规格到实现',
          body: '在 openspec/ 中跟踪变更，复用 .agents/skills 里的 Codex 技能，维护 .claude/skills 与 .claude/commands/opsx 里的 Claude Code 资产，在 src/routes 下扩展页面，并按需重新生成 OpenAPI 客户端。',
        },
        item3: {
          title: '验证与交付',
          body: '在生产构建前运行 Biome、单测、Playwright 和 mock 流程，让 starter 的质量基线真正可执行。',
        },
      },
      commands: {
        item1: { label: '创建', command: 'npm create tanvite@latest' },
        item2: { label: '开发', command: 'pnpm dev' },
        item3: { label: '查看 OpenSpec', command: 'pnpm openspec:list' },
        item4: { label: '生成 OpenAPI', command: 'pnpm openapi:generate' },
        item5: { label: '生成路由', command: 'pnpm routes:generate' },
        item6: { label: '执行单测', command: 'pnpm test:run' },
        item7: { label: '构建', command: 'pnpm build' },
        item8: { label: 'E2E', command: 'pnpm test:e2e' },
      },
    },
    guide: {
      pageLabel: 'TanVite 指南',
      title: '快速了解 TanVite',
      titleSecondary: '定位、工作流与接入方式',
      backToLanding: '返回首页',
      overviewLabel: '概览',
      overviewBody:
        '这里可以快速看到 TanVite 的 create 命令初始化路径、starter 定位、面向 Codex 的 .agents/skills、面向 Claude Code 的 .claude/skills 与 OPSX commands、契约接入方式，以及生成项目与仅供维护者使用的源码仓库之间的边界。',
      commandsLabel: '命令',
      commandsTitle: 'Starter 常用命令',
      linksLabel: '项目链接',
      linksTitle: '打开站点、源码仓库或问题跟踪',
      linksBody:
        '先看展示站掌握整体定位，用 create 命令启动新项目；只有在需要维护 TanVite 本体或参与贡献时，才进入源码仓库。',
      openSite: '打开站点',
      openRepository: '打开仓库',
      reportIssue: '提交问题',
      sections: {
        gettingStarted: {
          title: '快速上手',
          point1: '使用 npm create tanvite@latest my-app 创建新项目。',
          point2:
            '进入生成后的项目，运行 pnpm install；当你需要 OpenAPI 工具链时，再把 .env.example 复制为 .env.local。',
          point3: '先执行 pnpm openapi:check 校验契约，再运行 pnpm openapi:generate 生成客户端。',
          point4: '使用 pnpm dev 启动本地开发环境。',
          point5: '常规生产构建使用 pnpm build。',
          point6: '把 TanVite 仓库视为仅供维护 starter、脚手架和公开 showcase 的源码仓库。',
        },
        stack: {
          title: '内置能力',
          point1: 'React 19 + TypeScript + Vite 5',
          point2:
            'spec-driven 模式的 OpenSpec、面向 Codex 的 .agents/skills 与面向 Claude Code 的 .claude/skills',
          point3:
            '在 TanStack Router、TanStack Query、Orval、MSW、Prism、Biome、Vitest 和 Playwright 之上支持 Codex 与 Claude Code',
        },
        workflow: {
          title: '规格与技能工作流',
          point1:
            '在 openspec/ 中管理提案，在 .agents/skills 中维护 Codex 技能，在 .claude/skills 中维护 Claude Code 技能，并让它们一起进入版本控制。',
          point2:
            '把 Codex 技能、Claude Code 技能和 OPSX commands 用于前端设计、代码审查、浏览器测试、React / TypeScript 专项支持和 Git 交付流程。',
          point3:
            '按需重新生成 OpenAPI 客户端，同时让业务代码继续建立在现有路由、样式、测试和 CI 基线上。',
        },
      },
      commands: {
        item1: { label: '创建', command: 'npm create tanvite@latest' },
        item2: { label: '查看 OpenSpec', command: 'pnpm openspec:list' },
        item3: { label: '校验契约', command: 'pnpm openapi:check' },
        item4: { label: '生成 API', command: 'pnpm openapi:generate' },
        item5: { label: '开发', command: 'pnpm dev' },
        item6: { label: '应用内 Mock', command: 'pnpm dev:mock' },
      },
    },
  },
} as const;

type ShowcaseMessageTree = (typeof showcaseMessages)['en'];

type NestedShowcaseMessageKey<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${NestedShowcaseMessageKey<T[K]>}`;
}[keyof T & string];

export type ShowcaseMessageKey = NestedShowcaseMessageKey<ShowcaseMessageTree>;
