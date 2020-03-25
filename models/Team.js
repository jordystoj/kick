var mongoose = require("mongoose");

// Teams can only be created and edited by the club admin
// The club admin has to be logged in for this to happen
// Relate the leagues to this schema

//To create a team add the league name deets from the club admin,
//The club admin has a relationship to their own club so when they sign
//in and create a team the team will be part of that club

// A team is a seasonal thing -- ie it the team will be promoted/relegated
//The players change and the stats reset.
var TeamSchema = new mongoose.Schema({
    clubid: {
        type: String,
        required: true,
    },
    leagueid: {
        type: String,
        required: true
    },
    statsId: {
        type: String,
        required: false
    },
    teamName: {
        type: String, // Club name + age + gender
        required: true
    }
 });

module.exports = mongoose.model("Team", TeamSchema);