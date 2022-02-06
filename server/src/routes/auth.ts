import express from "express";
import passport from "passport";

import { signUp, login } from "../controllers/auth";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.json({ message: "Google Succesfull!" });
  }
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.json({ message: "Facebook Succesfull!" });
  }
);

export default router;
