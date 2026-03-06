# ▲ TanVite

[![React 19](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](#-tech-stack)
[![Vite 5](https://img.shields.io/badge/Vite-5-7c3aed?logo=vite&logoColor=white)](#-tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](#-tech-stack)
[![MIT License](https://img.shields.io/badge/License-MIT-16a34a)](#-license)
[![Pages](https://github.com/YangsonHung/TanVite/actions/workflows/deploy-pages.yml/badge.svg)](#-github-pages)
[![CI](https://github.com/YangsonHung/TanVite/actions/workflows/ci.yml/badge.svg)](#-contributing)

**English** | [中文](README.zh-CN.md)

TanVite is a production-oriented React 19 starter that packages modern frontend best practices into a single, reusable engineering baseline. Use it to start product work on top of Vite, TypeScript, TanStack Router, TanStack Query, Tailwind CSS, testing, linting, and GitHub Pages-ready deployment.

![TanVite Screenshot](assets/screenshots/tanvite-home.png)

## ✨ Why TanVite

- Start from a modern React 19 baseline instead of assembling tooling by hand
- Keep routing, data fetching, styling, testing, and CI aligned from the first commit
- Separate app deployment (`dist/`) from GitHub Pages showcase deployment (`dist-pages/`)
- Reuse a polished landing page and guide page for public project presentation

## 🚀 Quick Start

1. Install dependencies.
2. Start the development server.
3. Open the app in the browser.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:4319`.

## 🛠 Use This Template

### Option 1: Use GitHub Template

1. Open the repository on GitHub.
2. Click `Use this template`.
3. Create a new repository under your account or organization.
4. Clone the generated repository locally.

```bash
git clone <your-new-repo-url>
cd <your-project>
pnpm install
pnpm dev
```

### Option 2: Clone Directly

```bash
git clone https://github.com/YangsonHung/TanVite.git <your-project>
cd <your-project>
pnpm install
pnpm dev
```

### Next Steps

1. Replace the landing copy and branding.
2. Add or remove routes under `src/routes`.
3. Move product-specific logic into `src/lib`, `src/hooks`, and your feature folders.
4. Keep the existing testing and CI setup as the project baseline.

## ✨ Features

- React 19 + TypeScript + Vite 5 starter
- TanStack Router file-based routing
- TanStack Query data layer
- Tailwind CSS and shadcn/ui-ready utilities
- Biome for linting and formatting
- Vitest + Testing Library for unit tests
- Playwright for end-to-end tests
- Husky + lint-staged + commitlint for commit workflow enforcement

## 🧱 Tech Stack

| Category | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Package Manager | pnpm |
| Routing | TanStack Router |
| Data Fetching | TanStack Query |
| Styling | Tailwind CSS |
| UI Utilities | shadcn/ui, class-variance-authority, tailwind-merge |
| Code Quality | Biome |
| Unit Testing | Vitest, Testing Library, jsdom |
| E2E Testing | Playwright |
| Git Hooks | Husky, lint-staged |

## 📋 Requirements

- Node.js 20+
- pnpm 10+

## ⌨️ Scripts

```bash
pnpm routes:generate   # Generate the TanStack Router route tree
pnpm dev               # Start the Vite dev server
pnpm build             # Build the app into dist/
pnpm build:pages       # Build the GitHub Pages site into dist-pages/
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

## 🗂 Project Structure

```text
src/
├── index.css
├── main.tsx
├── routeTree.gen.ts
├── lib/
│   ├── query-client.ts
│   └── utils.ts
├── routes/
│   ├── __root.tsx
│   ├── guide.tsx
│   └── index.tsx
├── types/
│   └── index.ts
└── vite-env.d.ts

tests/
├── e2e/
│   └── home.spec.ts
├── lib/
│   └── utils.test.ts
└── setup.ts
```

## 🧭 Routing

Generate the route tree with:

```bash
pnpm routes:generate
```

`pnpm build` and `pnpm build:pages` run route generation automatically before bundling.

## 📦 GitHub Pages

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

## ⚙️ Development Defaults

- Enable React Query Devtools and TanStack Router Devtools only in development
- Keep shared query defaults in `src/lib/query-client.ts`
- Use `src/lib/utils.ts` for the `cn()` helper

## 🤝 Contributing

Read [CONTRIBUTING.md](/Users/yangsonhung/Projects/personal/TanVite/CONTRIBUTING.md) before opening a pull request.

## 🗒 Changelog

Track project history in [CHANGELOG.md](/Users/yangsonhung/Projects/personal/TanVite/CHANGELOG.md).

## 📄 License

MIT
