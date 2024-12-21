import { BadRequestException } from "@/exception/BadRequestException";
import { NotFoundException } from "@/exception/NotFoundException";
import { QueryParamException } from "@/exception/QueryParamException";
import Category from "@/model/Category";
import { CategoryParams, CategoryParamSchema } from "@/param/CategoryParams";
import { CategoryRepository } from "@/repository/CategoryRepository";
import Ajv from "ajv";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: CategoryParams) => {
    return { ...queryParams };
  };

  validateBody = (category: Category) => {
    if (category.name === undefined || category.name === "") {
      throw new BadRequestException("Category name is required");
    }
  };

  find = async (queryParams: CategoryParams): Promise<Category[]> => {
    const valid = this.validator.validate(CategoryParamSchema, queryParams);
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    return CategoryRepository.find({
      where,
      order: {
        name: "ASC",
      },
      relations: ["tasks"],
    });
  };

  create = async (data: Category): Promise<Category> => {
    this.validateBody(data);
    if (await CategoryRepository.existsBy({ name: data.name }))
      throw new BadRequestException(
        "Category already exists with name: " + data.name,
      );
    return await CategoryRepository.save(data);
  };

  findOne = async (id: string): Promise<Category> => {
    const category: Category | null = await CategoryRepository.findOneBy({
      id,
    });
    if (!category) {
      throw new NotFoundException("Category not found with id: " + id);
    }
    return category;
  };

  update = async (id: string, data: Category): Promise<Category> => {
    this.validateBody(data);
    const category: Category = await this.findOne(id);
    if (await CategoryRepository.existsBy({ name: data.name }))
      throw new BadRequestException(
        "Category already exists with name: " + data.name,
      );
    return await CategoryRepository.save({ ...category, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const category: Category = await this.findOne(id);
    await CategoryRepository.remove(category);
    return category.name;
  };
}

export const CategoryMiddleware = new middleware();
