import { test } from "@playwright/test";
import LoginPage from "../../Pages/loginPage";
import LoginJsonData from "../../test-data/JsonData/LoginTestData.json";
import { EnvData } from "../../test-data/EnvData";

for(const loginData of LoginJsonData) {
    test(`Validate Login Feature test for ${loginData.UserName} and ${loginData.Password}`, async ({ page }, testInfo) => {
      const loginPage = new LoginPage(page, testInfo);
      await loginPage.launchApplication();
      await loginPage.login(loginData.UserName,loginData.Password);
      await loginPage.validateLogin();
    });
}

test("Validate Logout Feature", async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page, testInfo);
  await loginPage.launchApplication();
  await loginPage.login(EnvData.UserName,EnvData.Password);
  await loginPage.validateLogin();
  await loginPage.validatelogout();
});