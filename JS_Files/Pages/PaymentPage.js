"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UtilityPage_1 = require("../Utility/UtilityPage");
class PaymentPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.paymentMethodLink = this.page.getByRole("link", { name: "Payment Method" });
        this.confirmPaymentButton = this.page.getByRole("button", { name: "Confirm Payment" });
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
    }
    async selectPaymentMethod() {
        await this.page.locator("input[name='name_on_card']").fill("Test User");
        await this.page.locator("input[name='card_number']").fill("123456789012");
        await this.page.locator("input[name='cvc']").fill("123");
        await this.page.getByPlaceholder("MM").fill("12");
        await this.page.getByPlaceholder("YYYY").fill("2030");
    }
    async confirmPayment() {
        await this.utilityPage.attachScreenshotToReport("PaymentPage");
        await this.page.getByRole("button", { name: "Pay and Confirm Order" }).click();
    }
}
exports.default = PaymentPage;
//# sourceMappingURL=PaymentPage.js.map