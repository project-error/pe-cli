"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const createFiles = (resourcePath, uiFramework) => {
    if (uiFramework === 'none') {
        fs_1.default.writeFileSync(`${resourcePath}/client/client.js`, '// Start coding!');
        fs_1.default.writeFileSync(`${resourcePath}/server/server.js`, '// Start coding!');
    }
    else {
        fs_1.default.writeFileSync(`${resourcePath}/resources/client/client.js`, '// Start coding!');
        fs_1.default.writeFileSync(`${resourcePath}/resources/server/server.js`, '// Start coding!');
    }
};
exports.createFiles = createFiles;
//# sourceMappingURL=javascript.js.map