"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const copyFiles = (resourcePath) => {
    fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/package.json`, `${resourcePath}/package.json`);
    fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/webpack.config.js`, `${resourcePath}/webpack.config.js`);
    // tsconfig
    fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/client/tsconfig.json`, `${resourcePath}/client/tsconfig.json`);
    fs_1.default.copyFileSync(`${resourcePath}/cfa-templates/ts/server/tsconfig.json`, `${resourcePath}/server/tsconfig.json`);
};
exports.copyFiles = copyFiles;
//# sourceMappingURL=typescript.js.map