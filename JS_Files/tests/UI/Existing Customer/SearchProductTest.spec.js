"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const loginPage_1 = __importDefault(require("../../../Pages/loginPage"));
const LoginTestData_1 = require("../../../test-data/LoginTestData");
const homePage_1 = __importDefault(require("../../../Pages/homePage"));
let loginPage;
test_1.test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new loginPage_1.default(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(LoginTestData_1.validUser.UserName, LoginTestData_1.validUser.Password);
});
(0, test_1.test)("Validate product search", { tag: "@smoke" }, async ({ page }, testInfo) => {
    const homePage = new homePage_1.default(page, testInfo);
    await homePage.searchProduct("Fancy Green Top");
});
//# sourceMappingURL=SearchProductTest.spec.js.map