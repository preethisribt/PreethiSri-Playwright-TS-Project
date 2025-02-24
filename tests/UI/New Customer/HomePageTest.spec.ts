import { test } from "@playwright/test";
import LoginPage from "../../../Pages/loginPage";
import HomePage from "../../../Pages/homePage";

test.beforeEach("Launch Application", async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
});

test("Validate Expected headers Present", async ({ page }, testInfo) => {
  const homePage : HomePage = new HomePage(page,testInfo) ;
  await homePage.getHomePageheaders();
});