import express from "express";
import { createConnection } from "typeorm";
import passport from "passport";

import env from "./utils/env";
import authRoutes from "./routes/auth";
import actorRoutes from "./routes/actor";
import movieRoutes from "./routes/movie";
import usePassport from "./utils/passport";
import { User } from "./entities/User";

const app = express();

app.use(express.json());
app.use(passport.initialize());
usePassport();

app.use("/auth", authRoutes);
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

app.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

createConnection().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT}`);
  });
});
