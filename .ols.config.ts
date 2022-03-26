const child_process = require('child_process')

const publicPaths = {
	development: '',
	production: '/dist',
};

module.exports = {
	// 类型：项目 | 组件
	type: 'project',
	// 配置全局变量
	define: {
		BASE_NAME: 'bs14/#'
	},
	// webpack配置，可以是一个对象，或者一个函数
	configureWebpack(config, merge) {
		return merge(config, {
			output: {
				publicPath: publicPaths[process.env.NODE_ENV]
			},
			plugins: [
			]
		});
	},
	// 链式操作webpack配置
	chainWebpack(chian, config) {
	},
	// 插件，是一个个函数组成的数组Array<(ctx) => void>，插件默认透出ctx上下文，用户可以通过上下文完成一些操作
	plugins: [
		{
			name: 'electron-run',
			fn() {
				child_process.exec('yarn run electron-run')
			},

		}
	]
};
