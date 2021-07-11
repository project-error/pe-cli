"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const utils_1 = require("../utils");
const promptUi = () => {
    return inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'val',
            message: 'Do you want to include a UI framework?',
            choices: [
                new inquirer_1.default.Separator(utils_1.SectionLine),
                {
                    name: 'None',
                    value: 'none',
                },
                {
                    name: 'React with TypeScript',
                    value: 'react_typescript',
                },
                {
                    name: 'React with JavaScript',
                    value: 'react_javascript',
                },
            ],
        },
    ]);
};
exports.default = promptUi;
//# sourceMappingURL=promptUi.js.map