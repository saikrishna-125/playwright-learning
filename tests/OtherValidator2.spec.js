import { test, expect } from "@playwright/test";

test("@APP Visible and Hidden validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //   await page.goto("http://www.google.com/");
  //   await page.goBack();
  //   await page.goForward();

  const inputLocator = page.locator("#displayed-text");

  const hideButton = page.getByRole("button", { name: "Hide" });

  await expect(inputLocator).toBeVisible();

  await hideButton.click();

  await expect(inputLocator).toBeHidden();

  page.on("dialog", (dialog) => {
    console.log(dialog.type());
    console.log(dialog.message());
    dialog.accept();
  });

  await page.locator("#confirmbtn").click();

  await page.locator("#alertbtn").click();

  await page.locator("#mousehover").hover();

  const frameLocator = page.frameLocator("#courses-iframe");

  await frameLocator.getByRole("link", { name: "All Access Plan" }).click();
  const subCount = (
    await frameLocator.locator("div.content-side h2").textContent()
  ).split(" ")[1];

  console.log(subCount);
});
