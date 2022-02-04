import express from "express";
import { createConnection } from "typeorm";
import passport from "passport";

import { PORT } from "./utils/env";
import authRoutes from "./routes/auth";
import usePassportJwt from "./utils/passport";

const app = express();

app.use(express.json());
app.use(passport.initialize());
usePassportJwt();

app.use("/auth", authRoutes);

app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Hello World!" });
  }
);

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
