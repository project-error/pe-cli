declare const promptLanguage: () => Promise<any> & {
    ui: import("inquirer/lib/ui/prompt");
};
export default promptLanguage;
