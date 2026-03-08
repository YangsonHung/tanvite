## 1. 模板边界

- [x] 1.1 定义整理后 starter 模板目录，并识别当前哪些仓库文件继续保留为维护专用资产
- [x] 1.2 在不破坏仓库现有开发流程的前提下，将属于 starter 的源码迁移或复制到模板来源中
- [x] 1.3 记录 starter 模板文件与仓库维护资产之间的所有权规则

## 2. Create CLI

- [x] 2.1 新增一个可发布的 `create-tanvite` CLI 包，用于从整理后的模板中生成项目
- [x] 2.2 实现项目元数据替换逻辑，覆盖包名、应用名和面向 starter 的文档内容
- [x] 2.3 为 OpenSpec、OpenAPI 或 mock 工具链、Playwright、GitHub Pages 和 agent 资产等主要可选能力实现首批功能开关或 preset

## 3. Starter 输出验证

- [x] 3.1 验证生成项目会排除仓库专属文件，并针对每种所选功能集包含预期文件
- [x] 3.2 验证新生成项目可以通过 `pnpm install` 正常安装
- [x] 3.3 验证默认生成项目可以通过最小必要的 `pnpm build` 构建校验

## 4. 文档与采用

- [x] 4.1 更新 `README.md`，将 create 命令作为 starter 使用者的主 onboarding 入口
- [x] 4.2 更新 `README.zh-CN.md` 和 `showcase/src/app.tsx`，保持公开 onboarding 文案的双语一致性
- [x] 4.3 更新 `AGENTS.md` 等面向贡献者的说明，区分 starter 使用流程与仓库维护流程
