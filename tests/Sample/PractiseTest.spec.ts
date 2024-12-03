import { expect, test } from "@playwright/test";

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
