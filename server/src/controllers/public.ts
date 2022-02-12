import { RequestHandler } from "express";

import { Movie } from "../entities/Movie";
import { Actor } from "../entities/Actor";

export const getSharedMovies: RequestHandler = async (req, res) => {
  try {
    const movies = await Movie.find({ public: true });
    res.json({
      message: "Shared movies found!",
      movies: movies,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const getSharedMovieById: RequestHandler = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findOne(
      { id: movieId, public: true },
      {
        relations: ["user", "comments", "likes"],
      }
    );
    if (!movie) {
      res.status(404).json({ message: "No movie with that id found!" });
      return;
    }
    res.json({
      message: "Movie found!",
      user: `${movie.user.firstName} ${movie.user.lastName}`,
      movie: {
        id: movie.id,
        title: movie.title,
        plot: movie.plot,
        release: movie.release,
        genre: movie.genre,
        director: movie.director,
        posterURL: movie.posterURL,
        public: movie.public,
        actors: movie.actors,
        likes: movie.likes,
        comments: movie.comments,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const getSharedActors: RequestHandler = async (req, res) => {
  try {
    const actors = await Actor.find({ public: true });
    res.json({
      message: "Shared actors found!",
      actors: actors,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const getSharedActorById: RequestHandler = async (req, res) => {
  try {
    const actorId = req.params.id;
    const actor = await Actor.findOne(
      { id: actorId, public: true },
      {
        relations: ["user", "comments", "likes"],
      }
    );
    if (!actor) {
      res.status(404).json({ message: "No actor with that id found!" });
      return;
    }
    res.json({
      message: "Actor found!",
      user: `${actor.user.firstName} ${actor.user.lastName}`,
      actor: {
        id: actor.id,
        firstName: actor.firstName,
        lastName: actor.lastName,
        imageURL: actor.imageURL,
        public: actor.public,
        movies: actor.movies,
        likes: actor.likes,
        comments: actor.comments,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};
