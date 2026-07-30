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
