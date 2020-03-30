const League = require("../../models/League");
const Club = require("../../models/Club");
const Team = require("../../models/Team");
const Fixture = require("../../models/Fixture");
const MatchEvent = require('../../models/MatchEvents');
const moment = require('moment');
const Player = require('../../models/Player');

getIndexFixture = async (req, res, next) => {
    // Getting all fixtures, leagues, clubs and teams from the db
    const fixtures = await Fixture.find({});
    const leagues = await League.find({});
    const clubs = await Club.find({});
    const teams = await Team.find({});

    // Initialise arrays for homeClubs and homeTeams
    let homeTeams = [];
    let homeClubs = [];
    let awayTeams = [];
    let awayClubs = [];
    // We have home team id in fixture
    // A team has a club and league id 
    // Use the teams clubid to find the club info
    for (let i = 0; i < fixtures.length; i++) {
        homeTeams.push(await Team.findById({ _id: fixtures[i].homeTeam }))
        awayTeams.push(await Team.findById({ _id: fixtures[i].awayTeam }))
    }

    for (let j = 0; j < homeTeams.length; j++) {
        homeClubs.push(await Club.findById({ _id: homeTeams[j].clubid }))
        awayClubs.push(await Club.findById({ _id: awayTeams[j].clubid }))
    }


    res.render('./dashboard/fixtures', 
        {
            leagues: leagues, 
            clubs, clubs, 
            teams: teams, 
            fixtures: fixtures, 
            homeClubs: homeClubs, 
            awayClubs: awayClubs,
            moment: moment
        }
    )
}

// Fixtures with a check
getIndexFixtureCheck = async (req, res, next) => {
    const check = req.params.check;
    const leagues = await League.find({});
    const clubs = await Club.find({});
    const teams = await Team.find({});
    const fixtures = await Fixture.find({});


    // Objects for storing data sent to client
    // let dataObjects = {};
    // Variable where error is going to be stored
    let statusText;
    let statusCode = req.query.status;

    // When there is no err query
    if(!req.query.status){
        dataObjects = { check: check, leagues: leagues, clubs, clubs, teams: teams, fixtures: fixtures}
    }

    // When somone uses to identical team ids for home and away
    if(req.query.status === '442'){
        statusText = "Error: You can't have two of the same teams in one fixture. Please retry"
        dataObjects = {check: check, leagues: leagues, clubs, clubs, teams: teams, fixtures: fixtures, statusText: statusText, statusCode: statusCode};
    }

    if(req.query.status === '433'){
        statusText = "Succes: Fixture Created"
        dataObjects = {check: check, leagues: leagues, clubs, clubs, teams: teams, fixtures: fixtures, statusText: statusText, statusCode: statusCode};
    }

    if(req.query.status === '4212'){
        statusText = "Error: Try again, something went wrong while trying to add fixture"
        dataObjects = {check: check, leagues: leagues, clubs, clubs, teams: teams, fixtures: fixtures, statusText: statusText, statusCode: statusCode};
    }


    res.render('./dashboard/fixtures', dataObjects);


}

postAddFixture = async (req, res, next) => {
    //Get all the values from the form + leagueid
    const leagueid = req.body.league;
    const date = req.body.date;
    const round = req.body.round;
    // Club Id are given
    const homeTeamId = req.body.homeTeam;
    const awayTeamId = req.body.awayTeam;
    const kickOffTime = req.body.kickofftime;

    const homeTeam = await Team.findById(homeTeamId).exec();

    // find the club object for the home team
    const club = await Club.findById(homeTeam.clubid);
    //Thus find the stadium its being played at
    const venue = club.venueName;


    // An object for adding a new fixture
    const newFixture = {
        leagueId: leagueid,
        date: date,
        round: round,
        homeTeam: homeTeamId, // Only put in the id of the teams
        awayTeam: awayTeamId, // Only put in the id of the teams
        venue: venue,
        kickOffTime: kickOffTime,
        status: "NS"
    };
    
    //Create the fixture
    if(homeTeamId !== awayTeamId){
        Fixture.create(newFixture, function (err) {
            if (err) {
                console.log(err)
                res.redirect("/dashboard/fixtures/add?status=4212");
            }
            else {
                res.redirect("/dashboard/fixtures/add?status=433");
            }
        });
    } else {
        res.redirect("/dashboard/fixtures/add?status=442");
    }
}

