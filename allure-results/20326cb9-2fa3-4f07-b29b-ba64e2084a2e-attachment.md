# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignment2.spec.js >> Serial test group >> @APP Test 1 - Single ticket booking is eligible for refund
- Location: tests\Assignment2.spec.js:21:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Booking information' })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('heading', { name: 'Booking information' })

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
  - text: testmailsk1259@yopmail.com
  - button "Logout"
- main:
  - heading "My Bookings" [level=1]
  - paragraph: View and manage all your ticket bookings
  - button "Clear all bookings"
  - paragraph: Do this often for clean test data.
  - text: "E-FRWRFH confirmed #104263"
  - heading "Event Title 1785363740683" [level=3]
  - text: 📅 12 Dec 2026 🎫 1 ticket 📍 Bangalore 🗓 Booked 29 Jul 2026
  - paragraph: $100
  - paragraph: total
  - link "View Details":
    - /url: /bookings/104263
    - button "View Details"
  - button "Cancel Booking"
  - text: "D-PKQ2WP confirmed #104262"
  - heading "Dilli Diwali Mela" [level=3]
  - text: 📅 20 Oct 2026 🎫 1 ticket 📍 Delhi 🗓 Booked 29 Jul 2026
  - paragraph: $300
  - paragraph: total
  - link "View Details":
    - /url: /bookings/104262
    - button "View Details"
  - button "Cancel Booking"
  - text: "D-02WPQ9 confirmed #104260"
  - heading "Dilli Diwali Mela" [level=3]
  - text: 📅 20 Oct 2026 🎫 3 tickets 📍 Delhi 🗓 Booked 29 Jul 2026
  - paragraph: $900
  - paragraph: total
  - link "View Details":
    - /url: /bookings/104260
    - button "View Details"
  - button "Cancel Booking"
  - text: "E-U6VQNO confirmed #104259"
  - heading "Event Title 1785363663176" [level=3]
  - text: 📅 12 Dec 2026 🎫 1 ticket 📍 Bangalore 🗓 Booked 29 Jul 2026
  - paragraph: $100
  - paragraph: total
  - link "View Details":
    - /url: /bookings/104259
    - button "View Details"
  - button "Cancel Booking"
  - text: "D-8JZMF3 confirmed #104258"
  - heading "Dilli Diwali Mela" [level=3]
  - text: 📅 20 Oct 2026 🎫 1 ticket 📍 Delhi 🗓 Booked 29 Jul 2026
  - paragraph: $300
  - paragraph: total
  - link "View Details":
    - /url: /bookings/104258
    - button "View Details"
  - button "Cancel Booking"
  - text: "D-I21A2Q confirmed #104257"
  - heading "Dilli Diwali Mela" [level=3]
  - text: 📅 20 Oct 2026 🎫 1 ticket 📍 Delhi 🗓 Booked 29 Jul 2026
  - paragraph: $300
  - paragraph: total
  - link "View Details":
    - /url: /bookings/104257
    - button "View Details"
  - button "Cancel Booking"
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

```
Error: apiRequestContext._wrapApiCall: Target page, context or browser has been closed
```