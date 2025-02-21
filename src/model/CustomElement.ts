import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class CustomElement {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true, default: "#282828" })
  color!: string;

  @Column({ nullable: true })
  type!: string;

  @Column({ nullable: true })
  action!: string;
}

export default CustomElement;
