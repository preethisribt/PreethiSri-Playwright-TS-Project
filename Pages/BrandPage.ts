import { Page, TestInfo } from "@playwright/test";
import { UtilityPage } from "../Utility/UtilityPage";

export class BrandPage {
    private utilityPage: UtilityPage;

    constructor(
        private page: Page,
        private testInfo: TestInfo
    ) {
        this.utilityPage = new UtilityPage(page, testInfo);
    }

    async selectBrand(brand: string) {
        await this.page.getByRole("link", { name: brand }).click();
        await this.utilityPage.attachScreenshotToReport("BrandPage");
    }
}
