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

usePassport();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/public", publicRoutes);
app.use(
  "/actor",
  passport.authenticate("jwt", { session: false }),
  actorRoutes
);
app.use(
  "/movie",
  passport.authenticate("jwt", { session: false }),
  movieRoutes
);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoutes);

createConnection().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT}`);
  });
});
