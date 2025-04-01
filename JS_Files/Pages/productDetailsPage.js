"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const UtilityPage_1 = require("../Utility/UtilityPage");
class ProductDetailsPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.addToCartButton = this.page.getByRole("button", { name: "Add to cart" });
        this.viewCartLink = this.page.getByRole("link", { name: "View Cart" });
        this.quantityTextBox = this.page.locator("#quantity");
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
    }
    async addProductToCart() {
        await this.addToCartButton.waitFor({ state: "visible" });
        await this.addToCartButton.click();
        await this.utilityPage.attachScreenshotToReport("ProductAddedToCart");
        await Promise.allSettled([
            (0, test_1.expect)(this.page.getByText("Added!")).toBeVisible({ timeout: 15000 }),
            (0, test_1.expect)(this.page.getByText("Your product has been added to cart.")).toBeVisible(),
            (0, test_1.expect)(this.page.getByRole("link", { name: "View Cart" })).toBeVisible()
        ]);
    }
    async viewCart() {
        await this.viewCartLink.click();
    }
    async selectQuantity(quantity) {
        await this.quantityTextBox.clear();
        await this.quantityTextBox.fill(String(quantity));
        await this.utilityPage.attachScreenshotToReport("Quantity");
    }
}
exports.default = ProductDetailsPage;
//# sourceMappingURL=productDetailsPage.js.map