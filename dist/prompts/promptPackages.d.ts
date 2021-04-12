import { supportedLanguage } from '../types/index';
declare const promptPackages: (language: supportedLanguage) => Promise<any> & {
    ui: import("inquirer/lib/ui/prompt");
};
export default promptPackages;
