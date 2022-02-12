import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
  ManyToMany,
} from "typeorm";

import { User } from "./User";
import { MovieComment } from "./MovieComment";

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
  public: boolean;

  @Column({ type: "text" })
  actors: string;

  @ManyToOne(() => User, (user) => user.movies, {
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => MovieComment, (movieComment) => movieComment.movie, {
    cascade: true,
  })
  comments: MovieComment[];

  @ManyToMany(() => User, (user) => user.likedMovies)
  likes: User[];
}
