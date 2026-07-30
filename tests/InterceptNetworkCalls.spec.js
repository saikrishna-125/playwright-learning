import { test, expect, request } from "@playwright/test";

let token;

test.beforeAll(async () => {
  const loginPayload = {
    userEmail: "testuserlast@gmail.com",
    userPassword: "T@st12345",
  };

  const apiContext = await request.newContext();

  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    },
  );

  token = (await loginResponse.json()).token;
});

test("@APP No Orders Found Validation", async ({ page }) => {
  const noOrdersBody = { data: [], message: "No Orders" };

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const apiResponse = await route.fetch();
      await route.fulfill({
        response: apiResponse,
        body: JSON.stringify(noOrdersBody),
      });
    },
  );

  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");

  await expect(page.getByText("no orders to show")).toBeVisible();
});

test("@APP Invalid Order Validation", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  const replacementUrl =
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a5b968485b8849b49f5bc6b745";

  // await page.route(
  //   "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
  //   async (route) => await route.continue({ url: replacementUrl }),
  // );

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) => {
      const response = await route.fetch({
        url: replacementUrl,
      });
      await route.fulfill({ response });
    },
  );

  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");

  await page
    .locator("table tbody tr")
    .first()
    .getByRole("button", { name: "View" })
    .click();

  await expect(page.locator("p.blink_me")).toHaveText(
    "You are not authorize to view this order",
  );
});
