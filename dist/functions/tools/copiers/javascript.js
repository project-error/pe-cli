"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const copyFiles = (resourcePath, uiFramework) => {
    fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/package.json`, `${resourcePath}/package.json`);
    fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/js/webpack.config.js`, `${resourcePath}/webpack.config.js`);
    if (uiFramework !== 'none') {
        fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/${uiFramework}/`, `${resourcePath}/ui/`);
    }
};
exports.copyFiles = copyFiles;
//# sourceMappingURL=javascript.js.map