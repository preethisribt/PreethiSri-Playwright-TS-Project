"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryPage_1 = __importDefault(require("./categoryPage"));
const test_1 = require("@playwright/test");
const BrandPage_1 = require("./BrandPage");
const UtilityPage_1 = require("../Utility/UtilityPage");
class HomePage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.searchProductText = this.page.locator("input#search_product");
        this.searchProductButton = this.page.locator("button#submit_search");
        this.searchProductResult = (product) => this.page.locator("[class*='productinfo']", { hasText: product });
        this.categoryPage = new categoryPage_1.default(page, testInfo);
        this.brandPage = new BrandPage_1.BrandPage(page, testInfo);
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
    }
    async getCategoryPage() {
        return this.categoryPage;
    }
    async searchProduct(product) {
        await this.page.getByRole("link", { name: "Products" }).click();
        await this.searchProductText.fill(product);
        await this.searchProductButton.click();
        await this.utilityPage.attachScreenshotToReport("searchProduct");
        await (0, test_1.expect)(this.searchProductResult(product)).toBeVisible();
    }
    async getHomePageheaders() {
        const expectedHeaders = ["Home", "Products", "Cart", "Signup / Login", "Test Cases", "API Testing", "Video Tutorials", "Contact us"];
        const actualHeaders = await this.page.locator("#header").getByRole("link").allTextContents();
        const actualHeadersRefined = actualHeaders.filter(header => header != "").map(header => header.replace(/[^\w\s/]/g, "").trim());
        console.log(actualHeadersRefined);
        await (0, test_1.expect)(actualHeadersRefined).toEqual(expectedHeaders);
    }
}
exports.default = HomePage;
//# sourceMappingURL=homePage.js.map