import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import ora from 'ora';
import templatePackage from '../../template/package.json';
const webpackConfigJS = require('../../template/js/webpack.config.js');

const createJavascriptResource = (resourceName: string, packages: string[]) => {
  const resourcePath = path.resolve(resourceName);
  const noPackagesData = "fx_version 'adamant'\ngame 'gta5'\n\nclient_script 'client.js'\n\nserver_script 'server.js'"
  const yesPackagesData = "fx_version 'adamant'\ngame 'gta5'\n\nclient_script 'dist/*.client.js'\n\nserver_script 'dist/*.server.js'"
  const execString = `cd ${resourcePath} && yarn add webpack webpack-cli --silent`

  const spinner = ora(`Creating ${resourceName} folder!`).start();

  const generateEssentials = () => {
    try {
      fs.mkdirSync(resourcePath);
      spinner.succeed('Successfully created resources folder!')
    } catch (error) {
      spinner.fail('Failed to create folder!')
    }

    spinner.text = 'Creating fxmanifest!';

    try {
      if (packages.length == 0) {
        fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, noPackagesData)
      } else {
        fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, yesPackagesData)
      }
      spinner.succeed('Successfully created fxmanifest.lua')
    } catch (error) {
      spinner.fail('Failed to create fxmanifest!');
    }

    spinner.text = "Creating client file";

    // client
    try {
      fs.mkdirSync(`${resourcePath}/client`)
      fs.writeFileSync(`${resourcePath}/client/client.js`, '// Start coding')
      spinner.succeed('Successfully created client script!')
    } catch (error) {
      spinner.fail('Failed to create client file!')
    }

    spinner.text = "Creating server file!";
    // server
    try {
      fs.mkdirSync(`${resourcePath}/server`)
      fs.writeFileSync(`${resourcePath}/server/server.js`, '// Start coding!')
      spinner.succeed('Successfully created server script!')
    } catch (error) {
      spinner.fail('Failed to create server file!')
    }
  }

  if (packages.length == 0) { // if no packages selected, run a default setup
    generateEssentials()
    spinner.succeed("Successfully created resource");
  } else if (packages.length > 0) {
    generateEssentials()
    fs.writeFileSync(`${resourcePath}/package.json`, JSON.stringify(templatePackage))

    spinner.start('Adding packages')
    if (shell.exec(execString).code !== 0) {
      spinner.fail("Failed to add packages");
      shell.exit(1);
    }
    
    spinner.succeed('Successfully added default packages')

    for (const jsPackage of packages) {
      spinner.text = `Adding ${jsPackage}`;
     if (shell.exec(`cd ${resourcePath} && yarn add ${jsPackage.toLowerCase()} --silent`).code !== 0) {
       spinner.fail("Failed to add selected packages")
     }

     spinner.succeed(`Successfully added ${jsPackage}`);
    }
    spinner.succeed("Successfully created resource");
    
    //FIXME: Clone repo, copy files and delete directory
    // cloning repo
    try {
      //if (shell.exec(`curl -s https://raw.githubusercontent.com/itschip/cfa-templates/master/js/webpack.config.js -o ${resourcePath}/webpack.config.js`).code !== 0) {
      if (shell.exec(`cd ${resourceName} && git clone https://github.com/itschip/cfa-templates.git`).code !== 0) {
        shell.exit(1)
      }
    } catch (error) {
      console.log(error)
    }
    
    // copying files
    try {
      fs.copyFileSync(`${resourceName}/cfa-templates/js/webpack.config.js`, `${resourceName}`)
    } catch (error) {
      console.log(error)
    }
  }

}

export default createJavascriptResource;