## ADDED Requirements

### Requirement: 用户可通过 create 命令初始化 TanVite
系统 SHALL 提供一个可发布的脚手架入口，使用户可以通过包管理器的 create 命令创建新的 TanVite 项目，而无需 clone 整个维护仓库。

#### Scenario: 通过已发布脚手架初始化新项目
- **WHEN** 用户运行 TanVite 支持的 create 命令
- **THEN** 系统创建一个包含整理后 starter 模板的新项目目录

### Requirement: 生成项目必须排除仓库专属维护资产
脚手架工作流 SHALL 只输出与 starter 相关的文件，并且 MUST 排除那些并非面向最终用户项目的仓库维护资产。

#### Scenario: starter 输出中不包含仓库专属文件
- **WHEN** 通过脚手架工作流生成项目
- **THEN** 输出结果中不包含发布日志、仅供贡献者使用的说明、仅供 showcase 使用的源码或 agent 维护文件等仓库专属资产，除非它们被明确选为 starter 功能的一部分

### Requirement: 用户可选择 starter preset 或功能开关
脚手架工作流 SHALL 支持默认 starter 配置，并且 MUST 允许用户按需包含或排除会显著影响项目体积与结构的主要 starter 功能。

#### Scenario: 用户选择可选 starter 功能
- **WHEN** 用户在初始化过程中或通过 CLI flags 选择功能选项
- **THEN** 生成项目只包含所选功能集合实际需要的文件、脚本和配置

### Requirement: 生成项目必须按目标应用元数据完成个性化
脚手架工作流 SHALL 使用用户提供的项目信息替换 starter 中的占位 token，使生成项目无需手工全局重命名即可直接使用。

#### Scenario: 初始化时应用项目元数据
- **WHEN** 用户提供项目名称及相关 starter 元数据
- **THEN** 生成后的包清单、面向应用的名称以及 starter 文档中都一致反映这些元数据

### Requirement: Onboarding 文档必须以 create 工作流为主入口
公开 onboarding 文档 SHALL 将 create 命令工作流描述为启动新 TanVite 项目的主要方式，并且 MUST 与面向贡献者的仓库 clone 指南清晰区分。

#### Scenario: starter 文档体现推荐初始化路径
- **WHEN** 用户阅读 starter onboarding 文档
- **THEN** create 命令工作流被呈现为新项目的默认入口
- **AND** 仓库 template 或 clone 方式仅被限定为贡献 TanVite 本体时使用
