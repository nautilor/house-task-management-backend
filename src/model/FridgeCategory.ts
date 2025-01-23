import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import FridgeItem from "@model/FridgeItem";

@Entity()
class FridgeCategory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true, default: "#282828" })
  color!: string;

  @OneToMany(() => FridgeItem, (item) => item.category)
  items!: FridgeItem[];
}

export default FridgeCategory;
