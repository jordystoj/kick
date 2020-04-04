const express = require("express");
const router = express.Router();
const controller = require('../../controllers/leagues/leagueController');

router.get('/', controller.getIndex);


module.exports = router;