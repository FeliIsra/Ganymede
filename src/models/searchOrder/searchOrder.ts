import * as mongoose from 'mongoose'
import { ObjectId } from "mongodb";
import { OrderStatus } from './enum/orderStatus';
import { ProductSerachDTO } from '../productSearch/productSearchDTO';
import { model } from 'mongoose';
import { IProduct } from '../product/product';

export interface ISearchOrder {
	id?: string;
	searchData: ProductSerachDTO;
	products: IProduct[];
	orderStatus?: OrderStatus;
}

const Schema = mongoose.Schema;
const searchOrderSchema = new Schema<ISearchOrder>({
	searchData: {
		type: ObjectId,
		ref: "ProductSearch",
		required: true
	},
	products: [{
		type: ObjectId,
		ref: "Product"
	}],
	orderStatus: {
		type: String,
		enum: OrderStatus,
		default: OrderStatus.RECEIVED,
	},
}, { timestamps: true })

export const SearchOrder = model<ISearchOrder>('SearchOrder', searchOrderSchema);
