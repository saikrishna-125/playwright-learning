import { test, expect } from "@playwright/test";

// Login and title checks are covered in E2EAutomation.spec.js to avoid shared-account conflicts.

test.skip("@APP Title Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await expect(page).toHaveTitle(/let's shop/i);
});

test.skip("@APP Login Validation", async ({ page }) => {
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
