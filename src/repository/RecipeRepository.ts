import datasource from "@config/init";
import Recipe from "@model/Recipe";

export const RecipeRepository = datasource.getRepository(Recipe);
