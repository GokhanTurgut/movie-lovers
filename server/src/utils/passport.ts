import passport from "passport";
import passportJwt from "passport-jwt";

import { User } from "../entities/User";
import { PRIVATE_KEY } from "./env";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

function usePassportJwt() {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PRIVATE_KEY,
  };
  
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
  
  passport.use(new JwtStrategy(options, jwtVerify));
}

export default usePassportJwt;