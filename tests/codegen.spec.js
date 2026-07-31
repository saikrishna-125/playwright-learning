// Command for code generation:
// npx playwright codegen "https://www.google.com"

import { test, expect } from "@playwright/test";

const credentials = {
  email: "testuserlast@gmail.com",
  password: "T@st12345",
};

const products = ["ZARA COAT", "iphone 13 pro"];

// Shopping workflow covered in E2EAutomation.spec.js to avoid shared-account conflicts.

test.skip("@APP Codegen shopping workflow", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await page.getByPlaceholder("email@example.com").fill(credentials.email);
  await page
    .getByPlaceholder("enter your passsword")
    .fill(credentials.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

  const productCards = page.locator(".card-body");
  await expect(productCards.first()).toBeVisible();

  for (const productName of products) {
    const product = productCards.filter({ hasText: productName });
    await product.getByRole("button", { name: /Add to Cart/i }).click();
  }

  const cartButton = page
    .getByRole("button", { name: "Cart" })
    .filter({ hasNotText: /Add to/i });
  await expect(cartButton.locator("label")).toHaveText("2");
  await cartButton.click();

  for (const productName of products) {
    await expect(
      page.getByRole("heading", { name: new RegExp(productName, "i") }),
    ).toBeVisible();
  }

  await page.getByRole("button", { name: "Checkout" }).click();

  for (const productName of products) {
    await expect(page.locator("section")).toContainText(productName);
  }

  const inputFields = page.locator("div.title+input");
  await inputFields.nth(0).fill("1234 2345 3456");
  await inputFields.nth(1).fill("123");
  await inputFields.nth(2).fill("John Doe");

  const expiryDateDropdowns = page.locator("select.ddl");
  await expiryDateDropdowns.nth(0).selectOption({ label: "08" });
  await expiryDateDropdowns.nth(1).selectOption({ label: "23" });

  const countryInput = page.getByPlaceholder(/select country/i);
  await countryInput.click();
  await countryInput.pressSequentially("india", { delay: 100 });
  await page.getByRole("button", { name: /India$/i }).click();

  await page.locator('input[name="coupon"]').fill("rahulshettyacademy");
  await page.getByRole("button", { name: /Apply [Cc]oupon/i }).click();
  await expect(page.locator("p", { hasText: /coupon applied/i })).toBeVisible();

  await page.locator("a", { hasText: /Place Order/i }).click();

  await expect(
    page.getByRole("heading", { name: /Thankyou for the order/i }),
  ).toBeVisible();

  for (const productName of products) {
    await expect(page.locator("#htmlData")).toContainText(productName);
  }

  const orderId = (await page.locator("label.ng-star-inserted").textContent())
    .replaceAll("|", "")
    .trim();

  await page.getByRole("button", { name: /ORDERS/i }).click();

  const orderRow = page
    .locator("tbody tr")
    .filter({ has: page.locator("th", { hasText: orderId }) });
  await orderRow.getByRole("button", { name: "View" }).click();

  await expect(page.locator("app-order-details")).toMatchAriaSnapshot(
    `- text: Product Ordered`,
  );
});

// Command for code generation:
// npx playwright codegen "https://www.google.com"

// import { test, expect } from "@playwright/test";

// test("test", async ({ page }) => {
//   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//   await page.getByRole("textbox", { name: "email@example.com" }).click();
//   await page
//     .getByRole("textbox", { name: "email@example.com" })
//     .fill("testuserlast@gmail.com");
//   await page.getByRole("textbox", { name: "enter your passsword" }).click();
//   await page
//     .getByRole("textbox", { name: "enter your passsword" })
//     .fill("T@st12345");
//   await page.getByRole("button", { name: "Login" }).click();
//   await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
//   await page.getByRole("button", { name: " Add To Cart" }).nth(1).click();
//   await page.getByRole("button", { name: " Add To Cart" }).nth(2).click();
//   await page.getByRole("button", { name: "   Cart" }).click();
//   await expect(page.getByRole("heading", { name: "ZARA COAT" })).toBeVisible();
//   await expect(
//     page.getByRole("heading", { name: "iphone 13 pro" }),
//   ).toBeVisible();
//   await page.getByRole("button", { name: "Checkout❯" }).click();
//   await expect(page.getByText("ZARA COAT")).toBeVisible();
//   await expect(page.locator("section")).toContainText("iphone 13 pro");
//   await page.getByRole("textbox", { name: "Select Country" }).click();
//   await page
//     .getByRole("textbox", { name: "Select Country" })
//     .pressSequentially("india");
//   await page.getByRole("button", { name: " India" }).click();
//   await page.locator('input[name="coupon"]').click();
//   await page.locator('input[name="coupon"]').fill("rahulshettyacademy");
//   await page.getByRole("button", { name: "Apply Coupon" }).click();
//   await page.getByText("Place Order").click();
//   await expect(page.locator("#htmlData")).toContainText("ZARA COAT 3");
//   await expect(page.locator("#htmlData")).toContainText("iphone 13 pro");
//   await page.getByText("Orders History Page").click();
//   await page.getByRole("button", { name: "View" }).first().click();
//   await expect(page.locator("app-order-details")).toMatchAriaSnapshot(
//     `- text: Product Ordered`,
//   );
// });
