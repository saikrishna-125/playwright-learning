// Import Playwright test runner utilities and the APIRequestContext factory
import { test, expect, request } from "@playwright/test";

// Shared auth token used by both tests; declared outside so beforeAll can set it once
let token;

// Runs once before any test in this file — ideal for expensive setup like login
test.beforeAll(async () => {
  // Request body the login API expects (email + password)
  const loginPayload = {
    userEmail: "testuserlast@gmail.com",
    userPassword: "T@st12345",
  };

  // Create a standalone API context for HTTP calls outside the browser (no page needed)
  const apiContext = await request.newContext();

  // POST to the login endpoint; returns a Response object with status, headers, body
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload, // Playwright serializes this object as JSON in the request body
    },
  );

  // Parse JSON from the response and store the JWT so UI tests can authenticate
  token = (await loginResponse.json()).token;
});

// Test tag @APP helps filter this test when running: npx playwright test --grep @APP
test("@APP No Orders Found Validation", async ({ page }) => {
  // Mock API payload: empty order list with a message the app may use internally
  const noOrdersBody = { data: [], message: "No Orders" };

  // Inject script before page loads so localStorage has the auth token on first paint
  await page.addInitScript((value) => {
    // Browser-side code: persist token so the SPA treats the user as logged in
    window.localStorage.setItem("token", value);
  }, token); // `token` is passed as the `value` argument to the init script

  // Intercept matching network requests before they reach the real server
  await page.route(
    // URL pattern with * wildcard — matches any customer id in this path
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      // Optionally call the real API first (here we reuse its status/headers)
      const apiResponse = await route.fetch();
      // Fulfill the browser request with a custom body while keeping real response metadata
      await route.fulfill({
        response: apiResponse, // Original response (status, headers) from the server
        body: JSON.stringify(noOrdersBody), // Override only the response body with our mock
      });
    },
  );

  // Navigate to My Orders; the app will call the intercepted API and get empty data
  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");

  // Assert the UI shows the empty-state message when no orders exist
  await expect(page.getByText("no orders to show")).toBeVisible();
});

test("@APP Invalid Order Validation", async ({ page }) => {
  // Same login bootstrap: set token in localStorage before the app initializes
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // Fixed order id that belongs to another user — triggers "not authorized" on the server
  const replacementUrl =
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a5b968485b8849b49f5bc6b745";

  // Alternative approach: rewrite the request URL and let it continue to the server
  // await page.route(
  //   "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
  //   async (route) => await route.continue({ url: replacementUrl }),
  // );

  // Intercept order-detail requests and fetch from a different URL instead
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) => {
      // route.fetch() performs the HTTP call (here to replacementUrl) on behalf of the page
      const response = await route.fetch({
        url: replacementUrl, // Swap the requested id for one the current user cannot access
      });
      // Return that response to the browser as if it came from the original request
      await route.fulfill({ response });
    },
  );

  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");

  // Click "View" on the first order row to trigger the intercepted detail API call
  await page
    .locator("table tbody tr") // Target rows in the orders table body
    .first() // Use the first order in the list
    .getByRole("button", { name: "View" }) // Accessible button labeled "View"
    .click();

  // Verify the app displays the unauthorized error from the API response
  await expect(page.locator("p.blink_me")).toHaveText(
    "You are not authorize to view this order",
  );
});
