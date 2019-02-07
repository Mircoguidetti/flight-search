const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { googleClientSecret, googleClientID } = require('../config/index').keys;
const User = require('../models/user');


// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
  });

// Deserialize user
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
  

passport.use(
    new GoogleStrategy(
      {
        callbackURL: '/auth/google/callback',
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          const user = await new User({
            googleId: profile.id,
            displayName: profile.displayName
          }).save();
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );