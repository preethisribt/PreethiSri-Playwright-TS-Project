import {expect, test} from "@playwright/test";
import {EnvData} from "../../test-config/EnvData";

test('Add Product and check product added to cart', async ({page}) => {
    await page.goto("https://automationexercise.com/");
    await page.getByRole("link", {name: "Signup / Login"}).click();
    await page.locator('form').filter({hasText: 'Login'}).getByPlaceholder('Email Address').fill(EnvData.UserName);
    await page.getByPlaceholder("Password").fill(EnvData.Password);
    await page.getByRole("button", {name: "Login"}).click();
    await expect(page.getByRole('link', {name: 'Logout'})).toBeVisible();
    await page.close();
})