import { test, expect } from "@playwright/test";

test("@APP Title Validation", async ({ page }) => {
  const slowExpect = expect.configure({ timeout: 40_000 });
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await slowExpect(page).toHaveTitle(/let's shop/i);
});

test("@APP Login Validation", async ({ page }) => {
  const fastExpect = expect.configure({ timeout: 10_000 });
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const emailInput = page.locator("input#userEmail");
  const passwordInput = page.getByPlaceholder(/enter your passsword/i);
  const loginButton = page.getByRole("button", { name: "Login" });
  const productNames = page.locator(".card-body h5");

  await emailInput.fill("testuserlast@gmail.com");
  await passwordInput.fill("T@st12345");
  await loginButton.click();

  await page.waitForLoadState("networkidle");

  await fastExpect(productNames.first()).toBeVisible();

  //   console.log(await productNames.nth(0).textContent());
  //   await page.pause();
});
