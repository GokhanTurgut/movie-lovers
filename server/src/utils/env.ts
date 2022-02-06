import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

if (!process.env.PRIVATE_KEY) {
  throw new Error("No private key for JWT found in environment variables!");
}

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("No Google client id found in environment variables!");
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("No Google client secret found in environment variables!");
}

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!process.env.FACEBOOK_APP_ID) {
  throw new Error("No Google client secret found in environment variables!");
}

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;

if (!process.env.FACEBOOK_APP_SECRET) {
  throw new Error("No Google client secret found in environment variables!");
}

const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

export default {
  PORT,
  PRIVATE_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
};
