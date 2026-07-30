import { test, expect } from "@playwright/test";

// need to recompile to js  everytime I change code

// npx tsc demo1.ts
// node demo1.js

let age: number = 20;

// invalid  - as strong typing
// age = "hello";

let userName: String = "Hello";

let isOld: boolean = true;

let data: any = "124";
data = 124;
// data = true;

console.log(age, userName, isOld, data);

let numArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let anyArray: any[] = [1, "abc", 2, "345"];

let anyArray1 = [1, "abc", 2, "345"];

let strArray: string[] = ["abc", "def", "ghi"];

console.log(numArray);
console.log(anyArray);
console.log(anyArray1);
console.log(strArray);

// Functions
function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(3, 4));

// Objects
let person: {
  name: string;
  age: number;
  weight: number;
  family: { name: string; relation: string };
} = {
  name: "John",
  age: 24,
  weight: 12.56,
  family: {
    name: "Test",
    relation: "Father",
  },
};

// Class

import { type Page, type Locator } from "@playwright/test";

class LoginPage {
  page: Page;
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("email@example.com");
    this.passwordInput = page.getByPlaceholder("enter your passsword");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    const usernameVal: string = await this.usernameInput.inputValue();

    await this.loginButton.click();
    await this.page.waitForLoadState("networkidle");

    return usernameVal;
  }
}

const username: string = "testuserlast@gmail.com";
const password: string = "T@st12345";

test("Typescript Test", async ({ page }) => {
  const login: LoginPage = new LoginPage(page);
  await login.goto();
  console.log(await login.validLogin(username, password));
});
