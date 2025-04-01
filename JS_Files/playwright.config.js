"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (0, test_1.defineConfig)({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : 2,
    reporter: "html",
    use: {
        trace: "retain-on-failure",
        // launchOptions:{
        //   args: ["--start-maximized"],
        // },
        video: "retain-on-failure"
    },
    projects: [
        {
            name: "chromium",
            use: {
                ...test_1.devices["Desktop Chrome"],
                headless: false
                // viewport: null,
            }
        }
        //
        // {
        //     name: "firefox",
        //     use: {
        //         ...devices["Desktop Firefox"]
        //     }
        // },
        //
        // {
        //     name: "webkit",
        //     use: {
        //         ...devices["Desktop Safari"]
        //     }
        // }
    ]
});
//# sourceMappingURL=playwright.config.js.map