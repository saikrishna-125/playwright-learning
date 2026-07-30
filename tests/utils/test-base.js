import { test as base } from "@playwright/test";

exports.customTest = base.test.extend({
  orderTestData: {
    username: "testuserlast@gmail.com",
    password: "T@st12345",
    productName: "iphone 13 pro",
    country: "india",
  },
});

