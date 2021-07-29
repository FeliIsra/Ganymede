import { IProductSearch, ProductSearch } from "../models/productSearch/productSearch";
import { ProductSerachDTO } from "../models/productSearch/productSearchDTO";
import { ISearchOrder, SearchOrder } from '../models/searchOrder/searchOrder'
import { sendJob } from "./jobService";


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
		searchData: newProductSearch.id,
	})
	await newSearchOrder.save((err: any, data: any) => {
		if(err) console.log(err)
		newSearchOrder = data
	})

	sendJob(newSearchOrder);

	return newSearchOrder;
}

export const findSearchOrderById = async (orderId: string): Promise<ISearchOrder> => {
	console.log('orderId', orderId)
	const searchOrder: ISearchOrder = await SearchOrder
		.findById(orderId)
		.populate("searchData")

	return searchOrder;
}

export const findSearchOrder = async (): Promise<ISearchOrder[]> => {
	const searchOrders: ISearchOrder[] = await SearchOrder
		.find()
		.populate("searchData")

	return searchOrders;
}

export const updateSearchOrder = async (searchOrder: ISearchOrder) => {
	return await new SearchOrder(searchOrder).save()
}