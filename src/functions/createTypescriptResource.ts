import fs from 'fs';
import path from 'path';

const createTypescriptResource = (resourceName: string) => {
  const manifestPath = path.resolve(resourceName)
  let data = "fx_version 'adamant'\ngame 'gta5' \n\nclient_script '*.client.js'\n\nserver_script '*.server.js'"

  fs.writeFile(`${manifestPath}/fxmanifest.lua`, data, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Created fxmanifest')
    }
  })

  console.log("typescript")
}

export default createTypescriptResource


