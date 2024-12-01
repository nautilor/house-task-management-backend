import { QueryParamException } from "@/exception/QueryParamException";
import User from "@/model/User";
import { UserParams, UserParamSchema } from "@/param/UserParams";
import { UserRepository } from "@/repository/UserRepository";
import Ajv from "ajv";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: UserParams) => {
    return { ...queryParams };
  };

  find = async (queryParams: UserParams): Promise<User[]> => {
    const valid = this.validator.validate(UserParamSchema, queryParams);
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    return UserRepository.find({
      where,
      order: {
        name: "ASC",
      },
      relations: ["completions"],
    });
  };

  create = async (data: User): Promise<User> => {
    return await UserRepository.save(data);
  };

  findOne = async (id: string): Promise<User> => {
    const user: User | null = await UserRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new Error("User not found with id: " + id);
    }
    return user;
  };

  update = async (id: string, data: User): Promise<User> => {
    const user: User = await this.findOne(id);
    return await UserRepository.save({ ...user, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const user: User = await this.findOne(id);
    await UserRepository.remove(user);
    return user.name;
  };

  handlePoints = async (id: string, points: number): Promise<User> => {
    const user: User = await this.findOne(id);
    user.points += points;
    return await UserRepository.save(user);
  };

  incrementPoints = async (id: string, points: number): Promise<User> => {
    const user: User = await this.findOne(id);
    user.points += points;
    return await UserRepository.save(user);
  };

  decrementPoints = async (id: string, points: number): Promise<User> => {
    const user: User = await this.findOne(id);
    if (user.points < points) {
      throw Error(`${user.name} does not have enough points`);
    }
    user.points -= points;
    return await UserRepository.save(user);
  };
}

export const UserMiddleware = new middleware();
