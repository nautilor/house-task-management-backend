import { QueryParamException } from "@/exception/QueryParamException";
import Reward from "@/model/Reward";
import { RewardParams, RewardParamSchema } from "@/param/RewardParams";
import { RewardRepository } from "@/repository/RewardRepository";
import Ajv from "ajv";

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
    return RewardRepository.find({
      where,
      order: {
        name: "ASC",
      },
    });
  };

  create = async (data: Reward): Promise<Reward> => {
    return await RewardRepository.save(data);
  };

  findOne = async (id: string): Promise<Reward> => {
    const reward: Reward | null = await RewardRepository.findOneBy({
      id,
    });
    if (!reward) {
      throw new Error("Reward not found with id: " + id);
    }
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
