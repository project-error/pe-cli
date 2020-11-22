import fs from 'fs';
import path from 'path';
import createTypescriptResource from '../functions/createTypescriptResource';

const createPackages = (language: 'TypeScript' | 'JavaScript' | any, resourceName: any) => { 
  //console.log(resourceName.resource)
  console.log(language.languages)


  // creates the resource folder
  fs.mkdir(`./${resourceName.resource}`, (err) => {
    if (err) {
      console.log('Failed to add resource. Reason: ', err) 
    } else {
      console.log(`Resource folder ${resourceName.resource} was successfully created`)
    }
  })


  // I guess we just have to keep it like it in pacal case, as the language.langauges is like the name object. 
  
  if (language.languages === 'TypeScript') {
    //TODO: Add typescript package options here
    createTypescriptResource(resourceName.resource)
    console.log("poggers")
  }

  //TODO: Add javascript package options here
}

export default createPackages