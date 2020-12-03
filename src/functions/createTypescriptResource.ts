import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import ora from 'ora';

const createTypescriptResource = (resourceName: string, tsPackages: string[]) => {

  const manifestPath = path.resolve(resourceName)
  const data = "fx_version 'adamant'\ngame 'gta5' \n\nclient_script 'dist/*.client.js'\n\nserver_script 'dist/*.server.js'"
  const execString = `cd ${manifestPath} && yarn init -y --silent && yarn add @citizenfx/client @citizenfx/server webpack webpack-cli ts-loader --silent`

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
  
  //FIXME: Clone repo, copy files and delete directory
  try {
    //shell.exec(`curl -s https://raw.githubusercontent.com/itschip/cfa-templates/master/ts/webpack.config.js -o ${resourceName}/webpack.config.js`)
    shell.exit(1);
  } catch (error) {
    console.log(error)
  }

}


export default createTypescriptResource


