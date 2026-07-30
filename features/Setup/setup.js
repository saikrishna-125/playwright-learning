const {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
} = require("@cucumber/cucumber");
const PageObjectManager = require("../../pageobjects/PageObjectManager");
const { chromium } = require("@playwright/test");

Before({ tags: "@Setup" }, async function () {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();

  this.pageObjectManager = new PageObjectManager(this.page);
});

After({ tags: "@Validation or @Regression" }, async function () {
  console.log("Executed after all steps are completed.");
});

BeforeStep(async function () {
  console.log("executed before each step.");
});

AfterStep(async function (step) {
  if (step.result.status == Status.FAILED) {
    await this.page.screenshot({ path: "screenshot1.jpg" });
  }
});
