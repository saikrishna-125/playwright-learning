import { test, expect } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

async function loginAndGoToBooking(page) {
  await page.goto(`${BASE_URL}/login`);
  const emailInput = page.getByLabel("Email");
  const passwordInput = page.getByLabel("Password");
  const signInButton = page.getByRole("button", { name: "Sign In" });

  await emailInput.fill("testmailsk1259@yopmail.com");
  await passwordInput.fill("T@st12345");
  await signInButton.click();

  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();
}

test.describe.serial("Serial test group", () => {
  test("@APP Test 1 - Single ticket booking is eligible for refund", async ({
    page,
  }) => {
    await loginAndGoToBooking(page);

    await page.goto(`${BASE_URL}/events`);

    const eventCard = page.locator("article[data-testid='event-card']").first();

    await expect(eventCard).toBeVisible();

    await eventCard.getByRole("link", { name: "Book Now" }).click();

    await page.getByLabel("Full Name").fill("John Doe");
    await page.getByLabel("Email").fill("testmailsk1259@yopmail.com");
    await page.getByLabel("Phone Number").fill("+91 12345 67890");

    await page.getByRole("button", { name: "Confirm Booking" }).click();

    await page.getByRole("button", { name: "View My Bookings" }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    const bookingCard = page.locator("#booking-card").first();

    await bookingCard.getByRole("button", { name: "View Details" }).click();

    await expect(
      page.getByRole("heading", { name: "Booking information" }),
    ).toBeVisible();

    const bookingRef = (await page.locator("main nav").textContent()).split(
      "/",
    )[1];

    const eventTitle = await page.locator("h1").textContent();

    await expect(bookingRef[0] === eventTitle[0]).toBeTruthy();

    await page
      .getByRole("button", { name: "Check eligibility for refund?" })
      .click();

    // await expect(page.locator("#refund-spinner")).toBeVisible();

    // await expect(page.locator("#refund-spinner")).not.toBeVisible();

    await expect(page.locator("#refund-result")).toContainText(
      /Eligible for refund/,
    );
    await expect(page.locator("#refund-result")).toContainText(
      /Single-ticket bookings qualify for a full refund./,
    );
  });

  test("@APP Test 2 — Group ticket booking is NOT eligible for refund", async ({
    page,
  }) => {
    await loginAndGoToBooking(page);

    await page.goto(`${BASE_URL}/events`);

    const eventCard = page.locator("article[data-testid='event-card']").first();

    await expect(eventCard).toBeVisible();

    await eventCard.getByRole("link", { name: "Book Now" }).click();

    await page.getByLabel("Full Name").fill("John Doe");
    await page.getByLabel("Email").fill("testmailsk1259@yopmail.com");
    await page.getByLabel("Phone Number").fill("+91 12345 67890");

    await page.getByRole("button", { name: "+", exact: true }).click();
    await page.getByRole("button", { name: "+", exact: true }).click();

    await page.getByRole("button", { name: "Confirm Booking" }).click();

    await page.getByRole("button", { name: "View My Bookings" }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    const bookingCard = page.locator("#booking-card").first();

    await bookingCard.getByRole("button", { name: "View Details" }).click();

    await expect(
      page.getByRole("heading", { name: "Booking information" }),
    ).toBeVisible();

    const bookingRef = (await page.locator("main nav").textContent()).split(
      "/",
    )[1];

    const eventTitle = await page.locator("h1").textContent();

    await expect(bookingRef[0] === eventTitle[0]).toBeTruthy();

    await page
      .getByRole("button", { name: "Check eligibility for refund?" })
      .click();

    // await expect(page.locator("#refund-spinner")).toBeVisible();

    // await expect(page.locator("#refund-spinner")).not.toBeVisible();

    await expect(page.locator("#refund-result")).toHaveText(
      /Not eligible for refund./,
    );

    await expect(page.locator("#refund-result span")).toContainText(
      /Group bookings \(3 tickets\) are non-refundable./,
    );
  });
});
