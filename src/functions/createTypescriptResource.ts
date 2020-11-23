import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import ora from 'ora';

const createTypescriptResource = (resourceName: string, tsPackages: string[]) => {

  const manifestPath = path.resolve(resourceName)
  const data = "fx_version 'adamant'\ngame 'gta5' \n\nclient_script '*.client.js'\n\nserver_script '*.server.js'"
  const execString = `cd ${manifestPath} && yarn init -y --silent && yarn add @citizenfx/client @citizenfx/server --silent`

  const spinner = ora(`Creating ${resourceName} folder`).start();

  try {
    fs.mkdirSync(manifestPath);
  } catch(err) {
    console.log(err)
  }

  spinner.succeed();

  spinner.text = "Creating fxmanifest.lua"

  try {
    fs.writeFileSync(`${manifestPath}/fxmanifest.lua`, data);
  } catch(err) {
    console.log(err)
  }

  spinner.succeed();

  spinner.text = "Adding packages"
  if (shell.exec(execString).code !== 0) {
    spinner.fail();
    shell.exit(1)
  } else {
    spinner.succeed();
  }

  for (const tsPackage of tsPackages) {
    spinner.text = `Adding ${tsPackage}`;
    shell.exec(`cd ${manifestPath} && yarn add ${tsPackage} --silent`)
    spinner.succeed();
  }


}


export default createTypescriptResource


