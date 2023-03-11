import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @ApiProperty({ description: "使用者ID", example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "使用者名稱", example: "Jhon" })
  @Column({
    unique: true,
  })
  username: string;

  @ApiProperty({
    description: "使用者信箱",
    example: "jhon@gmail.com",
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: "metamask 錢包地址",
    example: "0x379706b84d1B02242610d15b4349a7A1387d4976",
  })
  @Column({
    unique: true,
  })
  address: string;

  @ApiProperty({ description: "創建時間" })
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty({ description: "更新時間" })
  @UpdateDateColumn()
  updateAt: Date;
}
