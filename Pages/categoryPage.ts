import { Page, TestInfo } from "@playwright/test";
import {  ShoppingDetails } from "../test-data/shoppingDetails";

class CategoryPage {
  constructor(private page: Page, private testInfo : TestInfo) {}

  private readonly categoryLink = (category : string) => this.page.getByRole("link", { name: category });
  private readonly subcategoryLink = (subcategory:string) => this.page.getByRole("link", { name: subcategory });
  private readonly viewProductLink = (product: string) => this.page.locator("//div[contains(@class,'productinfo')]//p[text()='" + product + "']/../..//following-sibling::div[@class='choose']//a[text()='View Product']");

  async selectCategory(shoppingDetails : ShoppingDetails) {
    await this.categoryLink(shoppingDetails.category).click();
    await this.subcategoryLink(shoppingDetails.subCategory).click();
    await this.viewProductLink(shoppingDetails.product).click();
    await this.page.screenshot({path:"./test-screenshots/" + Date.now() + "_" + this.testInfo.title + "Product.png"})
  }
}

export default CategoryPage;
