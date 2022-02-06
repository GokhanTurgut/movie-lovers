import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { Movie } from "./Movie";
import { User } from "./User";

@Entity()
export class MovieComment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  author: string;

  @Column({ type: "text" })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.comments)
  movie: Movie;

  @ManyToOne(() => User, (user) => user.movieComments)
  user: User;
}
