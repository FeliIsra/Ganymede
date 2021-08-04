import Router = require("koa-router");

const pingController = new Router();

pingController.get('/ping', async (ctx) => {
	ctx.body = "Hello from Ganymede";
});

export default pingController.routes();