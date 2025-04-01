"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandPage = void 0;
const UtilityPage_1 = require("../Utility/UtilityPage");
class BrandPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
    }
    async selectBrand(brand) {
        await this.page.getByRole("link", { name: brand }).click();
        await this.utilityPage.attachScreenshotToReport("BrandPage");
    }
}
exports.BrandPage = BrandPage;
//# sourceMappingURL=BrandPage.js.map