"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const promptResource = () => inquirer_1.default.prompt([
    {
        name: 'val',
        type: 'input',
        message: 'Type in the name of the resource:',
        validate: function (value) {
            if (value.length) {
                return true;
            }
            else {
                return 'Please fill out the resource name';
            }
        },
    },
]);
exports.default = promptResource;
//# sourceMappingURL=promptResource.js.map