**PreethiSri-Playwright-TS-Project**
** Overview**
This project is a test automation framework built using [Playwright](https://playwright.dev/) with TypeScript. It is designed to facilitate end-to-end testing for web applications and API to ensuring robust and reliable test coverage.
**Prerequisites**
**Before setting up the project, ensure you have the following installed:**
-	[Node.js](https://nodejs.org/en/download/) (version 14 or higher)
-	[npm](https://www.npmjs.com/get-npm) (comes with Node.js)
-	[Git](https://git-scm.com/downloads)
**Installation**
**1.	Clone the Repository**
        git clone https://github.com/preethisribt/PreethiSri-Playwright-TS-Project.git
**2.	 Navigate to the Project Directory**
 cd PreethiSri-Playwright-TS-Project
**3.	Install Dependencies**
npm install
**4.	Install Playwright Browsers**
npx playwright install
**5.	Running Tests**
•	Execute All Tests:   npx playwright test
•	Run Tests in a Specific Browser (e.g., Chromium):  npx playwright test --project=chromium
•	Run a Specific Test File:  npx playwright test tests/example.spec.ts
•	Debug Tests:  npx playwright test --debug

**Project Structure**
├── .github/workflows/    # GitHub Actions workflows
├── .husky/               # Git hooks for pre-commit and pre-push
├── .idea/                # IDE-specific settings (e.g., JetBrains IDEs)
├── Pages/                # Page Object Models
├── test-data/            # Test data files
├── tests/                # Test scripts
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore file
├── .prettierignore       # Prettier ignore file
├── .prettierrc           # Prettier configuration
├── eslint.config.mjs     # ESLint configuration module
├── package-lock.json     # npm lock file
├── package.json          # Project metadata and scripts
├── playwright.config.ts  # Playwright configuration
└── tsconfig.json         # TypeScript configuration

