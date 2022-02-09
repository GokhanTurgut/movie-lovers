import express from "express";
import passport from "passport";

import { signUp, login, oauthLogin } from "../controllers/auth";

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
  oauthLogin
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  oauthLogin
);

export default router;
