import path from "path";
import { createEssentials } from "./tools/essentials";
import { installTemplate } from "./tools/github";

const createJavascriptResource = (resourceName: string, packages: string[]) => {
  const resourcePath = path.resolve(resourceName);

  createEssentials(resourcePath, resourceName, packages, false);

  if (packages.length > 0) {
    installTemplate(resourcePath, packages, false)
  }
};

export default createJavascriptResource;
