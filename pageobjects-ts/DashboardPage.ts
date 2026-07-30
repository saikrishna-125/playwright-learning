import { expect, type Page, type Locator } from "@playwright/test";

export default class DashboardPage {
  page: Page;
  productCards: Locator;
  cartLabel: Locator;
  cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator("div.card-body");
    this.cartLabel = page.locator("button label");
    this.cartButton = page.locator("button[routerlink*='cart']");
  }

  async addProductToCart(productName: string) {
    await expect(this.productCards.first()).toBeVisible();
    const productCard = this.productCards.filter({ hasText: productName });
    await productCard.getByRole("button", { name: "Add to Cart" }).click();
    await expect(this.cartLabel).toHaveText("1");
  }

  async navigateToCart() {
    await this.cartButton.click();
  }
}
