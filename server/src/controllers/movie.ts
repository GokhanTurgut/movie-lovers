import { RequestHandler } from "express";

import { createMovieSchema, updateMovieSchema } from "../utils/validation";
import { User } from "../entities/User";
import { Movie } from "../entities/Movie";

export const getMovies: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne(userId, { relations: ["movies"] });
    res.json({
      message: "Movies found!",
      user: `${user.firstName} ${user.lastName}`,
      movies: user.movies,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const getMovieById: RequestHandler = async (req, res) => {
  try {
    const movieId = req.params.id;
    const userId = req.user.id;
    const movie = await Movie.findOne(movieId, {
      relations: ["user", "comments"],
    });
    if (!movie) {
      res.status(404).json({ message: "No movie with that id found!" });
      return;
    }
    if (!movie.public && userId != movie.user.id) {
      res
        .status(401)
        .json({ message: "Movie is private and users does not match!" });
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
        likes: movie.likes,
        public: movie.public,
        actors: movie.actors,
        comments: movie.comments,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const postMovie: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne(userId);
    if (!user) {
      res.status(401).json({ message: "User does not found!" });
      return;
    }
    const { error, value } = createMovieSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Validation error!", error });
      return;
    }
    let movie = new Movie();
    movie.title = value.title;
    movie.plot = value.plot;
    movie.release = value.release;
    movie.genre = value.genre;
    movie.director = value.director;
    movie.posterURL = value.posterURL;
    movie.likes = 0;
    movie.public = value.public;
    movie.actors = value.actors;
    movie.user = user;
    await movie.save();
    res.status(201).json({
      message: "Save successful!",
      user: `${user.firstName} ${user.lastName}`,
      movie: {
        id: movie.id,
        title: movie.title,
        plot: movie.plot,
        release: movie.release,
        genre: movie.genre,
        director: movie.director,
        posterURL: movie.posterURL,
        likes: movie.likes,
        public: movie.public,
        actors: movie.actors,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const updateMovieById: RequestHandler = async (req, res) => {
  try {
    const movieId = req.params.id;
    const userId = req.user.id;
    const { error, value } = updateMovieSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Validation error!", error });
      return;
    }
    let movie = await Movie.findOne(movieId, { relations: ["user"] });
    if (!movie) {
      res.status(404).json({ message: "No movie with that id found!" });
      return;
    }
    if (userId != movie.user.id) {
      res.status(401).json({ message: "Users does not match!" });
      return;
    }
    if (value.title) {
      movie.title = value.title;
    }
    if (value.plot) {
      movie.plot = value.plot;
    }
    if (value.release) {
      movie.release = value.release;
    }
    if (value.genre) {
      movie.genre = value.genre;
    }
    if (value.director) {
      movie.director = value.director;
    }
    if (value.posterURL) {
      movie.posterURL = value.posterURL;
    }
    if (value.public) {
      movie.public = value.public;
    }
    if (value.actors) {
      movie.actors = value.actors;
    }
    await movie.save();
    res.json({
      message: "Update successful!",
      user: `${movie.user.firstName} ${movie.user.lastName}`,
      movie: {
        id: movie.id,
        title: movie.title,
        plot: movie.plot,
        release: movie.release,
        genre: movie.genre,
        director: movie.director,
        posterURL: movie.posterURL,
        likes: movie.likes,
        public: movie.public,
        actors: movie.actors,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const deleteMovieById: RequestHandler = async (req, res) => {
  try {
    const movieId = req.params.id;
    const userId = req.user.id;
    const movie = await Movie.findOne(movieId, { relations: ["user"] });
    if (!movie) {
      res.status(404).json({ message: "No movie with that id found!" });
      return;
    }
    if (userId !== movie.user.id) {
      res.status(401).json({ message: "Users does not match!" });
      return;
    }
    const result = await Movie.delete(movieId);
    if (result.affected) {
      res.json({ message: "Deleted!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const likeMovieById: RequestHandler = async (req, res) => {
  try {
    const movieId = req.params.id;
    let movie = await Movie.findOne(movieId);
    if (!movie) {
      res.status(404).json({ message: "No movie with that id found!" });
      return;
    }
    movie.likes = movie.likes + 1;
    await movie.save();
    res.json({
      message: "Movie liked!",
      movie: {
        likes: movie.likes,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};
