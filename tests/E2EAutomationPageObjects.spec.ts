import { test, expect, Page } from "@playwright/test";
import PageObjectManager from "../pageobjects-ts/PageObjectManager";

test("@APP E2E shopping workflow validation", async ({ page }) => {
  const username: string = "testuserlast@gmail.com";
  const password: string = "T@st12345";
  const productName: string = "adidas original";
  const country: string = "india";

  const pageObjectManager: PageObjectManager = new PageObjectManager(page);
  const loginPage: any = pageObjectManager.getLoginPage();
  const dashboardPage: any = pageObjectManager.getDashboardPage();
  const checkoutPage: any = pageObjectManager.getCheckoutPage();
  const ordersPage: any = pageObjectManager.getOrdersPage();

  await loginPage.goto();
  await loginPage.validLogin(username, password);
  await expect(page.locator("button[routerlink*='myorders']")).toBeVisible();

  await dashboardPage.addProductToCart(productName);
  await dashboardPage.navigateToCart();
  await expect(page.locator("div.cart h3")).toHaveText(productName, {
    ignoreCase: true,
  });

  await checkoutPage.navigateToCheckout();
  await checkoutPage.placeOrder(country);
  await expect(
    page.getByRole("heading", { name: /thankyou for the order./i }),
  ).toBeVisible();
  const orderId: string = await checkoutPage.extractOrderId();

  await ordersPage.navigateToOrders();
  await ordersPage.openOrder(orderId);
  await ordersPage.validateOrderSummary(orderId);
});
