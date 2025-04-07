import { test } from "@playwright/test";
import LoginPage from "../../../Pages/loginPage";
import validUser from "../../../test-data/UI data/CredentialsData.json";
import HomePage from "../../../Pages/homePage";
let loginPage: LoginPage;

test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(validUser[0].UserName, validUser[0].Password);
});

test("TC-009 Validate product search",{tag:"@smoke"} ,async ({ page }, testInfo) => {
    const homePage: HomePage = new HomePage(page, testInfo);
    await homePage.searchProduct("Fancy Green Top");
});
