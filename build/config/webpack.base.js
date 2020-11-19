//webpack公共配置文件

const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),//引入html模板
	VueLoaderPlugin = require('vue-loader/lib/plugin'),
	VConsole = require('vconsole-webpack-plugin');

module.exports = config => {

	const $ = Object.assign({
		name: 'newProject',
		outPath: '/',
	}, config);

	let _plugins = [
		new HtmlWebpackPlugin({
			title: config.name,
			template: path.resolve(__dirname, '../../public/index.html')
		}),
		new VueLoaderPlugin()
	];

	//test环境下添加手机调试工具
	$.mode.indexOf('test') != -1 ? _plugins.push(new VConsole({ enable: true })) : null;

	const include = [
		path.join(__dirname, `../../src/common`),
		path.join(__dirname, `../../src/project/${$.project}`)
	];
	const exclude = [
		path.join(__dirname, '../../node_modules')
	];

	return {
		entry: {
			main: `./src/project/${$.project}/entry/index.js`
		},//入口文件
		output: {
			filename: 'js/[name].[hash:5].js',
			chunkFilename:'js/[name].[hash5].js',
			path: path.resolve(__dirname, `../../dist/${$.project + '/' + $.outPath}`),
		},
		module: {
			rules: [
				//解析 js,jsx
				{
					test: /\.(js|jsx)$/,
					use: [
						'babel-loader'
					],
					include: include,
					exclude: exclude
				},
				//解析 ts,tsx
				{
					test: /\.(ts|tsx)$/,
					use: [
						'babel-loader',
						'ts-loader'
					],
					include: include,
					exclude: exclude
				},
				//解析html文件
				{
					test: /\.html$/,
					include: [path.join(__dirname, `/public`)],
					loader: 'html-loader'
				},
				//解析vue文件
				{
					test: /\.vue$/,
					use: [
						'vue-loader'
					],
					include: [
						...include,
						...exclude
					]
				},
				//解析资源
				{
					test: /\.(jpg|png|gif|jpeg)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								esModule: false,
								limit: 50000
							}
						}
					],
					include: include,
					exclude: exclude
				}
			]
		},
		resolve: {
			extensions: ['.js', '.vue', '.json', '.jsx', '.ts', '.tsx'],
			alias: {
				"@common": path.join(__dirname, '../../src/common'),
				"@rules": path.join(__dirname, '../../src/common/components/cpt_form/rules'),//form组件配置
				"@images": path.join(__dirname, '../../src/common/assets/images'),
				"@project": path.join(__dirname, `../../src/project/${$.project}`),
				"@modules": path.join(__dirname, `../../src/project/${$.project}/modules`),
				"@views": path.join(__dirname, `../../src/project/${$.project}/views`),
				"@providers": path.join(__dirname, `../../src/project/${$.project}/modules/providers`),
			}
		},
		plugins: _plugins
	}
}