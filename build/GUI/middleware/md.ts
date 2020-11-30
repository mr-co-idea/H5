import { Next } from "koa";
import { Context } from "vm";

const fs = require('fs'),
	path = require('path'),
	marked = require('marked');

function readMD(): Function {
	return async function (ctx: Context, next: Next): Promise<void> {
		if (ctx.url.indexOf('doc') !== -1) {
			let str: string = fs.readFileSync(path.join(__dirname, '../pages/template.html'), { encoding: 'utf-8' });
			const content: string = fs.readFileSync(path.join(__dirname, `../../../${ctx.url.replace('doc', '')}.md`), { encoding: 'utf-8' });
			str = str.replace('$content', marked(content));
			ctx.body = str;
		};
		await next();
	}
};

export {
	readMD
}