import {test, expect} from '@playwright/test';
import exp = require("node:constants");

test('example1', async ({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    const response = await page.waitForResponse(/ohrm_logo.png/);
    console.log(response.status());
    console.log(response.request().url());

    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("password").fill("admin123");
    await expect(await page.getByAltText("company-branding")).toBeVisible({timeout:5000});
});

