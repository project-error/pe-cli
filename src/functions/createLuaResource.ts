import path from 'path';
import { createEssentials } from './tools/essentials';
import { installTemplate } from './tools/github';

export const createLuaResource = (resourceName: string, packages: string[]) => {
  const resourcePath = path.resolve(resourceName);

  createEssentials(resourcePath, resourceName, packages, 'lua');
}