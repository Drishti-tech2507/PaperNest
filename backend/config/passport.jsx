const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_SECRET",
      callbackURL: "/api/auth/google/callback",
    },
    async (_, __, profile, done) => {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        user = await User.create({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          profileImage: profile.photos[0].value,
        });
      }

      return done(null, user);
    }
  )
);

module.exports = passport;