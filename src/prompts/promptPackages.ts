import inquirer from "inquirer";
import { SectionLine } from '../utils'
import { supportedLanguage } from '../types/index';

const promptPackages = (language: supportedLanguage) => {
  if (language === 'JavaScript') {
    return jsPackages()
  }
  if (language === 'TypeScript') {
    return tsPackages()
  }
  return inquirer.prompt([])
}

const jsPackages = () => {
  return inquirer.prompt([
    {
      type: "checkbox",
      name: "val",
      message: "What JavaScript packages would you like to use with this project?",
      choices: [
        new inquirer.Separator(SectionLine),
        {
          name: "eslint"
        },
        {
          name: "prettier"
        },
        new inquirer.Separator(SectionLine)
      ]
    }
  ])
}
// If the language is ts, th
const tsPackages = () => {
  return inquirer.prompt([
    {
      type: "checkbox",
      name: "val",
      message: "What TypeScript packages would you like to use with this project?",
      choices: [
        new inquirer.Separator(SectionLine),
        {
          name: "TypeORM"
        },
        {
          name: "fivem-js"
        },
        {
          name: "mysql2"
        },
        {
          name: 'esx.js'
        },
        new inquirer.Separator(SectionLine)
      ]
    }
  ])
}

export default promptPackages
