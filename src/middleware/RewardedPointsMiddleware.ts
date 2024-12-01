import { QueryParamException } from "@/exception/QueryParamException";
import RewardedPoints from "@/model/RewardedPoints";
import {
  RewardedPointsParams,
  RewardedPointsParamSchema,
} from "@/param/RewardedPointsParams";
import { RewardedPointsRepository } from "@/repository/RewardedPointsRepository";
import Ajv from "ajv";
import { UserMiddleware } from "./UserMiddleware";
import User from "@/model/User";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: RewardedPointsParams) => {
    return { ...queryParams };
  };

  find = async (
    queryParams: RewardedPointsParams,
  ): Promise<RewardedPoints[]> => {
    const valid = this.validator.validate(
      RewardedPointsParamSchema,
      queryParams,
    );
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    return RewardedPointsRepository.find({
      where,
      order: {
        timestamp: "ASC",
      },
    });
  };

  create = async (data: RewardedPoints): Promise<RewardedPoints> => {
    const userId = data.user.id;
    const points = data.reward.points;
    await UserMiddleware.decrementPoints(userId, points);
    return await RewardedPointsRepository.save(data);
  };

  findOne = async (id: string): Promise<RewardedPoints> => {
    const rewardedPoints: RewardedPoints | null =
      await RewardedPointsRepository.findOneBy({
        id,
      });
    if (!rewardedPoints) {
      throw new Error("RewardedPoints not found with id: " + id);
    }
    return rewardedPoints;
  };

  update = async (
    id: string,
    data: RewardedPoints,
  ): Promise<RewardedPoints> => {
    const rewardedPoints: RewardedPoints = await this.findOne(id);
    return await RewardedPointsRepository.save({ ...rewardedPoints, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const rewardedPoints: RewardedPoints = await this.findOne(id);
    const userId = rewardedPoints.user.id;
    const points = rewardedPoints.task.points;
    await UserMiddleware.incrementPoints(userId, points);
    await RewardedPointsRepository.remove(rewardedPoints);
    return rewardedPoints.id;
  };
}

export const RewardedPointsMiddleware = new middleware();
