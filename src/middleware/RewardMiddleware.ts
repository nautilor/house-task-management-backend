import { QueryParamException } from "@/exception/QueryParamException";
import Reward from "@/model/Reward";
import { RewardParams, RewardParamSchema } from "@/param/RewardParams";
import { RewardRepository } from "@/repository/RewardRepository";
import Ajv from "ajv";
import { RewardedPointsMiddleware } from "@middleware/RewardedPointsMiddleware";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: RewardParams) => {
    return { ...queryParams };
  };

  find = async (queryParams: RewardParams): Promise<Reward[]> => {
    const valid = this.validator.validate(RewardParamSchema, queryParams);
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    const rewards: Reward[] = await RewardRepository.find({
      where,
      order: {
        name: "ASC",
      },
      relations: ["rewarded"],
    });

    for (const reward of rewards) {
      reward.rewarded = await RewardedPointsMiddleware.findCurrentWeekForReward(
        reward.id,
      );
    }
    return rewards;
  };

  create = async (data: Reward): Promise<Reward> => {
    return await RewardRepository.save(data);
  };

  findOne = async (id: string): Promise<Reward> => {
    const reward: Reward | null = await RewardRepository.findOne({
      where: { id },
      relations: ["rewarded"],
    });
    if (!reward) {
      throw new Error("Reward not found with id: " + id);
    }
    reward.rewarded = await RewardedPointsMiddleware.findCurrentWeekForReward(
      reward.id,
    );
    return reward;
  };

  update = async (id: string, data: Reward): Promise<Reward> => {
    const reward: Reward = await this.findOne(id);
    return await RewardRepository.save({ ...reward, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const reward: Reward = await this.findOne(id);
    await RewardRepository.remove(reward);
    return reward.name;
  };

  handlePoints = async (id: string, points: number): Promise<Reward> => {
    const reward: Reward = await this.findOne(id);
    reward.points += points;
    return await RewardRepository.save(reward);
  };

  incrementPoints = async (id: string, points: number): Promise<Reward> => {
    const reward: Reward = await this.findOne(id);
    reward.points += points;
    return await RewardRepository.save(reward);
  };

  decrementPoints = async (id: string, points: number): Promise<Reward> => {
    const reward: Reward = await this.findOne(id);
    reward.points -= points;
    return await RewardRepository.save(reward);
  };
}

export const RewardMiddleware = new middleware();
