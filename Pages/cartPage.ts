import { expect, Page, TestInfo } from "@playwright/test";
import { getShoppingData } from "../test-data/shoppingData";
import { EnvData } from "../test-data/EnvData";

class CartPage {
  constructor(private page: Page, private testInfo: TestInfo) {}

  private readonly checkoutLink = this.page.getByText("Proceed To Checkout");
  private readonly cartProductName = this.page.getByText(getShoppingData().product);

  async validateCart() {
    await this.page.screenshot({ path: "./test-screenshots/" + EnvData.dateTime + "_" + this.testInfo.title + "CartPage.png", });
    await expect(this.cartProductName).toBeVisible();
  }

  async proceedToCheckout() {
    await this.page.waitForTimeout(1000);
    await this.checkoutLink.click();
  }
}

export default CartPage;
