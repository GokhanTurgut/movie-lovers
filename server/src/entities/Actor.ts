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
// import { Movie } from "./Movie";

@Entity()
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "text", nullable: true })
  imageURL: string;

  @Column()
  likes: number;

  @Column()
  public: boolean;

  @Column({ type: "text" })
  movies: string;

  @ManyToOne(() => User, (user) => user.actors, {
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => ActorComment, (actorComment) => actorComment.actor, {
    cascade: true,
  })
  comments: ActorComment[];

  // @ManyToMany(() => Movie, (movie) => movie.actors)
  // movies: Movie[];
}
