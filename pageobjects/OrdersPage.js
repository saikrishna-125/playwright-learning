const { expect } = require("@playwright/test");

class OrdersPage {
  constructor(page) {
    this.page = page;
    this.ordersButton = page.locator("button[routerlink*='myorders']");
    this.orderRows = page.locator("tbody tr");
    this.orderIdSummary = page.locator("div.col-text");
  }

  async navigateToOrders() {
    await this.ordersButton.click();
  }

  async openOrder(orderId) {
    await expect(this.orderRows.first()).toBeVisible();
    const orderRow = this.orderRows.filter({
      has: this.page.locator("th", { hasText: orderId }),
    });
    await expect(orderRow).toBeVisible();
    await orderRow.getByRole("button", { name: "View" }).click();
  }

  async validateOrderSummary(orderId) {
    await expect(this.orderIdSummary).toHaveText(orderId);
  }
}

module.exports = OrdersPage;
