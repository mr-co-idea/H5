# 单工程多项目 —— H5版（for Vue）

* 单工程下，多个子项目，子项目相互独立，可共用工程的配置和common下的资源
* 适用于结构相仿，代码耦合性高的快速开发型H5项目
***

## 目录结构
* [技术指南](#一、技术指南)
* [工程](#二、工程)
    * [目录结构](#A.目录结构(建议使用查看器查看))
    * [工程搭建](#B.工程搭建)
* [优化](#webpack优化(可选))
* [待增加](#待增加)
* [设计理念](#设计理念)
* [计划迭代](#计划迭代)
* [补充说明](#补充说明)

### 一、技术指南
* webpack4.x + vue2.x + vant
* babel7 + postcss8
* child_process +  inquirer
* sass + less (可选)
* jsx + ts (可选)
### 二、工程
#### A.目录结构(建议使用查看器查看)
    |-- build
      |-- config
        |-- webpack.base.js                    (公共配置)   
        |-- webpack.dev.js                     (development环境配置)
        |-- webpack.prod.js                    (production环境配置)
        |-- create.js                          (创建新的子项目脚本)
    	  |-- utils.js                         (工具)
      |-- project                              (子项目配置)
        |-- demo.json                          (子项目配置文件)
    	|-- projectA.json
      |-- GUI                                  (预留：详情见底部)
      |-- webpack.config.js                    (配置汇总)
    |-- dist                                   (打包输出目录)
    |-- public
      |-- index.html
    |-- server                                 (服务：另行介绍)
    |-- src                                    (开发目录)
      |-- common                               (公共资源目录)
        |-- assets                             (静态资源)
    	|-- components                         (公共组件)
    	  |-- cpt_form                         (form组件,另行说明)
    	  |-- cpt_demo
            |-- cpt-demo.vue
            |-- cpt-demojsx.jsx                (组件jsx写法)
            |-- cpt-demotsx1.tsx               (组件tsx官方库写法)
            |-- cpt-demotsx2.tsx               (组件tsx社区写法，基于官方库)
    	  |-- othens...
    	  |-- index.cpt.js                     (组件注册)
        |-- modules
    	    |-- providers                      (网络请求)
    	      |-- http-service.base.js           
    	    |-- stores                         (store，在子项目引入，并通过命名空间注册)
    	    |-- pages
    	    |-- utils
      |-- project                              (子项目目录)
        |-- demo
          |-- entry
    	      |-- index.js                     (入口文件)
    	  |-- modules
    	      |-- assets
    	      |-- providers
    	        |-- http-service.js            (请求配置)
    		    |-- interface.js               (请求接口)
    	      |-- router
    	        |-- index.router.js
    	      |-- store
    	        |-- index.store.js             (严格模式)
    		    |-- loginStore.js
    	      |-- utils
    	  |-- views
    	      |-- components
    	      |-- app.vue
    	      |-- index.vue
        |-- projectA                           (目录结构同上)
    |-- .babelrc                               (babel配置)
    |-- postcss.config.js                      (postcss配置)
    |-- command.js                             (项目启动脚本)
    |-- tsconfig.json                          (ts配置文件)  
    |-- package.json
    |-- package-lock.json
    |-- readme.md                              (项目构建文档)  
    |-- README.md                              (项目使用文档)             

#### B.工程搭建
##### 1. 创建目录结构
##### 2. 创建项目：`npm init`
##### 3. 安装依赖：
> - webpack（4.x版本需要安装webpack-cli）
>> ``` 
>> npm install webpack webpack-cli webpack-dev-server webpack-merge -D
>> ```
> - webpack插件
>> ```
>> npm install html-webpack-plugin clean-webpack-plugin optimize-css-assets-webpack-plugin mini-css-extract-plugin -D
>> ```
> - webpack移动端调试插件
>> ```
>> npm install vconsole-webpack-plugin -D
>> ```
> - webpack 基础loader
>> ```
>> npm install style-loader css-loader url-loader -D
>> ```
> - babel
>> ```
>> npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime babel-loader -D
>> ```
> - postcss
>> ```
>> npm install postcss postcss-load-config postcss-loader -D
>> ```
> - vue
>> ```
>> npm install vue vuex vue-router axios vant -S
>> ```
>> ```
>> npm install vue-loader vue-template-compiler -D
>> ```
> - 工程脚本依赖
>> ```
>> npm install inquirer chalk cross-env -D
>> ```
> - H5适配
>> ```
>> npm install autoprefixer postcss-pxtorem amfe-flexible -D
>> ```
> - less + sass (可选)
>> ```
>> npm install less less-loader node-sass sass-loader -D
>> ```
> - jsx (可选)
>> ```
>> npm install babel-plugin-import babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx @babel/helper-module-imports babel-helper-vue-jsx-merge-props -D
>> ```
> - ts (可选)
>> ```
>> npm install typescript ts-loader  -D
>> ```
> - tsx (可选)
>> ```
>> npm install vue-tsx-support -D
>> ```
>> ```
>> npm install vue-class-component vue-property-decorator -S
>> ```
##### 4. 配置工程：
> * **config/utils.js**
> >```
> >const fs = require('fs'),
> >	path = require('path'),
> >	chalk = require('chalk');
> >
> >/**
> > * 读取配置信息
> > * @param {String} project 
> > * @returns {Object}
> > */
> >const readJson = (project) => {
> >	let data = {};
> >	try {
> >		data = fs.readFileSync(`./build/project/${project}.json`, {
> >			encoding: 'utf-8'
> >		});
> >	} catch (e) {
> >		console.info(e);
> >		console.info(chalk.red('读取配置文件失败，采用默认配置'));
> >	}
> >
> >	return Object.assign({}, JSON.parse(data));
> >
> >};
> >
> >/**
> > * 处理环境变量数据
> > * @param {Object} env 
> > * @returns {Object}
> > */
> >const processEnv = (env) => {
> >
> >	const env_final = {};
> >	const keys = Object.keys(env);
> >
> >	keys.forEach(e => {
> >
> >		env_final['process.env.' + e] = JSON.stringify(env[e]);
> >
> >	})
> >
> >	return env_final;
> >
> >};
> >/**
> > * 复制文件
> > * @param {*} src 
> > * @param {*} dst 
> > */
> >const copy = (src, dst) => {
> >	const path = fs.readdirSync(src);
> >	path.forEach(e => {
> >		const src_final = src + '/' + e;
> >		const dst_final = dst + '/' + e;
> >		fs.stat(src_final, (err, stats) => {
> >			if (err) throw err;
> >			if (stats.isFile()) {
> >				let readable = fs.createReadStream(src_final);
> >				let writeable = fs.createWriteStream(dst_final);
> >				readable.pipe(writeable);
> >			} else if (stats.isDirectory()) {
> >				checkDirectory(src_final, dst_final, copy);
> >			}
> >		})
> >	})
> >}
> >
> >const checkDirectory = (src, dst, callback) => {
> >	fs.access(dst, fs.constants.F_OK, err => {
> >		if (err) {
> >			fs.mkdirSync(dst);
> >			callback(src, dst);
> >		} else {
> >			callback(src, dst);
> >		}
> >	})
> >}
> >
> >/**
> > * 创建配置文件
> > * @param {String} EN 
> > * @param {String} CN 
> > */
> >const createJson = (EN, CN) => {
> >	const file = path.join(__dirname, `../project/${EN}.json`);
> >	const content = JSON.parse(fs.readFileSync(path.join(__dirname, '../project/demo.json'), { encoding: 'utf-8' }));
> >	content.base.name = CN;
> >	fs.writeFile(file, JSON.stringify(content), err => {
> >		if (err) throw err;
> >		console.info(chalk.green('配置文件创建成功！'))
> >	})
> >}
> >
> >/**
> > * 创建文件夹
> > * @param {String} EN 
> > */
> >const copyDir = (EN) => {
> >	fa.mkdirSync(path.join(__dirname, `../../server/${EN}`))
> >}
> >
> >module.exports = {
> >	processEnv,
> >	readJson,
> >	checkDirectory,
> >	copy,
> >	createJson,
> >	copyDir
> >}
> >```
> * **webpack.config.js**
> >```
> >const common = require('./config/webpack.base'),
> >	development = require('./config/webpack.dev'),
> >	product = require('./config/webpack.prod'),
> >	{ merge } = require('webpack-merge'),
> >	{ readJson } = require('./config/utils');
> >
> >
> >module.exports = env => {
> >
> >	const mode = env.NODE_ENV;
> >	const project = process.env.project;
> >	const config = readJson(project);
> >
> >	const config_base = Object.assign({
> >		project: project,
> >		mode
> >	}, config.base),
> >		config_dev = Object.assign({ project: project }, config.development),
> >		config_prod = Object.assign({ project: project }, config.production);
> >
> >	if (mode.indexOf('development') != -1) {
> >		return merge(common(config_base), development(config_dev), { mode })
> >	} else if (mode.indexOf('production') != -1) {
> >		return merge(common(config_base), product(config_prod), { mode })
> >	}
> >}
> >```
> * **webpack.base.js**
> >```
> >//webpack公共配置文件
> >
> >const path = require('path'),
> >	HtmlWebpackPlugin = require('html-webpack-plugin'),//引入html模板
> >	VueLoaderPlugin = require('vue-loader/lib/plugin'),
> >	VConsole = require('vconsole-webpack-plugin');
> >
> >module.exports = config => {
> >
> >	const $ = Object.assign({
> >		name: 'newProject',
> >		outPath: '/',
> >	}, config);
> >
> >	let _plugins = [
> >		new HtmlWebpackPlugin({
> >			title: config.name,
> >			template: path.resolve(__dirname, '../../public/index.html')
> >		}),
> >		new VueLoaderPlugin()
> >	];
> >
> >	//test环境下添加手机调试工具
> >	$.mode.indexOf('test') != -1 ? _plugins.push(new VConsole({ enable: true })) : null;
> >
> >	const include = [
> >		path.join(__dirname, `../../src/common`),
> >		path.join(__dirname, `../../src/project/${$.project}`)
> >	];
> >	const exclude = [
> >		path.join(__dirname, '../../node_modules')
> >	];
> >
> >	return {
> >		entry: {
> >			main: `./src/project/${$.project}/entry/index.js`
> >		},//入口文件
> >		output: {
> >			filename: 'js/[name].[hash:5].js',
> >			path: path.resolve(__dirname, `../../dist/${$.project + '/' + $.outPath}`),
> >		},
> >		module: {
> >			rules: [
> >				//解析 js,jsx
> >				{
> >					test: /\.(js|jsx)$/,
> >					use: [
> >						'babel-loader'
> >					],
> >					include: include,
> >					exclude: exclude
> >				},
> >				//解析 ts,tsx
> >				{
> >					test: /\.(ts|tsx)$/,
> >					use: [
> >						'babel-loader',
> >						'ts-loader'
> >					],
> >					include: include,
> >					exclude: exclude
> >				},
> >				//解析html文件
> >				{
> >					test: /\.html$/,
> >					include: [path.join(__dirname, `/public`)],
> >					loader: 'html-loader'
> >				},
> >				//解析vue文件
> >				{
> >					test: /\.vue$/,
> >					use: [
> >						'vue-loader'
> >					],
> >					include: [
> >						...include,
> >						...exclude
> >					]
> >				},
> >				//解析资源
> >				{
> >					test: /\.(jpg|png|gif|jpeg)$/,
> >					use: [
> >						{
> >							loader: 'url-loader',
> >							options: {
> >								esModule: false,
> >								limit: 50000
> >							}
> >						}
> >					],
> >					include: include,
> >					exclude: exclude
> >				}
> >			]
> >		},
> >		resolve: {
> >			extensions: ['.js', '.vue', '.json', '.jsx', '.ts', '.tsx'],
> >			alias: {
> >				"@common": path.join(__dirname, '../../src/common'),
> >				"@rules": path.join(__dirname, '../../src/common/components/cpt_form/rules'),//form组件配置
> >				"@images": path.join(__dirname, '../../src/common/assets/images'),
> >				"@project": path.join(__dirname, `../../src/project/${$.project}`),
> >				"@modules": path.join(__dirname, `../../src/project/${$.project}/modules`),
> >				"@views": path.join(__dirname, `../../src/project/${$.project}/views`),
> >				"@providers": path.join(__dirname, `../../src/project/${$.project}/modules/providers`),
> >			}
> >		},
> >		plugins: _plugins
> >	}
> >}
> >```
> * **webpack.dev.js**
> >```
> >const path = require('path'),
> >	webpack = require('webpack'),
> >	{ processEnv } = require('./utils'),
> >	{ merge } = require('webpack-merge');
> >
> >module.exports = config => {
> >
> >	const publicPath = config.publicPath || '';
> >	//如果config中没有配置，则采用下列默认配置，有的话将覆盖下列配置
> >	const $ = merge({
> >		env: {
> >			'BASE_URL': '/api'
> >		},
> >		outPut_publicPath: publicPath ? publicPath + '/' : '',
> >		devServer: {
> >			contentBase: path.join(__dirname, '../public'),
> >			open: true,
> >			openPage: publicPath ? publicPath.split('/')[1] + '/' : '',
> >			publicPath: publicPath + '',
> >			port: 8080,
> >			host: 'localhost',
> >			disableHostCheck: true,
> >			proxy: {
> >				'/api': {
> >					target: 'localhost:3000',
> >					pathRewrite: {
> >						'^/api': ''
> >					}
> >				}
> >			}
> >		}
> >	}, config);
> >
> >	const include = [
> >		path.join(__dirname, `../../src/common`),
> >		path.join(__dirname, `../../src/project/${$.project}`)
> >	];
> >	const exclude = [
> >		path.join(__dirname, '../../node_modules')
> >	];
> >
> >	return {
> >		mode: 'development',
> >		devtool: 'inline-source-map',
> >		output: {
> >			publicPath: $.outPut_publicPath
> >		},
> >		module: {
> >			rules: [
> >				{
> >					test: /\.css$/,
> >					use: [
> >						{ loader: 'style-loader' },
> >						{ loader: 'css-loader' },
> >						{ loader: 'postcss-loader' }
> >					],
> >					include: [
> >						...include,
> >						...exclude
> >					]
> >				},
> >				{
> >					test: /\.less$/,
> >					use: [
> >						{ loader: 'style-loader' },
> >						{ loader: 'css-loader' },
> >						{ loader: 'postcss-loader' },
> >						{ loader: 'less-loader' }
> >					],
> >					include: include,
> >					exclude: exclude
> >				},
> >				{
> >					test: /\.(sa|sc)ss$/,
> >					use: [
> >						{ loader: 'style-loader' },
> >						{ loader: 'css-loader' },
> >						{ loader: 'postcss-loader' },
> >						{ loader: 'sass-loader' }
> >					],
> >					include: include,
> >					exclude: exclude
> >				}
> >			]
> >		},
> >		devServer: $.devServer,
> >		plugins: [
> >			new webpack.DefinePlugin(processEnv($.env)),
> >		]
> >	};
> >}
> >```
> * **webpack.prod.js**
> >```
> >const path = require('path'),
> >	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
> >	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
> >	OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
> >	{ processEnv } = require('./utils'),
> >	webpack = require('webpack');
> >
> >module.exports = config => {
> >
> >	const $ = Object.assign({
> >		env: {
> >			"BASE_URL": '/api'
> >		}
> >	}, config);
> >
> >	const include = [
> >		path.join(__dirname, `../../src/common`),
> >		path.join(__dirname, `../../src/project/${$.project}`)
> >	];
> >	const exclude = [
> >		path.join(__dirname, '../../node_modules')
> >	];
> >
> >	return {
> >		mode: 'production',
> >		optimization: {
> >			splitChunks: {
> >				chunks: 'all',
> >				cacheGroups: {
> >					vendor: {
> >						name: 'vendor',
> >						test: /[\\/]node_module[\\/]/,
> >						priority: -10,
> >						chunks: 'initial'
> >					}
> >				}
> >			}
> >		},
> >		module: {
> >			rules: [
> >				{
> >					test: /\.css$/,
> >					use: [
> >						{ loader: MiniCssExtractPlugin.loader },
> >						{ loader: 'css-loader' },
> >						{ loader: 'postcss-loader' }
> >					],
> >					include: [
> >						...include,
> >						...exclude
> >					]
> >				},
> >				{
> >					test: /\.less$/,
> >					use: [
> >						{ loader: MiniCssExtractPlugin.loader },
> >						{ loader: 'css-loader' },
> >						{ loader: 'postcss-loader' },
> >						{ loader: 'less-loader' }
> >					],
> >					include: include,
> >					exclude: exclude
> >				},
> >				{
> >					test: /\.(sa|sc)ss$/,
> >					use: [
> >						{ loader: MiniCssExtractPlugin.loader },
> >						{ loader: 'css-loader' },
> >						{ loader: 'postcss-loader' },
> >						{ loader: 'sass-loader' }
> >					],
> >					include: include,
> >					exclude: exclude
> >				},
> >			]
> >		},
> >		plugins: [
> >			new CleanWebpackPlugin(),
> >			new MiniCssExtractPlugin({
> >				filename: 'css/[name].[hash:5].css'
> >			}),
> >			new OptimizeCSSAssetsPlugin(),
> >			new webpack.DefinePlugin(processEnv($.env))
> >		]
> >	};
> >}
> >```
> * **create.js**
> >
> >```
> >const { checkDirectory, copy, createJson, copyDir } = require('./utils'),
> >	path = require('path');
> >
> >
> >const dir = '../../src/project/demo';
> >
> >const _project_EN = process.argv[2];
> >const _project_CN = process.argv[3];
> >
> >checkDirectory(path.join(__dirname, dir), path.join(__dirname, '../../src/project/' + _project_EN), copy);
> >createJson(_project_EN, _project_CN);
> >```
> * **command.js**
> >```
> >//命令脚本
> >const { exec } = require('child_process'),
> >	fs = require('fs'),
> >	inquirer = require('inquirer'),
> >	chalk = require('chalk');
> >
> >//命令行参数
> >const _params_env = process.argv[2];//环境
> >const _params_project = process.argv[3];//名称
> >
> >let _cmd;
> >//指令
> >if (_params_env.indexOf('dev' || 'Dev') != -1) {
> >	_cmd = `cross-env project= webpack-dev-server --hot --open --env.NODE_ENV=${_params_env === 'dev' ? 'development' : _params_env} --config build/webpack.config.js --color`;
> >} else if (_params_env.indexOf('build' || 'Build') != -1) {
> >	_cmd = `cross-env project= webpack --env.NODE_ENV=${_params_env === 'build' ? 'development' : _params_env} --config build/webpack.config.js --color`;
> >};
> >
> >/**
> > * 读取目录项目
> > * @returns {Array<String>} files
> > */
> >const readDir = () => {
> >	const files = fs.readdirSync('./src/project/')
> >	return files;
> >}
> >
> >/**
> > * 终端中输入命令
> > * @param {String} _cmd 
> > * @param {String} _project 
> > * @param {String} _env 
> > */
> >const runCmd = (_cmd, _project, _env) => {
> >	const _list = _cmd.split("project=");
> >	const _cmd_run = _list[0] + `project=${_project} ` + _list[1];
> >
> >	const workerProcess = exec(_cmd_run, function (error, stdout, stderr) {
> >		console.info(chalk.red(error))
> >	});
> >	workerProcess.stdout.on('data', function (data) {
> >		console.log(data);
> >	});
> >
> >	workerProcess.stderr.on('data', function (data) {
> >		console.log('stderr: ' + data);
> >	});
> >}
> >
> >/**
> > * 启动项目
> > * @param {String} _cmd 
> > * @param {String} _project 
> > * @param {String} _env 
> > */
> >const runProject = (_cmd, _project, _env) => {
> >	const msg = _env.indexOf('production' || 'Build') === -1 ? '请选择要启动项目' : '请选择要打包项目';
> >	if (_project) {
> >		const dirList = readDir();
> >		if (dirList.indexOf(_project) < 0) {
> >			console.info(chalk.red('项目启动失败'));
> >			console.info(chalk.red('error：请检查项目名是否输入错误或子项目目录是否存在'));
> >		} else {
> >			runCmd(_cmd, _project, _env);
> >		}
> >	} else {
> >		let dirList = readDir();
> >		dirList.push('取消');
> >		inquirer.prompt(
> >			{
> >				type: 'list',
> >				name: 'project',
> >				message: msg,
> >				choices: dirList, // 可选选项
> >				default: 'demo'
> >			}).then(answers => {
> >				if (answers.project === "取消") return;
> >				runCmd(_cmd, answers.project, _env)
> >			});
> >	}
> >};
> >
> >const createAsk = (ask, en) => {
> >	inquirer.prompt(ask).then(answers => {
> >		const CN = answers.CN;
> >		const EN = en || answers.EN;
> >
> >		const workerProcess = exec('node ./build/config/create ' + EN + ' ' + CN, function (error, stdout, stderr) {
> >			if (error) {
> >				console.info(chalk.red('创建失败!'));
> >				throw error;
> >			} else {
> >				console.info(chalk.green(CN + '创建完毕!'));
> >			}
> >		});
> >		workerProcess.stdout.on('data', function (data) {
> >			console.info('stdout：', data);
> >		})
> >		workerProcess.stderr.on('data', function (data) {
> >			console.info('stderr：', data);
> >		})
> >	})
> >}
> >//运行程序
> >if (_params_env === 'create') {
> >	let _ask = [{
> >		type: 'input',
> >		name: 'CN',
> >		message: '请输入要创建项目的中文名',
> >		default: '项目'
> >	}]
> >	if (_params_project) {
> >		createAsk(_ask, _params_project);
> >	} else {
> >		_ask.push({
> >			type: 'input',
> >			name: 'EN',
> >			message: '请输入要创建项目的英文名',
> >			default: 'unnamed'
> >		});
> >		createAsk(_ask, null)
> >	}
> >} else {
> >	runProject(_cmd, _params_project, _params_env);
> >}
> >```
> * **.babelrc**
> >```
> >{
> >	"presets": [
> >		[
> >			"@babel/preset-env",
> >			{
> >				"targets": {
> >					"browsers": [
> >						"defaults"
> >					]
> >				}
> >			},
> >			"env"
> >		]
> >	],
> >	"plugins": [
> >		[
> >			"import",
> >			{
> >				"libraryName": "vant",
> >				"libraryDirectory": "es",
> >				"style": true
> >			}
> >		],
> >		"transform-vue-jsx",
> >		"@babel/plugin-transform-runtime"
> >	]
> >}
> >```
> * **postcss.config.js**
> >```
> >module.exports = {
> >	plugins: [
> >		require('autoprefixer')({
> >			overrideBrowserslist: ['Android >= 4.0', 'ios >= 8']
> >		}),
> >		require('postcss-pxtorem')({
> >			rootValue: 37.5,//基于375px宽的设计图
> >			propList: ['*']
> >		})
> >	]
> >}
> >```
> * **build/project/demo.json**
> >```
> >{
> >	"base": {
> >		"name": "项目名称{demo}",
> >		"outPath": "/"
> >	},
> >	"development": {
> >		"env": {
> >			"BASE_URL": "/api",
> >			"DEMO": "...",
> >			"others": "..."
> >		},
> >		"devServer": {
> >			"open": true,
> >			"port": 8080,
> >			"host": "localhost",
> >			"disableHostCheck": true,
> >			"proxy": {
> >				"/api": {
> >					"target": "http://localhost:3000",
> >					"pathRewrite": {
> >						"^api": ""
> >					}
> >				}
> >			}
> >		}
> >	},
> >	"production": {},
> >	"testDev": {},
> >	"testBuild": {}
> >}
> >```
> * **public/index.html**
> > ```
> > <!DOCTYPE html>
> > <html>
> > 
> > <head>
> >   <meta charset="utf-8" />
> >   <title><%= htmlWebpackPlugin.options.title %></title>
> > </head>
> > 
> > <body>
> >   <div id="app"></div>
> > </body>
> > 
> > </html>
> > ```
> * **tsconfig.json**（可选）
> >```
> >{
> >	"compilerOptions": {
> >		"jsx": "preserve",
> >		"jsxFactory": "VueTsxSupport",
> >		"target": "ES6",
> >		"outDir": "./dist/",
> >		"sourceMap": true,
> >		"experimentalDecorators": true,
> >		"moduleResolution": "node"
> >	},
> >	"include": [
> >		"src/**/*.ts",
> >		"src/**/*.tsx",
> >		"src/**/*.vue",
> >	],
> >	"exclude": [
> >		"node_modules"
> >	]
> >}
> >```
##### 5. 配置项目：
* 公共部分
> * **resources**
> > - **providers/http-service.base.js**
> > > ```
> > > const qs = require('qs');
> > > 
> > > const createRequest = (baseURL, req, res) => {
> > > 
> > > 	const request = import('axios')({
> > > 		baseURL: baseURL ? baseURL : '',
> > > 		timeout: 60000,
> > > 	});
> > > 
> > > 	req ? req(request) : request.interceptors.request.use(config => {
> > > 		if (config.method === 'post') {
> > > 			config.data = qs.stringify(config.data);
> > > 		};
> > > 		return config
> > > 	}, error => {
> > > 		return Promise.reject(error)
> > > 	});
> > > 
> > > 	res ? res(request) : request.interceptors.response.use(response => response.data, error => {
> > > 
> > > 		if (error && error.response) {
> > > 			switch (error.response.status) {
> > > 				case 400:
> > > 					console.log('错误请求')
> > > 					break;
> > > 				case 401:
> > > 					console.log('未授权请重新登录')
> > > 					break;
> > > 				case 403:
> > > 					console.log('拒绝访问')
> > > 					break;
> > > 				case 404:
> > > 					console.log('请求错误，未找到该资源')
> > > 					break;
> > > 				case 405:
> > > 					console.log('请求方法未允许')
> > > 					break;
> > > 				case 408:
> > > 					console.log('请求超时')
> > > 					break;
> > > 				case 500:
> > > 					console.log('服务器出错')
> > > 					break;
> > > 				case 501:
> > > 					console.log('网络未实现')
> > > 					break;
> > > 				case 502:
> > > 					console.log('网络错误')
> > > 					break;
> > > 				case 503:
> > > 					console.log('服务不可用')
> > > 					break;
> > > 				case 504:
> > > 					console.log('网络超时')
> > > 					break;
> > > 				case 505:
> > > 					console.log('http版本不支持该请求')
> > > 					break;
> > > 				default:
> > > 					console.log(`链接出错${error.response.status}`)
> > > 					break;
> > > 			}
> > > 		}
> > > 		return Promise.reject(error.response)
> > > 	});
> > > 
> > > 	return request
> > > };
> > > 
> > > export default createRequest
> > > ```
> * **components**
> > - **index.cpt.js**
> > > ```
> > > import cpt_form from './cpt_form/cpt-form';
> > > import cpt_demo from './cpt_demo/cpt-demo.vue';
> > > import cpt_demojsx from './cpt_demo/cpt-demo.jsx';
> > > import cpt_demotsx_one from './cpt_demo/cpt-demo1.tsx';
> > > import cpt_demotsx_two from './cpt_demo/cpt-demo2.tsx';
> > > 
> > > const map = new Map([
> > > 	["cpt-form", cpt_form],
> > > 	["cpt-demo", cpt_demo],
> > > 	["cpt-demo-jsx", cpt_demojsx],
> > > 	["cpt-demotsx-one", cpt_demotsx_one],
> > > 	["cpt-demotsx-two", cpt_demotsx_two],
> > > ])
> > > 
> > > const createPlugins = (...cptName) => {
> > > 
> > > 	function plugins(Vue) {
> > > 		for (let item of cptName) {
> > > 			/^cpt-/.test(item) ? item : (item = 'cpt-' + item);
> > > 			Vue.component(item, map.get(item))
> > > 		}
> > > 	};
> > > 
> > > 	return plugins;
> > > }
> > > 
> > > export default createPlugins
> > > ```
> > - **cpt_form**
> > >
> > > ```
> > > 详情，见form组件文档
> > > ```

* 子项目
> * **entry/index.js**
> >```
> >import Vue from 'vue';
> >import router from '@modules/router/index.router';
> >import store from '@modules/store/index.store'
> >
> >import App from '@views/app.vue'
> >
> >import 'amfe-flexible';
> >import 'vant/lib/icon/local.css'
> >import 'vue-tsx-support/enable-check'//(可选)
> >
> >import { plugins, commonPlugins } from '@views/components/index'
> >
> >Vue.use(commonPlugins)
> >Vue.use(plugins)
> >
> >new Vue({
> >	el: '#app',
> >	router,
> >	store,
> >	render: h => h(App)
> >});
> >```
> * **modules**
> > - **providers/http-service.js**
> > > ```
> > > import createRequest from `@common/modules/providers/http-service.base`
> > > 
> > > const request = createRequest(process.env.BASE_URL)
> > > 
> > > export default request
> > > ```
> > - **providers/interface.js**
> > > ```
> > > import request from './http-service'
> > > 
> > > export function test(params) {
> > > 	return request({
> > > 		url: '/test',
> > > 		method: 'POST',
> > > 		data: params
> > > 	})
> > > };
> > > ```
> > - **rooter/index.router.js**
> > > ```
> > > import Vue from 'vue'
> > > import VueRouter from 'vue-router'
> > > import index from '@views/index.vue'
> > > 
> > > Vue.use(VueRouter)
> > > 
> > > const routes = [
> > > 	{
> > > 		name: 'index',
> > > 		path: '/',
> > > 		component: index,
> > > 		meta: {
> > > 			title: 'index',
> > > 			requireAuth: true,
> > > 			keepAlive: true
> > > 		}
> > > 	}
> > > ];
> > > 
> > > const router = new VueRouter({
> > > 	routes
> > > })
> > > 
> > > export default router
> > > ```
> > - **store/index.store.js**
> > > ```
> > > import Vue from 'vue';
> > > import Vuex from 'vuex';
> > > 
> > > Vue.use(Vuex);
> > > 
> > > export default new Vuex.Store({
> > > 	state: {
> > > 		rootVal: ''
> > > 	},
> > > 	getters: {
> > > 		getRootVal(state) {
> > > 			return state.rootVal;
> > > 		}
> > > 	},
> > > 	mutations: {
> > > 		changeRootVal(state, payload) {
> > > 			state.rootVal = payload;
> > > 		}
> > > 	},
> > > 	actions: {},
> > > 	modules: {
> > > 		loginStore: import('./loginStore')
> > > 	},
> > > 	strict: true
> > > })
> > > ```
> > - **store/loginStore.js**
> > > ```
> > > export default {
> > > 	namespaced: true,
> > > 	state: {
> > > 		content: ''
> > > 	},
> > > 	getters: {
> > > 		getLoginContent(state, getters, rootVal, rootGetters) {
> > > 			return state.content
> > > 		}
> > > 	},
> > > 	mutations: {
> > > 		changeLoginContent(state, payload) {
> > > 			state.content = payload;
> > > 		}
> > > 	},
> > > 	actions: {}
> > > }
> > > ```
> * **views**
> > - **components/index.js**
> > > ```
> > > import createPlugins from '@common/components/index.cpt'
> > > 
> > > const commonPlugins = createPlugins('cpt-form', 'demo');
> > > 
> > > const plugins = (Vue) => {
> > > 	Vue.component('cpt', import('./cpt'));
> > > }
> > > 
> > > export {
> > > 	commonPlugins,
> > > 	plugins
> > > }
> > > ```
> > - **components/cpt.vue**
> > > ```
> > > 参考common下的组件
> > > ```
> > - **app.vue**
> > > ```
> > > <template>
> > >   <div id="app">
> > >     <keep-alive>
> > >       <router-view v-if="$route.meta.keepAlive"></router-view>
> > >     </keep-alive>
> > >     <router-view v-if="!$route.meta.keepAlive"></router-view>
> > >   </div>
> > > </template>
> > > ```
> > - **index.vue**
> > > ```
> > > 
> > > ```
##### 6. 添加指令：
> **package.json**
> > ```
> > 
> >   "scripts": {
> >     "dev": "node ./command dev",
> >     "build": "node ./command build",
> >     "testDev": "node ./command testDev",
> >     "testBuild": "node ./command testBuild",
> >     "create": "node ./command create"
> >   },
> > ```


### webpack优化(可选)
#### 代码分离——动态加载
* `npm install @babel/plugin-syntax-dynamic-import -D`
* .babelrc 中添加 
   ```   
   plugins:[
      "@babel/plugin-syntax-dynamic-import"
   ]
   ```
* webpack.base.js 中添加
   ```
   output:{
     chunkFilename:'js/[name].[hash5].js'
   }
   ```
### 待增加

* tree-shaking配置
* jest
* eslint
### 设计理念
* 功能模块化划分，减少模块间的耦合
* 增加代码的灵活性和可复用性
* 分层：基础层和业务层
### 计划迭代
* vue3 + vite + rollup 构建
### 补充说明

#### 版本

- 若想使用webpack5.x,需使用vue3+vue-loader16版本

#### GUI
* 采用vite + vue3 + antd + rollup + koa 进行构建
* 可以通过UI进行项目启动、项目管理、项目文档管理查看等
* 详见GUI工程
#### form组件封装
* 将会在另外的文档中说明
#### serve模拟后台服务
* 为什么不用mock？
考虑到在开发环境下，表单页填写后提交数据能存储下来，并下次可以直接读取，从灵活性出发，故而采用koa
* serve将单独存放，开发时可放入工程内，详见serve工程
