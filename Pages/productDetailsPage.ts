import { expect, Page, TestInfo } from "@playwright/test";
import { UtilityPage } from "../Utility/UtilityPage";

class ProductDetailsPage {
    utilityPage;

    constructor(
        private page: Page,
        private testInfo: TestInfo) {
        this.utilityPage = new UtilityPage(page, testInfo);
    }

    private readonly addToCartButton = this.page.getByRole("button", { name: "Add to cart" });
    private readonly viewCartLink = this.page.getByRole("link", { name: "Cart" });

    async addProductToCart() {
        await this.addToCartButton.click();
        await expect(this.page.getByText("Added!")).toBeVisible({timeout:10000});
        await this.utilityPage.attachScreenshotToReport("ProductPage");
        await expect(this.page.getByText("Your product has been added to cart.")).toBeVisible();
        await expect(this.page.getByRole("link", { name: "View Cart" })).toBeVisible();
    }

    async viewCart() {
        await this.viewCartLink.click();
    }
}

export default ProductDetailsPage;
