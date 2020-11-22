import figlet from "figlet";
import chalk from "chalk";
import CreateLanguage from '../prompts/createLanguage'
import CreateResource from '../prompts/createResource';

export const createCommand = async () => {
  const language = await CreateLanguage()
  const resourceName = await CreateResource()
  // const plugins = await CreatePackages(language, resourceName)
}