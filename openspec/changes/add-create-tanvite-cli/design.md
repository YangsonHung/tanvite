## Context

TanVite 当前同时承担两类职责：既是可复用的 starter，又是 showcase 页面、agent 资产、贡献者说明、OpenSpec 工作流资产以及发布相关仓库文件的维护主仓库。这种结构对维护者比较方便，但会导致 starter 使用者在使用 GitHub template 或 `git clone` 时拿到大量不属于目标应用基线的文件。

本次变更引入专用脚手架入口，使仓库仍然可以继续承载事实来源级别的维护资产，而生成出来的项目只包含经过筛选的 starter 内容。设计上需要保持维护者现有的开发体验，继续以 `pnpm` 作为包管理器基线，并避免 starter 模板与仓库源码之间出现需要手工长期同步的分叉。

## Goals / Non-Goals

**Goals:**
- 提供一个可通过包管理器 create 命令运行的 `create-tanvite` CLI。
- 将仓库维护文件与 starter 输出分离，确保生成项目只包含预期的 starter 资产。
- 允许 CLI 根据项目名称和所选功能开关定制生成结果。
- 让公开文档围绕新的推荐初始化路径保持一致。

**Non-Goals:**
- 在这次变更中重做 starter 本身的应用架构。
- 引入远程代码生成服务或只能在线使用的初始化流程。
- 完全移除面向希望查看或扩展 TanVite 本体的贡献者的仓库 clone 支持。

## Decisions

### Use a dedicated `create-tanvite` package instead of overloading the main repository root

仓库根目录当前同时包含 starter 代码和维护资产。引入独立的脚手架包，可以明确区分“用于构建 TanVite 自身的文件”和“要输出给新项目的文件”。这也更符合用户对 `npm create ...` 工具的预期，并且便于后续发布到 npm，而不需要暴露整个仓库布局。

Alternative considered:
- 继续以 GitHub template 作为主流程，再补充清理说明。否决原因是它仍然会把不需要的文件交给用户，并且依赖用户手工删除。

### Move starter-emitted files into a curated template source

CLI 应当从一个专门的模板目录复制内容，这个目录应该准确表达面向用户交付的 starter。模板来源可以和仓库代码共存，但不能等同于仓库根目录。除非明确属于 starter 体验的一部分，否则模板应排除 showcase 文件、变更日志、贡献者文档、agent 指令和发布元数据等仓库专属资产。

Alternative considered:
- 直接复制仓库根目录，再在 CLI 内维护排除列表。否决原因是随着仓库演进，这种排除列表会变得脆弱，也会让 starter 输出意外依赖不相关的仓库变动。

### Support a small set of explicit feature toggles

TanVite 中有些能力很有价值，但不一定适合每个新项目默认启用。CLI 应提供一个基础 preset，并允许用户按需启用可选功能，例如 OpenSpec 资产、OpenAPI 工具链、MSW/Prism mock 流程、Playwright、GitHub Pages 支持以及 AI agent 资产。把这些开关显式化，有助于减少隐式耦合并让初始化行为更可预期。

Alternative considered:
- 提供一个不带任何选项的“大而全” starter。否决原因是这只是换一种分发形式重复当前问题。

### Keep generated output deterministic and locally rendered

CLI 初版应只做本地文件复制和 token 替换，不依赖远程脚手架 API。这样可以提升初始化可靠性，在包下载完成后支持离线工作，并让生成结果更容易审计。

Alternative considered:
- 根据交互动态拼装代码模板并实时生成文件。否决原因是首版复杂度过高，也更难保证与源模板保持一致。

## Risks / Trade-offs

- [模板与仓库源码发生分叉] → 定义单一的整理后模板来源，并明确所有权规则，后续 starter 变更优先在模板来源中完成。
- [功能开关增加维护成本] → 首版保持较小的选项集合，优先使用粗粒度开关，避免过多细碎选项。
- [迁移期间文档表述混乱] → 在同一次变更中同步更新 README、README.zh-CN、showcase 文案和贡献者说明，确保只有一条主 onboarding 路径。
- [发布 CLI 增加额外发布负担] → 保持 CLI 足够轻量，以文件系统操作为主，降低版本管理和测试复杂度。

## Migration Plan

1. 定义整理后 starter 模板的边界，并识别哪些文件继续保留为仓库专属资产。
2. 实现 `create-tanvite` 包，以及带 token 替换和按开关裁剪能力的模板复制流程。
3. 更新文档和 showcase 的 onboarding 文案，把 create 命令作为主推荐入口。
4. 验证生成项目可以完成安装、构建，并在所选功能集下保留预期运行能力。
5. 将仓库 clone 使用方式仅保留在贡献者和维护者相关文档中。

Rollback strategy:
- 在 create 工作流验证并发布完成之前，继续保留现有仓库模板流程作为兜底方案。
- 如果 CLI 稳定性不足，则从推荐路径中移除，而不破坏仓库源码布局。

## Open Questions

- 首个版本应该包含哪些功能开关，哪些应延后到后续迭代？
- 生成项目是否默认包含双语 README，还是收敛为一份更面向 starter 使用者的 README？
- CLI 应该作为本仓库中的 workspace package 存在，还是拆到单独的发布仓库中并同步模板内容？
