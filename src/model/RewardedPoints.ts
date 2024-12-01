import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import User from "@model/User";
import Reward from "@model/Reward";

@Entity()
class RewardedPoints {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: new Date(), nullable: false })
  timestamp!: Date;

  @ManyToOne(() => User, (user) => user.rewarded, {
    nullable: false,
    eager: true,
  })
  user!: User;

  @ManyToOne(() => Reward, (reward) => reward.rewarded, {
    nullable: false,
    eager: true,
  })
  reward!: Reward;
}

export default RewardedPoints;
