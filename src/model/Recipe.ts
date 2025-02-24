import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Vegetable from "@model/Vegetable";

@Entity()
class Recipe {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: false, default: false })
  extra!: boolean;

  @ManyToMany(() => Vegetable, (vegetable) => vegetable.recipes)
  @JoinTable({ name: "recipe_vegetable" })
  vegetables!: Vegetable[];
}

export default Recipe;
