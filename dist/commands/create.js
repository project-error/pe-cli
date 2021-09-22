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
const promptUi_1 = __importDefault(require("../prompts/promptUi"));
// Create command functionality
const createCommand = async () => {
    const getUrlParam = process.argv.find((arg) => arg.startsWith('http'));
    const resourceName = await (0, promptResource_1.default)();
    if (getUrlParam != null) {
        await (0, cloneResource_1.cloneResource)(resourceName.val, getUrlParam);
        return;
    }
    const language = await (0, promptLanguage_1.default)();
    console.log(language);
    let packages = null;
    if (index_1.hasPackages.includes(language.val)) {
        packages = await (0, promptPackages_1.default)(language.val);
    }
    const uiFramework = await (0, promptUi_1.default)();
    await (0, createResource_1.default)(resourceName.val, language.val, packages ? packages.val : [], uiFramework.val);
    const resultObject = {
        language,
        resourceName,
        packages,
        uiFramework,
    };
    console.log('Result of prompts:');
    console.log(resultObject);
    // At this point we take results and pass it to a function that actually uses the inputs to create
    // a resource
};
exports.createCommand = createCommand;
//# sourceMappingURL=create.js.map