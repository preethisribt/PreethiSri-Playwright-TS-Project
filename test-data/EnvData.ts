import { parse } from "csv-parse/sync"
import fs from "fs";

export interface CustomerData{
    dataID:string,
    category:string,
    subcategory:string,
    product:string,
}

export class EnvData {
    public static readonly UserName = process.env.USER_NAME as string;
    public static readonly Password = process.env.PASSWORD as string;
    public static readonly url = process.env.URL as string;

    private static date: Date = new Date();
    public static dateTime: string = EnvData.date.toLocaleString().replace(/[:,/ ]/g, "-");

    static getDataFromCSV() : CustomerData[]
    {
        return  parse(fs.readFileSync("test-data/ShoppingAppData.csv"),{
            columns: true,
            skip_empty_lines: true
        });
    }
}
