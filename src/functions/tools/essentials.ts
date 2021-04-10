import fs from "fs";
import ora from "ora";
import { sprintf } from "sprintf-js";
import { supportedLanguage } from '../../types/index';

export const createEssentials = async (
  resourcePath: string,
  resourceName: string,
  language: supportedLanguage
  ) => {
    // THIS WILL HAVE CHEKCKS IF IT WILL CREATE STUFF FOR TYEPESCIPT OR NOT
    const spinner = ora(`Creating ${resourceName} resource!`).start();
    try {
      // Creating the folder
      fs.mkdirSync(resourcePath);
      spinner.succeed("Successfully created resource!");
    } catch (error) {
      spinner.fail("Failed to create resource!");
    }

    spinner.text = "Creating fxmanifest!";
    try {
      // CREATING THE FXMANIFEST IF THE USER CHOOSE TYPESCRIPT
      // OR IF THE USER CHOOSES JS AND PACKAGES
      const { fxmanifest } = await import(`../../stubs/${language}/fxmanifest.stub`)
      fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, sprintf(fxmanifest, resourceName));

      spinner.succeed("Successfully created fxmanifest.lua");
    } catch (error) {
      spinner.fail("Failed to create fxmanifest!");
    }

    spinner.text = "Creating client and server files!";
    // CREATING
    try {
      fs.mkdirSync(`${resourcePath}/client`);
      fs.mkdirSync(`${resourcePath}/server`);

      const { createFiles } = await import(`./creators/${language}`)

      createFiles(resourcePath)

      spinner.succeed("Successfully created client and server script!");
    } catch (error) {
      spinner.fail("Failed to create files!");
    }
  };