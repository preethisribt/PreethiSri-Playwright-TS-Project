"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidUsers = exports.validUsers = exports.invalidUser = exports.validUser = void 0;
exports.validUser = {
    UserName: "preethiAutomation@gmail.com",
    Password: "test1#123"
};
exports.invalidUser = {
    UserName: "auto@gmail.com",
    Password: "test1#123"
};
const invalidUser2 = {
    UserName: "preethiAutomation@gmail.com",
    Password: "passssas23"
};
exports.validUsers = [exports.validUser];
exports.invalidUsers = [exports.invalidUser, invalidUser2];
//# sourceMappingURL=LoginTestData.js.map