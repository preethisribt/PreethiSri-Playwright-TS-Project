import { test } from "@playwright/test";
import LoginPage from "../../Pages/loginPage";
import HomePage from "../../Pages/homePage";
import ProductDetailsPage from "../../Pages/productDetailsPage";
import CartPage from "../../Pages/cartPage";
import OrderReviewPage from "../../Pages/orderReviewPage";
import { validUser } from "../../test-data/LoginTestData";
import { CustomerData, EnvData } from "../../test-data/EnvData";
const dataFromCSV : CustomerData[] = EnvData.getDataFromCSV();

test("Validate Cart is Empty", async ({ page }, testInfo) => {
    const loginPage: LoginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(validUser.UserName, validUser.Password);

    const cartPage: CartPage = new CartPage(page, testInfo);
    await cartPage.emptyCart();
    await cartPage.validateEmptyCartMessage();

    await page.close();
});

for(const data of dataFromCSV) {
    test(`Add Product and check product added to cart ${data.dataID}`, async ({ page }, testInfo) => {
        const loginPage: LoginPage = new LoginPage(page, testInfo);
        await loginPage.launchApplication();
        await loginPage.login(validUser.UserName, validUser.Password);

        const homePage: HomePage = new HomePage(page, testInfo);
        const categoryPage = await homePage.getCategoryPage();
        await categoryPage.selectCategory(data);

        const productDetailsPage: ProductDetailsPage = new ProductDetailsPage(page, testInfo);
        await productDetailsPage.addProductToCart();
        await productDetailsPage.viewCart();

        const cartPage: CartPage = new CartPage(page, testInfo);
        await cartPage.validateCart(data.product);
        await cartPage.proceedToCheckout();

        const orderReviewPage: OrderReviewPage = new OrderReviewPage(page, testInfo);
        await orderReviewPage.placeOrder();

        await loginPage.closeApp();

    });
}

