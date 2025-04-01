"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
const test_1 = require("@playwright/test");
// Define custom fixture for API request context
exports.test = test_1.test.extend({
    apiRequest: async (_, use) => {
        const apiRequest = await test_1.request.newContext({
            baseURL: "https://restful-booker.herokuapp.com/",
            extraHTTPHeaders: {
                "Content-Type": "application/json",
            },
        });
        await use(apiRequest); // Provide API context to all tests
    },
});
var test_2 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_2.expect; } });
//# sourceMappingURL=fixture.js.map