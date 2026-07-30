import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import CheckoutPage from "./CheckoutPage";
import OrdersPage from "./OrdersPage";

import { type Page } from "@playwright/test";

export default class PageObjectManager {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  checkoutPage: CheckoutPage;
  ordersPage: OrdersPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.ordersPage = new OrdersPage(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getOrdersPage() {
    return this.ordersPage;
  }
}
