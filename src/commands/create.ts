import CreateLanguage from '../prompts/createLanguage'
import CreateResource from '../prompts/createResource';
import CreatePackages from '../prompts/createPackages';

export const createCommand = async () => {
  const language = await CreateLanguage()
  const resourceName = await CreateResource()
  CreatePackages(language, resourceName)
}