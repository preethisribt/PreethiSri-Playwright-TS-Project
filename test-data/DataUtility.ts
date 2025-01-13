import { parse } from "csv-parse/sync";
import fs from "fs";

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
}
