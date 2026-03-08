## Why

当前分发方式依赖 GitHub template 或 `git clone`，会把整个仓库完整复制到用户的新项目中。这会把变更日志、许可证、showcase、agent 工作流文件等仅对 TanVite 维护者有价值的资产一并带给 starter 使用者，增加理解和清理成本。

## What Changes

- 增加 `create-tanvite` 脚手架工作流，让用户可以通过 `npm create tanvite` 或等价的包管理器命令初始化项目。
- 将面向最终用户的 starter 模板与仓库维护资产分离，确保生成项目只包含预期的应用脚手架内容。
- 支持 starter 初始化默认配置，并为首次建项目不一定需要的能力提供可选功能开关。
- 更新公开文档和 showcase 文案，引导用户使用脚手架工作流，同时仅为贡献者和维护者保留仓库 clone 方式说明。

## Capabilities

### New Capabilities
- `project-scaffolding-cli`: 通过包管理器的 create 命令从整理后的模板生成 TanVite starter 项目，并将仓库专属文件排除在输出结果之外。

### Modified Capabilities

## Impact

- 影响项目分发方式和用户初始化流程
- 需要新增可发布的 CLI 包以及专用 starter 模板来源
- 会影响 `README.md`、`README.zh-CN.md`、showcase 文案以及贡献者说明
- 可能影响 GitHub Pages、OpenSpec 资产、OpenAPI 工具链和测试配置在生成项目中的默认包含方式
