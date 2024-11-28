import datasource from "@/config/init";
import Category from "@/model/Category";

export const CategoryRepository = datasource.getRepository(Category);
