const express = require("express");
const router = express.Router();
const controller = require('../../controllers/dashboard/clubController');
const Club = require('../../models/Club');

router.get('/clubs', controller.getIndexClub);

router.get('/clubs/:check',controller.paginatedResults(Club), controller.getClubsCheck);

router.post('/clubs/add', controller.postCreateClub);

router.get('/clubs/edit/:id', controller.getEditClub);

router.post('/clubs/edit/:id', controller.postEditClub);

module.exports = router;