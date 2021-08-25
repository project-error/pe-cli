import fs from 'fs';
import { copySync } from "fs-extra";

export const copyFiles = (resourcePath: string, uiFramework: string): void => {
  if (uiFramework !== 'none') {
    fs.copyFileSync(`${resourcePath}/cfa-templates/js/package.json`, `${resourcePath}/resources/package.json`);
    fs.copyFileSync(
      `${resourcePath}/cfa-templates/js/webpack.config.js`,
      `${resourcePath}/resources/webpack.config.js`,
    );

    copySync(`${resourcePath}/cfa-templates/${uiFramework}/`, `${resourcePath}/ui/`);
  } else {
    fs.copyFileSync(`${resourcePath}/cfa-templates/js/package.json`, `${resourcePath}/package.json`);
    fs.copyFileSync(
      `${resourcePath}/cfa-templates/js/webpack.config.js`,
      `${resourcePath}/webpack.config.js`,
    );

  }
};
