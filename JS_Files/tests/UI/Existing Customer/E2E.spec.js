"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const loginPage_1 = __importDefault(require("../../../Pages/loginPage"));
const homePage_1 = __importDefault(require("../../../Pages/homePage"));
const cartPage_1 = __importDefault(require("../../../Pages/cartPage"));
const orderReviewPage_1 = __importDefault(require("../../../Pages/orderReviewPage"));
const LoginTestData_1 = require("../../../test-data/LoginTestData");
const DataUtility_1 = require("../../../test-data/DataUtility");
const PaymentPage_1 = __importDefault(require("../../../Pages/PaymentPage"));
const OrderConfirmationPage_1 = __importDefault(require("../../../Pages/OrderConfirmationPage"));
const dataFromCSV = DataUtility_1.DataUtility.getDataFromCSV();
let loginPage;
test_1.test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new loginPage_1.default(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(LoginTestData_1.validUser.UserName, LoginTestData_1.validUser.Password);
});
(0, test_1.test)("Validate Cart is Empty", { tag: "@Regression" }, async ({ page }, testInfo) => {
    const cartPage = new cartPage_1.default(page, testInfo);
    await cartPage.emptyCart();
    await cartPage.validateEmptyCartMessage();
});
for (const data of dataFromCSV) {
    (0, test_1.test)(`Add Product and check product added to cart ${data.dataID}`, { tag: "@Regression" }, async ({ page }, testInfo) => {
        const homePage = new homePage_1.default(page, testInfo);
        const categoryPage = await homePage.getCategoryPage();
        await categoryPage.selectProductFromTheCategory(data);
        const cartPage = new cartPage_1.default(page, testInfo);
        await cartPage.cartHeaderLink();
        await cartPage.validateProductNameInCart(categoryPage.products);
        await cartPage.proceedToCheckout();
        const orderReviewPage = new orderReviewPage_1.default(page, testInfo);
        await orderReviewPage.placeOrder();
        const paymentPage = new PaymentPage_1.default(page, testInfo);
        await paymentPage.selectPaymentMethod();
        await paymentPage.confirmPayment();
        const orderConfirmationPage = new OrderConfirmationPage_1.default(page, testInfo);
        await orderConfirmationPage.validateOrderConfirmationMessage();
    });
}
//# sourceMappingURL=E2E.spec.js.map