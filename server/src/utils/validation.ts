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

export const createActorSchema = Joi.object({
  firstName: Joi.string().max(255).required(),

  lastName: Joi.string().max(255).required(),

  imageURL: Joi.string(),

  public: Joi.boolean().required(),

  movies: Joi.string().required(),
})

export const updateActorSchema = Joi.object({
  firstName: Joi.string().max(255),

  lastName: Joi.string().max(255),

  imageURL: Joi.string(),

  public: Joi.boolean(),

  movies: Joi.string(),
})

export const actorCommentSchema = Joi.object({
  actorId: Joi.string().required(),

  content: Joi.string().required()
})