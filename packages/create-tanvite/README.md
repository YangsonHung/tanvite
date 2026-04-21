# create-tanvite

**English** | [中文](README.zh-CN.md)

`create-tanvite` scaffolds a curated TanVite starter without copying the full maintenance repository.

## Usage

```bash
npm create tanvite@latest
pnpm create tanvite
```

The CLI supports:

- interactive language selection (`English` / `简体中文`) driving prompt copy, README, and AGENTS.md
- `minimal` and `full` presets
- optional OpenSpec, OpenAPI, Playwright, GitHub Pages, agent assets, and lint scripts
- optional `kebab-case` file naming check and per-file line limit check (auto-wired into `pnpm check`); the line limit is user-configurable (default `300`, must be between `100` and `1000` inclusive)
- package name and app title replacement

### CLI Flags

| Flag | Description |
| ---- | ----------- |
| `-y`, `--yes` | Non-interactive; use defaults / preset values. |
| `--lang <en\|zh-CN>` | Output language for prompts, README, AGENTS.md and lint script messages. Default: `en`. |
| `--preset <minimal\|full>` | Starter preset. |
| `--title <name>` | App title displayed in the generated UI. |
| `--package-name <name>` | Override the inferred package name. |
| `--with feat1,feat2` | Force-enable features. |
| `--<feature>` / `--no-<feature>` | Toggle individual features. Supported: `openspec`, `openapi`, `playwright`, `pages`, `agents`, `lint-file-naming`, `lint-max-lines`. |
| `--max-lines <N>` | Per-file line limit for the `lint-max-lines` check. Must be an integer between `100` and `1000` (inclusive). Default: `300`. |

### Examples

```bash
npm create tanvite@latest my-app -- --lang zh-CN --preset full
npm create tanvite@latest my-app -- -y --lang en --preset minimal --lint-file-naming --lint-max-lines
```

The generated `CLAUDE.md` always contains a single `@AGENTS.md` reference, so
Claude Code follows the same instructions as Codex.

### Source Layout

The CLI implementation under `src/` follows a strict module split. See
[`src/README.md`](./src/README.md) for the conventions all future contributions
must respect.

## Local Development

Run the bin script directly from this repository:

```bash
node ./packages/create-tanvite/bin/create-tanvite.mjs
```

## Release (Maintainers)

Publish the package from the workspace directory.

1. Ensure the template tree does not include generated artifacts such as `src/routeTree.gen.ts`.
2. Bump `packages/create-tanvite/package.json` version.
3. Run `pnpm pack` and inspect the tarball before publish.
4. Publish to npmjs registry with 2FA.

```bash
cd packages/create-tanvite
npm version patch --no-git-tag-version
pnpm pack
tar -tzf create-tanvite-*.tgz | grep -E "template/base/(gitignore|\\.gitignore|src/routeTree\\.gen\\.ts)"
pnpm publish --access public --no-git-checks --registry=https://registry.npmjs.org
```

After publish, verify:

```bash
npm view create-tanvite version dist-tags --json --registry=https://registry.npmjs.org
```
