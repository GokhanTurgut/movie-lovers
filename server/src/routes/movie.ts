import express from "express";

import * as movieController from "../controllers/movie";
import * as movieCommentController from "../controllers/movieComment";

const router = express.Router();

router.get("/", movieController.getMovies);

router.get("/:id", movieController.getMovieById);

router.post("/", movieController.postMovie);

router.delete("/:id", movieController.deleteMovieById);

router.put("/:id", movieController.updateMovieById);

router.post("/like/:id", movieController.likeMovieById);

router.post("/comment", movieCommentController.postComment);

router.delete("/comment/:id", movieCommentController.deleteCommentById);

router.put("/comment/:id", movieCommentController.updateCommentById);

export default router;
