import {  Locator, test } from "@playwright/test"

test("Practise", async ({ context }) => {
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("label").filter({ hasText: "Radio2" }).getByRole("radio").click();
    await page.getByPlaceholder("Type to Select Countries").fill("India");
    await page.waitForSelector("//li[@class='ui-menu-item']");
    const suggestions: Locator[] = await page.locator("//li[@class='ui-menu-item']").all();

    for (const locator of suggestions) {
        if (await locator.textContent() === "India") {
            await locator.click();
            break; // Stops after clicking the first match
        }
    }

    await page.locator("#dropdown-class-example").selectOption("Option3");
    await page.locator("label").filter({ hasText: "Option2" }).getByRole("checkbox").click();

    // const [newPage] = await Promise.all([context.waitForEvent("page"), page.locator("#openwindow").click()]);
    // await newPage.waitForLoadState("load");
    // await expect(newPage).toHaveTitle(/QAClick Academy/);

    // const results = await Promise.allSettled([context.waitForEvent("page"), page.locator("#opentab").click()]);
    // const newPage = results[0].status === "fulfilled" ? results[0].value : null;
    // await newPage.waitForEvent("load");
    // await expect(newPage).toHaveURL("https://www.qaclickacademy.com");
    // await newPage.close();

    // await expect(page.getByPlaceholder("Enter Your Name")).toBeVisible();


    //dialog
    // page.on("dialog", async dialog => {
    //     if (dialog.type() === "alert") {
    //         await expect(dialog.message()).toBe("Hello , share this practice page and share your knowledge");
    //         console.log(`dialog.type() is ${dialog.type()}`);
    //     }
    //     else if (dialog.type() === "confirm") {
    //         await expect(dialog.message()).toBe("Hello , Are you sure you want to confirm?");
    //         console.log(`dialog.type() is ${dialog.type()}`);
    //     }
    //     await dialog.accept();
    // });
    // const alertPromise = page.waitForEvent("dialog");
    // await page.locator("#alertbtn").click();
    // await alertPromise;

    // const confirmPromise = page.waitForEvent("dialog");
    // await page.locator("#confirmbtn").click();
    // await confirmPromise;

    // await page.getByRole("button", { name: "Show" }).click();
    // await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    // await page.getByRole("button", { name: "Hide" }).click();
    // await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();


    //table
    // let index;
    // const headers = await page.locator("table[name='courses'] th").allTextContents();

    // for (let i = 1; i <= headers.length; i++) {
    //     if (await headers[i] === "Price") {
    //         index = i +1;
    //         break;
    //     }
    // }
    // const tableData: string[] = await page.locator("table[name='courses'] tr td:nth-child(" + index + ")").allTextContents();
    // await tableData.map(e => console.log(e));

    //hover
    // await page.getByRole("button",{name:"Mouse Hover"}).hover();
    // await page.getByRole("link",{name:"Reload"}).click();

    // const frames: Frame[] = await page.frames();
    // console.log(`Total frames: ${await frames.length}`);


    const courseFrame = await page.frameLocator("#courses-iframe");
    const courses = await courseFrame.locator("#courses-block h2 a").allTextContents();

    console.log(courses);
    await page.close();
})
