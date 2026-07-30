import { test, expect } from "@playwright/test";

test("@APP Login Validation without CSS", async ({ page }) => {
  await page.route(
    "**/*.{css,jpg,png,jpeg}",
    async (route) => await route.abort(),
  );
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  // page.on("request", (request) => {
  //   console.log(request.url());
  // });

  // page.on("response", (response) => {
  //   console.log(response.url(), response.status());
  // });

  await page.getByLabel("Username").fill("rahulshettyacademy");
  await page.getByLabel("Password").fill("Learning@830$3mK2");
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.locator("app-card").first()).toBeVisible();
});
