import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });
// test.describe.configure({ mode: "serial" });

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

test.skip("Title Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await expect(page).toHaveTitle(/let's shop/i);
});

test.skip("Login Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const emailInput = page.locator("input#userEmail");
  const passwordInput = page.getByPlaceholder(/enter your passsword/i);
  const loginButton = page.getByRole("button", { name: "Login" });
  const productNames = page.locator(".card-body h5");

  await emailInput.fill("testuserlast@gmail.com");
  await passwordInput.fill("T@st12345");
  await loginButton.click();

  await page.waitForLoadState("networkidle");

  await expect(productNames.first()).toBeVisible();

  //   console.log(await productNames.nth(0).textContent());
  //   await page.pause();
});
