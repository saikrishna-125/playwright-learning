import { test, expect, request } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = "https://api.eventhub.rahulshettyacademy.com/api";

const user1 = {
  email: "testmailsk1259@yopmail.com",
  password: "T@st12345",
};

const user2 = {
  email: "testmailsk12599@yopmail.com",
  password: "T@st12345",
};

test("@APP Unauthorized Access Validation", async ({ page }) => {
  const apiContext = await request.newContext();

  const loginResponse = await apiContext.post(API_URL + "/auth/login", {
    data: {
      email: user1.email,
      password: user1.password,
    },
  });

  await expect(loginResponse.ok()).toBeTruthy();

  const token = (await loginResponse.json()).token;

  const getEventsResponse = await apiContext.get(API_URL + "/events", {
    headers: {
      authorization: "Bearer " + token,
    },
  });

  await expect(getEventsResponse.ok()).toBeTruthy();
  const eventId = (await getEventsResponse.json()).data[0].id;

  const newBookingResponse = await apiContext.post(API_URL + "/bookings", {
    data: {
      eventId: eventId,
      customerName: "Yahoo User",
      customerEmail: user1.email,
      customerPhone: "+91-9876543210",
      quantity: 1,
    },
    headers: {
      authorization: "Bearer " + token,
    },
  });

  await expect(newBookingResponse.ok()).toBeTruthy();
  const yahooBookingId = (await newBookingResponse.json()).data.id;

  await page.goto(BASE_URL + "/login");

  await page.getByLabel("Email").fill(user2.email);
  await page.getByLabel("Password").fill(user2.password);
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();

  await page.goto(BASE_URL + `/bookings/${yahooBookingId}`);

  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Access Denied")).toBeVisible();
  await expect(
    page.getByText("You are not authorized to view this booking."),
  ).toBeVisible();
});
