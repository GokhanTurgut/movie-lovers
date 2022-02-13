import express from "express";
import { createConnection } from "typeorm";
import passport from "passport";
import cors from "cors";

import env from "./utils/env";
import usePassport from "./utils/passport";
import authRoutes from "./routes/auth";
import publicRoutes from "./routes/public";
import actorRoutes from "./routes/actor";
import movieRoutes from "./routes/movie";
import userRoutes from "./routes/user";

const app = express();

// My helper function to configure passport
usePassport();
// Parsing json data
app.use(express.json());
// Cross Origin policy handler to allow from any origin
app.use(cors());
// Initialize passport
app.use(passport.initialize());

// Authentication route
app.use("/auth", authRoutes);
// Public routes no auth required
app.use("/public", publicRoutes);
// Actor route to handle actor related requests, auth required
app.use(
  "/actor",
  passport.authenticate("jwt", { session: false }),
  actorRoutes
);
// Movie route to handle movie related requests, auth required
app.use(
  "/movie",
  passport.authenticate("jwt", { session: false }),
  movieRoutes
);
// User route to handle user related requests, auth required
app.use("/user", passport.authenticate("jwt", { session: false }), userRoutes);

// Create connection to database with TypeORM using ormconfig.js file
// in the root directory then start listening on the chosen port
createConnection().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT}`);
  });
});
