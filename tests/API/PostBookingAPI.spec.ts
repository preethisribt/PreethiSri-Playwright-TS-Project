import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let bookingID: number;
const date: Date = new Date();
const checkinDate: string = date.toISOString().split("T")[0];
const checkoutDate: string = new Date(date.setDate(date.getDate() + 7)).toISOString().split("T")[0];
const fname: string = faker.person.firstName();
const lname: string = faker.person.lastName();

test.describe.configure({ mode: 'serial' });
test.describe("create and get the booking", () => {
    test("Create Booking", async ({request}) => {
        const response = await request.post("https://restful-booker.herokuapp.com/booking", {
            headers: {
                "Content-Type": "application/json"
            },

            data: {
                "firstname": fname,
                "lastname": lname,
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
        console.log(responseJSON);

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");

        bookingID = await responseJSON.bookingid;
        expect(bookingID).toBeTruthy();
    });

    test("Get booking", async ({request}) => {
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`);
        const responseJSON = await response.json();
        console.log(await responseJSON);

        expect(responseJSON).toStrictEqual(expect.objectContaining({
            "firstname": fname,
            "lastname": lname,
        }))
    });
});



