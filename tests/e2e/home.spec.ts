import { expect, test } from "@playwright/test";

test("starter 首页正常渲染", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Keep product code in src/ })).toBeVisible();
  await expect(page.getByText(/The landing page and guide are isolated in showcase/)).toBeVisible();
});
