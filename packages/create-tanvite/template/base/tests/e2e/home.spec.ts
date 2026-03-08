import { expect, test } from "@playwright/test";

test("starter 首页正常渲染", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Ship product code without rebuilding your frontend foundation/,
    })
  ).toBeVisible();
  await expect(page.getByText(/starts with routing, query state, TypeScript/)).toBeVisible();
});
