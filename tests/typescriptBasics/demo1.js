import { test } from "@playwright/test";
// need to recompile to js  everytime I change code
// npx tsc demo1.ts
// node demo1.js
let age = 20;
// invalid  - as strong typing
// age = "hello";
let userName = "Hello";
let isOld = true;
let data = "124";
data = 124;
// data = true;
console.log(age, userName, isOld, data);
let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let anyArray = [1, "abc", 2, "345"];
let anyArray1 = [1, "abc", 2, "345"];
let strArray = ["abc", "def", "ghi"];
console.log(numArray);
console.log(anyArray);
console.log(anyArray1);
console.log(strArray);
// Functions
function sum(a, b) {
    return a + b;
}
console.log(sum(3, 4));
// Objects
let person = {
    name: "John",
    age: 24,
    weight: 12.56,
    family: {
        name: "Test",
        relation: "Father",
    },
};
class LoginPage {
    page;
    usernameInput;
    passwordInput;
    loginButton;
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder("email@example.com");
        this.passwordInput = page.getByPlaceholder("enter your passsword");
        this.loginButton = page.getByRole("button", { name: "Login" });
    }
    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
    async validLogin(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        const usernameVal = await this.usernameInput.inputValue();
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
        return usernameVal;
    }
}
const username = "testuserlast@gmail.com";
const password = "T@st12345";
test("Typescript Test", async ({ page }) => {
    const login = new LoginPage(page);
    login.goto();
    console.log(login.validLogin(username, password));
});
