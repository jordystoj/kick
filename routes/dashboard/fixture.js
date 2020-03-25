const express = require("express");
const router = express.Router();
const Team = require("../../models/Team");
const Fixture = require("../../models/Fixture");
const controller = require('../../controllers/dashboard/fixturesController');

// Index route for the teams dashboard page
router.get('/fixtures', controller.getIndexFixture)

// Add team routes
router.get('/fixtures/:check', controller.getIndexFixtureCheck);

// Add team routes
router.post('/fixtures/add', controller.postAddFixture);

// Static Fixture Route
router.get('/fixtures/update/:fixtureId', controller.getLiveFixtureUpdate);

// Live Fixture Route
router.get('/fixtures/live/update/:fixtureId', controller.getLiveFixtureUpdate);

// Start Match
router.post('/fixtures/start/match', controller.postStartMatch);

router.post('/fixtures/getTime', controller.getTime);

router.post('/fixtures/updateTime', controller.updateTime);

// Because club id's are known and also league; a team can be found
/*async function findTeams(homeTeam, awayTeam, leagueid) {
    
    // Finding all the teams in one league
    const teams = await Team.find({ leagueid: leagueid });

    // Declaring a home team and away team
    var homeTeamId;
    var awayTeamId;
    
    // Looping through to find the away and home team
    for (var i = 0; i < teams.length; i++) {
        if (teams[i]._id == homeTeam) {
            homeTeam = await Team.findById(homeTeamid);
        }
        else if (teams[i]._id == awayTeamid) {
            awayTeam = await Team.findById(awayTeamid);
        }
    }
}*/



module.exports = router;