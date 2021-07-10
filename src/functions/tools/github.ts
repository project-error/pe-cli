import fs from 'fs';
import shell, { cat } from 'shelljs';
import ora from 'ora';
import rimraf from 'rimraf';
import { supportedLanguage } from '../../types';

export const installTemplate = async (
  resourcePath: string,
  packages: string[],
  language: supportedLanguage,
  uiFramework: string,
): Promise<void> => {
  // CLONING REPO

  const spinner = ora('Cloning templates').start();
  try {
    if (!shell.which('git')) {
      shell.echo('This script requires git');
      shell.exit(1);
    }

    await shell.exec(
      `cd ${resourcePath} && git clone https://github.com/itschip/cfa-templates.git`,
      {
        silent: true,
      },
    );

    spinner.succeed('Successfully cloned templates');
  } catch (error) {
    console.log(error);
    spinner.fail('Failed to clone templates');
  }

  try {
    // USING TYPESCRIPT
    spinner.start('Copying files to resource');
    const { copyFiles } = await import(`./copiers/${language}`);
    copyFiles(resourcePath, uiFramework);
    spinner.succeed('Successfully copied all files');
  } catch (error) {
    console.log(error);
    spinner.fail('Failed to copy files!');
  }
  rimraf.sync(`${resourcePath}/cfa-templates`);

  try {
    spinner.start('Installing default packages');

    try {
      await shell.exec(`cd ${resourcePath} && yarn --silent`, { silent: true });
      spinner.succeed('Successfully installed default packages');
    } catch (err) {
      spinner.fail('Failed to install default packages');
    }

    if (uiFramework !== 'none') {
      spinner.start('Installing UI packages');
      try {
        await shell.exec(`cd ${resourcePath}/ui && yarn --silent`, { silent: true });
        spinner.succeed('Successfully installed UI packages');
      } catch (err) {
        spinner.fail('Failed to install packages');
      }
    }
  } catch (error) {
    console.log(error);
  }

  if (packages.length > 0) {
    for (const tsPackage of packages) {
      spinner.start(`Adding ${tsPackage}`);
      await shell.exec(`cd ${resourcePath} && yarn add ${tsPackage.toLowerCase()} --silent`, {
        silent: true,
      });
      spinner.succeed(`Successfully installed ${tsPackage}`);
    }

    spinner.succeed('Successfully installed selected packages');
  }
};
