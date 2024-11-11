import {test} from '@playwright/test';

test('example1', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.getByRole('textbox', {name: 'Enter Name'}).fill("fname");
    await page.getByPlaceholder('Enter EMail').fill("test@gmail.com");
    await page.getByPlaceholder('Enter Phone').fill("7894561230");
    await page.getByLabel('Address:').fill("sample text area");
    await page.getByLabel('Male').first().check();
    await page.getByRole('checkbox',{name:'sunday'}).check();
    await page.locator("#country").selectOption({index:5});
    await page.waitForTimeout(3000);
});




