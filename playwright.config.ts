import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({
    path: `D:/GitHub public repo/.env`
});

export default defineConfig({
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
        video: "retain-on-failure",
    },

    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                headless:false
                // viewport: null,
            }
        },
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
