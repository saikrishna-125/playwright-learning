const { expect } = require("@playwright/test");

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator("div.card-body");
    this.cartLabel = page.locator("button label");
    this.cartButton = page.locator("button[routerlink*='cart']");
  }

  async addProductToCart(productName) {
    await expect(this.productCards.first()).toBeVisible();
    const productCard = this.productCards.filter({ hasText: productName });
    await productCard.getByRole("button", { name: "Add to Cart" }).click();
    await expect(this.cartLabel).toHaveText("1");
  }

  async navigateToCart() {
    await this.cartButton.click();
  }
}

module.exports = DashboardPage;
