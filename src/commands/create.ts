import promptLanguage from '../prompts/promptLanguage'
import promptResource from '../prompts/promptResource';
import promptPackages from '../prompts/promptPackages'
import createTypescriptResource from '../functions/createTypescriptResource';
import createJavascriptResource from '../functions/createJavascriptResource';

// Create command functionality
export const createCommand = async () => {
  const resourceName = await promptResource()
  const language = await promptLanguage()
  const packages = await promptPackages(language.val)

  if (language.val === 'TypeScript') {
    createTypescriptResource(resourceName.val, packages.val)
  }

  if (language.val === "JavaScript") {
    createJavascriptResource(resourceName.val, packages.val)
  }

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