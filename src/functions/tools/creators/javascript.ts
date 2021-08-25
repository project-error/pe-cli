import fs from 'fs';

export const createFiles = (resourcePath: string, uiFramework: string): void => {
	if (uiFramework === 'none') {
		fs.writeFileSync(`${resourcePath}/client/client.js`, '// Start coding!');
		fs.writeFileSync(`${resourcePath}/server/server.js`, '// Start coding!');
	} else {
		fs.writeFileSync(`${resourcePath}/resources/client/client.js`, '// Start coding!');
		fs.writeFileSync(`${resourcePath}/resources/server/server.js`, '// Start coding!');
	}
};
