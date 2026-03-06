import { expect, test } from "@playwright/test";

test("首页正常渲染", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "TanVite" })).toBeVisible();
});
