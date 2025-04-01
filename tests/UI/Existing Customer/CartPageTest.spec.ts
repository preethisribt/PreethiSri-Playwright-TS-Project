import { test } from "@playwright/test";
import CartPage from "../../../Pages/cartPage";
import LoginPage from "../../../Pages/loginPage";
import { validUser } from "../../../test-data/LoginTestData";

let loginPage: LoginPage;

test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(validUser.UserName, validUser.Password);
});

test("Validate Cart is Empty",{tag:"@Regression"}, async ({ page }, testInfo) => {
    const cartPage: CartPage = new CartPage(page, testInfo);
    await cartPage.emptyCart();
    await cartPage.validateEmptyCartMessage();
});