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
const createJavascriptResource = (resourceName, packages) => {
    const resourcePath = path_1.default.resolve(resourceName);
    const noPackagesData = "fx_version 'adamant'\ngame 'gta5'\n\nclient_script 'client.js'\n\nserver_script 'server.js'";
    const yesPackagesData = "fx_version 'adamant'\ngame 'gta5'\n\nclient_script 'dist/*.client.js'\n\nserver_script 'dist/*.server.js'";
    //const execString = `cd ${resourcePath} && yarn add webpack webpack-cli --silent` // dont really need this
    const spinner = ora_1.default(`Creating ${resourceName} folder!`).start();
    const generateEssentials = () => {
        try {
            fs_1.default.mkdirSync(resourcePath);
            spinner.succeed("Successfully created resources folder!");
        }
        catch (error) {
            spinner.fail("Failed to create folder!");
        }
        spinner.text = "Creating fxmanifest!";
        try {
            if (packages.length == 0) {
                fs_1.default.writeFileSync(`${resourcePath}/fxmanifest.lua`, noPackagesData);
            }
            else {
                fs_1.default.writeFileSync(`${resourcePath}/fxmanifest.lua`, yesPackagesData);
            }
            spinner.succeed("Successfully created fxmanifest.lua");
        }
        catch (error) {
            spinner.fail("Failed to create fxmanifest!");
        }
        spinner.text = "Creating client file";
        // client
        try {
            fs_1.default.mkdirSync(`${resourcePath}/client`);
            fs_1.default.writeFileSync(`${resourcePath}/client/client.js`, "// Start coding");
            spinner.succeed("Successfully created client script!");
        }
        catch (error) {
            spinner.fail("Failed to create client file!");
        }
        spinner.text = "Creating server file!";
        // server
        try {
            fs_1.default.mkdirSync(`${resourcePath}/server`);
            fs_1.default.writeFileSync(`${resourcePath}/server/server.js`, "// Start coding!");
            spinner.succeed("Successfully created server script!");
        }
        catch (error) {
            spinner.fail("Failed to create server file!");
        }
    };
    if (packages.length == 0) {
        // if no packages selected, run a default setup
        generateEssentials();
        spinner.succeed("Successfully created resource");
    }
    else if (packages.length > 0) {
        generateEssentials();
        // cloning repo
        try {
            if (shelljs_1.default.exec(`cd ${resourceName} && git clone https://github.com/itschip/cfa-templates.git`).code !== 0) {
                shelljs_1.default.exit(1);
            }
        }
        catch (error) {
            console.log(error);
        }
        // getting package.json
        spinner.start("Adding packages");
        try {
            fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/package.json`, `${resourcePath}/package.json`);
        }
        catch (error) {
            console.log(error);
        }
        // copying files
        try {
            fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/webpack.config.js`, `${resourcePath}/webpack.config.js`);
        }
        catch (error) {
            console.log(error);
        }
        rimraf_1.default.sync(`${resourcePath}/cfa-templates`);
        spinner.succeed("Successfully added default packages");
        for (const jsPackage of packages) {
            spinner.text = `Adding ${jsPackage}`;
            if (shelljs_1.default.exec(`cd ${resourcePath} && yarn add ${jsPackage.toLowerCase()} --silent`).code !== 0) {
                spinner.fail("Failed to add selected packages");
            }
            spinner.succeed(`Successfully added ${jsPackage}`);
        }
        spinner.succeed("Successfully created resource");
    }
};
exports.default = createJavascriptResource;
//# sourceMappingURL=createJavascriptResource.js.map