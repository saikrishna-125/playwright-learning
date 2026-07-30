# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignment1.spec.js >> @APP Add Event Validation
- Location: tests\Assignment1.spec.js:18:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#booking-card').filter({ has: locator('.booking-ref').filter({ hasText: 'E-FRWRFH' }) })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for locator('#booking-card').filter({ has: locator('.booking-ref').filter({ hasText: 'E-FRWRFH' }) })

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
- text: ✓
- paragraph: Event created!
- button "Dismiss": ×
- alert
```

```
Error: apiRequestContext._wrapApiCall: Target page, context or browser has been closed
```