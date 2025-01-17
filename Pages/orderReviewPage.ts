import { Page, TestInfo } from "@playwright/test";
import { UtilityPage } from "../Utility/UtilityPage";

class OrderReviewPage {
    private utilityPage: UtilityPage;

    constructor(
        private page: Page,
        private testInfo: TestInfo
    ) {
        this.utilityPage = new UtilityPage(page, testInfo);
    }

    private readonly placeOrderLink = this.page.getByRole("link", {
        name: "Place Order"
    });

    async placeOrder() {
        await this.utilityPage.attachScreenshotToReport("OrderPage");
        await this.placeOrderLink.click();
    }
}

export default OrderReviewPage;
