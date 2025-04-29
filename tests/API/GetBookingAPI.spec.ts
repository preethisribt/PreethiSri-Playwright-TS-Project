import { test, request, APIRequestContext, expect } from "@playwright/test";
import jsonData from "../../test-data/API data/BookerPayload.json";
let baseURLContext: APIRequestContext;

test.beforeAll("Base URL", async () => {
    baseURLContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com/",
        extraHTTPHeaders: {
            "Content-Type": "application/json"
        }
    });
});

test("Fetch Auth token", async () => {
    const response = await baseURLContext.post("auth", {
        data: {
            username: "admin",
            password: "password123"
        }
    });
    const responseJson = await response.json();

    await expect(responseJson.token).toBeTruthy();
    console.log(responseJson.token);
});

test("Get All booking IDs", async () => {
    const response = await baseURLContext.get("booking");
    const responseJSON = await response.json();
    // Promise.all(responseJSON.map(e => console.log(e.bookingid)));
    console.log(await responseJSON);
});

test("Get booking using name", async () => {
    // const response = await baseURLContext.get("/booking?firstname=Josh&lastname=Allen");
    const response = await baseURLContext.get("/booking", {
        params: {
            firstname: "Josh",
            lastname: "Allen"
        }
    });

    const responseJSON = await response.json();
    console.log(responseJSON);
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
});

test("create Booking details", async () => {
    const response = await baseURLContext.post("/booking", {
        data: jsonData
    });

    const responseJSON = await response.json();
    console.log(responseJSON);
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
});