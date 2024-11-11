import {BeforeAll, Given, setDefaultTimeout, Then} from "@cucumber/cucumber"
import {Browser, BrowserContext, chromium, Page, expect} from "@playwright/test"
import {Context} from "node:vm";
import exp from "node:constants";

let browser: Browser;
let page: Page;
let context: BrowserContext;
setDefaultTimeout(19 * 1000);

Given('I Launched the applicaton', async function () {
    browser = await chromium.launch({headless: false, channel: "chrome"});
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://automationexercise.com/");

});

Given('Entered the valid credentials', async function () {
    await page.getByRole("link", {name: "Signup / Login"}).click();
    await page.locator('form').filter({hasText: 'Login'}).getByPlaceholder('Email Address').fill("preethitest1@gmail.com")
    await page.getByPlaceholder("Password").fill("test1#123")
    await page.getByRole("button", {name: "Login"}).click();
});

Then('Login should be successful', async function () {
    await expect(page.getByRole('link', {name: 'Logout'})).toBeVisible();
    await page.close();
});
