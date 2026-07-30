import { test, expect } from "@playwright/test";

test("@APP Calendar Automation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  const year = 2124;
  const month = 5;
  const day = 12;

  const calendarButton = page.locator("button[class*='calendar-button']");
  const calendarNav = page.locator(
    "button[class*='calendar__navigation__label']",
  );

  const prevArrow = page.locator("button[class*='prev-button']");
  const nextArrow = page.locator("button[class*='next-button']");

  const yearButton = page.getByRole("button", {
    name: String(year),
    exact: true,
  });

  const currentyear = page.locator("button[class*='hasActive']");

  const monthViewButtons = page.locator("button[class*='view__months']");
  const dayViewButtons = page.locator(
    "button.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)",
  );

  await calendarButton.click();
  await calendarNav.click();
  await calendarNav.click();

  const yearChangeButton =
    Number(await currentyear.textContent()) > year ? prevArrow : nextArrow;

  while (!(await yearButton.isVisible())) {
    await yearChangeButton.click();
  }

  await yearButton.click();

  await monthViewButtons.nth(month - 1).click();

  await dayViewButtons.getByText(String(day), { exact: true }).click();

  const monthInput = page.locator("input[class*='inputGroup__month']");
  const dayInput = page.locator("input[class*='inputGroup__day']");
  const yearInput = page.locator("input[class*='inputGroup__year']");

  await expect(monthInput).toHaveAttribute("value", String(month));
  await expect(dayInput).toHaveAttribute("value", String(day));
  await expect(yearInput).toHaveAttribute("value", String(year));
});
