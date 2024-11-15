import { Page, TestInfo } from "@playwright/test";
import { EnvData } from "../test-data/EnvData";

class OrderReviewPage {
  constructor(private page: Page, private testInfo: TestInfo,) {}

  private readonly placeOrderLink = this.page.getByRole("link", { name: "Place Order" });

  async placeOrder() {
    await this.page.screenshot({path:"./test-screenshots/"  + EnvData.dateTime  + "_" + this.testInfo.title + "OrderReviewPage.png"})
    await this.placeOrderLink.click();
  }
}

export default OrderReviewPage;