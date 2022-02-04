import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { Actor } from "./Actor";

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

  @Column()
  password: string;

  @ManyToOne(() => Actor, (actor) => actor.comments)
  actor: Actor;
}
