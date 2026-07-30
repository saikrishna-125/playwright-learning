import { test, expect, request } from "@playwright/test";
import APIUtils from "./utils_ts/APIUtils";

test("@APP Shopping Workflow Validation", async ({ page }) => {
  const loginPayload: { userEmail: string; userPassword: string } = {
    userEmail: "testuserlast@gmail.com",
    userPassword: "T@st12345",
  };

  const orderPayload: {
    orders: { country: string; productOrderedId: string }[];
  } = {
    orders: [
      {
        country: "India",
        productOrderedId: "6960eac0c941646b7a8b3e68",
      },
    ],
  };

  const apiContext = await request.newContext();

  const apiUtils = new APIUtils(apiContext, loginPayload);

  const { token, orderId } = await apiUtils.createOrder(orderPayload);

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");

  const orderRow = page.locator("table tbody tr").filter({ hasText: orderId });

  await expect(orderRow).toBeVisible();

  await orderRow.getByRole("button", { name: "View" }).click();

  await expect(page.locator("div.col-text")).toHaveText(orderId);
});
