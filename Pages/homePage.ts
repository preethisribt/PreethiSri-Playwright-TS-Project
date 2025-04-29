import CategoryPage from "./categoryPage";
import { expect, Page, TestInfo } from "@playwright/test";
import { BrandPage } from "./BrandPage";
import { UtilityPage } from "../Utility/UtilityPage";

class HomePage {
    private categoryPage: CategoryPage;
    private brandPage: BrandPage;
    private utilityPage: UtilityPage;

    private readonly searchProductText = this.page.locator("input#search_product");
    private readonly searchProductButton = this.page.locator("button#submit_search");
    private readonly searchProductResult = (product: string) =>
        this.page.locator("[class*='productinfo']", { hasText: product });

    constructor(private page: Page, private testInfo: TestInfo) {
        this.categoryPage = new CategoryPage(page, testInfo);
        this.brandPage = new BrandPage(page, testInfo);
        this.utilityPage = new UtilityPage(page, testInfo);
    }

    async getCategoryPage() {
        return this.categoryPage;
    }

    async searchProduct(product: string) {
        await this.page.getByRole("link", { name: "Products" }).click();
        await this.searchProductText.fill(product);
        await this.searchProductButton.click();
        await this.utilityPage.attachScreenshotToReport("searchProduct");
        await expect(this.searchProductResult(product)).toBeVisible();
    }

    async getAndValidateHomePageHeaders(expectedHeaders: string[]) {
        const headers: string[] = await this.page.locator("#header li a").allInnerTexts();
        const actualHeaders: string[] = await headers.map(e => e.replace(/[^a-zA-Z// ]/g, "").trim());
        expect(await actualHeaders).toEqual(expectedHeaders);
    }
}

export default HomePage;
