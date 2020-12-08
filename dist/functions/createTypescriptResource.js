"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const ora_1 = __importDefault(require("ora"));
const rimraf_1 = __importDefault(require("rimraf"));
const createTypescriptResource = (resourceName, tsPackages) => {
    const resourcePath = path_1.default.resolve(resourceName);
    const data = "fx_version 'adamant'\ngame 'gta5' \n\nclient_script 'dist/client/*.client.js'\n\nserver_script 'dist/server/*.server.js'";
    const spinner = ora_1.default(`Creating ${resourceName} folder`).start();
    try {
        fs_1.default.mkdirSync(resourcePath);
    }
    catch (err) {
        console.log(err);
    }
    spinner.succeed();
    spinner.text = "Creating fxmanifest.lua";
    try {
        fs_1.default.writeFileSync(`${resourcePath}/fxmanifest.lua`, data);
    }
    catch (err) {
        console.log(err);
    }
    spinner.succeed();
    // client
    spinner.text = "Creating client file";
    try {
        fs_1.default.mkdirSync(`${resourcePath}/client`);
        fs_1.default.writeFileSync(`${resourcePath}/client/client.ts`, "// Start coding");
        spinner.succeed("Successfully created client script!");
    }
    catch (error) {
        spinner.fail("Failed to create client file!");
    }
    spinner.text = "Creating server file!";
    // server
    try {
        fs_1.default.mkdirSync(`${resourcePath}/server`);
        fs_1.default.writeFileSync(`${resourcePath}/server/server.ts`, "// Start coding!");
        spinner.succeed("Successfully created server script!");
    }
    catch (error) {
        spinner.fail("Failed to create server file!");
    }
    // cloning repo
    try {
        if (shelljs_1.default.exec(`cd ${resourceName} && git clone https://github.com/itschip/cfa-templates.git`).code !== 0) {
            shelljs_1.default.exit(1);
        }
    }
    catch (error) {
        console.log(error);
    }
    spinner.text = "Adding packages and webpack";
    // copying files
    try {
        fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/package.json`, `${resourcePath}/package.json`);
        fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/webpack.config.js`, `${resourcePath}/webpack.config.js`);
        // tsconfig
        fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/client/tsconfig.json`, `${resourcePath}/client/tsconfig.json`);
        fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/server/tsconfig.json`, `${resourcePath}/server/tsconfig.json`);
    }
    catch (error) {
        console.log(error);
    }
    rimraf_1.default.sync(`${resourcePath}/cfa-templates`);
    try {
        if (shelljs_1.default.exec(`cd ${resourcePath} && yarn --silent`).code !== 0) {
            shelljs_1.default.exit(1);
        }
    }
    catch (error) {
        console.log(error);
    }
    for (const tsPackage of tsPackages) {
        spinner.text = `Adding ${tsPackage}`;
        shelljs_1.default.exec(`cd ${resourcePath} && yarn add ${tsPackage.toLowerCase()} --silent`);
        spinner.succeed();
    }
};
exports.default = createTypescriptResource;
//# sourceMappingURL=createTypescriptResource.js.map