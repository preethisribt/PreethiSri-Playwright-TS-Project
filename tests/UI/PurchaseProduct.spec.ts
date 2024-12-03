import { test } from "@playwright/test";
import LoginPage from "../../Pages/loginPage";
import HomePage from "../../Pages/homePage";
import { getShoppingData } from "../../test-data/shoppingData";
import ProductDetailsPage from "../../Pages/productDetailsPage";
import CartPage from "../../Pages/cartPage";
import OrderReviewPage from "../../Pages/orderReviewPage";
import { EnvData } from "../../test-data/EnvData";

test("Validate Cart is Empty",async ({page},testInfo)=>
{
   const loginPage : LoginPage=  new LoginPage(page,testInfo);
   await loginPage.launchApplication();
   await  loginPage.login(EnvData.UserName,EnvData.Password);

   const cartPage: CartPage = new CartPage(page, testInfo);
   await cartPage.emptyCart();
   await cartPage.validateEmptyCartMessage();

   await page.close();
});

test("Add Product and check product added to cart", async ({ page }, testInfo) => {

  const loginPage: LoginPage = new LoginPage(page, testInfo);
  await loginPage.launchApplication();
  await  loginPage.login(EnvData.UserName,EnvData.Password);

  const homePage: HomePage = new HomePage(page, testInfo);
  const categoryPage = await homePage.getCategoryPage();
  await categoryPage.selectCategory(getShoppingData());

  const productDetailsPage: ProductDetailsPage = new ProductDetailsPage(page, testInfo);
  await productDetailsPage.addProductToCart();
  await productDetailsPage.viewCart();

  const cartPage: CartPage = new CartPage(page, testInfo);
  await cartPage.validateCart();
  await cartPage.proceedToCheckout();

  const orderReviewPage: OrderReviewPage = new OrderReviewPage(page, testInfo);
  await orderReviewPage.placeOrder();

  await loginPage.closeApp();
});
