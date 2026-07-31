// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: "./tests",

  reporter: [
    ["list"],
    ["html"],
    // ["list"],
    // [
    //   "allure-playwright",
    //   {
    //     resultsDir: "allure-results",
    //     detail: true,
    //     suiteTitle: true,
    //   },
    // ],
  ],

  // timeout settings
  timeout: 60 * 1000,
  expect: {
    timeout: 20 * 1000,
  },

  // retries
  retries: 1,

  // workers
  workers: 3,

  // use: {
  //   /* Base URL to use in actions like `await page.goto('')`. */

  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //   trace: "retain-on-failure",
  //   screenshot: "only-on-failure",

  //   headless: true,
  // },

  /* Configure projects for major browsers */

  // Command example
  // npx playwright test tests/E2EAutomationPageObjects.spec.js --config playwright.config1.js --project chromium --headed

  projects: [
    {
      name: "clear-bookings",
      testMatch: /ClearBookings\.spec\.js/,
    },
    {
      name: "chromium",
      dependencies: ["clear-bookings"],
      testIgnore: /ClearBookings\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        headless: true,
        // viewport: { width: 720, height: 720 },
        viewport: { width: 1600, height: 1440 },

        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
        // https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions

        // enabling video logs on failure.
        video: "retain-on-failure",
      },
    },

    {
      name: "firefox",
      dependencies: ["clear-bookings"],
      testIgnore: /ClearBookings\.spec\.js/,
      use: {
        ...devices["Desktop Firefox"],
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        headless: false,
      },
    },
    {
      name: "iphone",
      dependencies: ["clear-bookings"],
      testIgnore: /ClearBookings\.spec\.js/,
      use: {
        ...devices["iPhone 13"],
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        headless: false,
      },
    },
    {
      name: "pixel",
      dependencies: ["clear-bookings"],
      testIgnore: /ClearBookings\.spec\.js/,
      use: {
        ...devices["Pixel 5"],
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        headless: false,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
