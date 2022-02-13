import { RequestHandler } from "express";
import bcrypt from "bcrypt";

import { passwordSchema } from "../utils/validation";
import { User } from "../entities/User";

export const getUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne(userId, {
      relations: [
        "movies",
        "actors",
        "movieComments",
        "actorComments",
        "likedMovies",
        "likedActors",
      ],
    });
    res.json({
      message: "User found!",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        movies: user.movies,
        actors: user.actors,
        movieComments: user.movieComments,
        actorComments: user.actorComments,
        likedMovies: user.likedMovies,
        likedActors: user.likedActors,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const changePassword: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { error, value } = passwordSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Validation error!", error });
      return;
    }
    const user = await User.findOne(userId);
    // If user has already created a password then check if the
    // old password and provided one matches.
    if (user.password !== null) {
      const doMatch = await bcrypt.compare(value.oldPassword, user.password);
      if (!doMatch) {
        res.status(401).json({ message: "Wrong old password!" });
        return;
      }
    }
    // If it's the first password of user because of sign in with Google or
    // Facebook then we can proceed to changing the password.
    const hashedPass = await bcrypt.hash(value.newPassword, 10);
    user.password = hashedPass;
    await user.save();
    res.json({
      message: "Password change successful!",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};
