"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const UtilityPage_1 = require("../Utility/UtilityPage");
class OrderConfirmationPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.orderConfirmationMessage = this.page.getByText("Order Placed!");
        this.congratulationsMessage = this.page.getByText("Congratulations! Your order has been confirmed!");
        this.downloadInvoiceLink = this.page.getByRole("link", { name: "Download Invoice" });
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
    }
    async validateOrderConfirmationMessage() {
        await (0, test_1.expect)(await this.orderConfirmationMessage).toBeVisible();
        await (0, test_1.expect)(await this.congratulationsMessage).toBeVisible();
        await (0, test_1.expect)(await this.downloadInvoiceLink).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("OrderConfirmationPage");
    }
}
exports.default = OrderConfirmationPage;
//# sourceMappingURL=OrderConfirmationPage.js.map