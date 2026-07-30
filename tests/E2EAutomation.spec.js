import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
});

test("Title Validation", async ({ page }) => {
  await expect(page).toHaveTitle(/let's shop/i);
});

test("Registration Validation", async ({ page }) => {
  const registerLink = page.getByText(/register here/i);

  await registerLink.click();

  const firstNameInput = page.getByLabel("First Name");
  const lastNameInput = page.getByPlaceholder("Last Name");
  const emailInput = page.getByPlaceholder("email@example.com");
  const phoneNumberInput = page.getByPlaceholder("enter your number");
  const occupationDropdown = page.locator(
    "select[formcontrolname='occupation']",
  );
  const genderRadio = page.getByRole("radio", { name: "Female", exact: true });
  const passwordInput = page.getByPlaceholder("Passsword", { exact: true });
  const confirmPasswordInput = page.getByPlaceholder("Confirm Passsword", {
    exact: true,
  });
  const ageCheckbox = page.getByRole("checkbox");
  const registerButton = page.getByRole("button", { name: "Register" });

  const successMessage = page.getByRole("heading", {
    name: /account created successfully/i,
  });

  await firstNameInput.fill("First Name");
  await lastNameInput.fill("Last Name");
  await emailInput.fill(`firstnamelastname${Date.now()}@gmail.com`);
  await phoneNumberInput.fill("1234567890");
  await occupationDropdown.selectOption({ label: "Doctor" });
  await genderRadio.check();
  await passwordInput.fill("T@st12345");
  await confirmPasswordInput.fill("T@st12345");
  await ageCheckbox.check();
  await registerButton.click();

  await expect(successMessage).toBeVisible();
});

async function login(page) {
  const emailInput = page.getByPlaceholder("email@example.com");
  const passwordInput = page.getByPlaceholder("enter your passsword");
  const loginButton = page.getByRole("button", { name: "Login" });

  await emailInput.fill("testuserlast@gmail.com");
  await passwordInput.fill("T@st12345");
  await loginButton.click();
}

test("Login Validation", async ({ page }) => {
  await login(page);

  const products = page.locator(".card-body");
  await expect(products.first()).toBeVisible();
});

test("Purchase Workflow Validation", async ({ page }) => {
  // Login
  await login(page);

  const products = page.locator(".card-body");
  await expect(products.first()).toBeVisible();

  // Add to Cart
  const productName = "ADIDAS ORIGINAL";

  const product = products.filter({ hasText: productName });
  const addToCartButton = product.getByRole("button", { name: /Add to Cart/i });
  await addToCartButton.click();

  const cartButton = page
    .getByRole("button", { name: "Cart" })
    .filter({ hasNotText: /Add to/i });
  const cartLabel = cartButton.locator("label");
  await expect(cartLabel).toHaveText(/^1$/);
  await cartButton.waitFor();
  await cartButton.click();

  const cartProduct = page.getByRole("heading", { name: productName });
  await expect(cartProduct).toBeVisible();

  // Checkout
  const checkoutButton = page.getByRole("button", { name: "Checkout" });
  await checkoutButton.click();

  const productTitle = page.locator("div.item__title");
  await expect(productTitle).toHaveText(new RegExp(`${productName}`, "i"));

  const inputFields = page.locator("div.title+input");

  const cardNumberInput = inputFields.nth(0);
  await cardNumberInput.fill("1234 2345 3456");

  const cvvCodeInput = inputFields.nth(1);
  await cvvCodeInput.fill("123");

  const nameOnCardInput = inputFields.nth(2);
  await nameOnCardInput.fill("John Doe");

  const couponInput = inputFields.nth(3);
  await couponInput.fill("rahulshettyacademy");

  const applyCouponButton = page.getByRole("button", { name: "Apply coupon" });
  await applyCouponButton.click();

  await expect(page.locator("p", { hasText: "coupon applied" })).toBeVisible();

  const expiryDateDropdowns = page.locator("select.ddl");
  await expiryDateDropdowns.nth(0).selectOption({ label: "08" });
  await expiryDateDropdowns.nth(1).selectOption({ label: "23" });

  const countryInput = page.getByPlaceholder(/select country/i);
  await countryInput.click();
  await countryInput.pressSequentially("india", { delay: 100 });

  const countrySuggestion = page.getByRole("button", { name: /India$/ });
  await expect(countrySuggestion).toBeVisible();

  await countrySuggestion.click();

  const placeOrderButton = page.locator("a", { hasText: /Place Order/ });

  await placeOrderButton.click();

  await expect(
    page.getByRole("heading", { name: /Thankyou for the order/i }),
  ).toBeVisible();

  const orderIDLabel = await page
    .locator("label.ng-star-inserted")
    .textContent();
  const orderID = orderIDLabel.replaceAll("|", "").trim();

  const ordersButton = page.getByRole("button", { name: "ORDERS " });
  await ordersButton.click();

  const orderRow = page
    .locator("tbody tr")
    .filter({ has: page.locator("th", { hasText: orderID }) });
  await expect(orderRow).toBeVisible();

  await orderRow.getByRole("button", { name: "View" }).click();

  await expect(
    page.locator("div.col-text", { hasText: orderID }),
  ).toBeVisible();
  await expect(page.locator("div.title")).toHaveText(
    new RegExp(`${productName}`, "i"),
  );
});
