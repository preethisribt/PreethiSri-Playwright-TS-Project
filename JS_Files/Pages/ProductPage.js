"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPage = void 0;
const UtilityPage_1 = require("../Utility/UtilityPage");
class ProductPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.viewProductLink = (product) => this.page.locator("//div[contains(@class,'productinfo')]//p[text()='" + product + "']/../..//following-sibling::div[@class='choose']//a[text()='View Product']");
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
    }
    async viewProduct(product) {
        await this.viewProductLink(product).click();
        await this.utilityPage.attachScreenshotToReport("ProductDetailPage");
    }
}
exports.ProductPage = ProductPage;
//# sourceMappingURL=ProductPage.js.map