import passport from "passport";
import passportJwt from "passport-jwt";
import googlePassport from "passport-google-oauth20";
import facebookPassport from "passport-facebook";

import { User } from "../entities/User";
import env from "./env";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const GoogleStrategy = googlePassport.Strategy;
const FacebookStrategy = facebookPassport.Strategy;

function usePassport() {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.PRIVATE_KEY,
  };

  passport.use(new JwtStrategy(options, jwtVerify));

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      googleHandler
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: env.FACEBOOK_APP_ID,
        clientSecret: env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ["id", "emails", "name"],
      },
      facebookHandler
    )
  );

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne(id).then((user) => {
      done(null, user);
    });
  });
}

async function jwtVerify(jwt_payload, done) {
  try {
    const user = await User.findOne(jwt_payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err, false);
  }
}

async function googleHandler(accessToken, refreshToken, profile, cb) {
  try {
    const email = profile.emails[0].value;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      let user = new User();
      user.email = email;
      user.firstName = profile.name.givenName;
      user.lastName = profile.name.familyName;
      await user.save();
      return cb(null, user);
    }
    return cb(null, userExists);
  } catch (err) {
    return cb(err, null);
  }
}

async function facebookHandler(accessToken, refreshToken, profile, cb) {
  try {
    const email = profile.emails[0].value;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      let user = new User();
      user.email = email;
      user.firstName = profile.name.givenName;
      user.lastName = profile.name.familyName;
      await user.save();
      return cb(null, user);
    }
    return cb(null, userExists);
  } catch (err) {
    return cb(err, null);
  }
}

export default usePassport;
