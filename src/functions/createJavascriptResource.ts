import fs from 'fs';
import path from 'path';
import shell, { mkdir } from 'shelljs';
import ora from 'ora';

const createJavascriptResource = (resourceName: string, packages: string[]) => {
  const resourcePath = path.resolve(resourceName);
  const data = "fx_version 'adamant'\ngame 'gta5'\n\nclient_script 'client.js'\n\nserver_script 'server.js'"

  const spinner = ora(`Creating ${resourceName} folder`).start();

  if (packages.length == 0) { // if no packages selected, run a default setup
    try {
      fs.mkdirSync(resourcePath);
      spinner.succeed('Created resource folder');
    } catch (error) {
      spinner.fail('Failed to create folder')
    }

    spinner.text = 'Creating fxmanifest';

    try {
      fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, data)
      spinner.succeed('Created fxmanifest')
    } catch (error) {
      spinner.fail('Failed to create fxmanifest');
    }

    spinner.text = "Creating client file"

    // client
    try {
      fs.mkdirSync(`${resourcePath}/client`)
      fs.writeFileSync(`${resourcePath}/client/client.js`, '// Start coding')
      spinner.succeed('Created client file')
    } catch (error) {
      spinner.fail('Failed to create client file')
    }

    spinner.text = "Creating server file"
    // server
    try {
      fs.mkdirSync(`${resourcePath}/server`)
      fs.writeFileSync(`${resourcePath}/server/server.js`, '// Start coding!')
      spinner.succeed('Created server file')
    } catch (error) {
      spinner.fail('Failed to create server file')
    }
  } else {
    // creating javascript resource with packages

    
  }

}

export default createJavascriptResource;