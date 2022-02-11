import express from "express";

import * as actorController from "../controllers/actor";
import * as actorCommentController from "../controllers/actorComment";

const router = express.Router();

router.get("/", actorController.getActors);

router.get("/:id", actorController.getActorById);

router.post("/", actorController.postActor);

router.delete("/:id", actorController.deleteActorById);

router.put("/:id", actorController.updateActorById);

router.post("/like/:id", actorController.likeActorById);

router.get("/comment/:id", actorCommentController.getCommentById);

router.post("/comment", actorCommentController.postComment);

router.delete("/comment/:id", actorCommentController.deleteCommentById);

router.put("/comment/:id", actorCommentController.updateCommentById);

export default router;
