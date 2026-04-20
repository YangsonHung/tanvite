# CLAUDE.md

Repository instructions for Codex, Claude Code, and other agents that read `CLAUDE.md`.

## Project Profile

TanVite is a production-oriented React 19 starter with:

- a publishable `create-tanvite` scaffolder for curated starter generation
- Vite + TypeScript
- OpenSpec for spec-driven change tracking
- `.agents/skills/` for Codex and `.claude/skills/` for Claude Code
- TanStack Router + TanStack Query
- OpenAPI / Orval / MSW / Prism
- Biome, Vitest, Playwright
- GitHub Pages showcase support

## Working Rules

- Use `pnpm` for all package management and scripts.
- Prefer editing source files over editing generated files.
- Every time `AGENTS.md` changes, sync the same update to `CLAUDE.md`; `AGENTS.md` and `CLAUDE.md` must stay aligned.
- Keep public-facing copy aligned across:
  - `README.md`
  - `README.zh-CN.md`
  - `showcase/src/app.tsx`
- Keep starter distribution behavior aligned across:
  - `packages/create-tanvite/src/`
  - `packages/create-tanvite/template/base/`
  - `README.md`
  - `README.zh-CN.md`
- Preserve bilingual behavior on the showcase landing page and guide page.
- When changing project positioning, update both OpenSpec-facing docs and public showcase copy.

## Shared Agent Assets

The repository-level Codex skill catalog lives in:

```text
.agents/skills/
```

Claude Code keeps its corresponding skills under `.claude/skills/`.

OpenSpec command assets currently live in:

```text
.claude/commands/opsx/
```

If you change workflow wording or OpenSpec collaboration patterns, check both `.agents/skills/` and `.claude/commands/opsx/`.

## Key Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm build:pages
pnpm test:run
pnpm check

pnpm routes:generate
pnpm openspec:list
pnpm openspec:new <name>
pnpm openspec:validate
pnpm openspec:spec:list
pnpm openapi:check
pnpm openapi:generate
pnpm openapi:mock
```

## Important Paths

```text
src/app/               App entry, providers, router wiring, global styles
src/routes/            TanStack Router route files and page-level composition
src/widgets/           Reusable route-facing UI blocks
src/shared/            Shared runtime logic, API config, query client, utilities
showcase/              Public showcase app (landing page, guide, site-only styles)
packages/create-tanvite/ CLI package and curated starter template source

openspec/changes/      Active change proposals
openspec/specs/        Baseline specifications
openspec/config.yaml   OpenSpec config

.agents/skills/        Codex skill catalog
.claude/skills/        Claude Code skill catalog
.claude/commands/opsx/ OpenSpec command assets for Claude Code
```

## Generated Files

Do not hand-edit generated artifacts unless the task explicitly requires it.

- `src/routeTree.gen.ts`
- `src/shared/api/generated/`
- `dist/`
- `dist-pages/`

If generated output is wrong, fix the source configuration or generation script first.

## Docs and UI Sync

When changing any of the following, update all relevant surfaces in the same pass:

- project description
- supported agent workflows
- OpenSpec workflow
- OpenAPI workflow
- GitHub Pages behavior
- starter commands
- starter distribution flow

Relevant files:

- `README.md`
- `README.zh-CN.md`
- `showcase/src/app.tsx`
- `AGENTS.md`

## Verification

Run the smallest useful verification set for the change:

- docs/copy only: `pnpm build`
- TypeScript or UI code: `pnpm build`
- tooling/runtime changes: `pnpm test:run && pnpm build`
- formatting/lint issues: `pnpm check`

## Deployment Notes

- Standard app builds output to `dist/`
- GitHub Pages builds output to `dist-pages/`
- GitHub Pages runs under the `/tanvite/` base path

Any change touching links, asset paths, router behavior, or preview instructions must keep the Pages deployment path working.
