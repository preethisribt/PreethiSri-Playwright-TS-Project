import { faker } from "@faker-js/faker";
import { parse } from "csv-parse/sync";
import fs from "fs";
const date: Date = new Date();
const checkinDate: string = date.toISOString().split("T")[0];
const checkoutDate: string = new Date(date.setDate(date.getDate() + 7))
    .toISOString()
    .split("T")[0];

const fname: string = faker.person.firstName();
const lname: string = faker.person.lastName();
export interface CustomerData {
    dataID: string,
    category: string,
    subcategory: string,
    product: string;
}

export interface ProductDetail {
    dataID: string,
    brand: string,
    product: string,
    amount: string,
    quantity: number,
    availability: string,
    condition: string;
}

export class DataUtility {
    public static readonly url = process.env.URL as string;

    private static date: Date = new Date();
    public static dateTime: string = DataUtility.date
        .toLocaleString()
        .replace(/[:,/ ]/g, "-");

    static getDataFromCSV(): CustomerData[] {
        return parse(fs.readFileSync("test-data/ShoppingAppData.csv"), {
            columns: true,
            skip_empty_lines: true
        });
    }

    apiTestData = (overrides = {}) => {
        const data = JSON.parse(fs.readFileSync("test-data/API data/BookerPayload.json", "utf-8"));
        return { ...data, ...overrides };
    }


    payloadData = this.apiTestData({
        firstname: fname,
        lastname: lname,
        bookingdates: {
            checkin: checkinDate,
            checkout: checkoutDate
        }
    });
}
