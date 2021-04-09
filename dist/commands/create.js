"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const promptLanguage_1 = __importDefault(require("../prompts/promptLanguage"));
const promptResource_1 = __importDefault(require("../prompts/promptResource"));
const promptPackages_1 = __importDefault(require("../prompts/promptPackages"));
const createTypescriptResource_1 = __importDefault(require("../functions/createTypescriptResource"));
const createJavascriptResource_1 = __importDefault(require("../functions/createJavascriptResource"));
//import createLuaResource from '../functions/createLuaResource';
// Create command functionality
const createCommand = async () => {
    const resourceName = await promptResource_1.default();
    const language = await promptLanguage_1.default();
    const packages = await promptPackages_1.default(language.val);
    if (language.val === 'TypeScript') {
        createTypescriptResource_1.default(resourceName.val, packages.val);
    }
    if (language.val === "JavaScript") {
        createJavascriptResource_1.default(resourceName.val, packages.val);
    }
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