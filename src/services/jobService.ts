import { IResponseJob } from "../models/job/job"
import { ISearchOrder } from "../models/searchOrder/searchOrder"
import { findSearchOrderById, updateSearchOrder } from "./orderService"
import fetch from 'node-fetch'
import { IProduct } from "../models/product/product"
import { createProduct } from "./productService"
import { OrderStatus } from "../models/searchOrder/enum/orderStatus"
import { getConfig } from "../config/configService"

const CryptoJS = require("crypto-js");


export const sendJob = (searchOrder: ISearchOrder) => {
	const job = {
		id: searchOrder.id,
		searchData: searchOrder.searchData,
	}

	fetch(getConfig('THEMISTO') + 'api/job', {
		method: 'POST',
		headers: {
			password: CryptoJS.AES.encrypt(getConfig('PASS'), getConfig('SECRET')).toString() 
		},
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

	if(data.status === 501) {
		console.log(data.message)
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

	console.log('searchOrder', searchOrder)

	sendOrderToCallBack(searchOrder)
}

const handleError = async (id: string) => {
	const searchOrder: ISearchOrder = await findSearchOrderById(id)	
	searchOrder.orderStatus = OrderStatus.FAILED
	await updateSearchOrder(searchOrder)
}

const sendOrderToCallBack = (searchOrder: ISearchOrder) => {
	fetch(searchOrder.searchData.callbackUrl, {
		method: 'POST',
		body: JSON.stringify({
			"data": searchOrder	
		})
	})
		.then(response => response.json())
		.then(data => console.log(data));
}