import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import User from "@model/User";
import Task from "@model/Task";

@Entity()
class Completion {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: new Date(), nullable: false })
  timestamp!: Date;

  @ManyToOne(() => User, (user) => user.completions, { nullable: false })
  user!: User;

  @ManyToOne(() => Task, (task) => task.completions, { nullable: false })
  task!: Task;
}

export default Completion;
