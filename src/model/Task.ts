import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Category from "@model/Category";
import Completion from "@model/Completion";

@Entity()
class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, nullable: false })
  name!: string;

  @Column({ default: 0, nullable: false })
  points!: number;

  @ManyToOne(() => Category, (category) => category.tasks, {
    nullable: false,
    eager: true,
  })
  category!: Category;

  @OneToMany(() => Completion, (completion) => completion.task)
  completions!: Completion[];
}

export default Task;
