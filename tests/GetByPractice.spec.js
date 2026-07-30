import { test, expect } from "@playwright/test";

test("@APP Form Validation", async ({ page }) => {
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
