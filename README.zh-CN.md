# ⚡ TanVite

[![React 19](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](#-技术栈)
[![TanStack Router](https://img.shields.io/badge/TanStack-Router-0f766e?logo=reactrouter&logoColor=white)](#-技术栈)
[![TanStack Query](https://img.shields.io/badge/TanStack-Query-b91c1c?logo=reactquery&logoColor=white)](#-技术栈)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](#-技术栈)
[![MIT License](https://img.shields.io/badge/License-MIT-16a34a)](#-许可证)
[![Pages Deploy](https://github.com/YangsonHung/tanvite/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/YangsonHung/tanvite/actions/workflows/deploy-pages.yml)
[![CI Status](https://github.com/YangsonHung/tanvite/actions/workflows/ci.yml/badge.svg)](https://github.com/YangsonHung/tanvite/actions/workflows/ci.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-222222?logo=githubpages&logoColor=white)](https://yangsonhung.github.io/tanvite/)

[English](README.md) | **中文**

TanVite 是一个面向生产环境的 React 19 starter 系统，定位为可复用的高标准前端工程基线，适合严肃的产品研发场景。它将可发布的 `create-tanvite` 脚手架、Vite、TypeScript、OpenSpec、面向 Codex 的 `.agents/skills`、面向 Claude Code 的 `.claude/skills` 与 OPSX commands、TanStack Router、TanStack Query、OpenAPI 工具链、Tailwind CSS、自动化测试、代码质量约束以及 GitHub Pages 展示能力整合为一套打磨完整、适合新项目直接起步的现代前端最佳实践组合，并把 spec-driven 工作流和 AI 辅助研发能力一起带入仓库基线。

![TanVite Screenshot](assets/screenshots/tanvite-home-zh.png)

## 🛰️ 为什么选择 TanVite

- 直接从现代 React 19 starter 开始，而不是手动拼装工程体系
- 从第一天开始就接入 OpenSpec，把变更提案和基础规格收进仓库内管理
- 直接使用面向 Codex 的 `.agents/skills` 以及面向 Claude Code 的 `.claude/skills` 与 OPSX commands 处理设计、代码审查、测试、Git 工作流和浏览器自动化
- 从第一条提交开始统一路由、数据层、样式、测试和 CI 约定
- 直接在一套已经统一路由、数据层、样式、测试与 CI 约定的前端工程基线上开展产品开发
- 在同一套仓库里同时承载 OpenSpec 驱动的需求流和 OpenAPI 驱动的接口生成流
- 复用已经完成的落地页和 guide 页面作为公开项目展示入口
- 使用 `npm create tanvite@latest` / `pnpm create tanvite@latest` / `yarn create tanvite@latest` 启动新项目，而不是复制整个维护仓库

## 🚀 创建项目

当你要创建一个新的 TanVite 项目时，优先使用已发布的脚手架。

任选你使用的包管理器：

```bash
# npm
npm create tanvite@latest my-app

# pnpm
pnpm create tanvite@latest my-app

# yarn
yarn create tanvite@latest my-app
```

然后安装依赖并启动开发服务器：

```bash
cd my-app
pnpm install
pnpm dev
```

打开 `http://localhost:4319`。

可选示例（`npm` 需要使用 `--` 分隔参数，`pnpm` / `yarn` 可直接传入）：

```bash
# npm
npm create tanvite@latest my-app -- --preset full
npm create tanvite@latest my-app -- --with openspec,openapi,playwright,pages,agents
npm create tanvite@latest my-app -- --hooks --hooks-agents claude,codex

# pnpm
pnpm create tanvite@latest my-app --preset full
pnpm create tanvite@latest my-app --with openspec,openapi,playwright,pages,agents
pnpm create tanvite@latest my-app --hooks --hooks-agents claude,codex

# yarn
yarn create tanvite@latest my-app --preset full
yarn create tanvite@latest my-app --with openspec,openapi,playwright,pages,agents
yarn create tanvite@latest my-app --hooks --hooks-agents claude,codex
```

### 🧭 下一步

1. 替换首页文案和品牌信息。
2. 在 `src/app/routes` 下添加或删除 TanStack 路由入口。
3. 在 `src/pages` 中组合页面，再把可复用页面区块沉淀到 `src/widgets`，把共享运行时能力沉淀到 `src/shared`。
4. 保留现有测试和 CI 作为项目基线。

## 🛠️ 仅维护者

源码仓库用于维护 TanVite 本体，包括 `create-tanvite` 脚手架、starter 模板和公开展示站。产品团队要启动新项目时，应使用 `npm create tanvite@latest`（或 `pnpm create tanvite@latest` / `yarn create tanvite@latest`）。

### 发布 `create-tanvite`

在 `packages/create-tanvite` 下发布，并在发布前先校验 tarball 内容。

```bash
cd packages/create-tanvite
npm version patch --no-git-tag-version
TARBALL=$(pnpm pack | tail -n 1)
tar -tzf "$TARBALL" | grep -E "template/base/(gitignore|\\.gitignore|src/routeTree\\.gen\\.ts)"
pnpm publish --access public --no-git-checks --registry=https://registry.npmjs.org
```

发布后校验 npm dist-tags：

```bash
npm view create-tanvite version dist-tags --json --registry=https://registry.npmjs.org
```

## 💠 特性

- 用于生成整理后 starter 的 `create-tanvite` 脚手架
- React 19 + TypeScript + Vite 8 starter 基线
- 已初始化为 `spec-driven` 模式的 OpenSpec 工作区
- 已集成面向 Codex 的 `.agents/skills`，以及面向 Claude Code 的 `.claude/skills` 与 OPSX commands，覆盖设计、评审、测试、提交流程和浏览器自动化
- TanStack Router 文件路由
- TanStack Query 数据层
- 通过 Orval 生成基于 OpenAPI 的 client、hooks 和 mock
- Tailwind CSS 与 shadcn/ui 兼容工具链
- 使用 Biome 进行 lint 和格式化
- 使用 Vitest + Testing Library 进行单元测试
- 使用 Playwright 进行 E2E 测试
- 使用 MSW 与 Prism 提供浏览器 mock 和独立 mock server 工作流
- 使用 Husky + lint-staged + commitlint 约束提交流程
- 基于 Steiger 的 FSD 结构和导入边界检查
- AI 代理钩子（支持 Claude Code 与 Codex）— pnpm 强制、文件保护、自动格式化、上下文注入、FSD 检查和桌面通知

## 🧩 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | React 19 |
| 语言 | TypeScript |
| 构建工具 | Vite |
| 包管理器 | pnpm |
| 规格工作流 | OpenSpec |
| AI 协作层 | `.agents/skills`、`.claude/skills`、Codex、Claude Code、OPSX commands、代理钩子 |
| 路由 | TanStack Router |
| 数据获取 | TanStack Query |
| API 契约 | Orval、OpenAPI |
| Mock | MSW、Prism |
| 样式 | Tailwind CSS |
| UI 工具 | shadcn/ui、class-variance-authority、tailwind-merge |
| 代码质量 | Biome |
| 单元测试 | Vitest、Testing Library、jsdom |
| E2E 测试 | Playwright |
| Git Hooks | Husky、lint-staged |

## 🖥️ 环境要求

- Node.js 20+
- pnpm 10+

## 💻 常用脚本

```bash
pnpm routes:generate   # 生成 TanStack Router 路由树
pnpm openapi:check     # 校验远端 OpenAPI 文档
pnpm openapi:generate  # 生成 API client、React Query hooks 与 MSW mocks
pnpm openapi:mock      # 启动独立 Prism mock server
pnpm dev               # 启动 Vite 开发服务器
pnpm dev:mock          # 以启用 MSW 浏览器 mock 的方式启动 Vite
pnpm dev:showcase      # 本地启动隔离后的展示站
pnpm build             # 构建应用到 dist/
pnpm build:pages       # 构建展示站到 dist-pages/
pnpm preview           # 在 http://localhost:4419 预览 dist/
pnpm preview:pages     # 在 http://localhost:4419 预览 dist-pages/

pnpm test              # 以 watch 模式运行 Vitest
pnpm test:run          # 单次运行单元测试
pnpm test:coverage     # 生成覆盖率报告
pnpm test:e2e          # 运行 Playwright 测试
pnpm test:e2e:ui       # 以 UI 模式运行 Playwright

pnpm check             # 运行 Biome 检查并自动修复
pnpm lint              # 运行 Biome lint
pnpm format            # 运行 Biome format
```

## 🌐 本地预览 GitHub Pages

1. 构建 Pages 产物。
2. 启动 Pages 预览服务。
3. 打开项目站点路径。

```bash
pnpm build:pages
pnpm preview:pages
```

打开 `http://localhost:4419/tanvite/`。

## 🧠 OpenAPI 工作流

1. 将 `.env.example` 复制为 `.env.local`。
2. 把 `OPENAPI_SCHEMA_URL` 改成你的后端 Swagger/OpenAPI 地址。
3. 先校验契约，再生成 API 层代码。
4. 根据需要选择 MSW 或独立 Prism mock server 进行开发。

```bash
cp .env.example .env.local
pnpm openapi:check
pnpm openapi:generate
pnpm dev:mock
```

如果你需要单独的 mock 服务，使用 `pnpm openapi:mock`，默认地址是 `http://127.0.0.1:4010`。

## 🧭 OpenSpec 工作流

这个仓库已经完成 OpenSpec 初始化，当前使用的是 `spec-driven` schema。

- 活跃中的变更提案放在 `openspec/changes/`
- 基础规格放在 `openspec/specs/`
- 仓库级 OpenSpec 配置位于 `openspec/config.yaml`

常用命令：

```bash
pnpm openspec:list
pnpm openspec:new <name>
pnpm openspec:validate
pnpm openspec:spec:list
```

## 🤖 已集成技能

当前工作区内置了面向 Codex 的技能目录 `.agents/skills/`、面向 Claude Code 的技能目录 `.claude/skills/`，以及 OpenSpec 命令资产 `.claude/commands/opsx/`。

- `openspec-*` 技能与 `opsx/*` 命令用于 OpenSpec 变更的探索、提案、应用与归档
- `frontend-design`、`ui-ux-pro-max`、`web-design-guidelines` 用于产品界面设计与视觉审查
- `frontend-code-review`、`code-review-expert` 用于变更评审和代码审查
- `react-expert`、`typescript-expert` 提供框架与语言层面的专项支持
- `agent-browser`、`webapp-testing` 用于浏览器自动化和本地 Web 应用验证
- `git-commit`、`git-pushing` 用于规范化提交与推送流程

## 🪝 代理钩子

通过 `create-tanvite` 启用 `hooks` 特性后，生成的项目会自带面向 Claude Code 和/或 Codex 的确定性运行时钩子。这些钩子会自动执行项目规则，而不依赖 AI 记住它们。

### Claude Code

| 钩子 | 事件 | 作用 |
| --- | --- | --- |
| pnpm 强制 | `PreToolUse` (Bash) | 阻止 `npm`、`yarn`、`bun` 安装命令 |
| 文件保护 | `PreToolUse` (Edit\|Write) | 阻止编辑 `src/routeTree.gen.ts`、`src/shared/api/generated/`、`.env`、`package-lock.json` |
| 自动格式化 | `PostToolUse` (Edit\|Write) | 每次文件编辑后自动运行 `biome check --write` |
| 上下文注入 | `SessionStart` | 会话启动及上下文压缩后注入项目规则 |
| FSD 检查 | `Stop` | 代理停止前通过 `pnpm check:boundaries` 运行 Steiger |
| 桌面通知 | `Notification` | 代理需要输入时发送 macOS 通知 |

### Codex

| 钩子 | 事件 | 作用 |
| --- | --- | --- |
| pnpm 强制 | `PreToolUse` (Bash) | 阻止 `npm`、`yarn`、`bun` 安装命令 |
| 上下文注入 | `SessionStart` | 会话启动时注入项目规则 |
| FSD 检查 | `Stop` | 代理停止前通过 `pnpm check:boundaries` 运行 Steiger |

脚手架阶段可通过 `--hooks --hooks-agents claude`、`--hooks --hooks-agents codex` 或 `--hooks --hooks-agents claude,codex` 选择代理。`full` 预设默认为两个代理同时启用钩子。

## 🗺️ 项目结构

```text
src/
├── routeTree.gen.ts
├── app/
│   ├── main.tsx
│   ├── providers/
│   ├── routes/
│   │   ├── __root.tsx
│   │   └── index.tsx
│   ├── router.tsx
│   └── styles/
├── entities/
├── features/
├── pages/
│   └── home/
├── shared/
│   ├── api/
│   ├── i18n/
│   ├── lib/
│   ├── model/
│   └── ui/
├── widgets/
│   └── starter-home/
└── vite-env.d.ts

openspec/
├── changes/
├── specs/
└── config.yaml

.agents/
└── skills/
    ├── agent-browser/
    ├── frontend-design/
    ├── openspec-propose/
    ├── react-expert/
    ├── typescript-expert/
    └── webapp-testing/

.claude/
└── commands/
    └── opsx/

showcase/
├── index.html
└── src/
    ├── app.tsx
    ├── components/
    ├── lib/
    ├── main.tsx
    └── styles.css

packages/
└── create-tanvite/
    ├── bin/
    ├── src/
    └── template/

tests/
├── e2e/
│   └── home.spec.ts
├── lib/
│   └── utils.test.ts
└── setup.ts
```

## 🛣️ 路由

使用下面的命令生成路由树：

```bash
pnpm routes:generate
```

`pnpm build` 和 `pnpm build:pages` 会在打包前自动生成路由树。

## ☁️ GitHub Pages

使用 GitHub Actions 官方 Pages 部署流。

- 应用构建产物：`dist/`
- Pages 构建产物：`dist-pages/`
- 对外地址：`https://yangsonhung.github.io/tanvite`
- 部署工作流： [.github/workflows/deploy-pages.yml](./.github/workflows/deploy-pages.yml)

用于 GitHub Pages 时：

- 使用 `pnpm build:pages` 构建
- 生产环境 `base` 使用 `/tanvite/`
- 发布 GitHub Actions artifact，而不是提交 `docs/`
- 在 Pages 产物中保留 `404.html` 和 `.nojekyll` 以支持 SPA 托管

用于常规生产环境部署时，使用 `pnpm build`。

## 🧰 开发默认约定

- React Query Devtools 和 TanStack Router Devtools 仅在开发环境启用
- 在功能实现逐渐变大之前，先把需求和行为变更沉淀到 `openspec/changes`
- 把 `.agents/skills`、`.claude/skills` 和 `.claude/commands/opsx` 一起纳入版本管理，让 Codex 和 Claude Code 始终基于同一套协作约定工作
- 运行 `pnpm openapi:generate` 之前，先把 `OPENAPI_SCHEMA_URL` 指向你的后端契约地址
- FSD 分层保持为 `app/pages/widgets/features/entities/shared`；`processes` 因已废弃而刻意不提供
- 运行 `pnpm check:boundaries` 通过 Steiger 校验 FSD 结构
- 生成的 API 产物位于 `src/shared/api/generated`
- 在 `src/shared/api/query-client.ts` 中维护共享 Query 默认配置
- 在 `src/shared/lib/utils.ts` 中使用 `cn()` 工具函数

## 🤝 贡献指南

提交 Pull Request 前请先阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 🌀 更新日志

项目变更历史见 [CHANGELOG.md](./CHANGELOG.md)。

## 🪪 许可证

MIT
