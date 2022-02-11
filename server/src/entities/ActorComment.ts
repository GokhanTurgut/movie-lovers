import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { Actor } from "./Actor";
import { User } from "./User";

@Entity()
export class ActorComment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  author: string;

  @Column({ type: "text" })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Actor, (actor) => actor.comments, {
    onDelete: "CASCADE",
  })
  actor: Actor;

  @ManyToOne(() => User, (user) => user.actorComments, {
    onDelete: "CASCADE",
  })
  user: User;
}
