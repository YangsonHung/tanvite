# `create-tanvite` Source Layout

This directory hosts the `create-tanvite` CLI implementation. It follows a
strict single-responsibility module split. **Future contributions MUST follow
the same conventions.**

## Modules

```text
src/
├── index.mjs              # Orchestrator only. Wires modules together via run(argv).
├── README.md              # This file.
├── args.mjs               # CLI flag parsing (parseArgs). No I/O, no prompts.
├── prompts.mjs            # Interactive readline prompts (text / yes-no / choice).
│                          # Locale-aware via a messages object passed in.
├── features.mjs           # featureKeys, presetDefaults, resolveFeatures.
├── paths.mjs              # Filesystem entry: templateDir, restoreDotfiles,
│                          # ensureTargetDirectory, removePath.
├── tokens.mjs             # applyTokens: replace __PACKAGE_NAME__ etc. in templates.
├── prune.mjs              # applyFeaturePruning + the no-OpenAPI fallback sources.
├── package-json.mjs       # writePackageJson + writeEnvExample. Owns the script
│                          # chain wiring (e.g. appending lint scripts to
│                          # `check`, `check:fix`, `build`, `build:pages`).
├── docs.mjs               # writeStarterDocs (README) + writeAgentFiles (AGENTS,
│                          # CLAUDE). Templates come from i18n.
├── husky.mjs              # writeHuskyHooks: regenerates .husky/pre-commit and
│                          # .husky/commit-msg, appending optional check:*
│                          # hook lines based on enabled features.
├── lint-checks.mjs        # Renders optional check-file-naming / check-max-lines
│                          # scripts using locale-aware messages.
├── utils.mjs              # Pure helpers: sanitizePackageName, toTitleCase,
│                          # unsetKeys.
└── i18n/
    ├── index.mjs          # Locale registry, normalizeLocale, getMessages.
    ├── en.mjs             # English: prompts, README/AGENTS templates, lint
    │                      # script console copy, feature labels.
    └── zh-CN.mjs          # Simplified Chinese mirror of en.mjs.
```

## Conventions

1. **`index.mjs` is orchestration only.** It must not contain template literals,
   filesystem rules, regular expressions, or business decisions beyond calling
   the right modules in order.
2. **One responsibility per module.** If a function does not fit any existing
   module, add a new module rather than overloading an existing one.
3. **Soft size budget: ~80 lines per function.** When a function grows past
   that, extract helpers into the same module or a new one.
4. **No hard-coded user-facing strings outside `i18n/`.** Every prompt label,
   error message, README/AGENTS template, and generated-script `console` line
   must live in `i18n/en.mjs` and `i18n/zh-CN.mjs` and stay in sync.
5. **No CLI parsing outside `args.mjs`.** Add new flags there and document them
   in [`packages/create-tanvite/README.md`](../README.md).
6. **No prompts outside `prompts.mjs` and the orchestrator.** Other modules
   accept already-resolved values.
7. **Generated-file rules belong with their owners.** Filesystem deletions live
   in `paths.mjs` and `prune.mjs`; `package.json` edits live in
   `package-json.mjs`; doc generation lives in `docs.mjs` / `lint-checks.mjs`.
8. **Adding a feature flag requires updates in three places:**
   `features.mjs` (key + preset defaults), `i18n/*.mjs` (prompt copy + label),
   and the corresponding writer module (`prune.mjs`, `package-json.mjs`,
   `lint-checks.mjs`, …).
9. **Follow-up numeric / free-form prompts** (e.g. `resolveMaxLinesLimit`) live
   next to the feature resolver in `features.mjs`. They read overrides from
   `args.mjs` first, fall back to defaults in `-y` mode, and use
   `prompts.mjs` with locale-aware copy otherwise. Validation bounds are
   exported constants (e.g. `DEFAULT_MAX_LINES`, `MAX_LINES_MIN`,
   `MAX_LINES_MAX`) and treated as inclusive.

## Adding a Locale

1. Create `i18n/<locale>.mjs` mirroring the shape of `en.mjs`.
2. Register it in `i18n/index.mjs` (`registry`, `SUPPORTED_LOCALES`, optional
   `normalizeLocale` aliases).
3. Add the display label to `LOCALE_DISPLAY` in `index.mjs`.
4. Verify by running:

   ```bash
   node packages/create-tanvite/bin/create-tanvite.mjs demo -y --lang <locale> --preset full
   ```

## Adding a Feature Flag

1. Add the key to `featureKeys` in `features.mjs`.
2. Add defaults under both presets in `presetDefaults`.
3. Add the prompt label to `messages.features` and the README label to
   `messages.featureLabels` in **every** `i18n/*.mjs`.
4. Implement the actual file effects in the smallest fitting writer module.
5. If the feature affects `package.json` scripts, wire it through
   `package-json.mjs` (and update `check` chain when relevant).
6. Document the new `--<flag>` / `--no-<flag>` in
   [`packages/create-tanvite/README.md`](../README.md).
