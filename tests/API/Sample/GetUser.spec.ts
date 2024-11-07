import {APIResponse, expect, test} from '@playwright/test';

test('Get List of Users', async ({request}) => {
    const response: APIResponse = await request.get("https://reqres.in/api/{resource}?page=1&per_page=10");
    const responseJson = await response.json();

    console.log(responseJson)
    await expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);


    //validation
    await expect(responseJson.page).toBe(1);
    await expect(responseJson.support.url).toBe("https://reqres.in/#support-heading");

    const dataArr : Object[] = responseJson.data;
    await expect(dataArr.length).toBe(10);
});