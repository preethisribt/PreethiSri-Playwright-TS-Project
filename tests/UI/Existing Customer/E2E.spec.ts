import { test } from "@playwright/test";
import OrderReviewPage from "../../../Pages/orderReviewPage";
import LoginPage from "../../../Pages/loginPage";
import HomePage from "../../../Pages/homePage";
import CartPage from "../../../Pages/cartPage";
import datas from "../../../test-data/UI data/ProductData.json";
import validUser from "../../../test-data/UI data/CredentialsData.json";
import { CustomerData, ProductDetail } from "../../../test-data/DataUtility";
import DataUtility from "../../../test-data/DataUtility";
import PaymentPage from "../../../Pages/PaymentPage";
import OrderConfirmationPage from "../../../Pages/OrderConfirmationPage";
import { BrandPage } from "../../../Pages/BrandPage";
import ProductDetailsPage from "../../../Pages/productDetailsPage";
import { ProductPage } from "../../../Pages/ProductPage";

const dataFromCSV: CustomerData[] = DataUtility.getDataFromCSV();
const dataArray = datas as ProductDetail[];
let loginPage: LoginPage;

test.beforeEach("Launch Application and login", async ({ page }, testInfo) => {
    loginPage = new LoginPage(page, testInfo);
    await loginPage.launchApplication();
    await loginPage.login(validUser[0].UserName, validUser[0].Password);
});

for (const data of dataFromCSV) {
    test(`TC-004 Validate customer able to purchage product ${data.dataID}`,{tag:"@Regression"}, async ({ page }, testInfo) => {
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

dataArray.forEach((data) => {
    test(`TC-008 validate whether customer is able to purchase product on specific brand ${data.dataID}`,{tag:"@Regression"},async ({ page }, testInfo) => {
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

        const paymentPage:PaymentPage = new PaymentPage(page, testInfo);
        await paymentPage.selectPaymentMethod();
        await paymentPage.confirmPayment();

        const orderConfirmationPage:OrderConfirmationPage = new OrderConfirmationPage(page, testInfo);
        await orderConfirmationPage.validateOrderConfirmationMessage();
    });
});

