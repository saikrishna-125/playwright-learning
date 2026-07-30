import { test, expect } from "@playwright/test";

// test("Title Validation using browser, context", async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

//   await expect(page).toHaveTitle(/LoginPage Practise/);
//   // console.log(await page.title());
// });

test("@APP Title Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await expect(page).toHaveTitle(/LoginPage Practise/);

  // console.log(await page.title());
});

test("@APP Invalid Login Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await expect(page).toHaveTitle(/LoginPage Practise/);

  // CSS selector using ID
  const usernameInput = page.locator("input#username");

  // CSS selector using attributes
  const passwordInput = page.locator("input[type='password']");

  // using getByRole
  const signInButton = page.getByRole("button", { name: "Sign In" });

  // Regex validation: True if provided text is a substring of the text in the page and /i for matching text irrespective of casing.
  const errorMessage = page.getByText(/incorrect username\/password./i);

  await usernameInput.fill("rahulshettyacademy");
  await passwordInput.fill("Learning@830$3mK2123");
  await signInButton.click();

  await expect(errorMessage).toBeVisible();

  // console.log(await errorMessage.textContent());

  // await page.pause();
});

test("@APP Valid Login Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const usernameInput = page.locator("input#username");
  const passwordInput = page.locator("input[type='password']");
  // const accessRadio = page.getByLabel("User", { exact: true });
  const accessRadio = page.getByRole("radio", { name: "User" });
  const okayButton = page.getByRole("button", { name: "Okay" });
  const roleDropdown = page.locator("select.form-control");
  const termsCheckbox = page.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const signIn = page.getByRole("button", { name: "Sign In" });

  const productNames = page.locator(".card-body a");

  await usernameInput.fill("rahulshettyacademy");
  await passwordInput.fill("Learning@830$3mK2");
  await accessRadio.check();
  await okayButton.click();

  await expect(accessRadio).toBeChecked();
  // await expect(accessRadio).not.toBeChecked();

  // console.log(await accessRadio.isChecked());
  // await expect(accessRadio.isChecked).toBeTruthy();
  // or
  // expect(await accessRadio.isChecked).toBeTruthy();

  // await roleDropdown.selectOption({ value: "teach" });
  await roleDropdown.selectOption({ label: "Consultant" });

  await termsCheckbox.check();
  await expect(termsCheckbox).toBeChecked();

  await await signIn.click();

  // if I do this, there is no auto-wait for allTextContents method, so we will get an empty list.
  // so, we need to do either one of these two things or both: 1. await page.waitForLoadState('networkidle') 2. check if the first or last element is visible.

  await page.waitForLoadState("networkidle");
  await expect(productNames.first()).toBeVisible();
  await expect(productNames.last()).toBeVisible();

  // console.log(await productNames.nth(1).textContent());

  // if I do this, there is no auto-wait for allTextContents method, so we will get an empty list.
  // so, we need to do either one of these two things or both: 1. await page.waitForLoadState('networkidle') 2. check if the first or last element is visible.
  // console.log(await productNames.allTextContents());
});

test("@APP Blinking link Validation", async ({ page, context }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const interviewLink = page.getByRole("link", {
    name: /Free Access to InterviewQues\/ResumeAssistance\/Material/i,
  });

  await expect(interviewLink).toHaveClass("blinkingText");
  // console.log(await interviewLink.getAttribute("class"));

  const [docsPage] = await Promise.all([
    context.waitForEvent("page"),
    interviewLink.click(),
  ]);

  await expect(docsPage).toHaveTitle(/RS Academy/i);

  const emailLink = await docsPage
    .getByRole("link", { name: /rahulshettyacademy.com/ })
    .textContent();
  const username = emailLink.split("@")[1];

  const usernameInput = page.locator("input#username");
  await usernameInput.fill(username);
  // console.log(await usernameInput.inputValue());

  await expect(usernameInput).toHaveValue("rahulshettyacademy.com");
  // await page.pause();
});
