import { IResponseJob } from "../models/job/job"
import { ISearchOrder } from "../models/searchOrder/searchOrder"
import { findSearchOrderById, updateSearchOrder } from "./orderService"
import fetch from 'node-fetch'
import { IProduct } from "../models/product/product"
import { createProduct } from "./productService"
import { OrderStatus } from "../models/searchOrder/enum/orderStatus"

export const sendJob = (searchOrder: ISearchOrder) => {
	const job = {
		id: searchOrder.id,
		searchData: searchOrder.searchData,
	}

	fetch('http://localhost:3003/api/job', {
		method: 'POST',
		body: JSON.stringify({
			"data":	job
		})
	})
 		.then(async res => JSON.parse(await res.text()))
  		.then(data => handleJobResponse(data))
}

const handleJobResponse = async (data: any) => {
	if(data.status === 'Error') {
		await handleError(data.message)
		return
	}

	const jobResponse: IResponseJob = data.message
	const searchOrder: ISearchOrder = await findSearchOrderById(jobResponse.id)	
	const products: IProduct[] = []
	for await (const product of jobResponse.products) {
		const savedProduct: IProduct = await createProduct(product)
		products.push(savedProduct)
	}

	searchOrder.products = products
	searchOrder.orderStatus = OrderStatus.FULFILLED
	
	await updateSearchOrder(searchOrder)
}

const handleError = async (id: string) => {
	const searchOrder: ISearchOrder = await findSearchOrderById(id)	
	searchOrder.orderStatus = OrderStatus.FAILED
	await updateSearchOrder(searchOrder)
}