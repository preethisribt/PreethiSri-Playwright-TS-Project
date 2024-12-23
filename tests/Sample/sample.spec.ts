import { test } from "@playwright/test";

test("sample", async ({ page }) => {
    page.on("request", (request) =>
        console.log(request.url(), request.method())
    );
    page.on("response", (response) =>
        console.log(response.url(), response.status())
    );

    await page.route("**/*", (route) => {
        const headers = {
            ...route.request().headers(),
            "test-header": "test-value"
        };
        route.continue({ headers });
    });

    await page.route("png", (route) => route.abort());

    await page.route(
        "**/web/index.php/api/v2/dashboard/employees/subunit",
        (route) => {
            route.fulfill({
                status: 200,
                json: {
                    data: [
                        {
                            subunit: {
                                id: 3,
                                name: "Engineering"
                            },
                            count: 100
                        },
                        {
                            subunit: {
                                id: 13,
                                name: "Human Resources"
                            },
                            count: 2
                        },
                        {
                            subunit: {
                                id: 2,
                                name: "Administration"
                            },
                            count: 1
                        },
                        {
                            subunit: {
                                id: 10,
                                name: "Client Services"
                            },
                            count: 1
                        }
                    ],
                    meta: {
                        otherEmployeeCount: 0,
                        unassignedEmployeeCount: 342,
                        totalSubunitCount: 4
                    },
                    rels: []
                }
            });
        }
    );

    await page.route(
        "**/web/index.php/api/v2/dashboard/employees/subunit",
        async (route) => {
            const response = await route.fetch();
            const json = await response.json();
            console.log(json);
            json.data[0].count = 100;

            return route.fulfill({
                status: 200,
                json: json
            });
        }
    );

    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
    // await page.getByRole('link', {name: 'Dashboard'}).click();
    await page.pause();
});
