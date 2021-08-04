import Router = require("koa-router");
import productController from "./controllers/product";
import pingController from "./controllers/ping";

const router = new Router({
	prefix: '/api'
});

router.use(productController)
router.use(pingController)

export default router;