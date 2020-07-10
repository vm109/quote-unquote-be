const passport = require('passport')
const GoogleStrategy  = require('passport-google-oauth20')
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '499716415929-8lg40tnh8v66iprpvpahqh2k8a0c8hub.apps.googleusercontent.com',
    clientSecret: 'y9sTx4kEMtq6-ZALM7Ygnj1N',
    callbackURL: 'http://localhost:8080/google/callback'
},
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile)
  }
))