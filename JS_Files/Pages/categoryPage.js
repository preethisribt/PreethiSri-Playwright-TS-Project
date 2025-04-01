"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UtilityPage_1 = require("../Utility/UtilityPage");
const ProductPage_1 = require("./ProductPage");
const productDetailsPage_1 = __importDefault(require("./productDetailsPage"));
class CategoryPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.categoryLink = (category) => this.page.getByRole("link", { name: category });
        this.subcategoryLink = (subcategory) => this.page.getByRole("link", { name: subcategory });
        this.utilityPage = new UtilityPage_1.UtilityPage(page, testInfo);
        this.productPage = new ProductPage_1.ProductPage(page, testInfo);
        this.productDetailPage = new productDetailsPage_1.default(page, testInfo);
    }
    async selectProductFromTheCategory(shoppingDetails) {
        this.products = await shoppingDetails.product.split(";");
        for (const product of this.products) {
            await this.categoryLink(shoppingDetails.category).click();
            await this.subcategoryLink(shoppingDetails.subcategory).click();
            await this.productPage.viewProduct(product);
            await this.productDetailPage.addProductToCart();
            await this.utilityPage.attachScreenshotToReport("Continue Shopping");
            await this.page.getByRole("button", { name: "Continue Shopping" }).click();
        }
    }
}
exports.default = CategoryPage;
//# sourceMappingURL=categoryPage.js.map