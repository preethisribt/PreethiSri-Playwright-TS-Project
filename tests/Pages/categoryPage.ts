import { Page } from "@playwright/test";

class CategoryPage {
  constructor(private page: Page) {}

  private readonly womenCategory = this.page.getByRole("link", {
    name: "Women",
  });
  private readonly womenTops = this.page.getByRole("link", { name: "Tops" });
  private readonly selectProduct = (product: string) =>
    this.page.locator(
      "//div[contains(@class,'productinfo')]//p[text()='" +
        product +
        "']/../..//following-sibling::div[@class='choose']//a[text()='View Product']",
    );

  async selectCategory() {
    await this.womenCategory.click();
    await this.womenTops.click();
    await this.page.waitForTimeout(2000);
    await this.selectProduct("Summer White Top").click();
    await this.page.waitForTimeout(2000);
  }
}

export default CategoryPage;
