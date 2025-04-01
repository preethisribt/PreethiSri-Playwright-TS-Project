"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const loginPage_1 = __importDefault(require("../../../Pages/loginPage"));
const LoginTestData_1 = require("../../../test-data/LoginTestData");
for (const loginData of LoginTestData_1.validUsers) {
    (0, test_1.test)(`Validate Login Feature test for ${loginData.UserName}`, { tag: "@smoke" }, async ({ page }, testInfo) => {
        const loginPage = new loginPage_1.default(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(loginData.UserName, loginData.Password);
        await loginPage.validateLoginIsSuccessful();
    });
}
for (const loginData of LoginTestData_1.invalidUsers) {
    (0, test_1.test)(`Validate Login with invalid credentials  ${loginData.UserName}`, { tag: "@Regression" }, async ({ page }, testInfo) => {
        const loginPage = new loginPage_1.default(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(loginData.UserName, loginData.Password);
        await loginPage.validateIncorrectCredentails();
    });
}
for (const loginData of LoginTestData_1.validUsers) {
    (0, test_1.test)("Validate Logout Feature", { tag: "@Regression" }, async ({ page }, testInfo) => {
        const loginPage = new loginPage_1.default(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(loginData.UserName, loginData.Password);
        await loginPage.validateLoginIsSuccessful();
        await loginPage.logoutAndValidate();
    });
}
for (const loginData of LoginTestData_1.validUsers) {
    (0, test_1.test)("Register user with existing emailID", { tag: "@Regression" }, async ({ page }, testInfo) => {
        const loginPage = new loginPage_1.default(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.registerUser(loginData.UserName.split("@")[0], //username - to enter username, name is extracted from emailID test data
        loginData.UserName //emailID
        );
        await loginPage.validateAlreadyRegistredUser();
    });
}
//# sourceMappingURL=LoginTest.spec.js.map