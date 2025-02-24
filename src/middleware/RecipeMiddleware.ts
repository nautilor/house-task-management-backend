import { QueryParamException } from "@exception/QueryParamException";
import Recipe from "@model/Recipe";
import { RecipeParams, RecipeParamSchema } from "@param/RecipeParams";
import { RecipeRepository } from "@repository/RecipeRepository";
import Ajv from "ajv";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: RecipeParams) => {
    return { ...queryParams };
  };

  find = async (queryParams: RecipeParams): Promise<Recipe[]> => {
    const valid = this.validator.validate(RecipeParamSchema, queryParams);
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    return RecipeRepository.find({
      where,
      order: {},
      relations: ["vegetables"],
    });
  };

  create = async (data: Recipe): Promise<Recipe> => {
    return await RecipeRepository.save(data);
  };

  findOne = async (id: string): Promise<Recipe> => {
    const recipe: Recipe | null = await RecipeRepository.findOneBy({
      id,
    });
    if (!recipe) {
      throw new Error("Recipe not found with id: " + id);
    }
    return recipe;
  };

  update = async (id: string, data: Recipe): Promise<Recipe> => {
    const recipe: Recipe = await this.findOne(id);
    return await RecipeRepository.save({ ...recipe, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const recipe: Recipe = await this.findOne(id);
    await RecipeRepository.remove(recipe);
    return recipe.id;
  };
}

export const RecipeMiddleware = new middleware();
