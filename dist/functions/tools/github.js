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
exports.installTemplate = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const ora_1 = __importDefault(require("ora"));
const rimraf_1 = __importDefault(require("rimraf"));
const installTemplate = async (resourcePath, packages, language) => {
    // CLONING REPO
    try {
        if (shelljs_1.default.exec(`cd ${resourcePath} && git clone https://github.com/itschip/cfa-templates.git`).code !== 0) {
            shelljs_1.default.exit(1);
        }
    }
    catch (error) {
        console.log(error);
    }
    const spinner = ora_1.default("Adding packages and webpack").start();
    // COPYING FILES AND ADDING THEM IN THE NEW RESOURCE PATH
    try {
        // USING TYPESCRIPT
        const { copyFiles } = await Promise.resolve().then(() => __importStar(require(`./copiers/${language}`)));
        copyFiles(resourcePath);
    }
    catch (error) {
        console.log(error);
        spinner.fail();
    }
    rimraf_1.default.sync(`${resourcePath}/cfa-templates`);
    try {
        if (shelljs_1.default.exec(`cd ${resourcePath} && yarn --silent`).code !== 0) {
            shelljs_1.default.exit(1);
        }
        spinner.succeed("Successfully added default packages");
    }
    catch (error) {
        console.log(error);
    }
    if (packages.length > 0) {
        for (const tsPackage of packages) {
            spinner.text = `Adding ${tsPackage}`;
            shelljs_1.default.exec(`cd ${resourcePath} && yarn add ${tsPackage.toLowerCase()} --silent`);
            spinner.succeed();
        }
    }
};
exports.installTemplate = installTemplate;
//# sourceMappingURL=github.js.map