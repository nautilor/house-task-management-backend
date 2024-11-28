import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Task from "@model/Task";

@Entity()
class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, nullable: false })
  name!: string;

  @Column({ nullable: true })
  color!: string;

  @OneToMany(() => Task, (task) => task.category)
  tasks!: Task[];
}

export default Category;
