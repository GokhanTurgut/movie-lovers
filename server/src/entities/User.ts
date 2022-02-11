import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { Movie } from "./Movie";
import { Actor } from "./Actor";
import { MovieComment } from "./MovieComment";
import { ActorComment } from "./ActorComment";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Movie, (movie) => movie.user, {
    cascade: true,
  })
  movies: Movie[];

  @OneToMany(() => Actor, (actor) => actor.user, {
    cascade: true,
  })
  actors: Actor[];

  @OneToMany(() => MovieComment, (movieComment) => movieComment.user, {
    cascade: true,
  })
  movieComments: MovieComment[];

  @OneToMany(() => ActorComment, (actorComment) => actorComment.user, {
    cascade: true,
  })
  actorComments: ActorComment[];
}
