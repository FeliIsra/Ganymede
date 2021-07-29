
import * as mongoose from 'mongoose'

export interface ICategory {
	id?: string,
	name: string
}

const Schema = mongoose.Schema;
const categorySchema = new Schema<ICategory>({
	name: {
		type: String,
		required: true
	},
}, { timestamps: true })

export const Category = mongoose.model<ICategory>('Category', categorySchema);