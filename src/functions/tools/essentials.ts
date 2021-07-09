import fs from 'fs';
import ora from 'ora';
import { sprintf } from 'sprintf-js';
import { supportedLanguage } from '../../types/index';

export const createEssentials = async (
  resourcePath: string,
  resourceName: string,
  language: supportedLanguage,
  uiFramework: string,
) => {
  const spinner = ora(`Creating ${resourceName} resource!`).start();
  try {
    // Creating the folder
    fs.mkdirSync(resourcePath);
    spinner.succeed('Successfully created resource!');
  } catch (error) {
    spinner.fail('Failed to create resource!');
  }

  spinner.text = 'Creating fxmanifest!';
  try {
    if (uiFramework !== 'none') {
      const { fxmanifest } = await import(`../../stubs/${language}/fxmanifest_react.stub`);
      fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, sprintf(fxmanifest, resourceName));
    } else {
      const { fxmanifest } = await import(`../../stubs/${language}/fxmanifest.stub`);
      fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, sprintf(fxmanifest, resourceName));
    }

    spinner.succeed('Successfully created fxmanifest.lua');
  } catch (error) {
    spinner.fail('Failed to create fxmanifest!');
  }

  spinner.text = 'Creating client and server files!';
  // CREATING
  try {
    fs.mkdirSync(`${resourcePath}/client`);
    fs.mkdirSync(`${resourcePath}/server`);

    if (uiFramework !== 'none') fs.mkdirSync(`${resourcePath}/ui`);

    const { createFiles } = await import(`./creators/${language}`);

    createFiles(resourcePath);

    spinner.succeed('Successfully created client and server script!');
  } catch (error) {
    spinner.fail('Failed to create files!');
  }
};
