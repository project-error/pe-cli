import inquirer from "inquirer";
import { SectionLine } from '../utils'

const promptPackages = (language: "JavaScript" | "TypeScript") => {
  if (language === 'JavaScript') {
    return jsPackages()
  }
  return tsPackages()
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
          name: "ESLint"
        },
        {
          name: "Prettier"
        },
        {
          name: "OtherPackage3"
        },
        {
          name: "OtherPackage4"
        },
        {
          name: "OtherPackage5"
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