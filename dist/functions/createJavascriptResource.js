"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const essentials_1 = require("./tools/essentials");
const github_1 = require("./tools/github");
const createJavascriptResource = (resourceName, packages) => {
    const resourcePath = path_1.default.resolve(resourceName);
    essentials_1.createEssentials(resourcePath, resourceName, packages, false); // false means not typescript
    if (packages.length > 0) {
        github_1.installTemplate(resourcePath, packages, false);
    }
};
exports.default = createJavascriptResource;
//# sourceMappingURL=createJavascriptResource.js.map