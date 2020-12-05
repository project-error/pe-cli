import fs from "fs";
import shell from "shelljs";
import ora from "ora";
import rimraf from "rimraf";

export const installTemplate = (
  resourcePath: string,
  packages: string[],
  isTypescript: boolean
) => {
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
    if (isTypescript) {
      fs.copyFileSync(
        `${resourcePath}/cfa-templates/ts/package.json`,
        `${resourcePath}/package.json`
      );
      fs.copyFileSync(
        `${resourcePath}/cfa-templates/ts/webpack.config.js`,
        `${resourcePath}/webpack.config.js`
      );
      // tsconfig
      fs.copyFileSync(
        `${resourcePath}/cfa-templates/ts/client/tsconfig.json`,
        `${resourcePath}/client/tsconfig.json`
      );
      fs.copyFileSync(
        `${resourcePath}/cfa-templates/ts/server/tsconfig.json`,
        `${resourcePath}/server/tsconfig.json`
      );
    } else {
      // USING JAVASCRIPT
      fs.copyFileSync(
        `${resourcePath}/cfa-templates/js/package.json`,
        `${resourcePath}/package.json`
      );
      fs.copyFileSync(
        `${resourcePath}/cfa-templates/js/webpack.config.js`,
        `${resourcePath}/webpack.config.js`
      );
    }
  } catch (error) {
    console.log(error);
    spinner.fail();
  }
  rimraf.sync(`${resourcePath}/cfa-templates`);

  
  spinner.succeed("Successfully added default packages");
  try {
    if (shell.exec(`cd ${resourcePath} && yarn --silent`).code !== 0) {
      shell.exit(1);
    }
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
