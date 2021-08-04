import { ProductSearch } from "../models/productSearch/productSearch";
import { ProductSerachDTO } from "../models/productSearch/productSearchDTO";
import { OrderStatus } from "../models/searchOrder/enum/orderStatus";
import { ISearchOrder, SearchOrder } from '../models/searchOrder/searchOrder'
import { sendJob } from "./jobService";
import fetch from 'node-fetch'


export const createSearchOrder = async (productSearch: ProductSerachDTO): Promise<ISearchOrder> => {
	let newProductSearch = new ProductSearch({
		query: productSearch.query,
		provider: productSearch.provider,
		user: productSearch.options?.user,
		password: productSearch.options?.password,
		callbackUrl: productSearch.callbackUrl
	})
	await newProductSearch.save((err: any, data: any) => {
		if(err) console.log(err)
		newProductSearch = data
	})

	let newSearchOrder = new SearchOrder({
		searchData: newProductSearch,
	})

	await newSearchOrder.save((err: any, data: any) => {
		if(err) console.log(err)
		newSearchOrder = data
	})

	sendJob(newSearchOrder);

	newSearchOrder.updateOne({
		orderStatus: OrderStatus.PROCESSING
	})

	return newSearchOrder;
}

export const findSearchOrderById = async (orderId: string): Promise<ISearchOrder> => {
	const searchOrder: ISearchOrder = await SearchOrder
		.findById(orderId)
		.populate("searchData")
		.populate("products")

	return searchOrder;
}

export const findSearchOrder = async (): Promise<ISearchOrder[]> => {
	const searchOrders: ISearchOrder[] = await SearchOrder
		.find()
		.populate("searchData")
		.populate("products")

	return searchOrders;
}

export const updateSearchOrder = async (searchOrder: ISearchOrder) => {
	return await new SearchOrder(searchOrder).save()
}

export const sendOrderToCallBack = (searchOrder: ISearchOrder) => {
	fetch(searchOrder.searchData.callbackUrl, {
		method: 'POST',
		body: JSON.stringify({
			"data": searchOrder	
		})
	})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log(error));
}