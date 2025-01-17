import { Page, TestInfo } from "@playwright/test";
import { UtilityPage } from "../Utility/UtilityPage";

class PaymentPage {
    private utilityPage: UtilityPage;

    private readonly paymentMethodLink = this.page.getByRole("link", { name: "Payment Method" });
    private readonly confirmPaymentButton = this.page.getByRole("button", { name: "Confirm Payment" });

    constructor(
        private page: Page,
        private testInfo: TestInfo
    ) {
        this.utilityPage = new UtilityPage(page, testInfo);
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

export default PaymentPage;