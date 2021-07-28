import * as mongoose from 'mongoose'

export interface IProductSearch {
	id?: string;
	query: string;
	provider: string;
	callbackUrl: string;
	user?: string;
	password?: string;
}

const Schema = mongoose.Schema;
const productSearchSchema = new Schema<IProductSearch>({
	query: {
		type: String,
		required: true
	},
	provider: {
		type: String,
		required: true
	},
	user: {
		type: String,
	},
	password: {
		type: String,
	},
	callbackUrl: {
		type: String,
		required: true
	}
}, { timestamps: true })

export const ProductSearch = mongoose.model<IProductSearch>('ProductSearch', productSearchSchema);
