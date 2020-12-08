declare const promptPackages: (language: "JavaScript" | "TypeScript") => Promise<any> & {
    ui: import("inquirer/lib/ui/prompt");
};
export default promptPackages;
