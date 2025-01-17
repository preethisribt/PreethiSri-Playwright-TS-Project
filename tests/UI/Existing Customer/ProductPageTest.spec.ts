import { test } from "@playwright/test";
import LoginPage from "../../../Pages/LoginPage";
import { validUser } from "../../../test-data/LoginTestData";
import datas from "../../../test-data/UI data/productPageTestData1.json";
import { ProductDetail } from "../../../test-data/DataUtility";
import { BrandPage } from "../../../Pages/BrandPage";
import { ProductPage } from "../../../Pages/ProductPage";
import ProductDetailsPage from "../../../Pages/ProductDetailsPage";
import CartPage from "../../../Pages/CartPage";
import OrderReviewPage from "../../../Pages/OrderReviewPage";

const dataArray = datas as ProductDetail[];
let loginPage: LoginPage;

test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(validUser.UserName, validUser.Password);
});

dataArray.forEach((data) => {
    test(`validate product based on brand for bulk order ${data.dataID}`, async ({ page }, testInfo) => {
        const brandPage: BrandPage = new BrandPage(page, testInfo);
        await brandPage.selectBrand(data.brand);

        const productPage: ProductPage = new ProductPage(page, testInfo);
        await productPage.viewProduct(data.product);

        const productdetailPage: ProductDetailsPage = new ProductDetailsPage(page, testInfo);
        await productdetailPage.selectQuantity(data.quantity);
        await productdetailPage.addProductToCart();
        await productdetailPage.viewCart();

        const cartPage: CartPage = new CartPage(page, testInfo);
        await cartPage.validateCart(data.product,data.quantity);
        await cartPage.proceedToCheckout();

        const orderReviewPage: OrderReviewPage = new OrderReviewPage(page, testInfo);
        await orderReviewPage.placeOrder();
    });
});
