import { defineConfig } from "@playwright/test";
import { config } from "dotenv";

config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  reporter: "html",

  use: {
    trace: "retain-on-failure",
    launchOptions:{
      args: ["--start-maximized"],
    }
  },
  
  projects: [
    {
      name: "chromium",
      use: { 
        // ...devices["Desktop Chrome"]
        viewport: null,
         },
    },

    // {
    //   name: "firefox",
    //   use: { 
    //    // ...devices["Desktop Firefox"]
    //    },
    // },

    // {
    //   name: "webkit",
    //   use: { 
    //   //  ...devices["Desktop Safari"] 
    //   },
    // },
  ],
});
