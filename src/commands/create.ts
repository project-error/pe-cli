import figlet from "figlet";
import chalk from "chalk";
import CreateLanguage from '../prompts/createLanguage'

export const createCommand = async () => {
  const language = await CreateLanguage()
  // const plugins = await CreatePackages(language)
}