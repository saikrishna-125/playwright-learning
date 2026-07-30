class CheckoutPage {
  constructor(page) {
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

  async placeOrder(country) {
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

  async extractOrderId() {
    return (await this.orderID.textContent()).replaceAll("|", " ").trim();
  }
}

module.exports = CheckoutPage;
