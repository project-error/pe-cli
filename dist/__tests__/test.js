"use strict";
// Starting CLI Test
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createResource_1 = __importDefault(require("../functions/createResource"));
test('Choosing JavaScript with no packages', () => {
    expect(createResource_1.default('javascript-test', 'JavaScript', []));
    //createResource('javascript-test', 'JavaScript', [])
});
//# sourceMappingURL=test.js.map