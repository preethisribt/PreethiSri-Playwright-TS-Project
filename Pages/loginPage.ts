import { expect, Page, TestInfo } from "@playwright/test";
import { EnvData } from "../test-data/EnvData";
import { PlaywrightBlocker } from "@cliqz/adblocker-playwright";
import { UtilityPage } from "./UtilityPage";

class LoginPage {
  utilityPage;

  constructor(private page: Page, private testInfo: TestInfo) {
        this.utilityPage = new UtilityPage(page,testInfo);
  }

  private readonly loginApplicationLink = this.page.getByRole("link", { name: "Signup / Login" });
  private readonly logoutLink = this.page.getByRole("link", { name: "Logout" });
  private readonly emailIDTextBox = this.page.locator("form").filter({ hasText: "login" }).getByPlaceholder("Email Address");
  private readonly passwordTextBox = this.page.getByPlaceholder("Password");
  private readonly loginButton = this.page.getByRole("button", {name: "Login"});
  private readonly LoginValiationText = this.page.getByText("Full-Fledged practice website for Automation Engineers").nth(0);
  private readonly LogoutValiationText = this.page.getByText("Login to your account");

  async launchApplication() {
    //To block Ads in the application
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    blocker.enableBlockingInPage(this.page);

    //To disable images in the application
    await this.page.route("**/*", (route, request) => {
      if (request.resourceType() === "image")
        route.abort()
      else
        route.continue();
    });

    await this.page.goto(EnvData.url);
  }

  async login(userName : string,password : string) {
    await this.loginApplicationLink.click();
    await this.emailIDTextBox.fill(userName);
    await this.passwordTextBox.fill(password);
    await this.loginButton.click();
  }

  async validateLogin()
  {
    await expect(this.page.getByRole("link", { name: "Logout" })).toBeVisible();
    await expect(this.LoginValiationText).toBeVisible();
    await this.utilityPage.attachScreenshotToReport("HomePage");
  }

  async validatelogout()
  {
    await this.logoutLink.click();
    await expect(this.loginApplicationLink).toBeVisible();
    await this.utilityPage.attachScreenshotToReport("LoginPage");
  }

  async closeApp() {
    await this.page.close();
  }
}

export default LoginPage;
