import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import RewardedPoints from "./RewardedPoints";

@Entity()
class Reward {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, nullable: false })
  name!: string;

  @Column({ nullable: false })
  points!: number;

  @Column({ nullable: false, default: "#282828" })
  color!: string;

  @OneToMany(() => RewardedPoints, (rewarded) => rewarded.reward)
  rewarded!: RewardedPoints[];
}

export default Reward;
