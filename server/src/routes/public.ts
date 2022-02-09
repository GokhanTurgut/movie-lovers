import express from "express";

import * as publicController from "../controllers/public";

const router = express.Router();

router.get("/movie", publicController.getSharedMovies);

router.get("/movie/:id", publicController.getSharedMovieById);

router.get("/actor", publicController.getSharedActors);

router.get("/actor/:id", publicController.getSharedActorById);

export default router;
