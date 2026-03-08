import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // type 枚举，可按需增减
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // Bug 修复
        "docs", // 文档变更
        "style", // 代码格式（不影响逻辑）
        "refactor", // 重构（既非新功能也非修复）
        "perf", // 性能优化
        "test", // 测试相关
        "build", // 构建系统或外部依赖变更
        "ci", // CI 配置变更
        "chore", // 杂项（不涉及 src 和 test）
        "revert", // 回滚提交
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    // 提交信息最大长度
    "header-max-length": [2, "always", 100],
  },
};

export default config;
