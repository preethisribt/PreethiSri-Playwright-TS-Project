import { expect, Page, TestInfo } from "@playwright/test";
import { getShoppingData } from "../test-data/shoppingData";
import { UtilityPage } from "./UtilityPage";

class CartPage {
  utilityPage;

  constructor(private page: Page, private testInfo: TestInfo) {
    this.utilityPage = new UtilityPage(page, testInfo);
  }

  private readonly checkoutLink = this.page.getByText("Proceed To Checkout");
  private readonly cartProductName = this.page.getByText(getShoppingData().product);
  private readonly emptyCartText = this.page.getByText("Cart is empty! Click here to buy products.");
  private readonly cartLink = this.page.getByRole("link", { name: "Cart" });

  async validateCart() {
    await this.utilityPage.attachScreenshotToReport("CartPage");
    await expect(this.cartProductName).toBeVisible();
  }

  async proceedToCheckout() {
    await this.page.waitForTimeout(1000);
    await this.checkoutLink.click();
  }

  async validateEmptyCartMessage() {
    await this.cartLink.click();
    await expect(this.emptyCartText).toBeVisible();
    await this.utilityPage.attachScreenshotToReport("CartPage");
  }

  async emptyCart() {
    await this.cartLink.click();
    await this.utilityPage.attachScreenshotToReport("ProductCartPage");

    const deleteProduct = await this.page.locator("a.cart_quantity_delete").all();
    for (const product of deleteProduct)
      await product.click();

  }
}

export default CartPage;
