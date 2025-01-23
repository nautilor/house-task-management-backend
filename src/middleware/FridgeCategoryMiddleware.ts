import { QueryParamException } from "@exception/QueryParamException";
import FridgeCategory from "@model/FridgeCategory";
import {
  FridgeCategoryParams,
  FridgeCategoryParamSchema,
} from "@param/FridgeCategoryParams";
import { FridgeCategoryRepository } from "@repository/FridgeCategoryRepository";
import Ajv from "ajv";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: FridgeCategoryParams) => {
    return { ...queryParams };
  };

  find = async (
    queryParams: FridgeCategoryParams,
  ): Promise<FridgeCategory[]> => {
    const valid = this.validator.validate(
      FridgeCategoryParamSchema,
      queryParams,
    );
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    return FridgeCategoryRepository.find({
      where,
      order: {
        name: "ASC",
        items: {
          quantity: "DESC",
          index: "DESC",
        },
      },
      relations: ["items"],
    });
  };

  create = async (data: FridgeCategory): Promise<FridgeCategory> => {
    return await FridgeCategoryRepository.save(data);
  };

  findOne = async (id: string): Promise<FridgeCategory> => {
    const fridgecategory: FridgeCategory | null =
      await FridgeCategoryRepository.findOneBy({
        id,
      });
    if (!fridgecategory) {
      throw new Error("FridgeCategory not found with id: " + id);
    }
    return fridgecategory;
  };

  update = async (
    id: string,
    data: FridgeCategory,
  ): Promise<FridgeCategory> => {
    const fridgecategory: FridgeCategory = await this.findOne(id);
    return await FridgeCategoryRepository.save({ ...fridgecategory, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const fridgecategory: FridgeCategory = await this.findOne(id);
    await FridgeCategoryRepository.remove(fridgecategory);
    return fridgecategory.id;
  };
}

export const FridgeCategoryMiddleware = new middleware();
