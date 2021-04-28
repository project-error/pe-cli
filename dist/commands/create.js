"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const promptLanguage_1 = __importDefault(require("../prompts/promptLanguage"));
const promptResource_1 = __importDefault(require("../prompts/promptResource"));
const promptPackages_1 = __importDefault(require("../prompts/promptPackages"));
const index_1 = require("../types/index");
const createResource_1 = __importDefault(require("../functions/createResource"));
const cloneResource_1 = require("../functions/cloneResource");
// Create command functionality
const createCommand = async () => {
    const getUrlParam = process.argv.find(arg => arg.startsWith('http'));
    const resourceName = await promptResource_1.default();
    if (getUrlParam != null) {
        await cloneResource_1.cloneResource(resourceName.val, getUrlParam);
        return;
    }
    const language = await promptLanguage_1.default();
    let packages = null;
    if (index_1.hasPackages.includes(language.val)) {
        packages = await promptPackages_1.default(language.val);
    }
    createResource_1.default(resourceName.val, language.val, packages ? packages.val : []);
    const resultObject = {
        language,
        resourceName,
        packages
    };
    console.log("Result of prompts:");
    console.log(resultObject);
    // At this point we take results and pass it to a function that actually uses the inputs to create
    // a resource
};
exports.createCommand = createCommand;
//# sourceMappingURL=create.js.map