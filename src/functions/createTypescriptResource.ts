import fs from "fs";
import path from "path";
import shell from "shelljs";
import ora from "ora";
import rimraf from "rimraf";

const createTypescriptResource = (
  resourceName: string,
  tsPackages: string[]
) => {
  const resourcePath = path.resolve(resourceName);
  const data =
    "fx_version 'adamant'\ngame 'gta5' \n\nclient_script 'dist/*.client.js'\n\nserver_script 'dist/*.server.js'";

  const spinner = ora(`Creating ${resourceName} folder`).start();

  try {
    fs.mkdirSync(resourcePath);
  } catch (err) {
    console.log(err);
  }
  spinner.succeed();

  spinner.text = "Creating fxmanifest.lua";
  try {
    fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, data);
  } catch (err) {
    console.log(err);
  }
  spinner.succeed();

  // client
  spinner.text = "Creating client file";
  try {
    fs.mkdirSync(`${resourcePath}/client`);
    fs.writeFileSync(`${resourcePath}/client/client.ts`, "// Start coding");
    spinner.succeed("Successfully created client script!");
  } catch (error) {
    spinner.fail("Failed to create client file!");
  }

  spinner.text = "Creating server file!";
  // server
  try {
    fs.mkdirSync(`${resourcePath}/server`);
    fs.writeFileSync(`${resourcePath}/server/server.ts`, "// Start coding!");
    spinner.succeed("Successfully created server script!");
  } catch (error) {
    spinner.fail("Failed to create server file!");
  }

  // cloning repo
  try {
    if (
      shell.exec(
        `cd ${resourceName} && git clone https://github.com/itschip/cfa-templates.git`
      ).code !== 0
    ) {
      shell.exit(1);
    }
  } catch (error) {
    console.log(error);
  }

  spinner.text = "Adding packages and webpack";
  // copying files
  try {
    fs.copyFileSync(
      `${resourcePath}/cfa-templates/ts/package.json`,
      `${resourcePath}/package.json`
    );
    fs.copyFileSync(
      `${resourcePath}/cfa-templates/ts/webpack.config.js`,
      `${resourcePath}/webpack.config.js`
    );
  } catch (error) {
    console.log(error);
  }

  rimraf.sync(`${resourcePath}/cfa-templates`);

  for (const tsPackage of tsPackages) {
    spinner.text = `Adding ${tsPackage}`;
    shell.exec(
      `cd ${resourcePath} && yarn add ${tsPackage.toLowerCase()} --silent`
    );
    spinner.succeed();
  }
};

export default createTypescriptResource;
