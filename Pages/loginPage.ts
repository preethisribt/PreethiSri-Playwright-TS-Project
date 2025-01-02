import { expect, Page, TestInfo } from "@playwright/test";
import { DataUtility } from "../test-data/DataUtility";
import { PlaywrightBlocker } from "@cliqz/adblocker-playwright";
import { UtilityPage } from "../Utility/UtilityPage";

class LoginPage {
    utilityPage;

    constructor(private page: Page, private testInfo: TestInfo) {
        this.utilityPage = new UtilityPage(page, testInfo);
    }

    private readonly loginApplicationLink = this.page.getByRole("link", { name: "Signup / Login" });
    private readonly logoutLink = this.page.getByRole("link", { name: "Logout" });
    private readonly emailIDTextBox = this.page.locator("form").filter({ hasText: "login" }).getByPlaceholder("Email Address");
    private readonly registerNameTextBox = this.page.getByPlaceholder("Name");
    private readonly registeremailIDTextBox = this.page.locator("form").filter({ hasText: "Signup" }).getByPlaceholder("Email Address");
    private readonly signupButton = this.page.getByRole("button", { name: "Signup" });
    private readonly passwordTextBox = this.page.getByPlaceholder("Password");
    private readonly loginButton = this.page.getByRole("button", { name: "Login" });
    private readonly loginValiationText = this.page.getByText("Full-Fledged practice website for Automation Engineers").nth(0);
    private readonly incorrectCredentialsText = this.page.getByText("Your email or password is incorrect!");
    private readonly alreadyRegisteredText = this.page.getByText("Email Address already exist!");

    async launchApplication() : Promise<void> {
        //To block Ads in the application
        const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
        blocker.enableBlockingInPage(this.page);

        //To disable images in the application
        await this.page.route("**/*", (route, request) => {
            if (request.resourceType() === "image") route.abort();
            else route.continue();
        });

        await this.page.goto(DataUtility.url);
    }

    async login(userName: string, password: string) {
        await this.loginApplicationLink.click();
        await this.emailIDTextBox.fill(userName);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }

    async registerUser(userName: string, emailId: string) {
        await this.loginApplicationLink.click();
        await this.registerNameTextBox.fill(userName);
        await this.registeremailIDTextBox.fill(emailId);
        await this.signupButton.click();
        await this.utilityPage.attachScreenshotToReport("SignupPage");
    }

    async validateAlreadyRegistredUser() {
        await expect(this.alreadyRegisteredText).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("LoginPage");
    }

    async validateLoginIsSuccessful() {
        await expect(this.page.getByRole("link", { name: "Logout" })).toBeVisible();
        await expect(this.loginValiationText).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("HomePage");
    }

    async validateIncorrectCredentails() {
        await expect(this.incorrectCredentialsText).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("LoginPage");
    }

    async logoutAndValidate() {
        await this.logoutLink.click();
        await expect(this.loginApplicationLink).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("LoginPage");
    }

    async closeApp() {
        await this.page.close();
    }
}

export default LoginPage;
