"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const essentials_1 = require("./tools/essentials");
const github_1 = require("./tools/github");
const createResource = async (resourceName, language, packages, uiFramework) => {
    console.log('selected ui framework', uiFramework);
    const resourcePath = path_1.default.resolve(resourceName);
    await essentials_1.createEssentials(resourcePath, resourceName, language, uiFramework);
    await github_1.installTemplate(resourcePath, packages, language, uiFramework)
        .catch((e) => console.log(`Error in installing template. Error: ${e.message}`))
        .then(() => console.log('Success!'));
};
exports.default = createResource;
//# sourceMappingURL=createResource.js.map