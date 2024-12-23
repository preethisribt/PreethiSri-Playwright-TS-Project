import { expect, Locator, test } from "@playwright/test";
import { MailSlurp } from "mailslurp-client";

test("table", async ({ page }) => {
    await page.goto("https://omayo.blogspot.com/");
    const names: (string | null)[][] = [];

    for (const row of await page.locator("table#table1 tbody tr").all()) {
        names.push(await row.locator("td").allTextContents());
    }

    // Promise.all(names.map(e=>console.log(e)))
    console.log(await names[0][0]);
});

test("list of data", async ({ page }) => {
    await page.goto("https://omayo.blogspot.com/");
    const listOData: Locator[] = await page.locator("div#HTML25 li").all();
    const liData: (string | null)[] = [];

    for (const data of listOData) {
        await liData.push(await data.textContent());
    }

    await liData.map((e) => console.log(e));
});

test("Keyboard and Mouse", async ({ page }) => {
    await page.goto("https://omayo.blogspot.com/");
    await page
        .getByText("This blog is created for")
        .getByRole("link", { name: "http://www.Selenium143." })
        .click({
            button: "right"
        });
    await page.getByText(/The cat was playing/).focus();
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Delete");
    await page.keyboard.type("From Automation");
    await page.pause();
});

test("Frames1", async ({ page }) => {
    // const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    // blocker.enableBlockingInPage(page);

    await page.goto("https://letcode.in/frame");
    const frame = await page.frameLocator("iframe[id='firstFr']");
    await frame.getByPlaceholder("Enter name").fill("sample");
    await frame.getByPlaceholder("Enter email").fill("sample@gmail.com");

    const childFrame = await frame.frameLocator("iframe[src='innerFrame']");
    await childFrame
        .getByPlaceholder("Enter email")
        .fill("childsample@gmail.com");
    await page.pause();
});

test("Frames2", async ({ page }) => {
    await page.goto("https://omayo.blogspot.com/");
    const frame = await page.frameLocator("iframe[id='iframe1']");
    await expect(
        frame.getByText("What should I know prior to learning Selenium?")
    ).toBeVisible();
    await page
        .frameLocator("iframe[id='navbar-iframe']")
        .locator("input#b-query")
        .fill("Sample");
});

test("Two Factor Authendication popup handle", async ({ page }) => {
    const apiKey = process.env.MAILSLURP_API_KEY as string;

    const mailslurp = new MailSlurp({ apiKey });
    const password = "test-password";
    const { id, emailAddress } = await mailslurp.createInbox();

    //create account
    await page.goto("https://playground.mailslurp.com");
    await page.locator('[data-test="sign-in-create-account-link"]').click();
    await page.locator("input[name=email]").fill(emailAddress);
    await page.locator("input[name=password]").fill(password);
    await page.getByRole("button", { name: "Create Account" }).click();

    //wait for verification code
    const email = await mailslurp.waitForLatestEmail(id);

    const code = /([0-9]{6})$/.exec(email.body!)![1];
    console.log(code);

    await page.getByPlaceholder("Enter your code").fill(code);
    await page.getByRole("button", { name: "confirm" }).click();

    await page.getByPlaceholder("Enter your username").fill(emailAddress);
    await page.getByPlaceholder("Enter your password").fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByText("Welcome")).toBeVisible();
});

test("Practise", async ({ page }) => {
    await page.route("**/*", (route, request) => {
        if (request.resourceType() === "image") route.abort();
        else route.continue();
    });
    await page.goto("https://omayo.blogspot.com/");
    await page.getByRole("textbox", { name: "search" }).fill("playwright");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page).toHaveURL(/q=playwright/);

    await page.locator("#radio1").check();
    await page.waitForTimeout(500);
    await page.close();
});

test("Authentication popup", async ({ page }) => {
    // await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    const value = "Basic " + btoa("admin:admin");
    await page.setExtraHTTPHeaders({ Authorization: value });

    await page.goto("https://the-internet.herokuapp.com/basic_auth");

    await expect(page.getByText("Basic Auth")).toBeVisible();
    await expect(
        page.getByText("Congratulations! You must have the proper credentials.")
    ).toBeVisible();
    await page.close();
});

test("Handle alert", async ({ page }) => {
    await page.goto("https://omayo.blogspot.com/search?q=playwright");

    page.on("dialog", (dialog) => {
        console.log(dialog.message());
        dialog.accept();
    });

    await page.locator("#alert1").click();
    await page.close();
});

test("Handle Prompt", async ({ page }) => {
    await page.goto("https://omayo.blogspot.com/search?q=playwright");

    page.on("dialog", (dialog) => {
        console.log(dialog.message());
        dialog.accept("Sample");
    });

    await page.getByRole("button", { name: "GetPrompt" }).click();
    await page.close();
});

test("Handle Confirmation Popup", async ({ page }) => {
    await page.goto("https://omayo.blogspot.com/search?q=playwright");

    page.on("dialog", (dialog) => {
        console.log(dialog.message());
        dialog.dismiss();
    });

    await page.getByRole("button", { name: "GetConfirmation" }).click();
    await page.close();
});

test("Find broken link", async ({ page, request }) => {
    await page.goto("https://omayo.blogspot.com/search?q=playwright");
    const allLinks = await page.getByRole("link").all();

    const hrefs = await Promise.all(
        allLinks.map((link) => link.getAttribute("href"))
    );

    const validLinks = await hrefs.reduce((links, link) => {
        if (link && !link.startsWith("JavaScript") && !link.startsWith("#"))
            links.add(link);
        return links;
    }, new Set<string>());

    for (const validLink of validLinks) {
        const response = await request.get(validLink);
        const text = await response.statusText();
        await expect.soft(text).toBeTruthy();
        // console.log(code);
    }
    console.log(validLinks);
});
