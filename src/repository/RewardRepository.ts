import datasource from "@/config/init";
import Reward from "@/model/Reward";

export const RewardRepository = datasource.getRepository(Reward);
