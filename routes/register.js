const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const Login = require('../models/Login');
const Club = require('../models/Club');
const ClubAdmin = require('../models/ClubAdmin');


// Index route ~ For Users = 4
router.get('/register', function(req, res) {
    res.render('./register/register')
})

// Index route ~ For club admins; admin = 1
router.get('/register/clubadmin', async function(req, res) {
  const clubs = await Club.find({});
  res.render('./register/registerClubAdmin', {clubs: clubs});
})

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/register', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {  
    try {
        if(err || !user){
          const error = new Error('An Error occurred')
          return next(error);
        }

        Login.create({ userId: user._id, admin: user.admin }, (err, login) => {
          if(err) {
            console.log(err);
          }
        });

        req.login(user, { session : false }, async (error) => {
        
          if( error ) return next(error)
        
          const body = { _id : user._id, email : user.email };

          const token = jwt.sign({ user : body }, process.env.JWT_TOKEN);
          
          // return res
          //         .cookie('jwt', token, {maxAge: 360000, signed: true, secret: "secret"})
          //         .redirect("/dashboard?admin="+req.body.admin); // Look at where this goes
          if(user.admin === 0){
            return res
              .cookie('jwt', token, {maxAge: 21600000, signed: true, secret: "secret"})
              .redirect('/dashboard');
          } else if(user.admin === 1){
            ClubAdmin.create({ clubId: req.body.club, yearStarted: req.body.yearStarted , userId: user._id });
            return res
              .redirect('/club/admin?authorized=no');
          }
        });     
    } catch (error) {
        return next(error);
    }
  })(req, res, next);
});

router.get('/logout', async(req, res) => {
  res.clearCookie('jwt');
  req.logout();
  res.redirect('/');
})

module.exports = router;