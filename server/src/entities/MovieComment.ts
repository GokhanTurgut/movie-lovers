import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { Movie } from "./Movie";

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

  @Column()
  password: string;

  @ManyToOne(() => Movie, (movie) => movie.comments)
  movie: Movie;
}
