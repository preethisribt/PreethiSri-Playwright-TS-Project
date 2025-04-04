import { test, expect, request, APIRequestContext } from "@playwright/test";

let apiRequestContext: APIRequestContext;

let status: number, statusMessage: string;

test.beforeAll("Base URL", async () => {
    apiRequestContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com/",
        extraHTTPHeaders: {
            "Content-Type": "application/json"
        }
    });
});

test.afterAll(async () => {
    await apiRequestContext.dispose();
});

test.afterEach("Validate status code and message", async () => {
    expect(status).toBe(200);
    expect(statusMessage).toBe("OK");
});

test('Get auth token', { tag: "@API" }, async () => {
    const resposne = await apiRequestContext.post("/auth", {
        data: {
            "username": "admin",
            "password": "password123"
        }
    });

    status = resposne.status();
    statusMessage = resposne.statusText();

    const responseJSON = await resposne.json();
    console.log(responseJSON);

    expect(responseJSON).toHaveProperty("token");
    expect(responseJSON).not.toBeNull();
    expect(responseJSON).not.toBeUndefined();
});

test("Get All booking IDs", async () => {
    const resposne = await apiRequestContext.get("/booking");
    const resposneSJSON = await resposne.json();

    status = resposne.status();
    statusMessage = resposne.statusText();

    console.log(await resposneSJSON);
});

test("Get booking ID using name", async () => {
    const resposne = await apiRequestContext.get("/booking", {
        params: {
            firstname: "Josh",
            lastname: "Allen"
        }
    });

    status = resposne.status();
    statusMessage = resposne.statusText();

    const bookingIDSJSON = await resposne.json();
    console.log(await bookingIDSJSON);
});
