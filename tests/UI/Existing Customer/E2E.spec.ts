import { test } from "@playwright/test";
import LoginPage from "../../../Pages/LoginPage";
import HomePage from "../../../Pages/HomePage";
import CartPage from "../../../Pages/CartPage";
import OrderReviewPage from "../../../Pages/OrderReviewPage";
import { validUser } from "../../../test-data/LoginTestData";
import { CustomerData, DataUtility } from "../../../test-data/DataUtility";
import PaymentPage from "../../../Pages/PaymentPage";
import OrderConfirmationPage from "../../../Pages/OrderConfirmationPage";

const dataFromCSV: CustomerData[] = DataUtility.getDataFromCSV();
let loginPage: LoginPage;

test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(validUser.UserName, validUser.Password);
});

test("Validate Cart is Empty", async ({ page }, testInfo) => {
    const cartPage: CartPage = new CartPage(page, testInfo);
    await cartPage.emptyCart();
    await cartPage.validateEmptyCartMessage();
});

for (const data of dataFromCSV) {
    test(`Add Product and check product added to cart ${data.dataID}`, async ({ page }, testInfo) => {
        const homePage: HomePage = new HomePage(page, testInfo);
        const categoryPage = await homePage.getCategoryPage();
        await categoryPage.selectProductFromTheCategory(data);

        const cartPage: CartPage = new CartPage(page, testInfo);
        await cartPage.cartHeaderLink();
        await cartPage.validateProductNameInCart(categoryPage.products);
        await cartPage.proceedToCheckout();

        const orderReviewPage: OrderReviewPage = new OrderReviewPage(page, testInfo);
        await orderReviewPage.placeOrder();

        const paymentPage:PaymentPage = new PaymentPage(page, testInfo);
        await paymentPage.selectPaymentMethod();
        await paymentPage.confirmPayment();

        const orderConfirmationPage:OrderConfirmationPage = new OrderConfirmationPage(page, testInfo);
        await orderConfirmationPage.validateOrderConfirmationMessage();
        
    });
}
