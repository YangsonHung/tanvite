# Changelog

All notable changes to this project will be documented in this file.

The format follows Keep a Changelog and uses Semantic Versioning conventions where practical.

## [Unreleased]

### Added

- AI agent hooks feature for `create-tanvite`: optional Claude Code and Codex runtime hooks with `--hooks` flag and `--hooks-agents` multi-select (pnpm enforcement, file protection, auto-format, context injection, boundary checks, desktop notification)
- `promptMultiSelect` interactive prompt for multi-choice selection in `create-tanvite`
- Agent Hooks documentation section in generated starter README (bilingual)
- Agent Hooks documentation section in repository root README and README.zh-CN
- Feature spec at `spec/agent-hooks-feature.md`
- Publishable `create-tanvite` scaffolder package for curated starter generation
- GitHub Pages deployment through GitHub Actions
- Public landing page and guide page for project showcase
- MIT license, contribution guide, and starter-oriented README

### Changed

- Switched new-project onboarding from repository cloning/template usage to `npm create tanvite@latest`
- Split maintainer-only repository assets from starter distribution assets
- Synced README, showcase copy, OpenSpec configuration, and starter template defaults around the new scaffolding flow

## [0.1.0] - 2026-03-07

### Added

- Initial public starter release
- React 19 + Vite 5 + TypeScript baseline
- TanStack Router and TanStack Query integration
- Tailwind CSS and shadcn/ui-compatible utility setup
- Vitest, Playwright, Biome, Husky, lint-staged, and commitlint
