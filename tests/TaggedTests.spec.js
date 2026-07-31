import { test, expect } from "@playwright/test";

// Command examples:
// npx playwright test tests/TaggedTests.spec.js --grep AUTO

test("@AUTO Show/Hide Button validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await page.getByRole("button", { name: "Hide" }).click();

  await page.screenshot({ path: "screenshot.jpg" });

  const showHideInput = page.getByPlaceholder("Hide/Show Example");

  await expect(showHideInput).toBeHidden();

  await page.getByRole("button", { name: "Show" }).click();
  await expect(showHideInput).toBeVisible();

  await showHideInput.screenshot({ path: "locatorScreenshot.png" });
});

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

test("@AUTO Form Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  const iceCheckbox = page.getByLabel("Check me out if you Love IceCreams!");
  const genderSelect = page.getByLabel("Gender");
  const employmentRadio = page.getByLabel("Student");
  const passwordInput = page.getByPlaceholder("Password");

  const submitButton = page.getByRole("button", { name: "Submit" });

  const successMessage = page.getByText(
    "Success! The Form has been submitted successfully!.",
  );

  await iceCheckbox.check();
  await genderSelect.selectOption({ label: "Female" });
  await employmentRadio.check();

  await passwordInput.fill("T@st12345");
  await submitButton.click();

  await expect(successMessage).toBeVisible();

  const shopLink = page.getByRole("link", { name: "Shop" });
  await shopLink.click();

  const productCards = page.locator(".card");

  const productName = "Nokia Edge";

  await productCards
    .filter({ hasText: new RegExp(`${productName}`, "i") })
    .getByRole("button", { name: "Add" })
    .click();

  await expect(page.getByText("Checkout ( 1 )")).toBeVisible();
});
