# create-tanvite

[English](README.md) | **中文**

`create-tanvite` 用于快速生成精选的 TanVite 启动模板，无需复制完整的维护仓库。

## 使用方式

```bash
npm create tanvite@latest
pnpm create tanvite
```

CLI 支持以下功能：

- 交互式语言选择（`English` / `简体中文`），用于生成提示文案、README 和 AGENTS.md
- `minimal` 与 `full` 两种预设
- 可选集成 OpenSpec、OpenAPI、Playwright、GitHub Pages、agent 资产以及 lint 脚本
- 可选的 `kebab-case` 文件命名检查与单文件行数检查（自动接入 `pnpm check`）；行数上限可由用户配置（默认 `300`，取值范围 `100` 到 `1000`，含两端）
- 包名（package name）与应用标题（app title）替换

### CLI 参数

| 参数 | 说明 |
| ---- | ---- |
| `-y`, `--yes` | 非交互模式；使用默认值 / 预设值。 |
| `--lang <en\|zh-CN>` | 提示语、README、AGENTS.md 以及 lint 脚本输出语言。默认：`en`。 |
| `--preset <minimal\|full>` | 启动预设。 |
| `--title <name>` | 生成 UI 中显示的应用标题。 |
| `--package-name <name>` | 覆盖根据目录推断的包名。 |
| `--with feat1,feat2` | 强制启用指定特性。 |
| `--<feature>` / `--no-<feature>` | 启用/禁用单个特性。支持：`openspec`、`openapi`、`playwright`、`pages`、`agents`、`lint-file-naming`、`lint-max-lines`。 |
| `--max-lines <N>` | `lint-max-lines` 检查的单文件行数上限。必须是介于 `100` 到 `1000`（含两端）之间的整数。默认：`300`。 |

### 示例

```bash
npm create tanvite@latest my-app -- --lang zh-CN --preset full
npm create tanvite@latest my-app -- -y --lang en --preset minimal --lint-file-naming --lint-max-lines
```

生成的 `CLAUDE.md` 仅包含一个 `@AGENTS.md` 引用，确保 Claude Code 与 Codex 遵循同一份说明。

### 源码结构

`src/` 下的 CLI 实现遵循严格的模块拆分约定。请参阅
[`src/README.md`](./src/README.md) 了解后续贡献必须遵守的规范。

## 本地开发

直接从本仓库运行 bin 脚本：

```bash
node ./packages/create-tanvite/bin/create-tanvite.mjs
```

## 发布流程（维护者）

在工作区目录下发布该包。

1. 确认模板目录未包含生成的产物，如 `src/routeTree.gen.ts`。
2. 升级 `packages/create-tanvite/package.json` 的版本号。
3. 运行 `pnpm pack`，发布前先检查 tarball 内容。
4. 使用 2FA 发布到 npmjs registry。

```bash
cd packages/create-tanvite
npm version patch --no-git-tag-version
pnpm pack
tar -tzf create-tanvite-*.tgz | grep -E "template/base/(gitignore|\\.gitignore|src/routeTree\\.gen\\.ts)"
pnpm publish --access public --no-git-checks --registry=https://registry.npmjs.org
```

发布完成后，验证版本：

```bash
npm view create-tanvite version dist-tags --json --registry=https://registry.npmjs.org
```
