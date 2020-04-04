const express = require("express");
const router = express.Router();
const moment = require("moment");
const clubsList = require('../public/scripts/teams');
const Contact = require('../models/Contact');
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Index route
router.get('/', async function(req, res, next) {
    const posts = await Post.find({}).sort({ "createdAt": -1});
    res.status(200).render('./index', {moment: moment, clubs: clubsList, posts: posts});
})

router.get('/about', function(req, res) {
    const user = checkUser(req.signedCookies['jwt']);
    res.render('./about', {user: user});
})

router.get('/contactus', (req, res) => {
    const user = checkUser(req.signedCookies['jwt']);
    const type = req.query.type;
    res.render('./contactus', {user: user, type: type});
})

router.post('/contactus', async (req, res) => {
    const contact = {
        subject: req.body.subject,
        from: req.body.from,
        content: req.body.content
    }

    await Contact.create(contact, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/contactus?type=success');
        }
    })


})

router.get('/post/:id', async (req, res) => {
    const user = checkUser(req.signedCookies['jwt']);
    const postId = req.params.id;
    const post = await Post.findById(postId).exec();
    res.render('./posts', {post: post, user: user, moment: moment});
})

function checkUser(token){
    if(token){
        return jwt.verify(token, process.env.JWT_TOKEN);
    } else {
        return;
    }
}

(req, res, next) => {
   console.log(res.statusCode);
}

module.exports = router;