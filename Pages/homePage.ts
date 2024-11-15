import CategoryPage from "./categoryPage";
import { Page, TestInfo } from "@playwright/test";

class HomePage {
  private categoryPage: CategoryPage;

  constructor(private page: Page, private testInfo : TestInfo) {
    this.categoryPage = new CategoryPage(page,testInfo);
  }

  async getCategoryPage() {
    return this.categoryPage;
  }
}

export default HomePage;
