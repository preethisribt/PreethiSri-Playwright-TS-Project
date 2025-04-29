import { test } from "@playwright/test";
import LoginPage from "../../../Pages/loginPage";
import validUsers from "../../..//test-data/UI data/CredentialsData.json";
import invalidUsers from "../../..//test-data/UI data/InvalidCredentialsData.json";

for (const loginData of validUsers) {
    test(`TC-005-${loginData.dataID} Validate Login Feature test for ${loginData.UserName}`,{tag:"@smoke"}, async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(loginData.UserName, loginData.Password);
        await loginPage.validateLoginIsSuccessful();
    });
}

for (const loginData of invalidUsers) {
    test(`TC-006-${loginData.dataID} Validate Login with invalid credentials  ${loginData.UserName}`,{tag:"@Regression"}, async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(loginData.UserName, loginData.Password);
        await loginPage.validateIncorrectCredentails();
    });
}

for (const loginData of validUsers) {
    test(`TC-007-${loginData.dataID} Validate Logout Feature`, {tag:"@Regression"},async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(loginData.UserName, loginData.Password);
        await loginPage.validateLoginIsSuccessful();
        await loginPage.logoutAndValidate();
    });
}