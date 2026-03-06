import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  test: {
    // 使用 jsdom 模拟浏览器环境
    environment: "jsdom",
    // 全局注入 describe/it/expect，无需手动 import
    globals: true,
    // 测试前执行的 setup 文件
    setupFiles: ["./tests/setup.ts"],
    // 覆盖率配置
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/e2e/",
        "src/routeTree.gen.ts",
        "*.config.*",
      ],
    },
    // 排除 E2E 测试
    exclude: ["node_modules", "tests/e2e"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
