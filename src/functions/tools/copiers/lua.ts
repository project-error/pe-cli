import { copySync } from 'fs-extra';

export const copyFiles = (resourcePath: string, uiFramework: string): void => {
  // lua does not need to copy any files
  if (uiFramework !== 'none') {
    copySync(`${resourcePath}/cfa-templates/${uiFramework}`, `${resourcePath}/ui`);
  }
};
