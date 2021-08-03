import * as Router from 'koa-router';
import { IProduct } from '../models/product/product';
import { ProductSerachDTO } from '../models/productSearch/productSearchDTO';
import { ISearchOrder } from '../models/searchOrder/searchOrder';
import { createSearchOrder, findSearchOrder, findSearchOrderById } from '../services/orderService';
import { findProductsByCategory } from '../services/productService';

const productController = new Router();

productController.post('/product/search', async (ctx) => {
	const productSearch: ProductSerachDTO = ctx.request.body;
	const response: ISearchOrder = await createSearchOrder(productSearch)
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
	const products: IProduct[] = await findProductsByCategory(categoryId)
	ctx.body = products; 
});

export default productController.routes();