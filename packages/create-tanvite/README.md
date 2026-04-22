# create-tanvite

**English** | [中文](README.zh-CN.md)

This directory hosts the `create-tanvite` npm package — the scaffolder
published as [`create-tanvite`](https://www.npmjs.com/package/create-tanvite)
on npm. End-user install and usage docs live in the
[repository root README](../../README.md); this README describes the
**package internals**.

## Package Layout

```text
packages/create-tanvite/
├── bin/
│   └── create-tanvite.mjs   # Thin entry; forwards argv to run() in src/index.mjs.
├── src/                     # CLI implementation (see "Source Layout" below).
├── template/
│   └── base/                # Starter template copied into the target directory.
├── package.json             # Published package manifest.
├── TEMPLATE_OWNERSHIP.md    # Rules for what may live under template/.
├── README.md
└── README.zh-CN.md
```

- `bin/create-tanvite.mjs` is wired to the `create-tanvite` executable via
  the `bin` field of `package.json`. It contains no logic beyond loading
  `src/index.mjs` and calling `run(process.argv.slice(2))`.
- `template/base/` is copied verbatim into the generated project and then
  pruned, tokenized, and augmented based on user answers. Generated
  artifacts (e.g. `src/routeTree.gen.ts`) must **not** be checked in
  here — see [`TEMPLATE_OWNERSHIP.md`](./TEMPLATE_OWNERSHIP.md).

## Source Layout (`src/`)

The CLI is split into single-responsibility modules; `index.mjs` is
orchestration only.

```text
src/
├── index.mjs           # Orchestrator. Wires modules together via run(argv).
├── args.mjs            # CLI flag parsing (parseArgs). No I/O, no prompts.
├── prompts.mjs         # Interactive readline prompts (text / yes-no / choice / multi-select / integer).
├── features.mjs        # featureKeys, presetDefaults, resolveFeatures, resolveMaxLinesLimit, resolveHooksAgents.
├── paths.mjs           # Filesystem entry: templateDir, restoreDotfiles, ensureTargetDirectory.
├── tokens.mjs          # applyTokens: replace __PACKAGE_NAME__ etc. in templates.
├── prune.mjs           # applyFeaturePruning + no-OpenAPI fallback sources.
├── package-json.mjs    # writePackageJson, writeEnvExample, lint-script wiring into `check`.
├── docs.mjs            # writeStarterDocs (README) + writeAgentFiles (AGENTS, CLAUDE).
├── husky.mjs           # writeHuskyHooks: regenerates .husky/pre-commit & commit-msg.
├── agent-hooks.mjs     # writeAgentHooks: generates .claude/settings.json, .codex/hooks.json, and hook scripts.
├── lint-checks.mjs     # Renders optional check-file-naming / check-max-lines scripts.
├── utils.mjs           # Pure helpers: sanitizePackageName, toTitleCase, unsetKeys.
├── i18n/
│   ├── index.mjs       # Locale registry, normalizeLocale, getMessages.
│   ├── en.mjs          # English prompts, README/AGENTS templates, lint copy, feature labels.
│   └── zh-CN.mjs       # Simplified Chinese mirror of en.mjs.
└── README.md           # Conventions for src/. MUST be followed by future changes.
```

Contribution rules (module boundaries, adding a locale, adding a feature
flag) live in [`src/README.md`](./src/README.md). Any future change to
the CLI must respect the conventions listed there.

## CLI Flags

| Flag | Description |
| ---- | ----------- |
| `-y`, `--yes` | Non-interactive; use defaults / preset values. |
| `--lang <en\|zh-CN>` | Output language for prompts, README, AGENTS.md and lint script messages. Default: `en`. |
| `--preset <minimal\|full>` | Starter preset. |
| `--title <name>` | App title displayed in the generated UI. |
| `--package-name <name>` | Override the inferred package name. |
| `--with feat1,feat2` | Force-enable features. |
| `--<feature>` / `--no-<feature>` | Toggle individual features. Supported: `openspec`, `openapi`, `playwright`, `pages`, `agents`, `hooks`, `lint-file-naming`, `lint-max-lines`. |
| `--max-lines <N>` | Per-file line limit for the `lint-max-lines` check. Integer between `100` and `1000` (inclusive). Default: `300`. |
| `--hooks-agents <claude,codex>` | Which agents receive hooks (requires `--hooks`). Comma-separated. Default in `-y` mode: `claude,codex`. |

Examples:

```bash
npm create tanvite@latest my-app -- --lang zh-CN --preset full
npm create tanvite@latest my-app -- -y --lang en --preset minimal --lint-file-naming --lint-max-lines
npm create tanvite@latest my-app -- -y --preset minimal --hooks --hooks-agents claude
```

The generated `CLAUDE.md` always contains a single `@AGENTS.md` reference, so
Claude Code follows the same instructions as Codex.

## Local Development

Run the bin script directly from this repository (no install, no publish):

```bash
node ./packages/create-tanvite/bin/create-tanvite.mjs <target-dir> [flags]
```

For the published end-user workflow and the maintainer release workflow,
see the [repository root README](../../README.md).
