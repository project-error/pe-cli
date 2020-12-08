declare const promptResource: () => Promise<any> & {
    ui: import("inquirer/lib/ui/prompt");
};
export default promptResource;
