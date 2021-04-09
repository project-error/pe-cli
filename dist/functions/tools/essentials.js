"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEssentials = void 0;
const fs_1 = __importDefault(require("fs"));
const ora_1 = __importDefault(require("ora"));
const createEssentials = (resourcePath, resourceName, packages, isTypescript) => {
    const packagesData = "fx_version 'cerulean'\ngame 'gta5'\n\nclient_script 'dist/client/*.client.js'\n\nserver_script 'dist/server/*.server.js'";
    const defaultData = "fx_verison 'cerulean'\ngame 'gta5'\n\nclient_script 'client/client.js'\n\nserver_script 'server/server.js'";
    // THIS WILL HAVE CHEKCKS IF IT WILL CREATE STUFF FOR TYEPESCIPT OR NOT
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
        // CREATING THE FXMANIFEST IF THE USER CHOOSE TYPESCRIPT
        // OR IF THE USER CHOOSES JS AND PACKAGES
        if (isTypescript || packages.length > 0) {
            fs_1.default.writeFileSync(`${resourcePath}/fxmanifest.lua`, packagesData);
        }
        else {
            fs_1.default.writeFileSync(`${resourcePath}/fxmanifest.lua`, defaultData);
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
        if (isTypescript) {
            fs_1.default.writeFileSync(`${resourcePath}/client/client.ts`, "// Start coding!");
            fs_1.default.writeFileSync(`${resourcePath}/server/server.ts`, "// Start coding!");
        }
        else {
            fs_1.default.writeFileSync(`${resourcePath}/client/client.js`, "// Start coding!");
            fs_1.default.writeFileSync(`${resourcePath}/server/server.js`, "// Start coding!");
        }
        spinner.succeed("Successfully created clinet and server script!");
    }
    catch (error) {
        spinner.fail("Failed to create files!");
    }
};
exports.createEssentials = createEssentials;
//# sourceMappingURL=essentials.js.map