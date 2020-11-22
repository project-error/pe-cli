import { createCommand } from "./commands/create";
import {SectionLine } from './utils'
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";

const ui = new inquirer.ui.BottomBar();
figlet.textSync('Create-FiveM-App',  {font: "Standard", horizontalLayout: "fitted" })
// Instantly Execs create command for testing
createCommand()