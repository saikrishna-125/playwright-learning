import { test, expect } from "@playwright/test";

test("Show/Hide Button validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await page.getByRole("button", { name: "Hide" }).click();

  await page.screenshot({ path: "screenshot.jpg" });

  const showHideInput = page.getByPlaceholder("Hide/Show Example");

  await expect(showHideInput).toBeHidden();

  await page.getByRole("button", { name: "Show" }).click();
  await expect(showHideInput).toBeVisible();

  await showHideInput.screenshot({ path: "locatorScreenshot.png" });
});

test("Visual Testing", async ({ page }) => {
  await page.goto("https://www.webpagetest.org/blank.html");

  expect(await page.screenshot()).toMatchSnapshot({ name: "landing.png" });
});
