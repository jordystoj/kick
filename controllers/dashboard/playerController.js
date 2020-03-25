const Player = require("../../models/Player");
const countryList = require('../../public/scripts/countryList');
const teamsList = require("../../public/scripts/teams");
const Team = require('../../models/Team');

// Get the index players page for the dashboard
getPlayersRoute = async (req, res, next) => {
    // let recentlyAdded = await Player.find({}, null, {limit: 3, sort: {'createdAt': -1}});

    // Get the number of goalkeepers
    const goalkeeperNumber = await Player.countDocuments({ position: 'goalkeeper' })

    // Get the number of defenders
    const defenderNumber = await Player.countDocuments({ position: 'defence' })

    // Get the number of midfield
    const midfieldNumber = await Player.countDocuments({ position: 'midfield' })

    // Get the number of attacker
    const attackerNumber = await Player.countDocuments({ position: 'forward' })


    res.render('./dashboard/player', 
        { 
            goalkeepers: goalkeeperNumber, 
            defenders: defenderNumber,
            midfielders: midfieldNumber,
            attackers:  attackerNumber
        }
    );
}

checkPlayersGet = async (req, res, next) => {
    const check = req.params.check;
    // let recentlyAdded = await Player.find({}, null, {limit: 3, sort: {'_id': -1}});
    // let recentlyAddedForEdit = await Player.find({}, null, {sort: {'_id': -1}});
    // let playerId = req.query._id;
    // const selectedPlayer = await Player.findById(playerId);
    const teams = await Team.find({});

    res.render('./dashboard/player', {
        // recentlyAddedForEdit:recentlyAddedForEdit,
        // selectedPlayer: selectedPlayer,
        // moment: moment,
        // recentlyAdded: recentlyAdded,
        check: check, 
        countryList: countryList, 
        teams: teams
    });
}

addPlayersPost = async (req, res, next) => {
    // All the data from the form
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var dob = req.body.dob;
    var photo = req.body.photo;
    var height = req.body.height;
    var weight = req.body.weight;
    var preferredFoot = req.body.preferredFoot;
    var nationality = req.body.nationality;
    var team = req.body.team;
    var pos = req.body.pos;
    var jerseyNumber = req.body.jersey;

    // build the new player object
    var newPlayer = {
        teamid: team,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        photo: photo,
        height: height,
        weight: weight,
        preferredFoot: preferredFoot,
        nationality: nationality,
        position: pos,
        jerseyNumber: jerseyNumber
    };

    // create the new player
    Player.create(newPlayer, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/dashboard/players/add");
        }
    });
}

editPlayersPost = async (req, res, next) => {
    //Get the id of the player from the query parameter in URL
    const playerid = req.query._id;

    // All the data from the form to update the player
    var updatedPlayer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        photo: req.body.photo,
        height: req.body.height,
        weight: req.body.weight,
        preferredFoot: req.body.preferredFoot,
        nationality: req.body.nationality,
        position: req.body.pos,
        jerseyNumber: req.body.jerseyNumber
    }

    // find the player from the db
    let updateQuery = { _id: playerid };

    //Update one player from the db
    Player.updateOne(updateQuery, updatedPlayer, async function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/dashboard/players:edit");
        }
    });
}

module.exports = {
    getPlayersRoute,
    checkPlayersGet,
    addPlayersPost,
    editPlayersPost
}