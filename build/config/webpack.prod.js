const path = require('path'),
	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
	{ processEnv } = require('./utils'),
	webpack = require('webpack');

module.exports = config => {

	const $ = Object.assign({
		env: {
			"BASE_URL": '/api'
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
		mode: 'production',
		optimization: {
			splitChunks: {
				chunks: 'all',
				cacheGroups: {
					vendor: {
						name: 'vendor',
						test: /[\\/]node_module[\\/]/,
						priority: -10,
						chunks: 'initial'
					}
				}
			},
			usedExports:true
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						{ loader: MiniCssExtractPlugin.loader },
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
						{ loader: MiniCssExtractPlugin.loader },
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
						{ loader: MiniCssExtractPlugin.loader },
						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' },
						{ loader: 'sass-loader' }
					],
					include: include,
					exclude: exclude
				},
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: 'css/[name].[hash:5].css'
			}),
			new OptimizeCSSAssetsPlugin(),
			new webpack.DefinePlugin(processEnv($.env))
		]
	};
}