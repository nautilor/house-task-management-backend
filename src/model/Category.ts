import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Task from "@model/Task";

@Entity()
class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true, default: "#282828" })
  color!: string;

  @OneToMany(() => Task, (task) => task.category)
  tasks!: Task[];
}

export default Category;
