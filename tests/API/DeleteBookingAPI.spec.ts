import { APIRequestContext, expect, request, test } from "playwright/test"

let requestContext: APIRequestContext;

test.beforeAll("Base URL", async () => {
    requestContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            "Cookie": "token=abc123",
            "Content-Type": "application/json",
            "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM=",
        }
    });
})

test("Delete existing booking detail and validate", async () => {
   //Fetch all available bookings
   const response =  await requestContext.get("/booking");
   const responseJSON = await response.json();
   console.log(await responseJSON);

   await expect(response.status()).toBe(200);
   await expect(response.statusText()).toBe("OK");
})