import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;

if (!process.env.PRIVATE_KEY) {
  throw new Error("No private key for JWT found in environment variables!");
}

export const PRIVATE_KEY = process.env.PRIVATE_KEY;
