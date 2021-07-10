import fs from 'fs';

export const createFiles = (resourcePath: string): void => {
  fs.writeFileSync(`${resourcePath}/client/client.ts`, '// Start coding!');
  fs.writeFileSync(`${resourcePath}/server/server.ts`, '// Start coding!');
};
