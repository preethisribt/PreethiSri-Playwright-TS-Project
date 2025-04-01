"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUtility = void 0;
const faker_1 = require("@faker-js/faker");
const sync_1 = require("csv-parse/sync");
const fs_1 = __importDefault(require("fs"));
const date = new Date();
const checkinDate = date.toISOString().split("T")[0];
const checkoutDate = new Date(date.setDate(date.getDate() + 7))
    .toISOString()
    .split("T")[0];
const fname = faker_1.faker.person.firstName();
const lname = faker_1.faker.person.lastName();
class DataUtility {
    constructor() {
        this.apiTestData = (overrides = {}) => {
            const data = JSON.parse(fs_1.default.readFileSync("test-data/API data/BookerPayload.json", "utf-8"));
            return { ...data, ...overrides };
        };
        this.payloadData = this.apiTestData({
            firstname: fname,
            lastname: lname,
            bookingdates: {
                checkin: checkinDate,
                checkout: checkoutDate
            }
        });
    }
    static getDataFromCSV() {
        return (0, sync_1.parse)(fs_1.default.readFileSync("test-data/ShoppingAppData.csv"), {
            columns: true,
            skip_empty_lines: true
        });
    }
}
exports.DataUtility = DataUtility;
DataUtility.url = process.env.URL;
DataUtility.date = new Date();
DataUtility.dateTime = DataUtility.date
    .toLocaleString()
    .replace(/[:,/ ]/g, "-");
//# sourceMappingURL=DataUtility.js.map