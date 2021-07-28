import Router = require("koa-router");
import productController from "./controllers/product";

const router = new Router({
	prefix: '/api'
});

router.use(productController)

export default router;