import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2'


// const  GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
import dotenv from 'dotenv'
dotenv.config()
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_id,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null,profile)
  }
));

passport.serializeUser((user,done)=>{
done(null,user )
})

passport.deserializeUser((user,done)=>{
done(null,user)
})

export default passport