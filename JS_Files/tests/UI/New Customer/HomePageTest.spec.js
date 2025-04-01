"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const loginPage_1 = __importDefault(require("../../../Pages/loginPage"));
const homePage_1 = __importDefault(require("../../../Pages/homePage"));
test_1.test.beforeEach("Launch Application", async ({ page }, testInfo) => {
    const loginPage = new loginPage_1.default(page, testInfo);
    await loginPage.launchApplication();
});
(0, test_1.test)("Validate Expected headers Present", async ({ page }, testInfo) => {
    const homePage = new homePage_1.default(page, testInfo);
    await homePage.getHomePageheaders();
});
//# sourceMappingURL=HomePageTest.spec.js.map