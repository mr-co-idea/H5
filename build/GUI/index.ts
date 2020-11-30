const Koa = require('koa'),
	Static = require('koa-static'),
	Bodyparser = require('koa-bodyparser'),
	chalk = require('chalk'),
	path = require('path'),
	fs = require('fs'),
	{ exec } = require('child_process');

import { readMD } from './middleware/md'

const app = new Koa();

app.use(Static(
	path.join(__dirname, './static')
));
app.use(Bodyparser());
app.use(readMD());

app.use(async ctx => {
	switch (ctx.url) {
		case '/':
			ctx.body = fs.readFileSync(path.join(__dirname, './pages/index.html'), { encoding: 'utf-8' });
			break;
		case '/getProject':
			const dirList = fs.readdirSync(path.join(__dirname, '../../src/project'));
			let _data = [];
			dirList.map(item => {
				let config;
				try {
					config = JSON.parse(fs.readFileSync(path.join(__dirname, `../project/${item}.json`)));
				} catch (e) {
					console.info(e);
					config = { base: { name: `暂无名称：${item}` } }
				};
				const obj = {
					id: item,
					name: config.base.name || `暂无项目：${item}`
				};

				_data.push(obj);
			});
			ctx.body = {
				code: 0,
				data: _data
			};
			break;
		case '/runCmd':
			console.info(ctx.request.body);
			const params = ctx.request.body;
			const workerProcess = exec(`node ${path.join(__dirname, '../../command')} ${params.cmd} ${params.id}`, function (error, stdout, stderr) {
				console.info(error);
				console.info(stdout);
				console.info(stderr);
			});
			workerProcess.stdout.on('data', function (data) {
				console.info(data);
			})
			workerProcess.stderr.on('data', function (data) {
				console.info('stderr: ' + data);
			});
			ctx.body = { code: 0 };
			break;
		case '/getDocument':
			const doc = JSON.parse(fs.readFileSync(path.join(__dirname, './doc/doc.json'), { encoding: 'utf-8' }));
			ctx.body = {
				code: 0,
				data: doc
			}
			break;
			others:
			break;

	};
	if (ctx.url.indexOf('/create') !== -1) {
		let CN = ctx.url.split('=')[1].split('&')[0];
		CN = decodeURI(CN);
		const EN = ctx.url.split('=')[2];
		ctx.body = `<h1>创建中。。。</h1>，具体进度请查看调试工具控制台`;
		const workerProcess = exec(`node ${path.join(__dirname, '../config/node.create')} + ${EN} + ${CN}`, function (error, stdout, stderr) {
			if (error) {
				console.info(chalk.red('创建失败！'));
				throw error
			} else {
				console.info(chalk.green('创建成功！'))
			}
		});
		workerProcess.stdout.on('data', function (data) {
			console.info(data);
		})
		workerProcess.stderr.on('data', function (data) {
			console.info('stderr: ' + data);
		});
		ctx.body = { code: 0 };
	}
});

app.listen(3000, () => {
	console.info('服务启动：3000端口');
})
