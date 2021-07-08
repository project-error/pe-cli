"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const utils_1 = require("../utils");
// Returns the value chosen by the user
const promptLanguage = () => inquirer_1.default.prompt([
    {
        type: 'list',
        askAnswered: true,
        message: 'Please select a language to create a FiveM App for... ',
        name: 'val',
        choices: [
            new inquirer_1.default.Separator(utils_1.SectionLine),
            {
                name: 'TypeScript',
                value: 'TypeScript',
            },
            {
                name: 'JavaScript',
                value: 'JavaScript'
            },
            {
                name: 'Lua',
                value: 'Lua'
            },
            new inquirer_1.default.Separator(utils_1.SectionLine),
        ]
    }
]);
exports.default = promptLanguage;
//# sourceMappingURL=promptLanguage.js.map