import fs from "fs";

export const copyFiles = (resourcePath: string): void => {
  fs.copyFileSync(
    `${resourcePath}/cfa-templates/js/package.json`,
    `${resourcePath}/package.json`
  );
  fs.copyFileSync(
    `${resourcePath}/cfa-templates/js/webpack.config.js`,
    `${resourcePath}/webpack.config.js`
  );
}