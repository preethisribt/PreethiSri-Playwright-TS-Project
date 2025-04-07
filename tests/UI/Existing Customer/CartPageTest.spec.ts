import { test } from "@playwright/test";
import CartPage from "../../../Pages/cartPage";
import LoginPage from "../../../Pages/loginPage";
import validUser from "../../../test-data/UI data/CredentialsData.json";

let loginPage: LoginPage;

test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(validUser[0].UserName, validUser[0].Password);
});

test("TC-003 Validate Cart is Empty",{tag:"@Regression"}, async ({ page }, testInfo) => {
    const cartPage: CartPage = new CartPage(page, testInfo);
    await cartPage.emptyCart();
    await cartPage.validateEmptyCartMessage();
});