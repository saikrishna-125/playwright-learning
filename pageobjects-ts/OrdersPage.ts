import { expect, type Page, type Locator } from "@playwright/test";

export default class OrdersPage {
  page: Page;
  ordersButton: Locator;
  orderRows: Locator;
  orderIdSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersButton = page.locator("button[routerlink*='myorders']");
    this.orderRows = page.locator("tbody tr");
    this.orderIdSummary = page.locator("div.col-text");
  }

  async navigateToOrders() {
    await this.ordersButton.click();
  }

  async openOrder(orderId: string) {
    await expect(this.orderRows.first()).toBeVisible();
    const orderRow = this.orderRows.filter({
      has: this.page.locator("th", { hasText: orderId }),
    });
    await expect(orderRow).toBeVisible();
    await orderRow.getByRole("button", { name: "View" }).click();
  }

  async validateOrderSummary(orderId: string) {
    await expect(this.orderIdSummary).toHaveText(orderId);
  }
}
