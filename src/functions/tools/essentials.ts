import fs from "fs";
import ora from "ora";

export const createEssentials = (
  resourcePath: string,
  resourceName: string,
  packages: string[],
  isTypescript: boolean
) => {
  const packagesData =
    "fx_version 'adamant'\ngame 'gta5'\n\nclient_script 'dist/client/*.client.js'\n\nserver_script 'dist/server/*.server.js'"
  
  const defaultData = "fx_verison 'adamant'\ngame 'gta5'\n\nclient_script 'client/client.js'\n\nserver_script 'server/server.js'";
  
  // THIS WILL HAVE CHEKCKS IF IT WILL CREATE STUFF FOR TYEPESCIPT OR NOT

  const spinner = ora(`Creating ${resourceName} folder!`).start();
  try {
    // Creating the folder
    fs.mkdirSync(resourcePath);
    spinner.succeed("Successfully created resources folder!");
  } catch (error) {
    spinner.fail("Failed to create folder!");
  }

  spinner.text = "Creating fxmanifest!";
  try {
    // CREATING THE FXMANIFEST
    if (isTypescript || packages.length > 0) {
      fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, packagesData);
    } else {
      fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, defaultData);
    }
    spinner.succeed("Successfully created fxmanifest.lua");
  } catch (error) {
    spinner.fail("Failed to create fxmanifest!");
  }

  spinner.text = "Creating client and server files!";
  // CREATING
  try {
    fs.mkdirSync(`${resourcePath}/client`);
    fs.mkdirSync(`${resourcePath}/server`);

    if (isTypescript) {
      fs.writeFileSync(`${resourcePath}/client/client.ts`, "// Start coding");
      fs.writeFileSync(`${resourcePath}/server/server.ts`, "// Start coding!");
    } else {
      fs.writeFileSync(`${resourcePath}/client/client.js`, "// Start coding");
      fs.writeFileSync(`${resourcePath}/server/server.js`, "// Start coding!");
    }

    spinner.succeed("Successfully created clinet and server script!");
  } catch (error) {
    spinner.fail("Failed to create client file!");
  }
};