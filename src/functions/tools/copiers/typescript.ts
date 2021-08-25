import fs from 'fs';
import { copySync } from 'fs-extra';

export const copyFiles = (resourcePath: string, uiFramework: string): void => {
	if (uiFramework !== 'none') {
		fs.copyFileSync(`${resourcePath}/cfa-templates/ts/package.json`, `${resourcePath}/resources/package.json`);
		fs.copyFileSync(
			`${resourcePath}/cfa-templates/ts/webpack.config.js`,
			`${resourcePath}/resources/webpack.config.js`,
		);
		fs.copyFileSync(
			`${resourcePath}/cfa-templates/ts/client/tsconfig.json`,
			`${resourcePath}/resources/client/tsconfig.json`,
		);
		fs.copyFileSync(
			`${resourcePath}/cfa-templates/ts/server/tsconfig.json`,
			`${resourcePath}/resources/server/tsconfig.json`,
		);


		copySync(`${resourcePath}/cfa-templates/${uiFramework}`, `${resourcePath}/ui`);
	} else {
		fs.copyFileSync(`${resourcePath}/cfa-templates/ts/package.json`, `${resourcePath}/package.json`);
		fs.copyFileSync(
			`${resourcePath}/cfa-templates/ts/webpack.config.js`,
			`${resourcePath}/webpack.config.js`,
		);
		fs.copyFileSync(
			`${resourcePath}/cfa-templates/ts/client/tsconfig.json`,
			`${resourcePath}/client/tsconfig.json`,
		);
		fs.copyFileSync(
			`${resourcePath}/cfa-templates/ts/server/tsconfig.json`,
			`${resourcePath}/server/tsconfig.json`,
		);
	}
};
