import * as mongoose from 'mongoose'
import { ObjectId } from "mongodb";
import { OrderStatus } from './enum/orderStatus';
import { ProductSerachDTO } from '../productSearch/productSearchDTO';
import { model } from 'mongoose';

export interface ISearchOrder {
	id?: string;
	searchData: ProductSerachDTO;
	productList: any; // TODO: tipar este campo
	orderStatus?: OrderStatus;
}

const Schema = mongoose.Schema;
const searchOrderSchema = new Schema<ISearchOrder>({
	searchData: {
		type: ObjectId,
		ref: "ProductSearch",
		required: true
	},
	productList: {
		type: Array,
		default: [],
		required: true
	},
	orderStatus: {
		type: String,
		enum: OrderStatus,
		default: OrderStatus.RECEIVED,
	},
}, { timestamps: true })

export const SearchOrder = model<ISearchOrder>('SearchOrder', searchOrderSchema);
