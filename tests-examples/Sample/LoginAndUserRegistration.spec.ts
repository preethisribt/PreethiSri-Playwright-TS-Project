import {APIResponse, expect, test} from "@playwright/test";
import exp = require("node:constants");

test('Register user', async ({request}) => {
    const response: APIResponse = await request.post("https://reqres.in/api/register" ,{
        headers : {"Content-Type" : "application/json"},
        data: {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    });

    const responseJson = await response.json();
    console.log(responseJson);
    await expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);

    await expect(responseJson.token).not.toBeNull();

});

test('Register user without password', async ({request}) => {
    const response : APIResponse = await request.post("https://reqres.in/api/register",{
        headers:{"Content-Type" : "application/json"},
        data:{"email": "sydney@fife"}
    });

    const responseJson = await response.json();

    console.log(responseJson);
    await expect(response.status()).toBe(400);
    await expect(response.statusText()).toBe("Bad Request");
    // await expect(responseJson.error).toBe("Missing password");
    await expect(responseJson).toStrictEqual(expect.objectContaining({
        // "error": "Missing password"
        "error": expect.any(String)
    }));
});