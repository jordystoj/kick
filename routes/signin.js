const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../models/User');
const Login = require('../models/Login');
const ClubAdmin = require('../models/ClubAdmin');

// Index route
router.get('/signin', function(req, res,) {
    res.render('./signin')
})

router.post('/signin', async (req, res, next) => {
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

            // Find club admin to make sure they are active admin
            const clubadmin = await ClubAdmin.find({ userId: user._id });

            // Renders an authorization page
            if (user.admin === 1 && clubadmin[0].active === false){
                return res.redirect('/club/admin?authorized=no');
            }

            req.login(user, { session : false }, async (error) => {
                if( error ) return next(error)
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the email and id
                const body = { _id : user._id, email : user.email, admin: user.admin, };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ user : body, expiresIn: "6h"}, process.env.JWT_TOKEN);
                //Send back the token to the user
                //   return res.json({ token });

                if(user.admin === 0){
                    return res
                        .cookie('jwt', token, {maxAge: 21600000, signed: true, secret: "secret"})
                        .redirect('/dashboard');
                } else if (user.admin === 4){
                    return res
                        .cookie('jwt', token, {maxAge: 21600000, signed: true, secret: "secret"})
                        .redirect('/user/dashboard');
                } else if (user.admin === 1 && clubadmin[0].active === true){
                    return res
                        .cookie('jwt', token, {maxAge: 21600000, signed: true, secret: "secret"})
                        .cookie('userId', user._id, {maxAge: 21600000, signed: true, secret: "secret"})
                        .cookie('clubId', clubadmin[0].clubId, {maxAge: 21600000, signed: true, secret: "secret"})
                        .redirect('/clubs/dashboard');
                }
                
            });     
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
  });

module.exports = router;