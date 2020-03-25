const Club = require('../../models/Club');
const ClubAdmin = require('../../models/ClubAdmin');
const User = require('../../models/User');
const Player = require('../../models/Player');
const Team = require('../../models/Team');

getIndexPage = async (req, res) => {
    const club = await Club.findById(req.signedCookies['clubId']);
    const currentUser = await User.findById(req.signedCookies['userId']);
    
    // Get teams
    const teams = await Team.find({clubid: club._id});

    // Initialise var to hold number of players
    let numberOfPlayers = 0;

    for(var i=0; i < teams.length; i++){
        numberOfPlayers = numberOfPlayers + await Player.countDocuments({ teamid: teams[i]._id })
    }

    const numberOfTeams = teams.length;

    //  = await Player.countDocuments({})
    res.render('./clubAdminDashboard/index', {club: club, user: currentUser, numberOfPlayers: numberOfPlayers, numberOfTeams: numberOfTeams });
}

module.exports = {
    getIndexPage
}