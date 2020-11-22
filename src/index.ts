import { createCommand } from "./commands/create";
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";

// This will eventually be used for ui stuff
const ui = new inquirer.ui.BottomBar();

console.log(
  chalk.red(
    figlet.textSync('Create-FiveM-App',  {font: 'Standard',horizontalLayout: "full" })
  )
)

// Instantly Execs create command for testing
createCommand().then(() => {
  console.log('Complete')
})