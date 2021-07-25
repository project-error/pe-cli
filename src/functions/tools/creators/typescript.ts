import fs from 'fs';

export const createFiles = (resourcePath: string, uiFramework: string): void => {
  if (uiFramework === 'none') {
    fs.writeFileSync(`${resourcePath}/client/client.ts`, '// Start coding!');
    fs.writeFileSync(`${resourcePath}/server/server.ts`, '// Start coding!');
  } else {
    fs.writeFileSync(`${resourcePath}/resources/client/client.ts`, '// Start coding!');
    fs.writeFileSync(`${resourcePath}/resources/server/server.ts`, '// Start coding!');
  }
};
