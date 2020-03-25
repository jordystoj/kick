const express = require("express");
const router = express.Router();
const moment = require("moment");
const clubsList = require('../public/scripts/teams');
const User = require('../models/User');

// Index route
router.get('/', async function(req, res, next) {
    // const user = await User.findById(req.user._id);
    console.log(req.signedCookies);
    res.render('./index', {moment: moment, clubs: clubsList});
})

module.exports = router;