const Player = require('../../models/Player');
const Team = require('../../models/Team');
const Club = require('../../models/Club');
const Events = require('../../models/MatchEvents');
const moment = require('moment');
const jwt = require('jsonwebtoken');

getPlayerProfile = async (req, res) => {

    const user = checkUser(req.signedCookies['jwt']);

    const playerId = req.params.id;

    // The players id in db
    const player = await Player.findById(playerId);

    // Id of team from player
    const team = await Team.findById(player.teamid);

    // club - id from team
    const club = await Club.findById(team.clubid);

    // Get all Player events

    res.render("./players/profile", {user:user, player: player, moment: moment, team: team, club: club});
}

function checkUser(token){
    if(token){
        return jwt.verify(token, process.env.JWT_TOKEN);
    } else {
        return;
    }
}

module.exports = {
    getPlayerProfile
}
