import { test, expect } from "@playwright/test";
import { customTest } from "./utils/test-base.js";
import PageObjectManager from "../pageobjects/PageObjectManager";

customTest(
  "E2E shopping workflow validation",
  async ({ page, orderTestData }) => {
    const username = orderTestData.username;
    const password = orderTestData.password;
    const productName = orderTestData.productName;
    const country = orderTestData.country;

    const pageObjectManager = new PageObjectManager(page);
    const loginPage = await pageObjectManager.getLoginPage();
    const dashboardPage = await pageObjectManager.getDashboardPage();
    const checkoutPage = await pageObjectManager.getCheckoutPage();
    const ordersPage = await pageObjectManager.getOrdersPage();

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
    const orderId = await checkoutPage.extractOrderId();

    await ordersPage.navigateToOrders();
    await ordersPage.openOrder(orderId);
    await ordersPage.validateOrderSummary(orderId);
  },
);
