# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignment4.spec.js >> @APP Unauthorized Access Validation
- Location: tests\Assignment4.spec.js:16:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Access Denied')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByText('Access Denied')

```

```yaml
- navigation:
  - link "EventHub":
    - /url: /
    - img
    - text: EventHub
  - link "Home":
    - /url: /
  - link "Events":
    - /url: /events
  - link "My Bookings":
    - /url: /bookings
  - link "API Docs":
    - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
  - button "Admin":
    - text: Admin
    - img
  - text: testmailsk12599@yopmail.com
  - button "Logout"
- main:
  - img
  - heading "Booking not found" [level=3]
  - paragraph: This booking doesn't exist or may have been cancelled.
  - link "View My Bookings":
    - /url: /bookings
    - button "View My Bookings"
- contentinfo:
  - heading "Rahul Shetty Academy" [level=3]
  - paragraph: India's leading QA automation training academy — empowering engineers to build real-world testing skills.
  - heading "Popular Courses" [level=3]
  - list:
    - listitem:
      - link "Selenium WebDriver with Java":
        - /url: https://rahulshettyacademy.com
    - listitem:
      - link "Playwright with JavaScript":
        - /url: https://rahulshettyacademy.com
    - listitem:
      - link "RestAssured API Testing":
        - /url: https://rahulshettyacademy.com
    - listitem:
      - link "Cypress End-to-End Testing":
        - /url: https://rahulshettyacademy.com
    - listitem:
      - link "Appium Mobile Testing":
        - /url: https://rahulshettyacademy.com
  - heading "QA Job Hiring Platform" [level=3]
  - paragraph: Get hired faster — take skill assessments trusted by top QA employers worldwide.
  - link "techsmarthire.com →":
    - /url: https://techsmarthire.com
  - heading "EventHub Practice App" [level=3]
  - list:
    - listitem:
      - link "Browse Events":
        - /url: /events
    - listitem:
      - link "My Bookings":
        - /url: /bookings
    - listitem:
      - link "Manage Events":
        - /url: /admin/events
    - listitem:
      - link "API Documentation":
        - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
  - paragraph: © 2026 Rahul Shetty Academy. All rights reserved.
  - link "rahulshettyacademy.com →":
    - /url: https://rahulshettyacademy.com
  - link "techsmarthire.com →":
    - /url: https://techsmarthire.com
- alert
```

# Test source

```ts
  1  | import { test, expect, request } from "@playwright/test";
  2  | 
  3  | const BASE_URL = "https://eventhub.rahulshettyacademy.com";
  4  | const API_URL = "https://api.eventhub.rahulshettyacademy.com/api";
  5  | 
  6  | const user1 = {
  7  |   email: "testmailsk1259@yopmail.com",
  8  |   password: "T@st12345",
  9  | };
  10 | 
  11 | const user2 = {
  12 |   email: "testmailsk12599@yopmail.com",
  13 |   password: "T@st12345",
  14 | };
  15 | 
  16 | test("@APP Unauthorized Access Validation", async ({ page }) => {
  17 |   const apiContext = await request.newContext();
  18 | 
  19 |   const loginResponse = await apiContext.post(API_URL + "/auth/login", {
  20 |     data: {
  21 |       email: user1.email,
  22 |       password: user1.password,
  23 |     },
  24 |   });
  25 | 
  26 |   await expect(loginResponse.ok()).toBeTruthy();
  27 | 
  28 |   const token = (await loginResponse.json()).token;
  29 | 
  30 |   const getEventsResponse = await apiContext.get(API_URL + "/events", {
  31 |     headers: {
  32 |       authorization: "Bearer " + token,
  33 |     },
  34 |   });
  35 | 
  36 |   await expect(getEventsResponse.ok()).toBeTruthy();
  37 |   const eventId = (await getEventsResponse.json()).data[0].id;
  38 | 
  39 |   const newBookingResponse = await apiContext.post(API_URL + "/bookings", {
  40 |     data: {
  41 |       eventId: eventId,
  42 |       customerName: "Yahoo User",
  43 |       customerEmail: user1.email,
  44 |       customerPhone: "+91-9876543210",
  45 |       quantity: 1,
  46 |     },
  47 |     headers: {
  48 |       authorization: "Bearer " + token,
  49 |     },
  50 |   });
  51 | 
  52 |   await expect(newBookingResponse.ok()).toBeTruthy();
  53 |   const yahooBookingId = (await newBookingResponse.json()).data.id;
  54 | 
  55 |   await page.goto(BASE_URL + "/login");
  56 | 
  57 |   await page.getByLabel("Email").fill(user2.email);
  58 |   await page.getByLabel("Password").fill(user2.password);
  59 |   await page.getByRole("button", { name: "Sign In" }).click();
  60 | 
  61 |   await expect(
  62 |     page.getByRole("link", { name: "Browse Events →" }),
  63 |   ).toBeVisible();
  64 | 
  65 |   await page.goto(BASE_URL + `/bookings/${yahooBookingId}`);
  66 | 
  67 |   await page.waitForLoadState("networkidle");
  68 | 
> 69 |   await expect(page.getByText("Access Denied")).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  70 |   await expect(
  71 |     page.getByText("You are not authorized to view this booking."),
  72 |   ).toBeVisible();
  73 | });
  74 | 
```