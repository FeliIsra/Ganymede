import { Category, ICategory } from "../models/product/category";

export const findCategoryByNameOrCreate = async (name: string): Promise<ICategory> => {
	const category: ICategory | undefined = await Category.findOne({name})
	if(category) return category;

	const newCategory: ICategory = await new Category({name}).save()
	return newCategory;
}

export const findCategoryById = async (categoryId: string): Promise<ICategory> => {
	return await Category.findById(categoryId)
}