import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import Recipe from "@model/Recipe";

@Entity()
class Vegetable {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @ManyToMany(() => Recipe, (recipe) => recipe.vegetables)
  recipes!: Recipe[];
}

export default Vegetable;
