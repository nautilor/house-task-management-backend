import { QueryParamException } from "@exception/QueryParamException";
import FridgeItem from "@model/FridgeItem";
import {
  FridgeItemParams,
  FridgeItemParamSchema,
} from "@param/FridgeItemParams";
import { FridgeItemRepository } from "@repository/FridgeItemRepository";
import Ajv from "ajv";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: FridgeItemParams) => {
    return { ...queryParams };
  };

  find = async (queryParams: FridgeItemParams): Promise<FridgeItem[]> => {
    const valid = this.validator.validate(FridgeItemParamSchema, queryParams);
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    return FridgeItemRepository.find({
      where,
      order: {
        index: "DESC",
      },
      relations: [],
    });
  };

  create = async (data: FridgeItem): Promise<FridgeItem> => {
    return await FridgeItemRepository.save(data);
  };

  findOne = async (id: string): Promise<FridgeItem> => {
    const fridgeitem: FridgeItem | null = await FridgeItemRepository.findOneBy({
      id,
    });
    if (!fridgeitem) {
      throw new Error("FridgeItem not found with id: " + id);
    }
    return fridgeitem;
  };

  update = async (id: string, data: FridgeItem): Promise<FridgeItem> => {
    const fridgeitem: FridgeItem = await this.findOne(id);
    return await FridgeItemRepository.save({ ...fridgeitem, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const fridgeitem: FridgeItem = await this.findOne(id);
    await FridgeItemRepository.remove(fridgeitem);
    return fridgeitem.id;
  };
}

export const FridgeItemMiddleware = new middleware();
