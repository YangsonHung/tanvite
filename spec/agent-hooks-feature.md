# Plan: 为 create-tanvite 添加 AI Agent Hooks 特性

## Context

create-tanvite 脚手架当前支持 7 个布尔特性开关（openspec/openapi/playwright/pages/agents/lintFileNaming/lintMaxLines），但缺少 AI 代理运行时自动化钩子的生成能力。Claude Code 和 Codex 均支持 hooks 机制，可自动执行格式化、保护文件、强制规则等确定性操作。将 hooks 封装为可选 starter 预设，用户可选择为 Claude Code 和/或 Codex 生成钩子，支持多选。

## 设计决策

- **交互方式**：新增 `promptMultiSelect` 函数，用户可同时勾选 Claude Code 和 Codex
- **特性关系**：hooks 与 agents 独立，互不依赖（agents 管技能目录，hooks 管运行时守卫）
- **返回值**：`hooksAgents` 为数组 `['claude'] | ['codex'] | ['claude','codex'] | null`
- **遵循现有模式**：hooks 为布尔特性 → `resolveHooksAgents()` 为跟进解析（类比 `lintMaxLines` → `resolveMaxLinesLimit()`）

## 实施步骤

### 1. `args.mjs` — 添加 `--hooks-agents` 值标志

- `parsed` 初始值增加 `hooksAgents: ''`
- 添加 `--hooks-agents` 解析（同 `--max-lines` 模式，消费下一个 argv 元素）
- `--hooks` / `--no-hooks` 由现有 toggle 机制自动处理（`normalizeFlag('hooks')` → `hooks: true/false`）

### 2. `prompts.mjs` — 新增 `promptMultiSelect`

```js
export async function promptMultiSelect(label, choices, defaultSelected, displayMap = {})
```

- 展示带编号的选项列表，已选项标记 `*`
- 用户输入：逗号分隔的编号或键名（如 `1,2` 或 `claude,codex`）
- 空输入返回 `defaultSelected`
- 返回选中的 choices 子集数组

### 3. `features.mjs` — 添加 `hooks` 特性键和 `resolveHooksAgents`

- `featureKeys` 增加 `'hooks'`（放在 `'agents'` 之后）
- `presetDefaults.minimal.hooks = false`，`presetDefaults.full.hooks = true`
- 新增 `resolveHooksAgents(parsed, features, messages)`:
  - `!features.hooks` → 返回 `null`
  - 检查 `parsed.hooksAgents`（逗号分隔，校验值是否为 `claude`/`codex`）
  - `-y` 模式默认 `['claude', 'codex']`
  - 交互模式调用 `promptMultiSelect(messages.promptHooksAgents, ['claude','codex'], ['claude','codex'], messages.hooksAgentsLabels)`
- 导出 `HOOKS_AGENT_OPTIONS = ['claude', 'codex']`

### 4. `i18n/en.mjs` — 英文字符串

新增内容：
- `features.hooks`: `'Include AI agent hooks (Claude Code / Codex)?'`
- `featureLabels.hooks`: `'AI agent hooks (pnpm enforcement, context injection, FSD checks)'`
- `promptHooksAgents`: `'Which agents should receive hooks?'`
- `hooksAgentsLabels`: `{ claude: 'Claude Code', codex: 'Codex' }`
- `hooks` 对象（类比 `lintScripts`），包含所有生成脚本中的用户可见字符串：
  - `enforcePnpmBlocked`: 阻止 npm/yarn/bun 的提示语
  - `protectFilesBlocked(file)`: 阻止编辑受保护文件的提示语
  - `protectFilesPatterns`: 受保护路径模式数组
  - `contextHeader` + `contextRules`: 注入上下文的标题和规则列表
  - `stopBoundaryFail`: FSD 检查失败提示
  - `notificationTitle` + `notificationBody`: macOS 通知标题和正文

### 5. `i18n/zh-CN.mjs` — 中文镜像

与 en.mjs 结构完全对应，翻译所有新增字符串。

### 6. `agent-hooks.mjs` — 新模块（核心）

```js
export async function writeAgentHooks(targetDir, features, hooksAgents, messages)
```

**hooksAgents 包含 'claude' 时生成：**

| 文件 | 说明 |
|------|------|
| `.claude/settings.json` | Claude Code hooks 配置 |
| `.claude/hooks/enforce-pnpm.sh` | PreToolUse(Bash): 阻止 npm/yarn/bun |
| `.claude/hooks/inject-context.sh` | SessionStart: 注入项目规则 |
| `.claude/hooks/stop-boundaries-check.sh` | Stop: 停止前检查 import boundaries |
| `.claude/hooks/protect-files.sh` | PreToolUse(Edit\|Write): 阻止编辑生成文件 |

`.claude/settings.json` 事件配置：
- `PostToolUse` matcher=`Edit|Write`: biome check --write
- `PreToolUse` matcher=`Edit|Write`: protect-files.sh
- `PreToolUse` matcher=`Bash`: enforce-pnpm.sh
- `SessionStart` matcher=`startup|resume|compact`: inject-context.sh
- `Stop`: stop-boundaries-check.sh (timeout: 30)
- `Notification`: macOS osascript 通知

**hooksAgents 包含 'codex' 时生成：**

| 文件 | 说明 |
|------|------|
| `.codex/hooks.json` | Codex hooks 配置 |
| `.codex/hooks/enforce-pnpm.sh` | PreToolUse(Bash) |
| `.codex/hooks/inject-context.sh` | SessionStart |
| `.codex/hooks/stop-boundaries-check.sh` | Stop |

注：Codex 当前仅支持 Bash matcher，不生成 protect-files 和 biome format 钩子。

**生成模式**：render 函数返回脚本字符串（类比 `lint-checks.mjs`），i18n 消息通过 `JSON.stringify()` 烘焙到脚本中。所有 `.sh` 文件写后 `chmod(0o755)`。

**脚本路径引用**：
- Claude: `"$CLAUDE_PROJECT_DIR"/.claude/hooks/<script>.sh`
- Codex: `"$(git rev-parse --show-toplevel)"/.codex/hooks/<script>.sh`

**脚本去重**：.claude/hooks/ 和 .codex/hooks/ 各自独立存放脚本副本（不做符号链接，确保跨平台可靠性）。

### 7. `index.mjs` — 编排接入

- 导入 `resolveHooksAgents` 和 `writeAgentHooks`
- 在 `resolveMaxLinesLimit` 之后调用 `resolveHooksAgents(parsed, features, messages)`
- 在 `writeAgentFiles` 之后调用 `writeAgentHooks(targetDir, features, hooksAgents, messages)`
  - 写入阶段在 pruning 之后，`mkdir -p` 可重建被 prune 的 `.claude/` 目录

### 8. `docs.mjs` — 特性列表更新

- `writeStarterDocs` 的 feature key 迭代数组中增加 `'hooks'`（位于 `'agents'` 之后）
- 无需添加命令行（hooks 不产生 npm scripts）

### 9. `prune.mjs` — 无需修改

写入阶段在 pruning 之后运行，`writeAgentHooks` 的 `mkdir -p` 可正确处理目录创建。

### 10. `src/README.md` — 模块文档更新

- 模块列表中添加 `agent-hooks.mjs` 条目
- "Adding a Feature Flag" 章节补充 hooks 作为布尔特性+跟进解析的示例

### 11. `packages/create-tanvite/README.md` + `README.zh-CN.md` — CLI 文档更新

- 添加 `--hooks-agents <claude,codex>` 标志说明
- 将 `hooks` 加入 `--<feature>` / `--no-<feature>` 支持列表
- 添加使用示例
- 源码布局中添加 `agent-hooks.mjs`

## 关键文件

| 文件 | 操作 |
|------|------|
| `packages/create-tanvite/src/args.mjs` | 修改 |
| `packages/create-tanvite/src/prompts.mjs` | 修改 |
| `packages/create-tanvite/src/features.mjs` | 修改 |
| `packages/create-tanvite/src/i18n/en.mjs` | 修改 |
| `packages/create-tanvite/src/i18n/zh-CN.mjs` | 修改 |
| `packages/create-tanvite/src/agent-hooks.mjs` | **新建** |
| `packages/create-tanvite/src/index.mjs` | 修改 |
| `packages/create-tanvite/src/docs.mjs` | 修改 |
| `packages/create-tanvite/src/README.md` | 修改 |
| `packages/create-tanvite/README.md` | 修改 |
| `packages/create-tanvite/README.zh-CN.md` | 修改 |

## 验证

```bash
# 最小化预设（无 hooks）
node packages/create-tanvite/bin/create-tanvite.mjs /tmp/test-minimal -y --preset minimal

# 完整版预设（hooks 启用，两个代理）
node packages/create-tanvite/bin/create-tanvite.mjs /tmp/test-full -y --preset full

# 仅 Claude hooks
node packages/create-tanvite/bin/create-tanvite.mjs /tmp/test-claude -y --preset minimal --hooks --hooks-agents claude

# 仅 Codex hooks
node packages/create-tanvite/bin/create-tanvite.mjs /tmp/test-codex -y --preset minimal --hooks --hooks-agents codex

# 验证文件存在性和权限
ls -la /tmp/test-full/.claude/settings.json /tmp/test-full/.claude/hooks/*.sh
ls -la /tmp/test-full/.codex/hooks.json /tmp/test-full/.codex/hooks/*.sh

# 验证 hooks 禁用时无相关文件
test ! -d /tmp/test-minimal/.codex && echo "OK: no .codex" || echo "FAIL"
test ! -f /tmp/test-minimal/.claude/settings.json && echo "OK: no settings" || echo "FAIL"

# 运行现有测试
pnpm test:run

# 最终构建检查
pnpm build
```
