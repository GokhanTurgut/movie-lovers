export interface Movie {
  id: string;
  title: string;
  posterURL: string;
  release: string;
  genre: string;
  plot: string;
  actors: string;
  director: string;
  likes: number;
  public: boolean;
}

export interface Actor {
  id: string;
  firstName: string;
  lastName: string;
  imageURL: string;
  likes: number;
  public: boolean;
  movies: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  movies: Movie[];
  actors: Actor[];
  movieComments: MovieComment[];
  actorComments: ActorComment[];
}

export interface MovieComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface ActorComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}
