module.exports = {
	plugins: [
		require('autoprefixer')({
			overrideBrowserslist: ['Android >= 4.0', 'ios >= 8']
		}),
		require('postcss-pxtorem')({
			rootValue: 37.5,//基于375px宽的设计图
			propList: ['*']
		})
	]
}