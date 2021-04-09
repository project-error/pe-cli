"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const shelljs_1 = __importDefault(require("shelljs"));
const ora_1 = __importDefault(require("ora"));
const rimraf_1 = __importDefault(require("rimraf"));
const installTemplate = (resourcePath, packages, isTypescript) => {
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
        if (isTypescript) {
            fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/package.json`, `${resourcePath}/package.json`);
            fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/webpack.config.js`, `${resourcePath}/webpack.config.js`);
            // tsconfig
            fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/client/tsconfig.json`, `${resourcePath}/client/tsconfig.json`);
            fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/server/tsconfig.json`, `${resourcePath}/server/tsconfig.json`);
        }
        else {
            // USING JAVASCRIPT 
            // I'd like to change the js structure. Users should be able to select packages as well,
            // if they don't we don't create a webpack at all.
            fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/package.json`, `${resourcePath}/package.json`);
            fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/webpack.config.js`, `${resourcePath}/webpack.config.js`);
        }
    }
    catch (error) {
        console.log(error);
        spinner.fail();
    }
    rimraf_1.default.sync(`${resourcePath}/cfa-templates`);
    spinner.succeed("Successfully added default packages");
    try {
        if (shelljs_1.default.exec(`cd ${resourcePath} && yarn --silent`).code !== 0) {
            shelljs_1.default.exit(1);
        }
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