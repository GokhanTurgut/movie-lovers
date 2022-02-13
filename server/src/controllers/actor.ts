import { RequestHandler } from "express";

import { createActorSchema, updateActorSchema } from "../utils/validation";
import { User } from "../entities/User";
import { Actor } from "../entities/Actor";

export const getActors: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne(userId, { relations: ["actors"] });
    res.json({
      message: "Actors found!",
      user: `${user.firstName} ${user.lastName}`,
      actors: user.actors,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const getActorById: RequestHandler = async (req, res) => {
  try {
    const actorId = req.params.id;
    const userId = req.user.id;
    const actor = await Actor.findOne(actorId, {
      relations: ["user", "comments", "likes"],
    });
    if (!actor) {
      res.status(404).json({ message: "No actor with that id found!" });
      return;
    }
    if (!actor.public && userId != actor.user.id) {
      res
        .status(401)
        .json({ message: "Actor is private and users does not match!" });
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
        likes: actor.likes,
        public: actor.public,
        movies: actor.movies,
        comments: actor.comments,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const postActor: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne(userId);
    if (!user) {
      res.status(401).json({ message: "User does not found!" });
      return;
    }
    const { error, value } = createActorSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Validation error!", error });
      return;
    }
    let actor = new Actor();
    actor.firstName = value.firstName;
    actor.lastName = value.lastName;
    actor.imageURL = value.imageURL;
    actor.public = value.public;
    actor.movies = value.movies;
    actor.user = user;
    await actor.save();
    res.status(201).json({
      message: "Save successful!",
      user: `${user.firstName} ${user.lastName}`,
      actor: {
        id: actor.id,
        firstName: actor.firstName,
        lastName: actor.lastName,
        imageURL: actor.imageURL,
        likes: actor.likes,
        public: actor.public,
        movies: actor.movies,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const updateActorById: RequestHandler = async (req, res) => {
  try {
    const actorId = req.params.id;
    const userId = req.user.id;
    const { error, value } = updateActorSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Validation error!", error });
      return;
    }
    let actor = await Actor.findOne(actorId, { relations: ["user"] });
    if (!actor) {
      res.status(404).json({ message: "No actor with that id found!" });
      return;
    }
    if (userId != actor.user.id) {
      res.status(401).json({ message: "Users does not match!" });
      return;
    }
    // Logic for only changing the provided data to enable partial changes
    if (value.firstName) {
      actor.firstName = value.firstName;
    }
    if (value.lastName) {
      actor.lastName = value.lastName;
    }
    if (value.imageURL) {
      actor.imageURL = value.imageURL;
    }
    if (value.public !== undefined) {
      actor.public = value.public;
    }
    if (value.movies) {
      actor.movies = value.movies;
    }
    await actor.save();
    res.json({
      message: "Update successful!",
      user: `${actor.user.firstName} ${actor.user.lastName}`,
      actor: {
        id: actor.id,
        firstName: actor.firstName,
        lastName: actor.lastName,
        imageURL: actor.imageURL,
        likes: actor.likes,
        public: actor.public,
        movies: actor.movies,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const deleteActorById: RequestHandler = async (req, res) => {
  try {
    const actorId = req.params.id;
    const userId = req.user.id;
    const actor = await Actor.findOne(actorId, { relations: ["user"] });
    if (!actor) {
      res.status(404).json({ message: "No actor with that id found!" });
      return;
    }
    if (userId !== actor.user.id) {
      res.status(401).json({ message: "Users does not match!" });
      return;
    }
    const result = await Actor.delete(actorId);
    if (result.affected) {
      res.json({ message: "Deleted!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const likeActorById: RequestHandler = async (req, res) => {
  try {
    const actorId = req.params.id;
    const userId = req.user.id;
    let actor = await Actor.findOne(actorId, { relations: ["likes"] });
    if (!actor) {
      res.status(404).json({ message: "No actor with that id found!" });
      return;
    }
    const user = await User.findOne(userId);
    if (!user) {
      res.status(401).json({ message: "User does not found!" });
      return;
    }
    // Logic for checking if user already liked this actor
    // if yes then dislike user instead
    let alreadyLiked = false;
    actor.likes.forEach((user) => {
      if (user.id === userId) alreadyLiked = true;
    });
    if (alreadyLiked) {
      actor.likes = actor.likes.filter((user) => {
        return user.id !== userId;
      });
    } else {
      actor.likes.push(user);
    }
    await actor.save();
    res.json({
      message: "Actor liked!",
      actor: {
        likes: actor.likes,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};
