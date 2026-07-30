const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("@playwright/test");

Given(
  "user logs into application using {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    const loginPage = await this.pageObjectManager.getLoginPage();

    await loginPage.goto();
    await loginPage.validLogin(username, password);
  },
);

When("user adds {string} product to cart", async function (productName) {
  await expect(
    this.page.locator("button[routerlink*='myorders']"),
  ).toBeVisible();
  const dashboardPage = await this.pageObjectManager.getDashboardPage();

  await dashboardPage.addProductToCart(productName);
  await dashboardPage.navigateToCart();
  await expect(this.page.locator("div.cart h3")).toHaveText(productName, {
    ignoreCase: true,
  });
});

Then("cart should have {string} product", async function (productName) {
  await expect(this.page.locator("div.cart h3")).toHaveText(productName, {
    ignoreCase: true,
  });
});

When(
  "user completes checkout with country as {string}",
  async function (country) {
    const checkoutPage = await this.pageObjectManager.getCheckoutPage();

    await checkoutPage.navigateToCheckout();
    await checkoutPage.placeOrder(country);
    await expect(
      this.page.getByRole("heading", { name: /thankyou for the order./i }),
    ).toBeVisible();
    this.orderId = await checkoutPage.extractOrderId();
  },
);

Then(
  "the Order ID should be present in the Orders History page",
  async function () {
    const ordersPage = await this.pageObjectManager.getOrdersPage();
    await ordersPage.navigateToOrders();
    await ordersPage.openOrder(this.orderId);
    await ordersPage.validateOrderSummary(this.orderId);
  },
);
