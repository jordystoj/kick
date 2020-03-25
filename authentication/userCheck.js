const User = require("../models/User");
const passport = require('passport');
const express = require("express");
const router = express.Router();

// Admin 0 --> Website Admin
// Admin 1 --> Club Admin
// Admin 2 --> Referee
// Admin 3 --> Coach
// Admin 4 --> User

function isWebsiteAdmin(req, res, next){
    // Gives access to only the website administrators
    if(req.isAuthenticated && req.user.admin === 0){
        return next();
    } 
    res.redirect('/signin');
}

function isClubAdmin(req, res, next){
    // Gives access to website administrator to the club admin protected routes
    if(req.isAuthenticated && req.user.admin === 1 || req.isAuthenticated && req.user.admin === 0){
        return next();
    } 
    res.redirect('/signin');
}

function isReferee(req, res, next){
    // Gives access to website administrator to the referee proteced routes
    if(req.isAuthenticated && req.user.admin === 2 || req.isAuthenticated && req.user.admin === 0){
        return next();
    } 
    res.redirect('/signin');
}

function isCoach(req, res, next){
    // Gives access to website administrator to the coach protected routes
    if(req.isAuthenticated && req.user.admin === 3 || req.isAuthenticated && req.user.admin === 0){
        return next();
    } 
    res.redirect('/signin');
}

function isUser(req, res, next){
    // Gives access to website administrator to the user protected routes
    if(req.isAuthenticated && req.user.admin === 4 || req.isAuthenticated && req.user.admin === 0){
        return next();
    } 
    res.redirect('/signin');
}

module.exports = {
    isWebsiteAdmin,
    isClubAdmin,
    isReferee,
    isCoach,
    isUser
}