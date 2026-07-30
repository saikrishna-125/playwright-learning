import { type Page, type Locator, expect } from "@playwright/test";

export default class CheckoutPage {
  page: Page;
  checkoutButton: Locator;
  couponInput: Locator;
  applyCouponButton: Locator;
  countryInput: Locator;
  placeOrderButton: Locator;
  orderID: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    this.couponInput = page.locator("input[name='coupon']");
    this.applyCouponButton = page.getByRole("button", { name: "Apply Coupon" });
    this.countryInput = page.getByPlaceholder("Select Country");
    this.placeOrderButton = page.locator("a", { hasText: "Place Order" });

    this.orderID = page.locator("label.ng-star-inserted");
  }

  async navigateToCheckout() {
    await this.checkoutButton.click();
  }

  async placeOrder(country: string) {
    await this.couponInput.fill("rahulshettyacademy");
    await this.applyCouponButton.click();
    await this.countryInput.waitFor();
    await this.countryInput.click();
    await this.countryInput.pressSequentially(country);
    await this.page
      .getByRole("button", { name: new RegExp(`${country}$`, "i") })
      .click();
    await this.placeOrderButton.waitFor();
    await this.placeOrderButton.click();
  }

  async extractOrderId(): Promise<string> {
    const orderIdText = await this.orderID.textContent();
    expect(orderIdText).not.toBeNull();
    return orderIdText!.replaceAll("|", " ").trim();
  }
}
