# create-tanvite

[English](README.md) | **中文**

本目录是 `create-tanvite` npm 包的源码目录，对应发布在 npm 上的
[`create-tanvite`](https://www.npmjs.com/package/create-tanvite) 脚手架。
面向最终用户的安装与使用说明请看
[仓库根 README](../../README.zh-CN.md)；本 README 仅说明**包内部结构**。

## 包目录结构

```text
packages/create-tanvite/
├── bin/
│   └── create-tanvite.mjs   # 入口很薄，仅把 argv 转发给 src/index.mjs 的 run()
├── src/                     # CLI 实现（详见下文「src/ 源码结构」）
├── template/
│   └── base/                # 会被原样复制到目标目录的 starter 模板
├── package.json             # 发布用的 package 清单
├── TEMPLATE_OWNERSHIP.md    # template/ 下内容的归属与约束
├── README.md
└── README.zh-CN.md
```

- `bin/create-tanvite.mjs` 通过 `package.json` 的 `bin` 字段注册为
  `create-tanvite` 可执行命令。其中不写任何业务逻辑，只加载
  `src/index.mjs` 并调用 `run(process.argv.slice(2))`。
- `template/base/` 会被原样复制到生成项目中，再根据用户选择进行
  裁剪、令牌替换与补齐。生成类产物（如 `src/routeTree.gen.ts`）
  **不能**放入模板中，详见 [`TEMPLATE_OWNERSHIP.md`](./TEMPLATE_OWNERSHIP.md)。

## src/ 源码结构

CLI 按单一职责切分为多个模块，`index.mjs` 只做编排，不写具体业务。

```text
src/
├── index.mjs           # 编排器。通过 run(argv) 串联所有模块。
├── args.mjs            # CLI 参数解析（parseArgs）。无 I/O、无 prompt。
├── prompts.mjs         # 交互式 readline prompt（文本/是非/选项/整数）。
├── features.mjs        # featureKeys、presetDefaults、resolveFeatures、resolveMaxLinesLimit。
├── paths.mjs           # 文件系统入口：templateDir、restoreDotfiles、ensureTargetDirectory。
├── tokens.mjs          # applyTokens：在模板中替换 __PACKAGE_NAME__ 等占位符。
├── prune.mjs           # applyFeaturePruning 以及无 OpenAPI 时的回退文件。
├── package-json.mjs    # writePackageJson、writeEnvExample；把 lint 脚本接入 `check`。
├── docs.mjs            # writeStarterDocs（README）与 writeAgentFiles（AGENTS、CLAUDE）。
├── husky.mjs           # writeHuskyHooks：重写 .husky/pre-commit 与 commit-msg。
├── lint-checks.mjs     # 按需生成 check-file-naming / check-max-lines 脚本。
├── utils.mjs           # 纯函数工具：sanitizePackageName、toTitleCase、unsetKeys。
├── i18n/
│   ├── index.mjs       # Locale 注册表、normalizeLocale、getMessages。
│   ├── en.mjs          # 英文 prompt、README/AGENTS 模板、lint 文案、特性标签。
│   └── zh-CN.mjs       # 对 en.mjs 的简体中文镜像。
└── README.md           # src/ 的贡献约定，后续所有改动必须遵守。
```

模块边界、新增 locale、新增 feature flag 的完整约定写在
[`src/README.md`](./src/README.md) 中。后续对 CLI 的任何改动都必须
遵循那里列出的规则。

## CLI 参数

| 参数 | 说明 |
| ---- | ---- |
| `-y`, `--yes` | 非交互模式；使用默认值 / 预设值。 |
| `--lang <en\|zh-CN>` | 提示语、README、AGENTS.md 以及 lint 脚本输出语言。默认：`en`。 |
| `--preset <minimal\|full>` | 启动预设。 |
| `--title <name>` | 生成 UI 中显示的应用标题。 |
| `--package-name <name>` | 覆盖根据目录推断的包名。 |
| `--with feat1,feat2` | 强制启用指定特性。 |
| `--<feature>` / `--no-<feature>` | 启用/禁用单个特性。支持：`openspec`、`openapi`、`playwright`、`pages`、`agents`、`lint-file-naming`、`lint-max-lines`。 |
| `--max-lines <N>` | `lint-max-lines` 检查的单文件行数上限；必须是介于 `100` 与 `1000` 之间的整数（含两端）。默认：`300`。 |

示例：

```bash
npm create tanvite@latest my-app -- --lang zh-CN --preset full
npm create tanvite@latest my-app -- -y --lang en --preset minimal --lint-file-naming --lint-max-lines
```

生成的 `CLAUDE.md` 仅包含一个 `@AGENTS.md` 引用，确保 Claude Code 与
Codex 遵循同一份说明。

## 本地开发

直接从仓库源码运行 bin 脚本（无需安装，无需发布）：

```bash
node ./packages/create-tanvite/bin/create-tanvite.mjs <target-dir> [flags]
```

面向最终用户的使用流程与维护者发布流程详见
[仓库根 README](../../README.zh-CN.md)。