getLiveFixtureUpdate = async (req, res) => {
    const fixtureId = req.params.fixtureId;
    const fixture = await Fixture.findById(fixtureId);

    // Get home and away clubs
    const homeClub = await Club.findById((await Team.findById(fixture.homeTeam)).clubid);
    const awayClub = await Club.findById((await Team.findById(fixture.awayTeam)).clubid);

    // Get teams id 
    const homeTeamId = fixture.homeTeam;
    const awayTeamId = fixture.awayTeam;

    const matchEventsArray = fixture.matchEvents

    // Match Events Length
    const matchEventsLength = matchEventsArray.length;

    // Goals
    const homeTeamGoals = [];
    const awayTeamGoals = [];
    let fullEventsArray = [];
    for (let i = 0; i < matchEventsLength; i++) {
        fullEventsArray.push(await MatchEvent.find({_id: matchEventsArray[i]}));

        if(fullEventsArray[i][0].teamId == homeTeamId){
            homeTeamGoals.push(fullEventsArray[i][0]);
        } else if( fullEventsArray[i][0].teamId == awayTeamId){
            awayTeamGoals.push(fullEventsArray[i][0]);
        }
    }

    const elapsed = await Fixture.findById(fixtureId).elapsed;

    // Make an array of players from each team
    const homePlayers = await Player.find({ teamid: homeTeamId }).exec();
    const awayPlayers = await Player.find({ teamid: awayTeamId }).exec();

    res.render('./fixtures/live/index', 
        {
            fixture: fixture, 
            homeClub: homeClub, 
            awayClub: awayClub, 
            homeTeamId: homeTeamId, 
            awayTeamId: awayTeamId,
            homeTeamGoals: homeTeamGoals,
            awayTeamGoals: awayTeamGoals,
            elapsed: elapsed,
            homePlayers: homePlayers,
            awayPlayers: awayPlayers
        });
}

// Post Request
// Starting a match
postStartMatch = async (req, res, next) => {
    // id of the fixture
    const fixtureId = req.body.fixtureId;

    // Change fixture status to First Half and time elapsed 0
    const updateFixture = { status: "FH", elapsed: 0 };

    // Query to find the fixture
    const updateId = { _id: fixtureId };

    // Update the fixture
    await Fixture.updateOne(updateId, updateFixture, async (err, fixture) => {
        if(err){
            console.log(err);
        } else {
            // Send the entire updated fixture to client
            res.send(await Fixture.findById(fixtureId));
        }
    })
}

// Updating elapsed time for the fixture
updateTime = async (req, res) => {
    // Get fixture id from the body
    const fixtureId = req.body.fixtureId;

    // Get this specific fixture
    const fixture = await Fixture.findById(fixtureId);

    // Elapsed time of the current fixture
    const elapsed = fixture.elasped

    // Update the time by 1 every minute
    const updateElapsed = elapsed + 1;
    
    // Updated data: Elapsed time
    const updateData = { elasped: updateElapsed };

    // Query to find the fixture
    const updateQuery = { _id: fixtureId };

    // Update the fixture
    await Fixture.updateOne(updateQuery, updateData, (err) => {
        if(err){
            console.log(err);
        } else {
            // Send elapsed time to the client
            res.send(fixture);
        }
    })
}

getTime = async (req, res) => {
    // const fixture = findFixture(req.params.fixtureId);
    const fixtureId = req.body.fixtureId;
    const fixture = await Fixture.findById(fixtureId);
    const elapsed = fixture.elasped;

    res.send(fixture);
}

findFixture = async (fixtureId) => {
    const fixture = await Fixture.findById(fixtureId);

    return fixture
}

addGoal = async (req, res, next) => {
    const fixtureId = req.params.fixtureId;
    const updateQuery = { _id: fixtureId }

    const goal = {
        elapsed: req.body.elapsed,
        teamId: req.body.teamId,
        playerId: req.body.playerId,
        assistId: req.body.assistId,
        type: req.body.type,
        detail: req.body.detail,
        comments: req.body.comments
    }

    await MatchEvent.create(goal, async function(err, event){
        if(err){
            // Render Error Page
            throw err;
        } else {
            await Fixture.updateOne(updateQuery, {"$push": {"matchEvents": event._id}}).exec((err, fixture)=>{
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/dashboard/fixtures/live/update/"+fixtureId)
                }
            })
        }
    })
}

module.exports = {
    getIndexFixture,
    getIndexFixtureCheck,
    postAddFixture,
    getLiveFixtureUpdate,
    postStartMatch,
    updateTime,
    getTime,
    addGoal
}