import CategoryPage from "./categoryPage";
import { Page } from "@playwright/test";

class HomePage {
  private categoryPage: CategoryPage;

  constructor(private page: Page) {
    this.categoryPage = new CategoryPage(page);
  }

  async getCategoryPage() {
    return this.categoryPage;
  }
}

export default HomePage;
