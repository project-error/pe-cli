import fs from "fs";

export const createFiles = (resourcePath: string): void => {
  fs.writeFileSync(`${resourcePath}/client/client.js`, "// Start coding!");
  fs.writeFileSync(`${resourcePath}/server/server.js`, "// Start coding!");
}
