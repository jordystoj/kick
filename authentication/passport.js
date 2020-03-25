const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
require('dotenv').config();

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
      try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const mobileNumber = req.body.mobileNumber;
        const admin = req.body.admin;

        //Save the information provided by the user to the the database
        const user = await UserModel.create({ email, password, firstName, lastName, mobileNumber, admin });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
  }));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
  }, async (email, password, done) => {
    try {
      //Find the user associated with the email provided by the user
      const user = await UserModel.findOne({ email });
      if( !user ){
        //If the user isn't found in the database, return a message
        return done(null, false, { message : 'User not found'});
      }
      //Validate password and make sure it matches with the corresponding hash stored in the database
      //If the passwords match, it returns a value of true.
      const validate = await user.isValidPassword(password);
      if( !validate ){
        return done(null, false, { message : 'Wrong Password'});
      }
      //Send the user information to the next middleware
      return done(null, user, { message : 'Logged in Successfully'});
    } catch (error) {
      return done(error);
    }
  }));

  const JWTstrategy = require('passport-jwt').Strategy;
  //We use this to extract the JWT sent by the user
  const ExtractJWT = require('passport-jwt').ExtractJwt;

  var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.signedCookies['jwt'];
    return token;
  };
  //This verifies that the token sent by the user is valid
  passport.use(new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey : process.env.JWT_TOKEN,
    jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromUrlQueryParameter('secret_token'), cookieExtractor])
  }, async (token, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));

  