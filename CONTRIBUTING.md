# Contributing

## Before You Start

1. Install dependencies with `pnpm install`.
2. Start the project with `pnpm dev`.
3. Run checks before opening a pull request.

```bash
pnpm test:run
pnpm build
pnpm build:pages
```

## Branching

- Create a feature branch from `main`
- Keep commits focused and logically grouped
- Use Conventional Commit messages

## Pull Requests

1. Describe the change clearly.
2. Include screenshots for UI updates when relevant.
3. Mention any changes to routes, tooling, or deployment behavior.
4. Update `README.md`, `README.zh-CN.md`, or `CHANGELOG.md` when needed.

## Coding Expectations

- Keep TypeScript strictness intact.
- Follow existing routing and query patterns.
- Prefer small, explicit changes over large rewrites.
- Preserve the existing visual language unless the change is intentionally a redesign.

## Documentation

Update documentation when a change affects:

- setup
- scripts
- deployment
- public-facing pages
- contributor workflow
