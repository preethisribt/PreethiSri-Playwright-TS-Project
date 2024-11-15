import { expect, Page, TestInfo } from "@playwright/test";
import { EnvData } from "../test-data/EnvData";

class ProductDetailsPage {
  constructor(private page: Page, private testInfo : TestInfo) {}

  private readonly addToCartButton = this.page.getByRole('button',{name:'Add to cart'});
  private readonly viewCartLink = this.page.getByRole('link',{name:'View Cart'});

  async addProductToCart()
  {
    await this.addToCartButton.click();
    await expect(this.page.getByText("Added!")).toBeVisible();
    await expect(this.page.getByText("Your product has been added to cart.")).toBeVisible();
    await expect(this.page.getByRole("link",{name:"View Cart"})).toBeVisible();
    await this.page.screenshot({path:"./test-screenshots/"  + EnvData.dateTime  + "_" + this.testInfo.title + "ProductInCart.png"})
  }

  async viewCart()
  {
    await this.viewCartLink.click()
  }
}

export default ProductDetailsPage;
