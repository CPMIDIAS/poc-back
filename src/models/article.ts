import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./user";
import { MinLength, MaxLength } from "class-validator";

// adding an exclamation mark (!) to the properties because the properties are not assigned in the
// constructor and can have the value undefined.
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @MinLength(10, {
    message: 'Title is too short',
  })
  @MaxLength(80, {
    message: 'Title is too long',
  })
  @Column({ unique: true })
  title!: string;

  @Column()
  subtitle!: string;

  @Column({
    type: "text",
  })
  content!: string;

  @Column({ nullable: true })
  userId!: number;
  @ManyToOne((_type) => User, (user: User) => user.articles)
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
