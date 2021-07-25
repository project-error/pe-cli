import fs from 'fs';

export const createFiles = (resourcePath: string, uiFramework: string): void => {
  fs.writeFileSync(`${resourcePath}/client/client.lua`, '-- Start coding!');
  fs.writeFileSync(`${resourcePath}/server/server.lua`, '-- Start coding!');
};
