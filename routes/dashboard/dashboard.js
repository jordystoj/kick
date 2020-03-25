const express = require("express");
const router = express.Router();
const countryList = require('../../public/scripts/countryList');
const teamsList = require("../../public/scripts/teams");
const moment = require("moment");
const Player = require("../../models/Player");
const Team = require("../../models/Team");
const Fixture = require("../../models/Fixture");
const Club = require("../../models/Club");
const League = require("../../models/League");

// Index route
router.get('/', async function(req, res,) {
    let fixtureCount;
    let teamCount;
    let clubCount;
    let playerCount;
    let lastTwoFixturesArray = await Fixture.find({}, null, {limit: 2, sort: {'_id': -1}});
    let lastThreePlayersArray = await Player.find({}, null, {limit: 3, sort: {'_id': -1}});
    
    // let fixtureOne = await createFixtureOne(lastTwoFixturesArray[0]);
    // let fixtureTwo = await createFixtureTwo(lastTwoFixturesArray[1]);

    await Fixture.countDocuments({}, async function( err, count){
        if(err){
            console.error(err);
        } else {
            fixtureCount = await count;
        }
    })

    await Team.countDocuments({}, async function( err, count){
        if(err){
            console.error(err);
        } else {
            teamCount = await count;
        }
    })

    await Club.countDocuments({}, async function( err, count){
        if(err){
            console.error(err);
        } else {
            clubCount = await count;
        }
    })

    await Player.countDocuments({}, async function( err, count){
        if(err){
            console.error(err);
        } else {
            playerCount = await count;
        }
    })

    res.render('./dashboard/dashboard', 
        {
            players: lastThreePlayersArray,
            // fixtureTwo, fixtureTwo,
            moment: moment, 
            // fixtureOne, fixtureOne, 
            fixtureCount: fixtureCount, 
            teamCount: teamCount, 
            clubCount: clubCount, 
            playerCount: playerCount
        });

})

// async function createFixtureOne(lfta){
//     // const homeTeam = await Club.findById(mongoose.Types.ObjectId(lfta.homeTeamId));
//     const homeClub = await Club.findById(lfta.homeTeamId);
//     const awayClub = await Club.findById(lfta.awayTeamId);
//     const league = await League.findById(lfta.leagueid);
//     const date = lfta.date;
//     const round = lfta.round;
//     const stadium = lfta.stadium;
//     const kickOffTime = lfta.kickOffTime;

//     const fixtureObj = {
//         homeClub: homeClub,
//         awayClub: awayClub,
//         league: league,
//         date: date,
//         round: round,
//         stadium: stadium,
//         kickOffTime: kickOffTime
//     }

//     return fixtureObj;
// }

// async function createFixtureTwo(lfta){
//     // const homeTeam = await Club.findById(mongoose.Types.ObjectId(lfta.homeTeamId));
//     const homeClub = await Club.findById(lfta.homeTeamId);
//     const awayClub = await Club.findById(lfta.awayTeamId);
//     const league = await League.findById(lfta.leagueid);
//     const date = lfta.date;
//     const round = lfta.round;
//     const stadium = lfta.stadium;
//     const kickOffTime = lfta.kickOffTime;

//     const fixtureObj = {
//         homeClub: homeClub,
//         awayClub: awayClub,
//         league: league,
//         date: date,
//         round: round,
//         stadium: stadium,
//         kickOffTime: kickOffTime
//     }

//     return fixtureObj;
// }


module.exports = router;