import { test, expect, request, APIRequestContext } from "@playwright/test";
import { DataUtility } from "../../test-data/DataUtility";

const dataUtility: DataUtility = new DataUtility();
let bookingID: number, apiRequestContext: APIRequestContext;
let status: number, statusMessage: string;

test.beforeAll("Base URL", async () => {
    apiRequestContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com/",
        extraHTTPHeaders: {
            "Content-Type": "application/json",
            Cookie: "token=abc123",
            Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
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


test.describe("create and get the booking", { tag: "@Booker" }, () => {
    test.describe.configure({ mode: "serial" });


    test("Create Booking", async () => {
        const response = await apiRequestContext.post("/booking",
            {
                data: dataUtility.payloadData
            }
        );
        const responseJSON = await response.json();
        console.log(responseJSON);

        statusMessage = response.statusText();
        status = response.status();

        bookingID = await responseJSON.bookingid;
        expect(bookingID).toBeTruthy();
    });

    test("Get booking", async () => {
        const response = await apiRequestContext.get(`/booking/${bookingID}`);

        statusMessage = response.statusText();
        status = response.status();

        const responseJSON = await response.json();
        console.log(await responseJSON);

        expect(responseJSON).toMatchObject(dataUtility.payloadData);
    });

    test("Update the booking", async () => {

        const payload = dataUtility.apiTestData({ "depositpaid": false })
        const response = await apiRequestContext.put(`/booking/${bookingID}`,
            {
                data: payload
            }
        );
        statusMessage = response.statusText();
        status = response.status();

        const responseJSON = await response.json();

        console.log(await responseJSON);
        expect(responseJSON).toEqual(expect.objectContaining({
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

