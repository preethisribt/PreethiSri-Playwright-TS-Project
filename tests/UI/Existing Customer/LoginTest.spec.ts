import { test } from "@playwright/test";
import LoginPage from "../../../Pages/loginPage";
import { validUsers, invalidUsers } from "../../../test-data/LoginTestData";

for (const loginData of validUsers) {
    test(`Validate Login Feature test for ${loginData.UserName}`,{tag:"@smoke"}, async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(loginData.UserName, loginData.Password);
        await loginPage.validateLoginIsSuccessful();
    });
}

for (const loginData of invalidUsers) {
    test(`Validate Login with invalid credentials  ${loginData.UserName}`,{tag:"@Regression"}, async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(loginData.UserName, loginData.Password);
        await loginPage.validateIncorrectCredentails();
    });
}

for (const loginData of validUsers) {
    test("Validate Logout Feature", {tag:"@Regression"},async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(loginData.UserName, loginData.Password);
        await loginPage.validateLoginIsSuccessful();
        await loginPage.logoutAndValidate();
    });
}

for (const loginData of validUsers) {
    test("Register user with existing emailID",{tag:"@Regression"},async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.registerUser(loginData.Name, loginData.UserName);
        await loginPage.validateAlreadyRegistredUser();
    });
}
