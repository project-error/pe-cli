"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneResource = void 0;
const axios_1 = __importDefault(require("axios"));
const shelljs_1 = __importDefault(require("shelljs"));
const ora_1 = __importDefault(require("ora"));
const cloneResource = async (resourceName, url) => {
    try {
        const query = await axios_1.default.get(url);
        if (query.status !== 200) {
            console.log('URL not found');
            return;
        }
    }
    catch (e) {
        console.error('Could not validate URL');
        return;
    }
    try {
        if (shelljs_1.default.exec(`git clone ${url} ${resourceName}`).code !== 0) {
            shelljs_1.default.exit(1);
        }
    }
    catch (error) {
        console.log(error);
    }
    const spinner = (0, ora_1.default)('Installing packages...').start();
    spinner.succeed('Successfully added default packages');
    try {
        if (shelljs_1.default.exec(`cd ${resourceName} && yarn --silent && rm -rf .git && rm -rf .github`).code !== 0) {
            shelljs_1.default.exit(1);
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.cloneResource = cloneResource;
//# sourceMappingURL=cloneResource.js.map