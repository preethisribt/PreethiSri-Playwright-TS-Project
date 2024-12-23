import { Page, TestInfo } from "@playwright/test";
import { EnvData } from "../test-data/EnvData";

export class UtilityPage {
    constructor(private page: Page, private testInfo: TestInfo) {}

    async attachScreenshotToReport(pageName: string) {
        await this.testInfo.attach(
            this.testInfo.title + "_" + pageName + EnvData.dateTime + ".png",
            {
                body: await this.page.screenshot(),
                contentType: "image/png"
            }
        );
    }
}

