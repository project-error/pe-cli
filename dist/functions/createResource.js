"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const essentials_1 = require("./tools/essentials");
const github_1 = require("./tools/github");
const createResource = async (resourceName, language, packages) => {
    const resourcePath = path_1.default.resolve(resourceName);
    await essentials_1.createEssentials(resourcePath, resourceName, language);
    if (packages.length > 0) {
        github_1.installTemplate(resourcePath, packages, language);
    }
};
exports.default = createResource;
//# sourceMappingURL=createResource.js.map