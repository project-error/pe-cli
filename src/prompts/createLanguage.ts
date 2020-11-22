import inquirer from "inquirer";
import { SectionLine } from "../utils";

const createLanguage = () => inquirer.prompt([
  {
    type: 'list',
    askAnswered: true,
    message: 'Please select a language to create a FiveM App for... ',
    name: 'languages',
    choices: [
      new inquirer.Separator(SectionLine),
      {
        name: 'TypeScript'
      },
      {
        name: 'JavaScript'
      },
      new inquirer.Separator(SectionLine)
    ],
    filter(answer): any {
      console.log(answer)
    }
  }
])

export default createLanguage
