import { Page, TestInfo } from "@playwright/test";
import { DataUtility } from "../test-data/DataUtility";

export class UtilityPage {
    constructor(
        private page: Page,
        private testInfo: TestInfo
    ) {}

    async attachScreenshotToReport(pageName: string) {
        await this.testInfo.attach(
            this.testInfo.title + "_" + pageName + DataUtility.dateTime + ".png",
            {
                body: await this.page.screenshot(),
                contentType: "image/png"
            }
        );
    }
}
