import fs from "fs";
import path from "path";
import shell from "shelljs";
import ora from "ora";
import rimraf from "rimraf";

const createJavascriptResource = (resourceName: string, packages: string[]) => {
  const resourcePath = path.resolve(resourceName);
  const noPackagesData =
    "fx_version 'adamant'\ngame 'gta5'\n\nclient_script 'client.js'\n\nserver_script 'server.js'";
  const yesPackagesData =
    "fx_version 'adamant'\ngame 'gta5'\n\nclient_script 'dist/*.client.js'\n\nserver_script 'dist/*.server.js'";
  //const execString = `cd ${resourcePath} && yarn add webpack webpack-cli --silent` // dont really need this

  const spinner = ora(`Creating ${resourceName} folder!`).start();

  const generateEssentials = () => {
    try {
      fs.mkdirSync(resourcePath);
      spinner.succeed("Successfully created resources folder!");
    } catch (error) {
      spinner.fail("Failed to create folder!");
    }

    spinner.text = "Creating fxmanifest!";

    try {
      if (packages.length == 0) {
        fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, noPackagesData);
      } else {
        fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, yesPackagesData);
      }
      spinner.succeed("Successfully created fxmanifest.lua");
    } catch (error) {
      spinner.fail("Failed to create fxmanifest!");
    }

    spinner.text = "Creating client file";

    // client
    try {
      fs.mkdirSync(`${resourcePath}/client`);
      fs.writeFileSync(`${resourcePath}/client/client.js`, "// Start coding");
      spinner.succeed("Successfully created client script!");
    } catch (error) {
      spinner.fail("Failed to create client file!");
    }

    spinner.text = "Creating server file!";
    // server
    try {
      fs.mkdirSync(`${resourcePath}/server`);
      fs.writeFileSync(`${resourcePath}/server/server.js`, "// Start coding!");
      spinner.succeed("Successfully created server script!");
    } catch (error) {
      spinner.fail("Failed to create server file!");
    }
  };

  if (packages.length == 0) {
    // if no packages selected, run a default setup
    generateEssentials();
    spinner.succeed("Successfully created resource");
  } else if (packages.length > 0) {
    generateEssentials();

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

    // getting package.json
    spinner.start("Adding packages");
    try {
      fs.copyFileSync(
        `${resourcePath}/cfa-templates/js/package.json`,
        `${resourcePath}/package.json`
      );
    } catch (error) {
      console.log(error);
    }

    // copying files
    try {
      fs.copyFileSync(
        `${resourcePath}/cfa-templates/js/webpack.config.js`,
        `${resourcePath}/webpack.config.js`
      );
    } catch (error) {
      console.log(error);
    }

    rimraf.sync(`${resourcePath}/cfa-templates`);

    spinner.succeed("Successfully added default packages");

    for (const jsPackage of packages) {
      spinner.text = `Adding ${jsPackage}`;
      if (
        shell.exec(
          `cd ${resourcePath} && yarn add ${jsPackage.toLowerCase()} --silent`
        ).code !== 0
      ) {
        spinner.fail("Failed to add selected packages");
      }

      spinner.succeed(`Successfully added ${jsPackage}`);
    }
    spinner.succeed("Successfully created resource");
  }
};

export default createJavascriptResource;
