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
const installTemplate = async (resourcePath, packages, language, uiFramework) => {
    // CLONING REPO
    const spinner = ora_1.default('Cloning templates').start();
    try {
        if (!shelljs_1.default.which('git')) {
            shelljs_1.default.echo('This script requires git');
            shelljs_1.default.exit(1);
        }
        await shelljs_1.default.exec(`cd ${resourcePath} && git clone https://github.com/itschip/cfa-templates.git`, {
            silent: true,
        });
        spinner.succeed('Successfully cloned templates');
    }
    catch (error) {
        console.log(error);
        spinner.fail('Failed to clone templates');
    }
    try {
        // USING TYPESCRIPT
        spinner.start('Copying files to resource');
        const { copyFiles } = await Promise.resolve().then(() => __importStar(require(`./copiers/${language}`)));
        copyFiles(resourcePath, uiFramework);
        spinner.succeed('Successfully copied all files');
    }
    catch (error) {
        console.log(error);
        spinner.fail('Failed to copy files!');
    }
    rimraf_1.default.sync(`${resourcePath}/cfa-templates`);
    try {
        spinner.start('Installing default packages');
        try {
            await shelljs_1.default.exec(`cd ${resourcePath} && yarn --silent`, { silent: true });
            spinner.succeed('Successfully installed default packages');
        }
        catch (err) {
            spinner.fail('Failed to install default packages');
        }
        if (uiFramework !== 'none') {
            spinner.start('Installing UI packages');
            try {
                await shelljs_1.default.exec(`cd ${resourcePath}/ui && yarn --silent`, { silent: true });
                spinner.succeed('Successfully installed UI packages');
            }
            catch (err) {
                spinner.fail('Failed to install packages');
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    if (packages.length > 0) {
        for (const tsPackage of packages) {
            spinner.start(`Adding ${tsPackage}`);
            await shelljs_1.default.exec(`cd ${resourcePath} && yarn add ${tsPackage.toLowerCase()} --silent`, {
                silent: true,
            });
            spinner.succeed(`Successfully installed ${tsPackage}`);
        }
        spinner.succeed('Successfully installed selected packages');
    }
};
exports.installTemplate = installTemplate;
//# sourceMappingURL=github.js.map