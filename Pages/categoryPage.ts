import { Page, TestInfo } from "@playwright/test";
import { UtilityPage } from "../Utility/UtilityPage";
import { CustomerData } from "../test-data/DataUtility";
import { ProductPage } from "./ProductPage";
import ProductDetailsPage from "./ProductDetailsPage";

class CategoryPage {
    private utilityPage: UtilityPage;
    private productPage: ProductPage;
    private productDetailPage: ProductDetailsPage;
    products: string[];

    constructor(
        private page: Page,
        private testInfo: TestInfo
    ) {
        this.utilityPage = new UtilityPage(page, testInfo);
        this.productPage = new ProductPage(page, testInfo);
        this.productDetailPage = new ProductDetailsPage(page, testInfo);
    }

    private readonly categoryLink = (category: string) =>
        this.page.getByRole("link", { name: category });
    private readonly subcategoryLink = (subcategory: string) =>
        this.page.getByRole("link", { name: subcategory });

    async selectProductFromTheCategory(shoppingDetails: CustomerData) {
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

export default CategoryPage;
