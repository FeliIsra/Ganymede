import { ICategory } from "../models/product/category";
import { IProduct, Product } from "../models/product/product";
import { findCategoryById, findCategoryByNameOrCreate } from "./categoryService";

export const createProduct = async (product: IProduct): Promise<IProduct> => {
	const category: ICategory = await findCategoryByNameOrCreate(product.category.name)
	product.category = category
	let newProduct = new Product(product)
	await newProduct.save((err: any, data: any) => {
		if(err) console.log(err)
		newProduct = data
	})
	return newProduct; 
}

export const findProductsByCategory = async (categoryId: string): Promise<IProduct[]> => {
	const category: ICategory = await findCategoryById(categoryId)
	const products: IProduct[] = await Product
		.find({category})
		.populate('category')
	return products;
}