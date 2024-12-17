import { test, request, APIRequestContext, expect } from "@playwright/test"

let baseURLContext: APIRequestContext;

test.beforeAll("Base URL", async () => {
    baseURLContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com/", extraHTTPHeaders: {
            "Content-Type": "application/json"
        }
    });
})

test("Fetch Auth token", async () => {
    const response = await baseURLContext.post("auth",
        {
            data: {
                "username": "admin",
                "password": "password123"
            }
        }
    );
    const responseJson = await response.json();

    await expect(responseJson.token).toBeTruthy();
    console.log(responseJson.token);
});

test("Get All booking IDs", async () => {
    const response = await baseURLContext.get("https://restful-booker.herokuapp.com/booking", {
        headers: { "Content-Type": "application/json" }
    });
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
    expect(response.ok()).toBeTruthy();
});

test("Get booking uisng ID", async () => {
    const response = await baseURLContext.get("/booking/79");

    expect(response.status()).toBe(200);
    expect(response.statusText()).toEqual("OK");

    const responseJSON = await response.json();
    console.log(responseJSON);
  
    expect(responseJSON).toMatchObject({
        "firstname": "John",
        "lastname": "Smith",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    });
    expect(await responseJSON.firstname).toEqual("John");
    expect(await responseJSON.bookingdates.checkin).toEqual("2018-01-01");
});


