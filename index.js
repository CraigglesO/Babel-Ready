const spawnSync = require('child_process').spawnSync;
const writeFileSync = require('fs').writeFileSync;
const jsonfile = require('jsonfile')

let newFolder = spawnSync('mkdir', [ 'output' ]);
let cd = spawnSync('cd', [ 'output' ]);

let installs = `install --save-dev babel-cli babel-preset-es2015`;
installs = installs.split(' ');
let createFiles = `package.json index.js .babelrc .env .gitignore README.md`;
createFiles = createFiles.split(' ');

console.log('Creating files...');
let createFile = spawnSync( 'touch', createFiles );
if (createFile.stderr) {
  console.log(createFile.stderr.toString());
}


//File contents:
const pkgJSON = {
  "name": "",
  "version": "0.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "babel-node index.js"
  },
  "author": "",
  "repository": {
    "type": "git",
    "url": ""
  },
  "license": "ISC"
};

const env = "";

const babelrc = {
  "presets": ["es2015"]
};

const gitignore = `
lib-cov
*.seed
*.log
*.csv
*.dat
*.out
*.pid
*.gz

.env
pids
logs
results

node_modules
npm-debug.log
`;

const README = `
# NAME_GOES_HERE

### BASIC_INFO_OF_PROJECT_GOES_HERE

INFORMATION_GOES_HERE

## Install

\`\`\`
npm install NAME_GOES_HERE
\`\`\`

## Usage
\`\`\`
EXAMPLE_USAGE_GOES_HERE

\`\`\`
`

console.log('Writing to Files...');
jsonfile.writeFileSync('package.json', pkgJSON);
writeFileSync('.env', env);
jsonfile.writeFileSync('.babelrc', babelrc);
writeFileSync('.gitignore', gitignore);
jsonfile.writeFileSync('package.json', pkgJSON);
writeFileSync('README.md', README);



console.log('Installing Modules...');
let install = spawnSync( 'npm', installs );
if (install.stderr) {
  console.log(install.stderr.toString());
}

let finish = spawnSync('clear');
console.log('Creation Complete');
