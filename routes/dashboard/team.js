const express = require("express");
const router = express.Router();
const controller = require('../../controllers/dashboard/teamController');


router.get('/teams', controller.getIndexTeams);

router.get('/teams/:check', controller.getTeamsCheck);

router.post('/teams/add', controller.postTeamsAdd);

module.exports = router;