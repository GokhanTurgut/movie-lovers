import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  BaseEntity,
} from "typeorm";

import { User } from "./User";
import { ActorComment } from "./ActorComment";
import { Movie } from "./Movie";

@Entity()
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "text" })
  imageURL: string;

  @Column()
  likes: number;

  @ManyToOne(() => User, (user) => user.actors)
  user: User;

  @OneToMany(() => ActorComment, (comment) => comment.actor)
  comments: ActorComment[];

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
