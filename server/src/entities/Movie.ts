import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  BaseEntity,
  JoinTable,
} from "typeorm";

import { User } from "./User";
import { MovieComment } from "./MovieComment";
// import { Actor } from "./Actor";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "text" })
  plot: string;

  @Column()
  release: Date;

  @Column({ type: "text" })
  genre: string;

  @Column()
  director: string;

  @Column({ type: "text" })
  posterURL: string;

  @Column()
  likes: number;

  @Column()
  public: boolean;

  @Column({ type: "text" })
  actors: string;

  @ManyToOne(() => User, (user) => user.movies)
  user: User;

  @OneToMany(() => MovieComment, (movieComment) => movieComment.movie)
  comments: MovieComment[];

  // @ManyToMany(() => Actor, (actor) => actor.movies)
  // @JoinTable()
  // actors: Actor[];
}
