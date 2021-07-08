import fs from "fs";
import shell from "shelljs";
import ora from "ora";
import rimraf from "rimraf";
import { supportedLanguage } from '../../types/index';

export const installTemplate = async (
  resourcePath: string,
  packages: string[],
  language: supportedLanguage,
  uiFramework: string
): Promise<void> => {
  // CLONING REPO

  try {
    if (
      shell.exec(
        `cd ${resourcePath} && git clone https://github.com/itschip/cfa-templates.git`
      ).code !== 0
    ) {
      shell.exit(1);
    }
  } catch (error) {
    console.log(error);
  }

  const spinner = ora("Adding packages and webpack").start();
  // COPYING FILES AND ADDING THEM IN THE NEW RESOURCE PATH
  try {
    // USING TYPESCRIPT
    const { copyFiles } = await import(`./copiers/${language}`)
    copyFiles(resourcePath, uiFramework)
  } catch (error) {
    console.log(error);
    spinner.fail();
  }
  rimraf.sync(`${resourcePath}/cfa-templates`);

  try {
    if (shell.exec(`cd ${resourcePath} && yarn --silent`).code !== 0) {
      shell.exit(1);
    }

    if (uiFramework !== 'none') {
      if (shell.exec(`cd ${resourcePath}/ui && yarn --silent`).code !== 0) {
        shell.exit(1);
      }
    }

    spinner.succeed("Successfully added default packages");

  } catch (error) {
    console.log(error);
  }

  if (packages.length > 0) {
    for (const tsPackage of packages) {
      spinner.text = `Adding ${tsPackage}`;
      shell.exec(
        `cd ${resourcePath} && yarn add ${tsPackage.toLowerCase()} --silent`
      );
      spinner.succeed();
    }
  }
};
