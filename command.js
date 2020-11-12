const children_process = require('child_process'),
	fs = require('fs'),
	inquirer = require('inquirer'),
	exec = children_process.exec;

const _params_env = process.argv[2];
const _params_project = process.argv[3];

const _cmd_dev = `cross-env project= webpack-dev-server --hot --open --env.NODE_ENV=development --config build/webpack.config.js --color`;
const _cmd_build = `cross-env project= webpack --env.NODE_ENV=production --config build/webpack.config.js`;

const _cmd = new Map([
	[
		"dev", _cmd_dev
	], [
		"build", _cmd_build
	]
]);

/**
 * 读取目录项目
 * @returns {Array<String>} files
 */
const readDir = () => {
	const files = fs.readdirSync('./src/project/')
	return files;
}

/**
 * 终端中输入命令
 * @param {String} _cmd 
 * @param {String} _project 
 * @param {String} _env 
 */
const runCmd = (_cmd, _project, _env) => {
	const _list = _cmd.get(_env).split("project=");
	const _cmd_run = _list[0] + `project=${_project}` + _list[1];

	const workerProcess = exec(_cmd_run, function (error, stdout, stderr) {

	});
	workerProcess.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});

	workerProcess.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});
}

/**
 * 启动项目
 * @param {String} _cmd 
 * @param {String} _project 
 * @param {String} _env 
 */
const runProject = (_cmd, _project, _env) => {
	const msg = _env.indexOf('production') === -1 ? '请选择要启动项目' : '请选择要打包项目';
	if (_project) {
		const dirList = readDir();
		if (dirList.indexOf(_project) < 0) {
			console.info('项目启动失败');
			console.info('error：请检查项目名是否输入错误或子项目目录是否存在');
		} else {
			runCmd(_cmd, _project, _env);
		}
	} else {
		let dirList = readDir();
		dirList.push('取消');
		inquirer.prompt(
			{
				type: 'list',
				name: 'project',
				message: msg,
				choices: dirList, // 可选选项
				default: 'demo'
			}).then(answers => {
				if (answers.project === "取消") return;
				runCmd(_cmd, answers.project, _env)
			});
	}
};

const createAsk = (ask, en) => {
	inquirer.prompt(ask).then(answers => {
		const CN = answers.CN;
		const EN = answers.EN;

		const workerProcess = exec('node ./build/config/node.create ' + EN + ' ' + CN, function (error, stdout, stderr) {
			if (error) {
				console.info('创建失败！');
				throw error;
			} else {
				console.info('创建完毕');
			}
		});
		workerProcess.stdout.on('data', function (data) {
			console.info('stdout：', data);
		})
		workerProcess.stderr.on('data', function (data) {
			console.info('stderr：', data);
		})
	})
}
//运行程序
if (_params_env === 'create') {
	let _ask = [{
		type: 'input',
		name: 'CN',
		message: '请输入要创建项目的中文名',
		default: '项目'
	}]
	if (_params_project) {
		createAsk(_ask, _params_project);
	} else {
		_ask.push({
			type: 'input',
			name: 'EN',
			message: '请输入要创建项目的英文名',
			default: 'unnamed'
		});
		createAsk(_ask, null)
	}
} else {
	runProject(_cmd, _params_project, _params_env);
}


