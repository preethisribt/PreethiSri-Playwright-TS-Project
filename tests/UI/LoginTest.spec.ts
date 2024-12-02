import { test } from "@playwright/test";
import LoginPage from "../../Pages/loginPage";
import LoginJsonData from "../../test-data/JsonData/LoginTestData.json";
import inValidLoginJsonData from "../../test-data/JsonData/InValidCredentails.json";
import { EnvData } from "../../test-data/EnvData";

for (const loginData of LoginJsonData) {
  test(`Validate Login Feature test for ${loginData.UserName}`, async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(loginData.UserName, loginData.Password);
    await loginPage.validateLogin();
  });
}

for (const loginData of inValidLoginJsonData) {
  test(`Validate Login with invalid credentials  ${loginData.UserName}`, async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(loginData.UserName, loginData.Password);
    await loginPage.validateIncorrectCredentails();
  });
}

test("Validate Logout Feature", async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page, testInfo);
  await loginPage.launchApplication();
  await loginPage.login(EnvData.UserName, EnvData.Password);
  await loginPage.validateLogin();
  await loginPage.validatelogout();
});


for (const loginData of LoginJsonData) {
  test("Register user with existing emailID", async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.registerUser(loginData.UserName.split("@")[0], loginData.UserName);
    await loginPage.validateAlreadyRegistredUser();
  });
}