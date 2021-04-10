import promptLanguage from '../prompts/promptLanguage'
import promptResource from '../prompts/promptResource';
import promptPackages from '../prompts/promptPackages'
import { supportedLanguage, hasPackages } from '../types/index';
import createResource from '../functions/createResource';
// Create command functionality
export const createCommand = async () => {
  const resourceName = await promptResource()
  const language = await promptLanguage()
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