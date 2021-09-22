"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = void 0;
const fs_extra_1 = require("fs-extra");
const copyFiles = (resourcePath, uiFramework) => {
    // lua does not need to copy any files
    if (uiFramework !== 'none') {
        (0, fs_extra_1.copySync)(`${resourcePath}/cfa-templates/${uiFramework}`, `${resourcePath}/ui`);
    }
};
exports.copyFiles = copyFiles;
//# sourceMappingURL=lua.js.map