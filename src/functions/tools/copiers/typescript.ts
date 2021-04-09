import fs from "fs";

export const copyFiles = (resourcePath: string): void => {
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
}