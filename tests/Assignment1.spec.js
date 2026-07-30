import { test, expect } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

async function loginHelper(page) {
  await page.goto(`${BASE_URL}/login`);

  const emailInput = page.getByPlaceholder("you@email.com");
  const passwordInput = page.getByLabel("Password");
  const signInButton = page.locator("#login-btn");

  await emailInput.fill("testmailsk1259@yopmail.com");
  await passwordInput.fill("T@st12345");

  await signInButton.click();
}

test("@APP Add Event Validation", async ({ page }) => {
  const eventsLink = page.getByRole("link", {
    name: "Events",
    exact: true,
  });

  await loginHelper(page);
  await expect(eventsLink).toBeVisible;
  await eventsLink.click();
  await page.getByRole("button", { name: "Add New Event" }).click();

  const eventTitle = `Event Title ${Date.now()}`;
  await page.locator("#event-title-input").fill(eventTitle);
  await page
    .locator("#admin-event-form textarea")
    .fill("Test event Description");
  await page.getByLabel("City").fill("Bangalore");
  await page.getByLabel("Venue").fill("1234 St, bangalore, India");
  await page.getByLabel("Event Date & Time").fill("2026-12-12T12:25");
  await page.getByLabel("Price ($)").fill("100");
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("#add-event-btn").click();

  await expect(page.getByText("Event Created!")).toBeVisible();

  await eventsLink.click();

  const eventCards = page.locator("article[data-testid='event-card']");
  await expect(eventCards.first()).toBeVisible();

  const eventCard = eventCards.filter({ hasText: eventTitle });
  await expect(eventCard).toBeVisible();

  let seatsBeforeBooking = await eventCard
    .getByText("seats available")
    .textContent();

  seatsBeforeBooking = seatsBeforeBooking.split(" ")[0];

  await eventCard.locator("#book-now-btn").click();

  await page.getByLabel("Full Name").fill("john Doe");
  await page.locator("#customer-email").fill("john.doe@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 12345 67890");
  await page.locator(".confirm-booking-btn").click();

  const bookRefLoc = await page.locator(".booking-ref").first();

  await expect(bookRefLoc).toBeVisible();

  const bookingRef = (await bookRefLoc.textContent()).trim();

  await page.getByRole("link", { name: "View My Bookings" }).click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  const bookingCards = await page.locator("#booking-card");

  const bookingCard = bookingCards.filter({
    has: page.locator(".booking-ref", { hasText: bookingRef }),
  });

  await expect(bookingCard).toBeVisible();

  await expect(bookingCard.getByRole("heading")).toHaveText(eventTitle);

  await eventsLink.click();

  await expect(eventCards.first()).toBeVisible();
  await expect(eventCard).toBeVisible();

  let seatsAfterBooking = await eventCard.getByText("seats available");

  const expectedSeats = Number(seatsBeforeBooking) - 1;

  await expect(seatsAfterBooking).toHaveText(
    `${expectedSeats} seats available`,
  );
});
