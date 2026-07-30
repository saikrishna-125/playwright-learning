const LoginPage = require("./LoginPage");
const DashboardPage = require("./DashboardPage");
const CheckoutPage = require("./Checkoutpage");
const OrdersPage = require("./OrdersPage");

class PageObjectManager {
  constructor(page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.ordersPage = new OrdersPage(page);
  }

  async getLoginPage() {
    return await this.loginPage;
  }

  async getDashboardPage() {
    return await this.dashboardPage;
  }

  async getCheckoutPage() {
    return await this.checkoutPage;
  }

  async getOrdersPage() {
    return await this.ordersPage;
  }
}

module.exports = PageObjectManager;
