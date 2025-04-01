"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
let apiRequestContext;
let status, statusMessage;
test_1.test.beforeAll("Base URL", async () => {
    apiRequestContext = await test_1.request.newContext({
        baseURL: "https://restful-booker.herokuapp.com/",
        extraHTTPHeaders: {
            "Content-Type": "application/json"
        }
    });
});
test_1.test.afterAll(async () => {
    await apiRequestContext.dispose();
});
test_1.test.afterEach("Validate status code and message", async () => {
    (0, test_1.expect)(status).toBe(200);
    (0, test_1.expect)(statusMessage).toBe("OK");
});
(0, test_1.test)('Get auth token', { tag: "@API" }, async ({ request }) => {
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
    (0, test_1.expect)(responseJSON).toHaveProperty("token");
    (0, test_1.expect)(responseJSON).not.toBeNull();
    (0, test_1.expect)(responseJSON).not.toBeUndefined();
});
(0, test_1.test)("Get All booking IDs", async () => {
    const resposne = await apiRequestContext.get("/booking");
    const resposneSJSON = await resposne.json();
    status = resposne.status();
    statusMessage = resposne.statusText();
    console.log(await resposneSJSON);
});
(0, test_1.test)("Get booking ID using name", async () => {
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
//# sourceMappingURL=GetBookingAPI.spec.js.map