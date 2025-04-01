import { test as base, request, APIRequestContext } from "@playwright/test";

// Defined custom fixture for API request context
export const test = base.extend<{ apiRequest: APIRequestContext }>({
    apiRequest: async ( _, use) => {  
        const apiRequest = await request.newContext({  
            baseURL: "https://restful-booker.herokuapp.com/",
            extraHTTPHeaders: {
                "Content-Type": "application/json",
            },
        });

        await use(apiRequest); 
    },
});

export { expect } from "@playwright/test";
