"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = require("fs-extra");
const copyFiles = (resourcePath, uiFramework) => {
    if (uiFramework !== 'none') {
        fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/package.json`, `${resourcePath}/resources/package.json`);
        fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/webpack.config.js`, `${resourcePath}/resources/webpack.config.js`);
        (0, fs_extra_1.copySync)(`${resourcePath}/cfa-templates/${uiFramework}/`, `${resourcePath}/ui/`);
    }
    else {
        fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/package.json`, `${resourcePath}/package.json`);
        fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/webpack.config.js`, `${resourcePath}/webpack.config.js`);
    }
};
exports.copyFiles = copyFiles;
//# sourceMappingURL=javascript.js.map