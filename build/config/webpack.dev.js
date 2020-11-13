const path = require('path'),
	webpack = require('webpack'),
	{ processEnv } = require('./utils'),
	{ merge } = require('webpack-merge');

module.exports = config => {

	const publicPath = config.publicPath || '';
	//如果config中没有配置，则采用下列默认配置，有的话将覆盖下列配置
	const $ = merge({
		env: {
			'BASE_URL': '/api'
		},
		outPut_publicPath: publicPath ? publicPath + '/' : '',
		devServer: {
			contentBase: path.join(__dirname, '../public'),
			open: true,
			openPage: publicPath ? publicPath.split('/')[1] + '/' : '',
			publicPath: publicPath + '',
			port: 8080,
			host: 'localhost',
			disableHostCheck: true,
			proxy: {
				'/api': {
					target: 'localhost:3000',
					pathRewrite: {
						'^/api': ''
					}
				}
			}
		}
	}, config);

	const include = [
		path.join(__dirname, `../../src/common`),
		path.join(__dirname, `../../src/project/${$.project}`)
	];
	const exclude = [
		path.join(__dirname, '../../node_modules')
	];

	return {
		mode: 'development',
		devtool: 'inline-source-map',
		output: {
			publicPath: $.outPut_publicPath
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' }
					],
					include: [
						...include,
						...exclude
					]
				},
				{
					test: /\.less$/,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' },
						{ loader: 'less-loader' }
					],
					include: include,
					exclude: exclude
				},
				{
					test: /\.(sa|sc)ss$/,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' },
						{ loader: 'sass-loader' }
					],
					include: include,
					exclude: exclude
				}
			]
		},
		devServer: $.devServer,
		plugins: [
			new webpack.DefinePlugin(processEnv($.env)),
		]
	};
}