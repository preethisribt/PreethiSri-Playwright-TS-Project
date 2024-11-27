import { test } from '@playwright/test'
test('Practise', async ({ page }) => {
    await page.route("**/*", (route, request) => {
        if (request.resourceType() === "image")
            route.abort()
        else
            route.continue();
    });
    await page.goto("https://omayo.blogspot.com/");
    await page.close();
})