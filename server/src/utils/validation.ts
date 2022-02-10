import Joi from "joi";

export const signUpSchema = Joi.object({
  email: Joi.string().email().max(255).required(),

  firstName: Joi.string().required(),

  lastName: Joi.string().required(),

  password: Joi.string().min(6).max(255).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required(),

  password: Joi.string().min(6).max(255).required(),
});

export const passwordSchema = Joi.object({
  oldPassword: Joi.string().allow(""),
  newPassword: Joi.string().min(6).max(255).required(),
});

export const createActorSchema = Joi.object({
  firstName: Joi.string().max(255).required(),

  lastName: Joi.string().max(255).required(),

  imageURL: Joi.string(),

  public: Joi.boolean().required(),

  movies: Joi.string().required(),
});

export const updateActorSchema = Joi.object({
  firstName: Joi.string().max(255),

  lastName: Joi.string().max(255),

  imageURL: Joi.string(),

  public: Joi.boolean(),

  movies: Joi.string(),
});

export const actorCommentSchema = Joi.object({
  actorId: Joi.string().required(),

  content: Joi.string().required(),
});

export const createMovieSchema = Joi.object({
  title: Joi.string().max(255).required(),

  plot: Joi.string().required(),

  release: Joi.date().required(),

  genre: Joi.string().required(),

  director: Joi.string().max(255).required(),

  posterURL: Joi.string().required(),

  public: Joi.boolean().required(),

  actors: Joi.string().required(),
});

export const updateMovieSchema = Joi.object({
  title: Joi.string().max(255),

  plot: Joi.string(),

  release: Joi.date(),

  genre: Joi.string(),

  director: Joi.string().max(255),

  posterURL: Joi.string(),

  public: Joi.boolean(),

  actors: Joi.string(),
});

export const movieCommentSchema = Joi.object({
  movieId: Joi.string().required(),

  content: Joi.string().required(),
});
