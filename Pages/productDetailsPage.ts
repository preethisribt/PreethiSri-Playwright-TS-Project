import { expect, Page, TestInfo } from "@playwright/test";
import { UtilityPage } from "../Utility/UtilityPage";

class ProductDetailsPage {
    utilityPage;

    constructor(
        private page: Page,
        private testInfo: TestInfo
    ) {
        this.utilityPage = new UtilityPage(page, testInfo);
    }

    private readonly addToCartButton = this.page.getByRole("button", { name: "Add to cart" });
    private readonly viewCartLink = this.page.getByRole("link", { name: "View Cart" });
    private readonly quantityTextBox = this.page.locator("#quantity");

    async addProductToCart() {
        await this.addToCartButton.waitFor({ state: "visible" });
        await this.addToCartButton.click();
        await this.utilityPage.attachScreenshotToReport("ProductAddedToCart");
        await Promise.allSettled([
            expect(this.page.getByText("Added!")).toBeVisible({ timeout: 15_000 }),
            expect(this.page.getByText("Your product has been added to cart.")).toBeVisible(),
            expect(this.page.getByRole("link", { name: "View Cart" })).toBeVisible()
        ]);
    }

    async viewCart() {
        await this.viewCartLink.click();
    }

    async selectQuantity(quantity: number) {
        await this.quantityTextBox.clear();
        await this.quantityTextBox.fill(String(quantity));
        await this.utilityPage.attachScreenshotToReport("Quantity");
    }
}

export default ProductDetailsPage;
