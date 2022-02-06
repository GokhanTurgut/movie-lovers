import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { Movie } from "./Movie";
import { Actor } from "./Actor";

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

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];

  @OneToMany(() => Actor, (actor) => actor.user)
  actors: Actor[];
}
