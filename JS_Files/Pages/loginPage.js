"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const DataUtility_1 = require("../test-data/DataUtility");
const adblocker_playwright_1 = require("@cliqz/adblocker-playwright");
const UtilityPage_1 = require("../Utility/UtilityPage");
class LoginPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.loginApplicationLink = this.page.getByRole("link", { name: "Signup / Login" });
        this.logoutLink = this.page.getByRole("link", { name: "Logout" });
        this.emailIDTextBox = this.page
            .locator("form")
            .filter({ hasText: "login" })
            .getByPlaceholder("Email Address");
        this.registerNameTextBox = this.page.getByPlaceholder("Name");
        this.registeremailIDTextBox = this.page
            .locator("form")
            .filter({ hasText: "Signup" })
            .getByPlaceholder("Email Address");
        this.signupButton = this.page.getByRole("button", { name: "Signup" });
        this.passwordTextBox = this.page.getByPlaceholder("Password");
        this.loginButton = this.page.getByRole("button", { name: "Login" });
        this.loginValiationText = this.page
            .getByText("Full-Fledged practice website for Automation Engineers")
            .nth(0);
        this.incorrectCredentialsText = this.page.getByText("Your email or password is incorrect!");
        this.alreadyRegisteredText = this.page.getByText("Email Address already exist!");
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
    }
    async launchApplication() {
        //To block Ads in the application
        const blocker = await adblocker_playwright_1.PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
        await blocker.enableBlockingInPage(this.page);
        //To disable images in the application
        await this.page.route("**/*", async (route, request) => {
            if ((await request.resourceType()) === "image")
                await route.abort();
            else
                await route.continue();
        });
        await this.page.goto(DataUtility_1.DataUtility.url);
    }
    async login(userName, password) {
        await this.loginApplicationLink.click();
        await this.emailIDTextBox.fill(userName);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }
    async registerUser(userName, emailId) {
        await this.loginApplicationLink.click();
        await this.registerNameTextBox.fill(userName);
        await this.registeremailIDTextBox.fill(emailId);
        await this.signupButton.click();
        await this.utilityPage.attachScreenshotToReport("SignupPage");
    }
    async validateAlreadyRegistredUser() {
        await (0, test_1.expect)(this.alreadyRegisteredText).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("LoginPage");
    }
    async validateLoginIsSuccessful() {
        await (0, test_1.expect)(this.page.getByRole("link", { name: "Logout" })).toBeVisible();
        await (0, test_1.expect)(this.loginValiationText).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("HomePage");
    }
    async validateIncorrectCredentails() {
        await (0, test_1.expect)(this.incorrectCredentialsText).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("LoginPage");
    }
    async logoutAndValidate() {
        await this.logoutLink.click();
        await (0, test_1.expect)(this.loginApplicationLink).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("LoginPage");
    }
    async closeApp() {
        await this.page.close();
    }
}
exports.default = LoginPage;
//# sourceMappingURL=loginPage.js.map