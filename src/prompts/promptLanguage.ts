import inquirer from "inquirer";
import { SectionLine } from "../utils";

// Returns the value chosen by the user
const promptLanguage = () => inquirer.prompt([
  {
    type: 'list',
    askAnswered: true,
    message: 'Please select a language to create a FiveM App for... ',
    name: 'val',
    choices: [
      new inquirer.Separator(SectionLine),
      {
        name: 'TypeScript',
        value: 'TypeScript',
      },
      {
        name: 'JavaScript',
        value: 'JavaScript'
      },
      {
        name: 'Lua',
        value: 'Lua'
      },
      new inquirer.Separator(SectionLine),
    ]
  }
])

export default promptLanguage
