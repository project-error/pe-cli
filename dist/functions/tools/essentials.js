"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEssentials = void 0;
const fs_1 = __importDefault(require("fs"));
const ora_1 = __importDefault(require("ora"));
const sprintf_js_1 = require("sprintf-js");
const createEssentials = async (resourcePath, resourceName, language, uiFramework) => {
    const spinner = ora_1.default(`Creating ${resourceName} resource!`).start();
    try {
        // Creating the folder
        fs_1.default.mkdirSync(resourcePath);
        spinner.succeed("Successfully created resource!");
    }
    catch (error) {
        spinner.fail("Failed to create resource!");
    }
    spinner.text = "Creating fxmanifest!";
    try {
        if (uiFramework !== 'none') {
            const { fxmanifest } = await Promise.resolve().then(() => __importStar(require(`../../stubs/${language}/fxmanifest_react.stub`)));
            fs_1.default.writeFileSync(`${resourcePath}/fxmanifest.lua`, sprintf_js_1.sprintf(fxmanifest, resourceName));
        }
        else {
            const { fxmanifest } = await Promise.resolve().then(() => __importStar(require(`../../stubs/${language}/fxmanifest.stub`)));
            fs_1.default.writeFileSync(`${resourcePath}/fxmanifest.lua`, sprintf_js_1.sprintf(fxmanifest, resourceName));
        }
        spinner.succeed("Successfully created fxmanifest.lua");
    }
    catch (error) {
        spinner.fail("Failed to create fxmanifest!");
    }
    spinner.text = "Creating client and server files!";
    // CREATING
    try {
        fs_1.default.mkdirSync(`${resourcePath}/client`);
        fs_1.default.mkdirSync(`${resourcePath}/server`);
        if (uiFramework !== 'none')
            fs_1.default.mkdirSync(`${resourcePath}/ui`);
        const { createFiles } = await Promise.resolve().then(() => __importStar(require(`./creators/${language}`)));
        createFiles(resourcePath);
        spinner.succeed("Successfully created client and server script!");
    }
    catch (error) {
        spinner.fail("Failed to create files!");
    }
};
exports.createEssentials = createEssentials;
//# sourceMappingURL=essentials.js.map