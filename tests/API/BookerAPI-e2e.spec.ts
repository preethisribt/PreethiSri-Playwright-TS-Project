import { test, expect, APIRequestContext, request } from "@playwright/test";
import DataUtility from "../../test-data/DataUtility";
let dataUtility: DataUtility;
let bookingID: number;
let updatedPayload;
let requestContext: APIRequestContext;

test.beforeAll("Booking URL and header", async () => {
    requestContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com/",
        extraHTTPHeaders: {
            "Content-Type": "application/json"
        }
    })
});

test.describe("Validate E2E flow create, fetch then update and validate the booker", { tag: "@Booker" }, () => {
    test.describe.configure({ mode: "serial" });
    dataUtility = new DataUtility();

    const payload = dataUtility.payloadData;
    test("Create Booking", async () => {
        const response = await requestContext.post("booking",
            {

                data: payload
                
            }
        );

        const responseJSON = await response.json();
        console.log(responseJSON);

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");

        bookingID = await responseJSON.bookingid;
        expect(bookingID).toBeTruthy();
        expect(await responseJSON.booking).toMatchObject(payload);
    });

    test("Fetech created booking using booking_ID", async () => {
        const response = await requestContext.get(`/booking/${bookingID}`);
        const responseJSON = await response.json();
        console.log(await responseJSON);

        expect(await response.status()).toBe(200);
        expect(await response.statusText()).toBe("OK");
        expect(await responseJSON).toMatchObject(payload);
    });

    test("Update booking and validate", async () => {
        const updatedField = { "additionalneeds": "transport vehicle" }; //field to be updated
        updatedPayload = dataUtility.updatePayload(payload, updatedField);  //merging original payload with updated field
        console.log("Updated Payload:  " + updatedPayload);

        const response = await requestContext.put(`/booking/${bookingID}`, {
            headers: {
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM=",
                "Cookie": "token=abc123"
            },
            data: updatedPayload
        });

        const responseJSON = await response.json();
        console.log(await responseJSON);

        expect(await response.status()).toBe(200);
        expect(await response.statusText()).toBe("OK");
        expect(await responseJSON).toMatchObject(updatedPayload);
    });

    
    test("Fetech after updating the booking", async () => {
        const response = await requestContext.get(`/booking/${bookingID}`);
        const responseJSON = await response.json();
        console.log(await responseJSON);

        expect(await response.status()).toBe(200);
        expect(await response.statusText()).toBe("OK");
        expect(await responseJSON).toMatchObject(updatedPayload);
    });
});