declare const promptUi: () => Promise<any> & {
    ui: import("inquirer/lib/ui/prompt");
};
export default promptUi;
