import path from "path";
import { createEssentials } from "./tools/essentials";
import { installTemplate } from "./tools/github";
import { supportedLanguage } from '../types/index';

const createResource = async (resourceName: string, language: supportedLanguage, packages: string[]) => {
	const resourcePath = path.resolve(resourceName);

	await createEssentials(resourcePath, resourceName, language);

	await installTemplate(resourcePath, packages, language)
    .catch((e) => console.log(`Error in installing template. Error: ${e.message}`))
    .then(() => console.log("Success!"));
};

export default createResource;
