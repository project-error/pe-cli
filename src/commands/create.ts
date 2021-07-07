import promptLanguage from '../prompts/promptLanguage'
import promptResource from '../prompts/promptResource';
import promptPackages from '../prompts/promptPackages'
import { supportedLanguage, hasPackages } from '../types/index';
import createResource from '../functions/createResource';
import { cloneResource } from '../functions/cloneResource';
// Create command functionality
export const createCommand = async () => {
  const getUrlParam = process.argv.find(arg => arg.startsWith('http'))

  const resourceName = await promptResource()

  if (getUrlParam != null) {
    await cloneResource(resourceName.val, getUrlParam)
    return
  }

  const language = await promptLanguage()
  console.log(language)
  let packages = null
  if (hasPackages.includes(language.val)) {
    packages = await promptPackages(language.val)
  }

  createResource(resourceName.val, language.val, packages ? packages.val : [])

  const resultObject = {
    language,
    resourceName,
    packages
  }

  console.log("Result of prompts:")
  console.log(resultObject)
  // At this point we take results and pass it to a function that actually uses the inputs to create
  // a resource
}