import { QueryParamException } from "@exception/QueryParamException";
import CustomElement from "@model/CustomElement";
import {
  CustomElementParams,
  CustomElementParamSchema,
} from "@param/CustomElementParams";
import { CustomElementRepository } from "@repository/CustomElementRepository";
import Ajv from "ajv";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: CustomElementParams) => {
    return { ...queryParams };
  };

  find = async (queryParams: CustomElementParams): Promise<CustomElement[]> => {
    const valid = this.validator.validate(
      CustomElementParamSchema,
      queryParams,
    );
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    return CustomElementRepository.find({
      where,
      order: {},
      relations: [],
    });
  };

  create = async (data: CustomElement): Promise<CustomElement> => {
    return await CustomElementRepository.save(data);
  };

  findOne = async (id: string): Promise<CustomElement> => {
    const customElement: CustomElement | null =
      await CustomElementRepository.findOneBy({
        id,
      });
    if (!customElement) {
      throw new Error("CustomElement not found with id: " + id);
    }
    return customElement;
  };

  update = async (id: string, data: CustomElement): Promise<CustomElement> => {
    const customElement: CustomElement = await this.findOne(id);
    return await CustomElementRepository.save({ ...customElement, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const customElement: CustomElement = await this.findOne(id);
    await CustomElementRepository.remove(customElement);
    return customElement.id;
  };
}

export const CustomElementMiddleware = new middleware();
