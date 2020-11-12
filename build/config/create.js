const { checkDirectory, copy, createJson, copyDir } = require('./utils'),
	path = require('path');


const dir = '../../src/project/demo';

const _project_EN = process.argv[2];
const _project_CN = process.argv[3];

checkDirectory(path.join(__dirname, dir), path.join(__dirname, '../../src/project/' + _project_EN), copy);
createJson(_project_EN, _project_CN);
copyDir(_project_EN);