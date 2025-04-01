"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityPage = void 0;
const DataUtility_1 = require("../test-data/DataUtility");
class UtilityPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }
    async attachScreenshotToReport(pageName) {
        await this.testInfo.attach(this.testInfo.title + "_" + pageName + DataUtility_1.DataUtility.dateTime + ".png", {
            body: await this.page.screenshot(),
            contentType: "image/png"
        });
    }
}
exports.UtilityPage = UtilityPage;
//# sourceMappingURL=UtilityPage.js.map