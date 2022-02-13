# Requirements:
- Node.js version 12 or higher
- yarn

How to install yarn (this will install it globally)
```
npm install --global yarn
```

Install project dependencies
```
cd /location-of-project-folder
yarn
OR
yarn add webpack webpack-cli typescript ts-loader
```

Build project
```
yarn run webpack
```

place either the built js file (/project-folder/dist/) in the HTML folder (/project-folder/src/HTML/) of the other way around.
Either way, the js file and the html file should be in the same folder (unless the js file location is changed in the html file).