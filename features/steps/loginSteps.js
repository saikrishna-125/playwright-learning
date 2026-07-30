const { Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Then(
  "verify if error message {string} is displayed",
  async function (errorMsg) {
    await expect(this.page.getByText(errorMsg)).toBeVisible();
  },
);
