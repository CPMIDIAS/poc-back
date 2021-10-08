import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Article } from "./article";
import { IsEmail, MinLength, MaxLength } from "class-validator";

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
  @MinLength(5, {
    message: 'Name is too short',
  })
  @MaxLength(30, {
    message: 'Name is too long',
  })
  name!: string;

  @Column({ unique: true })
  @IsEmail()
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

  constructor(params?: { name?: string, email?: string, role?: UserRole, description?: string }) {
    if(params) {
      if(params.name)        this.name = params.name;
      if(params.email)       this.email = params.email;
      if(params.role)        this.role = params.role;
      if(params.description) this.description = params.description;
    }
  }
}
