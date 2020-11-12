const common = require('./config/webpack.base'),
	development = require('./config/webpack.dev'),
	product = require('./config/webpack.prod'),
	{ merge } = require('webpack-merge'),
	{ readJson } = require('./config/utils');


module.exports = env => {

	const mode = env.NODE_ENV;
	const project = process.env.project;
	const config = readJson(project);

	const config_base = Object.assign({
		project: project
	}, config.base),
		config_dev = Object.assign({ project: project }, config.development),
		config_prod = Object.assign({ project: project }, config.production);

	if (mode === 'development') {
		return merge(common(config_base), development(config_dev), { mode })
	} else {
		return merge(common(config_base), product(config_prod), { mode })
	}
}