import { supportedLanguage } from '../types/index';
declare const createResource: (resourceName: string, language: supportedLanguage, packages: string[]) => Promise<void>;
export default createResource;
