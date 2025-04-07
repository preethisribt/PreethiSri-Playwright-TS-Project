import test from "playwright/test";
import validUsers  from "../../../test-data/UI data/CredentialsData.json"
import LoginPage from "../../../Pages/loginPage";

for (const loginData of validUsers) {
    test(`TC-002-${loginData.dataID} Register user with existing emailID`,{tag:"@Regression"},async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.registerUser(loginData.UserName);
        await loginPage.validateAlreadyRegistredUser();
    });
}
