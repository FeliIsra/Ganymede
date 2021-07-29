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
 		.then(async res => JSON.parse(await res.text()).message)
  		.then(data => handleJobResponse(data))
}

const handleJobResponse = async (data: any) => {
	const jobResponse: IResponseJob = data
	if(jobResponse.error) handleError(jobResponse)
	const searchOrder: ISearchOrder = await findSearchOrderById(jobResponse.id)	
	const products: IProduct[] = []
	for await (const product of jobResponse.products) {
		const savedProduct: IProduct = await createProduct(product)
		products.push(savedProduct)
	}

	searchOrder.products = products
	searchOrder.orderStatus = OrderStatus.FULFILLED
	
	updateSearchOrder(searchOrder)
}

const handleError = async (jobResponse: IResponseJob) => {
	const searchOrder: ISearchOrder = await findSearchOrderById(jobResponse.id)	
	searchOrder.orderStatus = OrderStatus.FAILED
	updateSearchOrder(searchOrder)
}