import { expect, Page, TestInfo } from "@playwright/test";
import { EnvData } from "../test-data/EnvData";
import { PlaywrightBlocker } from "@cliqz/adblocker-playwright";

class LoginPage {
  constructor(
    private page: Page,
    private testInfo: TestInfo,
  ) {}

  private readonly loginApplicationLink = this.page.getByRole("link", {
    name: "Signup / Login",
  });
  private readonly emailIDTextBox = this.page
    .locator("form")
    .filter({ hasText: "login" })
    .getByPlaceholder("Email Address");
  private readonly passwordTextBox = this.page.getByPlaceholder("Password");
  private readonly loginButton = this.page.getByRole("button", {
    name: "Login",
  });

  async launchApplication() {
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    blocker.enableBlockingInPage(this.page);

    await this.page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());
    await this.page.route("**/get_product_picture/*", (route) => route.abort());
    await expect(this.page).toHaveScreenshot("*/logo.png");

    await this.page.goto(EnvData.url);
  }

  async login() {
    await this.loginApplicationLink.click();
    await this.emailIDTextBox.fill(EnvData.UserName);
    await this.passwordTextBox.fill(EnvData.Password);
    await this.loginButton.click();
    await expect(this.page.getByRole("link", { name: "Logout" })).toBeVisible();
    await this.page.screenshot({ path: "./test-screenshots/" + EnvData.dateTime +this.testInfo.title + ".png"});
  }

  async closeApp() {
    await this.page.close();
  }
}

export default LoginPage;
