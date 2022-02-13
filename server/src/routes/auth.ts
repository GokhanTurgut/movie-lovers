import express from "express";
import passport from "passport";

import { signUp, login, oauthLogin } from "../controllers/auth";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

// Google auth page route to redirect users to
// Google for authentication with requested data
// as profile and email data.
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Callback route for Google to redirect to
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  oauthLogin
);

// Facebook auth page route to redirect users to
// Facebook for authentication with requested data
// as default one plus user email.
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
  })
);

// Callback route for Facebook to redirect to
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  oauthLogin
);

export default router;
