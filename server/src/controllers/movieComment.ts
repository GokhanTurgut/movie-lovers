import { RequestHandler } from "express";

import { movieCommentSchema } from "../utils/validation";
import { User } from "../entities/User";
import { Movie } from "../entities/Movie";
import { MovieComment } from "../entities/MovieComment";

export const postComment: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { error, value } = movieCommentSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Validation error!", error });
      return;
    }
    const user = await User.findOne(userId);
    const movie = await Movie.findOne(value.movieId);
    if (!movie) {
      res.status(404).json({ message: "No movie with that id found!" });
      return;
    }
    let comment = new MovieComment();
    comment.author = `${user.firstName} ${user.lastName}`;
    comment.content = value.content;
    comment.movie = movie;
    comment.user = user;
    await comment.save();
    res.json({
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
    const comment = await MovieComment.findOne(commentId, {
      relations: ["user"],
    });
    if (userId !== comment.user.id) {
      res.status(401).json({ message: "Users does not match!" });
      return;
    }
    const result = await MovieComment.delete(commentId);
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
    let comment = await MovieComment.findOne(commentId, {
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
