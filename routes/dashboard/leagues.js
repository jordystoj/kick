const express = require("express");
const router = express.Router();
const League = require('../../models/League');
const LeagueController = require("../../controllers/dashboard/leagueController");

router.get('/leagues', LeagueController.getLeaguesDashboard);

router.get('/leagues/:check', LeagueController.checkLeagues)

router.post('/league/add', LeagueController.createLeague);

router.get('/leagues/:check/:leagueid', LeagueController.editLeagueFormGet);

router.post('/leagues/edit/:leagueid', LeagueController.editLeagueFormPost);


module.exports = router;