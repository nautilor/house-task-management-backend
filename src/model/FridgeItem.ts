import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}

export default FridgeItem;
