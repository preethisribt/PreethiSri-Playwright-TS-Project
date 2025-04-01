"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UtilityPage_1 = require("../Utility/UtilityPage");
class OrderReviewPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.placeOrderLink = this.page.getByRole("link", {
            name: "Place Order"
        });
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
    }
    async placeOrder() {
        await this.utilityPage.attachScreenshotToReport("OrderPage");
        await this.placeOrderLink.click();
    }
}
exports.default = OrderReviewPage;
//# sourceMappingURL=orderReviewPage.js.map