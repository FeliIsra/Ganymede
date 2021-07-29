import { IProduct } from "../product/product";

export interface IResponseJob {
	id: string;
	products?: IProduct[];
	error?: string;
}