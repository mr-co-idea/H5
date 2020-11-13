const fs = require('fs'),
	path = require('path'),
	chalk = require('chalk');

/**
 * 读取配置信息
 * @param {String} project 
 * @returns {Object}
 */
const readJson = (project) => {
	let data = {};
	try {
		data = fs.readFileSync(`./build/project/${project}.json`, {
			encoding: 'utf-8'
		});
	} catch (e) {
		console.info(e);
		console.info(chalk.red('读取配置文件失败，采用默认配置'));
	}

	return Object.assign({}, JSON.parse(data));

};

/**
 * 处理环境变量数据
 * @param {Object} env 
 * @returns {Object}
 */
const processEnv = (env) => {

	const env_final = {};
	const keys = Object.keys(env);

	keys.forEach(e => {

		env_final['process.env.' + e] = JSON.stringify(env[e]);

	})

	return env_final;

};
/**
 * 复制文件
 * @param {*} src 
 * @param {*} dst 
 */
const copy = (src, dst) => {
	const path = fs.readdirSync(src);
	path.forEach(e => {
		const src_final = src + '/' + e;
		const dst_final = dst + '/' + e;
		fs.stat(src_final, (err, stats) => {
			if (err) throw err;
			if (stats.isFile()) {
				let readable = fs.createReadStream(src_final);
				let writeable = fs.createWriteStream(dst_final);
				readable.pipe(writeable);
			} else if (stats.isDirectory()) {
				checkDirectory(src_final, dst_final, copy);
			}
		})
	})
}

const checkDirectory = (src, dst, callback) => {
	fs.access(dst, fs.constants.F_OK, err => {
		if (err) {
			fs.mkdirSync(dst);
			callback(src, dst);
		} else {
			callback(src, dst);
		}
	})
}

/**
 * 创建配置文件
 * @param {String} EN 
 * @param {String} CN 
 */
const createJson = (EN, CN) => {
	const file = path.join(__dirname, `../project/${EN}.json`);
	const content = JSON.parse(fs.readFileSync(path.join(__dirname, '../project/demo.json'), { encoding: 'utf-8' }));
	content.base.name = CN;
	fs.writeFile(file, JSON.stringify(content), err => {
		if (err) throw err;
		console.info(chalk.green('配置文件创建成功！'))
	})
}

/**
 * 创建文件夹
 * @param {String} EN 
 */
const copyDir = (EN) => {
	fa.mkdirSync(path.join(__dirname, `../../server/${EN}`))
}

module.exports = {
	processEnv,
	readJson,
	checkDirectory,
	copy,
	createJson,
	copyDir
}