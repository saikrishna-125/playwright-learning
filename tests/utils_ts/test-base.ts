import { test as baseTest } from "@playwright/test";

type OrderTestData = {
  username: string;
  password: string;
  productName: string;
  country: string;
};

type customFixtures = {
  orderTestData: OrderTestData;
};

export const customTest = baseTest.extend<customFixtures>({
  orderTestData: {
    username: "testuserlast@gmail.com",
    password: "T@st12345",
    productName: "iphone 13 pro",
    country: "india",
  },
});
