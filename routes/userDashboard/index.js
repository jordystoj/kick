const express = require("express");
const router = express.Router();
const userDashboardController = require('../../controllers/userDashboard/indexController')
const moment = require('moment');

router.get('/dashboard', userDashboardController.getIndexUserDashboard);

router.get('/posts', userDashboardController.getPostsPage);

router.get('/posts/create', userDashboardController.getPostCreateForm);

// Create a new article/post (tip = these routes have a /user in front; the form needs it but not the route)
router.post('/posts/create', userDashboardController.saveNewPost);

// Allows for players to be searched when looked up
router.post('/player/search', userDashboardController.ajaxPlayerSearch);

// Allows for players to be searched when looked up
router.post('/team/search', userDashboardController.ajaxTeamSearch);

// Allows for players to be searched when looked up
router.post('/club/search', userDashboardController.ajaxClubSearch);

// Allows for players to be searched when looked up
router.post('/league/search', userDashboardController.ajaxLeagueSearch);

module.exports = router;