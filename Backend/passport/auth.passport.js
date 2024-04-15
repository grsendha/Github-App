import passport from "passport";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "../config/serverConfig.js";
import { Strategy as GitHubStrategy } from "passport-github2";

import User from "../models/user.model.js";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ username: profile.username });
      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          username: profile.username,
          avatarUrl: profile.photos[0].value,
          likedBy: [],
          profileUrl: profile.profileUrl,
        });
        await newUser.save();
        return done(null, newUser);
      } else {
        return done(null, user);
      }
    }
  )
);
