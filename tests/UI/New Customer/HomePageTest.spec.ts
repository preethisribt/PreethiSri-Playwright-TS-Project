import { test } from "@playwright/test";
import LoginPage from "../../../Pages/loginPage";
import HomePage from "../../../Pages/homePage";
import datas from "../../../test-data/UI data/HomePageData.json"

test.beforeEach("Launch Application", async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page, testInfo);
  await loginPage.launchApplication();
});


test("TC-001 Validate Expected headers Present", async ({ page }, testInfo) => {
  const homePage: HomePage = new HomePage(page, testInfo);
  await homePage.getAndValidateHomePageHeaders(datas.headers);
});