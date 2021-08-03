import * as mongoose from 'mongoose'
import { ObjectId } from "mongodb";
import { ICategory } from './category';

export interface IProduct {
	sku?: string;
	name: string;
	price: string;
	originalPrice: string;
	category: ICategory;
	description?: string;
	images: string[];
	related: string[]
}

const Schema = mongoose.Schema;
const productSchema = new Schema<IProduct>({
	sku: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	originalPrice: {
		type: String,
		required: true
	},
	category: {
		type: ObjectId,
		ref: "Category",
		required: true
	},
	description: {
		type: String,
	},
	images: [{
		type: String,
		required: true
	}],
	related: [{
		type: String,
	}],
	searchOrder: {
		type: ObjectId,
		ref: "SearchOrder"
	}
}, { timestamps: true })

export const Product = mongoose.model<IProduct>('Product', productSchema);
