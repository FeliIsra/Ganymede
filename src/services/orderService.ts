import { IProductSearch, ProductSearch } from "../models/productSearch/productSearch";
import { ProductSerachDTO } from "../models/productSearch/productSearchDTO";
import { ISearchOrder, SearchOrder } from '../models/searchOrder/searchOrder'


export const createSearchOrder = (productSearch: ProductSerachDTO): ISearchOrder => {

	// TODO: ir a buscar la data al otro servicio

	let newProductSearch = new ProductSearch({
		query: productSearch.query,
		provider: productSearch.provider,
		user: productSearch.options?.user,
		password: productSearch.options?.password,
		callbackUrl: productSearch.callbackUrl
	})
	newProductSearch.save((err: any, data: any) => {
		if(err) console.log(err)
		console.log(data)
		newProductSearch = data
	})

	let newSearchOrder = new SearchOrder({
		searchData: newProductSearch.id,
	})
	newSearchOrder.save((err: any, data: any) => {
		if(err) console.log(err)
		console.log(data)
		newSearchOrder = data
	})

	return newSearchOrder;
}

export const findSearchOrderById = async (orderId: string): Promise<ISearchOrder> => {
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