import CategoryPage from "./categoryPage";
import { expect, Page, TestInfo } from "@playwright/test";
import { BrandPage } from "./BrandPage";

class HomePage {
    private categoryPage: CategoryPage;
    private brandPage: BrandPage;

    private readonly searchProductText = this.page.locator("input#search_product");
    private readonly searchProductButton = this.page.locator("button#submit_search");
    private readonly searchProductResult = (product: string) =>
        this.page.locator("[class*='productinfo']", { hasText: product });

    constructor(
        private page: Page,
        private testInfo: TestInfo
    ) {
        this.categoryPage = new CategoryPage(page, testInfo);
        this.brandPage = new BrandPage(page, testInfo);
    }

    async getCategoryPage() {
        return this.categoryPage;
    }

    async searchProduct(product: string) {
        await this.page.getByRole("link", { name: "Products" }).click();
        await this.searchProductText.fill(product);
        await this.searchProductButton.click();
        await expect(this.searchProductResult(product)).toBeVisible();
    }
}

export default HomePage;
