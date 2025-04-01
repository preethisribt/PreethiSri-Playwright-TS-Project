"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const UtilityPage_1 = require("../Utility/UtilityPage");
class CartPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.checkoutLink = this.page.getByText("Proceed To Checkout");
        this.cartProductName = (product) => this.page.getByText(product);
        this.emptyCartText = this.page.getByText("Cart is empty! Click here to buy products.");
        this.cartLink = this.page.getByRole("link", { name: "Cart" });
        this.quantityText = this.page.locator(".cart_quantity button");
        this.viewCartHeaderLink = this.page.getByRole('link', { name: /Cart/i });
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
    }
    async validateProductNameInCart(products) {
        await this.utilityPage.attachScreenshotToReport("CartPage");
        await Promise.allSettled(products.map((e) => {
            (0, test_1.expect)(this.cartProductName(e)).toBeVisible();
        }));
    }
    async validateCart(product, quantity) {
        await this.utilityPage.attachScreenshotToReport("CartPage");
        await (0, test_1.expect)(this.cartProductName(product)).toBeVisible();
        await this.validateQuantityInCart(quantity);
    }
    async validateQuantityInCart(quantity) {
        await (0, test_1.expect)(await this.quantityText.textContent()).toBe(String(quantity));
    }
    async proceedToCheckout() {
        await this.page.waitForTimeout(1000);
        await this.checkoutLink.click();
    }
    async validateEmptyCartMessage() {
        await this.cartLink.click();
        await (0, test_1.expect)(this.emptyCartText).toBeVisible();
        await this.utilityPage.attachScreenshotToReport("CartPage");
    }
    async emptyCart() {
        await this.cartHeaderLink();
        await this.utilityPage.attachScreenshotToReport("ProductCartPage");
        const deleteProduct = await this.page
            .locator("a.cart_quantity_delete")
            .all();
        for (const product of deleteProduct) {
            await product.click();
        }
    }
    async cartHeaderLink() {
        await this.viewCartHeaderLink.click();
    }
}
exports.default = CartPage;
//# sourceMappingURL=cartPage.js.map