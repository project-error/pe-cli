import fs from "fs";
import { copySync } from 'fs-extra';

export const copyFiles = (resourcePath: string, uiFramework: string): void => {
  fs.copyFileSync(
    `${resourcePath}/cfa-templates/ts/package.json`,
    `${resourcePath}/package.json`
  );
  fs.copyFileSync(
    `${resourcePath}/cfa-templates/ts/webpack.config.js`,
    `${resourcePath}/webpack.config.js`
  );
  // tsconfig
  fs.copyFileSync(
    `${resourcePath}/cfa-templates/ts/client/tsconfig.json`,
    `${resourcePath}/client/tsconfig.json`
  );
  fs.copyFileSync(
    `${resourcePath}/cfa-templates/ts/server/tsconfig.json`,
    `${resourcePath}/server/tsconfig.json`
  );

  if (uiFramework !== 'none') {
    copySync(
        `${resourcePath}/cfa-templates/${uiFramework}`,
        `${resourcePath}/ui`
    )
  }
}