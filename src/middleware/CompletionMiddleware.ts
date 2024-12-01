import { QueryParamException } from "@/exception/QueryParamException";
import Completion from "@/model/Completion";
import {
  CompletionParams,
  CompletionParamSchema,
} from "@/param/CompletionParams";
import { CompletionRepository } from "@/repository/CompletionRepository";
import Ajv from "ajv";
import { UserMiddleware } from "./UserMiddleware";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: CompletionParams) => {
    return { ...queryParams };
  };

  find = async (queryParams: CompletionParams): Promise<Completion[]> => {
    const valid = this.validator.validate(CompletionParamSchema, queryParams);
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    return CompletionRepository.find({
      where,
      order: {
        timestamp: "ASC",
      },
    });
  };

  create = async (data: Completion): Promise<Completion> => {
    const userId = data.user.id;
    const points = data.task.points;
    await UserMiddleware.incrementPoints(userId, points);
    return await CompletionRepository.save(data);
  };

  findOne = async (id: string): Promise<Completion> => {
    const completion: Completion | null = await CompletionRepository.findOneBy({
      id,
    });
    if (!completion) {
      throw new Error("Completion not found with id: " + id);
    }
    return completion;
  };

  update = async (id: string, data: Completion): Promise<Completion> => {
    const completion: Completion = await this.findOne(id);
    return await CompletionRepository.save({ ...completion, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const completion: Completion = await this.findOne(id);
    const userId = completion.user.id;
    const points = completion.task.points;
    await UserMiddleware.decrementPoints(userId, points);
    await CompletionRepository.remove(completion);
    return completion.id;
  };
}

export const CompletionMiddleware = new middleware();
