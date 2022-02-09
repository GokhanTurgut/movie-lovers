import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../entities/User";
import env from "../utils/env";
import { signUpSchema, loginSchema } from "../utils/validation";

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { error, value } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation error!", error });
    }
    const { email, firstName, lastName, password } = value;

    const sameEmail = await User.findOne({ email });
    if (sameEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    let user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = hashedPass;
    await user.save();
    res.status(201).json({
      message: "Save successful!",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation error!", error });
    }
    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Email not found!" });
      return;
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      res.status(401).json({ message: "Wrong password!" });
      return;
    }
    const token = jwt.sign({ id: user.id }, env.PRIVATE_KEY, {
      expiresIn: "1d",
    });
    res.json({ message: "Login successful!", token: token, userId: user.id });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const oauthLogin: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  const token = jwt.sign({ id: userId }, env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
  res.redirect(
    `${env.CLIENT_URL}/signin/success?userId=${userId}&token=${token}`
  );
};
