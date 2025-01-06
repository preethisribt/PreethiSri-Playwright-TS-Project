import { expect, Page, TestInfo } from "@playwright/test";
import { UtilityPage } from "../Utility/UtilityPage";

class CategoryPage {
    utilityPage;
    products:string[];
    constructor(
        private page: Page,
        private testInfo: TestInfo) {
        this.utilityPage = new UtilityPage(page, testInfo);
    }

    private readonly categoryLink = (category: string) => this.page.getByRole("link", { name: category });
    private readonly subcategoryLink = (subcategory: string) => this.page.getByRole("link", { name: subcategory });
    private readonly viewProductLink = (product: string) => this.page.locator("//div[contains(@class,'productinfo')]//p[text()='" + product + "']/../..//following-sibling::div[@class='choose']//a[text()='View Product']");
    private readonly addToCartButton = this.page.getByRole("button", { name: "Add to cart" });

    async selectProductFromTheCategory(shoppingDetails) {
        this.products = await shoppingDetails.product.split(";");

        for(const product of this.products){
            await this.categoryLink(shoppingDetails.category).click();
            await this.subcategoryLink(shoppingDetails.subcategory).click();
            await this.viewProductLink(product).click();
            await this.addProductToCart();
            await this.utilityPage.attachScreenshotToReport("Continue Shopping");
            await this.page.getByRole("button",{name:"Continue Shopping"}).click();
        }
    }

    async addProductToCart() {
        await this.addToCartButton.waitFor({ state: 'visible' });
        await this.addToCartButton.click();
        await this.utilityPage.attachScreenshotToReport("ProductAddedToCart");
        await Promise.allSettled([
            expect(this.page.getByText("Added!")).toBeVisible({ timeout: 15_000 }),
            expect(this.page.getByText("Your product has been added to cart.")).toBeVisible(),
            expect(this.page.getByRole("link", { name: "View Cart" })).toBeVisible()]);
        }
}

export default CategoryPage;
