import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let bookingID: number;
const date: Date = new Date();
const checkinDate: string = date.toISOString().split("T")[0];
const checkoutDate: string = new Date(date.setDate(date.getDate() + 7)).toISOString().split("T")[0];
const fname: string = faker.person.firstName();
const lname: string = faker.person.lastName();
const payload = {
    "firstname": fname,
    "lastname": lname,
    "totalprice": faker.number.int({ max: 10000 }),
    "depositpaid": true,
    "bookingdates": {
        "checkin": checkinDate,
        "checkout": checkoutDate
    },
    "additionalneeds": "Breakfast"

};
const baseURL: string = "https://restful-booker.herokuapp.com/booking";


test.describe("create and get the booking", { tag: "@Booker" }, () => {
    test.describe.configure({ mode: 'serial' });

    test("Create Booking", async ({ request }) => {
        const response = await request.post("https://restful-booker.herokuapp.com/booking", {
            headers: {
                "Content-Type": "application/json"
            },

            data: payload
        });

        const responseJSON = await response.json();
        console.log(responseJSON);

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");

        bookingID = await responseJSON.bookingid;
        expect(bookingID).toBeTruthy();
    });

    test("Get booking", async ({ request }) => {
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`);
        const responseJSON = await response.json();
        console.log(await responseJSON);

        expect(responseJSON).toMatchObject(payload);
    });

    test("Update the booking", async ({ request }) => {
        const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}}`, {
            headers: {
                "Content-Type": "application/json",
                "Cookie": "token=abc123",
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
            },

            data: {
                "firstname": fname,
                "lastname": "Browman",
                "totalprice": faker.number.int({ max: 10000 }),
                "depositpaid": true,
                "bookingdates": {
                    "checkin": checkinDate,
                    "checkout": checkoutDate
                },
                "additionalneeds": "Breakfast"
            }
        });

        const responseJSON = await response.json();

        console.log(await responseJSON);
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");
        expect(responseJSON.lastname).toStrictEqual("Browman");
    })
});


test("Partial update of resource", { tag: "@Booker" }, async ({ request }) => {
    const bookingIDresponse = await request.get(`${baseURL}`);

    const bookingIDresponseJSON = await bookingIDresponse.json();
    console.log(await bookingIDresponseJSON);

    const response = await request.patch(`${baseURL}/${bookingIDresponseJSON[0].bookingid}`, {
        headers: {
            "Cookie": "token=abc123",
            "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
        },
        data: {
            "firstname": fname
        }
    });

    const responseJSON = await response.json();
    console.log("Fanme = ", fname);
    console.log(await responseJSON);
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(responseJSON.firstname).toStrictEqual(fname);

})