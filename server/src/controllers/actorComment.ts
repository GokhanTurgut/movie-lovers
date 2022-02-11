import { RequestHandler } from "express";

import { actorCommentSchema } from "../utils/validation";
import { User } from "../entities/User";
import { Actor } from "../entities/Actor";
import { ActorComment } from "../entities/ActorComment";

export const getCommentById: RequestHandler = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    const comment = await ActorComment.findOne(commentId, {
      relations: ["actor", "user"],
    });
    if (!comment) {
      res.status(404).json({ message: "No comment with that id found!" });
      return;
    }
    if (userId != comment.user.id) {
      res.status(401).json({ message: "Users does not match!" });
      return;
    }
    res.json({
      message: "Comment found!",
      user: `${comment.user.firstName} ${comment.user.lastName}`,
      comment: {
        id: comment.id,
        author: comment.author,
        content: comment.content,
        createdAt: comment.createdAt,
        actorId: comment.actor.id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const postComment: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { error, value } = actorCommentSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Validation error!", error });
      return;
    }
    const user = await User.findOne(userId);
    const actor = await Actor.findOne(value.actorId);
    if (!actor) {
      res.status(404).json({ message: "No actor with that id found!" });
      return;
    }
    let comment = new ActorComment();
    comment.author = `${user.firstName} ${user.lastName}`;
    comment.content = value.content;
    comment.actor = actor;
    comment.user = user;
    await comment.save();
    res.status(201).json({
      message: "Comment saved!",
      comment: {
        id: comment.id,
        author: comment.author,
        content: comment.content,
        createdAt: comment.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const deleteCommentById: RequestHandler = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    const comment = await ActorComment.findOne(commentId, {
      relations: ["user"],
    });
    if (userId !== comment.user.id) {
      res.status(401).json({ message: "Users does not match!" });
      return;
    }
    const result = await ActorComment.delete(commentId);
    if (result.affected) {
      res.json({ message: "Deleted!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const updateCommentById: RequestHandler = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    let comment = await ActorComment.findOne(commentId, {
      relations: ["user"],
    });
    if (!comment) {
      res.status(404).json({ message: "No comment with that id found!" });
      return;
    }
    if (userId != comment.user.id) {
      res.status(401).json({ message: "Users does not match!" });
      return;
    }
    if (req.body.content) {
      comment.content = req.body.content;
    }
    await comment.save();
    res.json({
      message: "Comment updated!",
      comment: {
        id: comment.id,
        author: comment.author,
        content: comment.content,
        createdAt: comment.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};
