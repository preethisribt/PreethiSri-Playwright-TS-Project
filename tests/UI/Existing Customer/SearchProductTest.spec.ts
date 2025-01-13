import { test } from "@playwright/test";
import LoginPage from "../../../Pages/loginPage";
import { validUser } from "../../../test-data/LoginTestData";
import HomePage from "../../../Pages/homePage";
let loginPage: LoginPage;

test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(validUser.UserName, validUser.Password);
});

test("Validate product search", async ({ page }, testInfo) => {
    const homePage: HomePage = new HomePage(page, testInfo);
    await homePage.searchProduct("Fancy Green Top");
});
