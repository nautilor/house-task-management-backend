import { QueryParamException } from "@exception/QueryParamException";
import Vegetable from "@model/Vegetable";
import {
  VegetableParams,
  VegetableParamSchema,
  VegetableQueryParams,
} from "@param/VegetableParams";
import { VegetableRepository } from "@repository/VegetableRepository";
import Ajv from "ajv";
import { ILike } from "typeorm";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: VegetableParams) => {
    const query: VegetableQueryParams[] = [];
    if (queryParams.name) {
      const vegetableKeywords = queryParams.name.split(",");
      vegetableKeywords.forEach((keyword) => {
        query.push({ name: ILike(`%${keyword.trim()}%`) });
      });
    }
    if (queryParams.recipeName) {
      const keywords = queryParams.recipeName.split(",");
      keywords.map((keyword) =>
        query.push({
          recipes: {
            name: ILike(`%${keyword.trim()}%`),
          },
        }),
      );
    }
    return query;
  };

  find = async (queryParams: VegetableParams): Promise<Vegetable[]> => {
    const valid = this.validator.validate(VegetableParamSchema, queryParams);
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    return VegetableRepository.find({
      where,
      order: { name: "ASC" },
      relations: ["recipes"],
    });
  };

  create = async (data: Vegetable): Promise<Vegetable> => {
    return await VegetableRepository.save(data);
  };

  findOne = async (id: string): Promise<Vegetable> => {
    const vegetable: Vegetable | null = await VegetableRepository.findOneBy({
      id,
    });
    if (!vegetable) {
      throw new Error("Vegetable not found with id: " + id);
    }
    return vegetable;
  };

  update = async (id: string, data: Vegetable): Promise<Vegetable> => {
    const vegetable: Vegetable = await this.findOne(id);
    return await VegetableRepository.save({ ...vegetable, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const vegetable: Vegetable = await this.findOne(id);
    await VegetableRepository.remove(vegetable);
    return vegetable.id;
  };
}

export const VegetableMiddleware = new middleware();
