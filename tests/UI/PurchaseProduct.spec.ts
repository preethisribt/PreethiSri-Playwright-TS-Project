import { test } from "@playwright/test";
import LoginPage from "../Pages/loginPage";
import HomePage from "../Pages/HomePage";

test("Add Product and check product added to cart", async ({
  page,
}, testInfo) => {
  const loginPage: LoginPage = new LoginPage(page, testInfo);
  await loginPage.launchApplication();
  await loginPage.login();

  const homePage: HomePage = new HomePage(page);
  const categoryPage = await homePage.getCategoryPage();
  await categoryPage.selectCategory();

  await loginPage.closeApp();
});
