# Snippets for general dev use

## Example Package.json
```json
{
  "name": <Name Provided as Arg>,
  "version": "1.0.0",
  "description": "A FiveM Resource created using create-fivem-app",
  "main": "index.js",
  "scripts": {
    "build": "cra build",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "prettier": "prettier --write \"src/**/*.ts",
    "watch": "webpack --mode development --watch true"
  },
  "license": "MIT",
  [ ... Others as generated]
}
```