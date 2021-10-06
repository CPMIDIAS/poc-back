import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Article } from "./article";

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    READER = "reader"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.READER })
  role!: UserRole;

  @Column({ type: "text", nullable: true })
  description!: string;

  @OneToMany((_type) => Article, (article: Article) => article.user)
  articles!: Array<Article>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
