const express = require("express");
const router = express.Router();
const moment = require("moment");
const clubsList = require('../public/scripts/teams');
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Index route
router.get('/', async function(req, res, next) {
    res.render('./index', {moment: moment, clubs: clubsList});
})

router.get('/about', function(req, res) {
    const user = checkUser(req.signedCookies['jwt']);
    res.render('./about', {user: user});
})

router.get('/post/:id', async (req, res) => {
    const user = checkUser(req.signedCookies['jwt']);
    const postId = req.params.id;
    const post = await Post.findById(postId).exec();
    res.render('./posts', {post: post, user: user, moment: moment});
})

function checkUser(token){
    return jwt.verify(token, process.env.JWT_TOKEN);
}

module.exports = router;