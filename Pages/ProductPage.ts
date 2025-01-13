import { Page, TestInfo } from "@playwright/test";
import { UtilityPage } from "../Utility/UtilityPage";

export class ProductPage {
    private utilityPage: UtilityPage;

    private readonly viewProductLink = (product: string) =>
        this.page.locator(
            "//div[contains(@class,'productinfo')]//p[text()='" +
                product +
                "']/../..//following-sibling::div[@class='choose']//a[text()='View Product']"
        );

    constructor(
        private page: Page,
        private testInfo: TestInfo
    ) {
        this.utilityPage = new UtilityPage(page, testInfo);
    }

    async viewProduct(product: string) {
        await this.viewProductLink(product).click();
        await this.utilityPage.attachScreenshotToReport("ProductDetailPage");
    }
}
