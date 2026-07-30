class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("email@example.com");
    this.passwordInput = page.getByPlaceholder("enter your passsword");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = LoginPage;
