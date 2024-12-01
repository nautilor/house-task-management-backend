import datasource from "@/config/init";
import RewardedPoints from "@/model/RewardedPoints";

export const RewardedPointsRepository =
  datasource.getRepository(RewardedPoints);
