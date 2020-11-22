import fs from 'fs';
import path from 'path';

const createPackages = (language: 'typescript' | 'javascript', resourceName: any) => { 
  console.log(resourceName.resource)

  fs.mkdir(`./${resourceName.resource}`, (err) => {
    if (err) {
      console.log('Failed to add resource. Reason: ', err) 
    } else {
      console.log(`Resource folder ${resourceName.resource} was successfully created`)
    }
  })


  if (language === 'typescript') {
    //TODO: Add typescript package options here
    
  }

  //TODO: Add javascript package options here
}

export default createPackages