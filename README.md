# ⚡ TanVite

[![React 19](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](#-tech-stack)
[![TanStack Router](https://img.shields.io/badge/TanStack-Router-0f766e?logo=reactrouter&logoColor=white)](#-tech-stack)
[![TanStack Query](https://img.shields.io/badge/TanStack-Query-b91c1c?logo=reactquery&logoColor=white)](#-tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](#-tech-stack)
[![MIT License](https://img.shields.io/badge/License-MIT-16a34a)](#-license)
[![Pages Deploy](https://github.com/YangsonHung/TanVite/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/YangsonHung/TanVite/actions/workflows/deploy-pages.yml)
[![CI Status](https://github.com/YangsonHung/TanVite/actions/workflows/ci.yml/badge.svg)](https://github.com/YangsonHung/TanVite/actions/workflows/ci.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-222222?logo=githubpages&logoColor=white)](https://yangsonhung.github.io/TanVite/)

**English** | [中文](README.zh-CN.md)

TanVite is a production-grade React 19 starter system designed as a reusable frontend engineering foundation for serious product teams. It combines a publishable `create-tanvite` scaffolder, Vite, TypeScript, OpenSpec, `.agents/skills` for Codex, `.claude/skills` plus OPSX commands for Claude Code, TanStack Router, TanStack Query, OpenAPI tooling, Tailwind CSS, automated testing, code-quality enforcement, and GitHub Pages-ready delivery into a polished, high-standard stack for launching new products with spec-driven workflow, AI-assisted implementation, and modern frontend best practices already in place.

![TanVite Screenshot](assets/screenshots/tanvite-home.png)

## 🛰️ Why TanVite

- Start from a modern React 19 starter without assembling tooling by hand
- Work with OpenSpec from day one so change proposals and baseline specs stay inside the repository
- Use `.agents/skills` for Codex and `.claude/skills` plus OPSX commands for Claude Code to cover design, code review, testing, git workflows, and browser automation
- Keep routing, data fetching, styling, testing, and CI aligned from the first commit
- Build product work on top of a frontend baseline that already standardizes routing, data, styling, testing, and CI
- Combine OpenSpec-driven planning with OpenAPI-driven API generation in one repository
- Reuse a polished landing page and guide page for public project presentation
- Start new product work through `npm create tanvite@latest` instead of copying the full maintenance repository

## 🚀 Create A Project

Use the published scaffolder when you want a new TanVite-based product project.

```bash
npm create tanvite@latest my-app
cd my-app
pnpm install
pnpm dev
```

Open `http://localhost:4319`.

Optional examples:

```bash
npm create tanvite@latest my-app -- --preset full
npm create tanvite@latest my-app -- --with openspec,openapi,playwright,pages,agents
```

### 🧭 Next Steps

1. Replace the landing copy and branding.
2. Add or remove routes under `src/routes`.
3. Move product-specific logic into `src/lib`, `src/hooks`, and your feature folders.
4. Keep the existing testing and CI setup as the project baseline.

## 🛠️ Maintainers Only

The source repository is for maintaining TanVite itself: the `create-tanvite` scaffolder, the starter template, and the public showcase. Product teams starting a new app should use `npm create tanvite@latest`.

## 💠 Features

- `create-tanvite` scaffolder for curated starter generation
- React 19 + TypeScript + Vite 5 starter baseline
- OpenSpec workspace initialized in `spec-driven` mode
- `.agents/skills` for Codex and `.claude/skills` plus OPSX commands for Claude Code, covering frontend design, review, testing, git workflows, and browser automation
- TanStack Router file-based routing
- TanStack Query data layer
- OpenAPI-driven client, hook, and mock generation via Orval
- Tailwind CSS and shadcn/ui-ready utilities
- Biome for linting and formatting
- Vitest + Testing Library for unit tests
- Playwright for end-to-end tests
- MSW and Prism for browser-level mocks and standalone mock server workflows
- Husky + lint-staged + commitlint for commit workflow enforcement

## 🧩 Tech Stack

| Category | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Package Manager | pnpm |
| Specification Workflow | OpenSpec |
| AI Collaboration | `.agents/skills`, `.claude/skills`, Codex, Claude Code, OPSX commands |
| Routing | TanStack Router |
| Data Fetching | TanStack Query |
| API Contract | Orval, OpenAPI |
| Mocking | MSW, Prism |
| Styling | Tailwind CSS |
| UI Utilities | shadcn/ui, class-variance-authority, tailwind-merge |
| Code Quality | Biome |
| Unit Testing | Vitest, Testing Library, jsdom |
| E2E Testing | Playwright |
| Git Hooks | Husky, lint-staged |

## 🖥️ Requirements

- Node.js 20+
- pnpm 10+

## 💻 Scripts

```bash
pnpm routes:generate   # Generate the TanStack Router route tree
pnpm openapi:check     # Validate the remote OpenAPI document
pnpm openapi:generate  # Generate API clients, React Query hooks, and MSW mocks
pnpm openapi:mock      # Start a standalone Prism mock server
pnpm dev               # Start the Vite dev server
pnpm dev:mock          # Start Vite with the MSW browser mock enabled
pnpm dev:showcase      # Start the isolated showcase app locally
pnpm build             # Build the app into dist/
pnpm build:pages       # Build the showcase site into dist-pages/
pnpm preview           # Preview dist/ on http://localhost:4419
pnpm preview:pages     # Preview dist-pages/ on http://localhost:4419

pnpm test              # Run Vitest in watch mode
pnpm test:run          # Run unit tests once
pnpm test:coverage     # Generate a coverage report
pnpm test:e2e          # Run Playwright tests
pnpm test:e2e:ui       # Run Playwright in UI mode

pnpm check             # Run Biome checks with fixes
pnpm lint              # Run Biome lint
pnpm format            # Run Biome format
```

## 🌐 Preview GitHub Pages Locally

1. Build the Pages artifact.
2. Start the Pages preview server.
3. Open the project-site path.

```bash
pnpm build:pages
pnpm preview:pages
```

Open `http://localhost:4419/TanVite/`.

## 🧠 OpenAPI Workflow

1. Copy `.env.example` to `.env.local`.
2. Set `OPENAPI_SCHEMA_URL` to your backend Swagger/OpenAPI endpoint.
3. Validate the contract and generate the API layer.
4. Start development against either MSW or a standalone Prism mock server.

```bash
cp .env.example .env.local
pnpm openapi:check
pnpm openapi:generate
pnpm dev:mock
```

Use `pnpm openapi:mock` when you want a separate mock server on `http://127.0.0.1:4010`.

## 🧭 OpenSpec Workflow

This repository has already been initialized with OpenSpec and uses the `spec-driven` schema.

- Keep active change proposals under `openspec/changes/`
- Keep baseline specifications under `openspec/specs/`
- Keep repository-level OpenSpec settings in `openspec/config.yaml`

Common commands:

```bash
pnpm openspec:list
pnpm openspec:new <name>
pnpm openspec:validate
pnpm openspec:spec:list
```

## 🤖 Integrated Skills

The current workspace ships with Codex skills under `.agents/skills/`, Claude Code skills under `.claude/skills/`, and OpenSpec command assets under `.claude/commands/opsx/`.

- `openspec-*` skills and `opsx/*` commands for OpenSpec change exploration, proposal, application, and archiving
- `frontend-design`, `ui-ux-pro-max`, and `web-design-guidelines` for product-facing UI work
- `frontend-code-review` and `code-review-expert` for review passes on pending changes
- `react-expert` and `typescript-expert` for framework and language-specific guidance
- `agent-browser` and `webapp-testing` for browser automation and local app verification
- `git-commit` and `git-pushing` for conventional commit and delivery workflows

## 🗺️ Project Structure

```text
src/
├── index.css
├── main.tsx
├── routeTree.gen.ts
├── lib/
│   ├── api/
│   ├── query-client.ts
│   └── utils.ts
├── mocks/
│   └── browser.ts
├── routes/
│   ├── __root.tsx
│   └── index.tsx
├── types/
│   └── index.ts
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

## 🛣️ Routing

Generate the route tree with:

```bash
pnpm routes:generate
```

`pnpm build` and `pnpm build:pages` run route generation automatically before bundling.

## ☁️ GitHub Pages

Use the official GitHub Actions Pages deployment flow.

- App build output: `dist/`
- Pages build output: `dist-pages/`
- Public URL: `https://yangsonhung.github.io/TanVite`
- Deployment workflow: [.github/workflows/deploy-pages.yml](/Users/yangsonhung/Projects/personal/TanVite/.github/workflows/deploy-pages.yml)

For GitHub Pages:

- Build with `pnpm build:pages`
- Use `/TanVite/` as the production base path
- Publish the GitHub Actions artifact instead of committing `docs/`
- Keep `404.html` and `.nojekyll` in the Pages output for SPA hosting

For regular production deployment, use `pnpm build`.

## 🧰 Development Defaults

- Enable React Query Devtools and TanStack Router Devtools only in development
- Track requirement and behavior changes in `openspec/changes` before implementation work grows
- Keep `.agents/skills`, `.claude/skills`, and `.claude/commands/opsx` versioned with the project so Codex and Claude Code stay aligned on the same workflows
- Point `OPENAPI_SCHEMA_URL` at your backend spec before running `pnpm openapi:generate`
- Generated API artifacts live under `src/lib/api/generated`
- Keep shared query defaults in `src/lib/query-client.ts`
- Use `src/lib/utils.ts` for the `cn()` helper

## 🤝 Contributing

Read [CONTRIBUTING.md](/Users/yangsonhung/Projects/personal/TanVite/CONTRIBUTING.md) before opening a pull request.

## 🌀 Changelog

Track project history in [CHANGELOG.md](/Users/yangsonhung/Projects/personal/TanVite/CHANGELOG.md).

## 🪪 License

MIT
