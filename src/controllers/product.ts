import * as Router from 'koa-router';
import { ProductSerachDTO } from '../models/productSearch/productSearchDTO';
import { ISearchOrder } from '../models/searchOrder/searchOrder';
import { createSearchOrder, findSearchOrder, findSearchOrderById } from '../services/orderService';

const productController = new Router();

productController.post('/product/search', async (ctx) => {
	const productSearch: ProductSerachDTO = ctx.request.body;
	const response: ISearchOrder = createSearchOrder(productSearch)
	ctx.body = response;
});

productController.get('/product/search-order/:orderId', async (ctx) => {
	const orderId: string = ctx.params.orderId
	const response: ISearchOrder = await findSearchOrderById(orderId)
	ctx.body = response;
});

productController.get('/product/search-orders', async (ctx) => {
	const response: ISearchOrder[] = await findSearchOrder()
	ctx.body = response;
});

productController.get('/product/category/:categoryId', async (ctx) => {
	const categoryId: string = ctx.params.categoryId;
	ctx.body = categoryId; 
});

export default productController.routes();