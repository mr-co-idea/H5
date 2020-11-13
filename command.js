//命令脚本
const { exec } = require('child_process'),
	fs = require('fs'),
	inquirer = require('inquirer'),
	chalk = require('chalk');

//命令行参数
const _params_env = process.argv[2];//环境
const _params_project = process.argv[3];//名称

let _cmd;
//指令
if (_params_env.indexOf('dev' || 'Dev') != -1) {
	_cmd = `cross-env project= webpack-dev-server --hot --open --env.NODE_ENV=${_params_env === 'dev' ? 'development' : _params_env} --config build/webpack.config.js --color`;
} else if (_params_env.indexOf('build' || 'Build') != -1) {
	_cmd = `cross-env project= webpack --env.NODE_ENV=${_params_env === 'build' ? 'development' : _params_env} --config build/webpack.config.js --color`;
};

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
	const _list = _cmd.split("project=");
	const _cmd_run = _list[0] + `project=${_project} ` + _list[1];

	const workerProcess = exec(_cmd_run, function (error, stdout, stderr) {
		console.info(chalk.red(error))
	});
	workerProcess.stdout.on('data', function (data) {
		console.log(data);
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
	const msg = _env.indexOf('production' || 'Build') === -1 ? '请选择要启动项目' : '请选择要打包项目';
	if (_project) {
		const dirList = readDir();
		if (dirList.indexOf(_project) < 0) {
			console.info(chalk.red('项目启动失败'));
			console.info(chalk.red('error：请检查项目名是否输入错误或子项目目录是否存在'));
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
		const EN = en || answers.EN;

		const workerProcess = exec('node ./build/config/create ' + EN + ' ' + CN, function (error, stdout, stderr) {
			if (error) {
				console.info(chalk.red('创建失败!'));
				throw error;
			} else {
				console.info(chalk.green(CN + '创建完毕!'));
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


