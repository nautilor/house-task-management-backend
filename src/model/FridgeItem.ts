import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import FridgeCategory from "@model/FridgeCategory";

@Entity()
class FridgeItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, nullable: false })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  index!: number;

  @Column({ nullable: false, default: 1 })
  quantity!: number;

  @ManyToOne(() => FridgeCategory, (category) => category.items, {
    nullable: false,
    eager: true,
  })
  category!: FridgeCategory;
}

export default FridgeItem;
