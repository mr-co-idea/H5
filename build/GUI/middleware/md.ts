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
		} else if (ctx.url.indexOf('store') !== -1) {
			const project: string = ctx.url.split('?project=')[1];
			let str: string = fs.readFileSync(path.join(__dirname, "../pages/doc.html"), { encoding: 'utf-8' });
			["demand", "interface", "other"].map(ele => {
				const content: string = fs.readFileSync(path.join(__dirname, `../../../src/project/${project}/doc/${ele}/readme.md`), { encoding: 'utf-8' });
				str = str.replace(`#${ele}`, marked(content));
			});
			ctx.body = str;
		}
		await next();
	}
};

export {
	readMD
}