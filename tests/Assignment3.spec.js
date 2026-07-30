import { test, expect } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

const loginCredentials = {
  username: "testmailsk1259@yopmail.com",
  password: "T@st12345",
};

const SIX_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 5,
      title: "Lollapalooza India",
      category: "Festival",
      eventDate: "2025-06-20T12:00:00.000Z",
      venue: "Mahalaxmi Racecourse",
      city: "Mumbai",
      price: "3000",
      totalSeats: 5000,
      availableSeats: 2000,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 6,
      title: "AI & ML Expo",
      category: "Conference",
      eventDate: "2025-06-25T10:00:00.000Z",
      venue: "Bangalore International Exhibition Centre",
      city: "Bangalore",
      price: "750",
      totalSeats: 300,
      availableSeats: 180,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://eventhub.rahulshettyacademy.com/login");

  await page.getByLabel("Email").fill(loginCredentials.username);
  await page.getByLabel("Password").fill(loginCredentials.password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Browse Events →")).toBeVisible();

  await context.storageState({ path: "state2.json" });
});

test("@APP Banner IS visible when 6 events are returned", async ({
  browser,
}) => {
  webContext = await browser.newContext({ storageState: "state2.json" });

  const page = await webContext.newPage();

  await page.route("**/api/events**", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response: response,
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(SIX_EVENTS_RESPONSE),
    });
  });

  await page.goto("https://eventhub.rahulshettyacademy.com/events");

  const eventCards = page.locator("article[data-testid='event-card']");

  await expect(eventCards.first()).toBeVisible();
  await expect(eventCards).toHaveCount(6);

  const bannerMessage = page.getByText(/sandbox holds up to/i);
  await expect(bannerMessage).toBeVisible();
  await expect(bannerMessage).toHaveText(/9 bookings/i);
});

test("@APP Banner is NOT visible when 4 events are returned", async ({
  browser,
}) => {
  webContext = await browser.newContext({ storageState: "state2.json" });
  const page = await webContext.newPage();

  await page.route("**/api/events**", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response: response,
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(FOUR_EVENTS_RESPONSE),
    });
  });

  await page.goto("https://eventhub.rahulshettyacademy.com/events");

  const eventCards = page.locator("article[data-testid='event-card']");

  await expect(eventCards.first()).toBeVisible();
  await expect(eventCards).toHaveCount(4);

  const bannerMessage = page.getByText(/sandbox holds up to/i);

  await expect(bannerMessage).toBeHidden();
});
