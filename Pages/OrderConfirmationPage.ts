import { expect, Page, TestInfo } from "@playwright/test";
import { UtilityPage } from "../Utility/UtilityPage";

class OrderConfirmationPage {
   private utilityPage: UtilityPage;
   
   private readonly orderConfirmationMessage = this.page.getByText("Order Placed!");
   private readonly congratulationsMessage = this.page.getByText("Congratulations! Your order has been confirmed!");
   private readonly downloadInvoiceLink = this.page.getByRole("link", { name: "Download Invoice" });

    constructor(
        private page: Page,
        private testInfo: TestInfo
    ) {
        this.utilityPage = new UtilityPage(page, testInfo);
    }


    async validateOrderConfirmationMessage()
    {
        await expect(await this.orderConfirmationMessage).toBeVisible();
        await expect(await this.congratulationsMessage ).toBeVisible();
        await expect(await this.downloadInvoiceLink).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("OrderConfirmationPage");
    }  
}

export default OrderConfirmationPage;