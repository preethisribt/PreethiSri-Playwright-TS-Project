import { test } from "@playwright/test";
import LoginPage from "../../../Pages/loginPage";
import HomePage from "../../../Pages/homePage";
import ProductDetailsPage from "../../../Pages/productDetailsPage";
import CartPage from "../../../Pages/cartPage";
import OrderReviewPage from "../../../Pages/orderReviewPage";
import { validUser } from "../../../test-data/LoginTestData";
import { CustomerData, DataUtility } from "../../../test-data/DataUtility";
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

        const productDetailsPage: ProductDetailsPage = new ProductDetailsPage(page, testInfo);
        await productDetailsPage.viewCart();

        const cartPage: CartPage = new CartPage(page, testInfo);
        await cartPage.validateProductNameInCart(categoryPage.products);
        await cartPage.proceedToCheckout();

        const orderReviewPage: OrderReviewPage = new OrderReviewPage(page, testInfo);
        await orderReviewPage.placeOrder();
    });
}
