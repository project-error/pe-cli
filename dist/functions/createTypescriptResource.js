"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const essentials_1 = require("./tools/essentials");
const github_1 = require("./tools/github");
const createTypescriptResource = (resourceName, tsPackages) => {
    const resourcePath = path_1.default.resolve(resourceName);
    essentials_1.createEssentials(resourcePath, resourceName, tsPackages, true); // true means that it is typescript
    // creating template
    github_1.installTemplate(resourcePath, tsPackages, true);
};
exports.default = createTypescriptResource;
//# sourceMappingURL=createTypescriptResource.js.map