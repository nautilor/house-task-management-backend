import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Completion from "@model/Completion";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, nullable: false })
  name!: string;

  @Column({ default: 0, nullable: false })
  points!: number;

  @OneToMany(() => Completion, (completion) => completion.user)
  completions!: Completion[];
}

export default User;
