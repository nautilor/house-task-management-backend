import datasource from "@config/init";
import FridgeCategory from "@model/FridgeCategory";

export const FridgeCategoryRepository = datasource.getRepository(FridgeCategory);
