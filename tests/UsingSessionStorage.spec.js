import { test, expect } from "@playwright/test";

// Shopping workflow covered in E2EAutomation.spec.js to avoid shared-account conflicts.

test.describe.skip("UsingSessionStorage", () => {
  let webContext;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const emailInput = page.getByPlaceholder("email@example.com");
    const passwordInput = page.getByPlaceholder("Enter your passsword");
    const loginBtn = page.getByRole("button", { name: "Login" });

    await emailInput.fill("testuserlast@gmail.com");
    await passwordInput.fill("T@st12345");

    await loginBtn.click();

    await page.locator("button[routerlink*='myorders']").waitFor();

    await context.storageState({ path: "state.json" });

    webContext = await browser.newContext({ storageState: "state.json" });
  });

  test("@APP shopping Workflow Validation", async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
  });
});
