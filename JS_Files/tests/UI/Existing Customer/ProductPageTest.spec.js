"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const loginPage_1 = __importDefault(require("../../../Pages/loginPage"));
const LoginTestData_1 = require("../../../test-data/LoginTestData");
const productPageTestData1_json_1 = __importDefault(require("../../../test-data/UI data/productPageTestData1.json"));
const BrandPage_1 = require("../../../Pages/BrandPage");
const ProductPage_1 = require("../../../Pages/ProductPage");
const productDetailsPage_1 = __importDefault(require("../../../Pages/productDetailsPage"));
const cartPage_1 = __importDefault(require("../../../Pages/cartPage"));
const orderReviewPage_1 = __importDefault(require("../../../Pages/orderReviewPage"));
const dataArray = productPageTestData1_json_1.default;
let loginPage;
test_1.test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new loginPage_1.default(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(LoginTestData_1.validUser.UserName, LoginTestData_1.validUser.Password);
});
dataArray.forEach((data) => {
    (0, test_1.test)(`validate product based on brand for bulk order ${data.dataID}`, { tag: "@Regression" }, async ({ page }, testInfo) => {
        const brandPage = new BrandPage_1.BrandPage(page, testInfo);
        await brandPage.selectBrand(data.brand);
        const productPage = new ProductPage_1.ProductPage(page, testInfo);
        await productPage.viewProduct(data.product);
        const productdetailPage = new productDetailsPage_1.default(page, testInfo);
        await productdetailPage.selectQuantity(data.quantity);
        await productdetailPage.addProductToCart();
        await productdetailPage.viewCart();
        const cartPage = new cartPage_1.default(page, testInfo);
        await cartPage.validateCart(data.product, data.quantity);
        await cartPage.proceedToCheckout();
        const orderReviewPage = new orderReviewPage_1.default(page, testInfo);
        await orderReviewPage.placeOrder();
    });
});
//# sourceMappingURL=ProductPageTest.spec.js.map