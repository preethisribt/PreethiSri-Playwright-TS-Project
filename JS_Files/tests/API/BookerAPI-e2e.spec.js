"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const DataUtility_1 = require("../../test-data/DataUtility");
const dataUtility = new DataUtility_1.DataUtility();
let bookingID, apiRequestContext;
let status, statusMessage;
test_1.test.beforeAll("Base URL", async () => {
    apiRequestContext = await test_1.request.newContext({
        baseURL: "https://restful-booker.herokuapp.com/",
        extraHTTPHeaders: {
            "Content-Type": "application/json",
            Cookie: "token=abc123",
            Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
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
test_1.test.describe("create and get the booking", { tag: "@Booker" }, () => {
    test_1.test.describe.configure({ mode: "serial" });
    (0, test_1.test)("Create Booking", async () => {
        const response = await apiRequestContext.post("/booking", {
            data: dataUtility.payloadData
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
        statusMessage = response.statusText();
        status = response.status();
        bookingID = await responseJSON.bookingid;
        (0, test_1.expect)(bookingID).toBeTruthy();
    });
    (0, test_1.test)("Get booking", async () => {
        const response = await apiRequestContext.get(`/booking/${bookingID}`);
        statusMessage = response.statusText();
        status = response.status();
        const responseJSON = await response.json();
        console.log(await responseJSON);
        (0, test_1.expect)(responseJSON).toMatchObject(dataUtility.payloadData);
    });
    (0, test_1.test)("Update the booking", async () => {
        const payload = dataUtility.apiTestData({ "depositpaid": false });
        const response = await apiRequestContext.put(`/booking/${bookingID}`, {
            data: payload
        });
        statusMessage = response.statusText();
        status = response.status();
        const responseJSON = await response.json();
        console.log(await responseJSON);
        (0, test_1.expect)(responseJSON).toEqual(test_1.expect.objectContaining({
            depositpaid: false
        }));
    });
});
// // test("Partial update of resource", { tag: "@Booker" }, async () => {
// //     const bookingIDresponse = await apiRequestContext.get(`${baseURL}`);
// //     const bookingIDresponseJSON = await bookingIDresponse.json();
// //     console.log(await bookingIDresponseJSON);
// //     const response = await request.patch(
// //         `${baseURL}/${bookingIDresponseJSON[0].bookingid}`,
// //         {
// //             headers: {
// //                 Cookie: "token=abc123",
// //                 Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
// //             },
// //             data: {
// //                 additionalneeds: "Dinner"
// //             }
// //         }
// //     );
// //     const responseJSON = await response.json();
// //     console.log(await responseJSON);
// //     statusMessage = response.statusText();
// //     status = response.status();
// //     expect(responseJSON).toEqual(expect.objectContaining({
// //         additionalneeds: "Dinner"
// //     }));
// });
//# sourceMappingURL=BookerAPI-e2e.spec.js.map