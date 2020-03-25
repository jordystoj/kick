const express = require("express");
const router = express.Router();
const controller = require('../../controllers/dashboard/clubController');

router.get('/clubs', controller.getIndexClub);

router.get('/clubs/:check', controller.getClubsCheck);

router.post('/clubs/add', controller.postCreateClub);

router.get('/clubs/edit/:id', controller.getEditClub);

router.post('/clubs/edit/:id', controller.postEditClub);

module.exports = router;