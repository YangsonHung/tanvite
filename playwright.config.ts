import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  // 并行执行
  fullyParallel: true,
  // CI 环境中禁止 test.only
  forbidOnly: !!process.env.CI,
  // CI 环境中不重试，本地重试 1 次
  retries: process.env.CI ? 2 : 1,
  // CI 环境中单 worker
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "playwright-report" }], ["list"]],
  use: {
    // 基础 URL，与 vite dev 端口对应
    baseURL: "http://localhost:4319",
    // 失败时截图
    screenshot: "only-on-failure",
    // 失败时录像
    video: "retain-on-failure",
    // 追踪（用于调试）
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // 移动端
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
  // 运行 E2E 前先启动开发服务器
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:4319",
    reuseExistingServer: !process.env.CI,
  },
});
