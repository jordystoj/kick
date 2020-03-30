var mongoose = require("mongoose");

var FixtureSchema = new mongoose.Schema({
    leagueId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    kickOffTime: {
        type: String,//ISO String
        required: true
    },
    firstHalfStart: {
        type: Number, //ISO String... Starts when initiated by club admin, then update elapsed every 60000 ms
        required: false
    },
    secondHalfStart: {
        type: Number, //ISO String
        required: false
    },
    round: {
        type: String,
        required: true
    },
    status: {
        type: String, // N = not started, FH = first half, SH = second half, FHI SHI = Injury, FHE, SHE, PEN
        required: true,
        default: 'N'
    },
    elasped: {
        type: Number, //Updated every 60000
        required: false,
        default: 0
    },
    venue: {
        type: String, // Home Ground of Home Team (this can be changed)
        required: true,
    },
    referee: {
        type: [String], // Referee ID's
        required: false,
    },
    homeTeam: {
        type: String, //team id
        required: true
    },
    awayTeam: {
        type: String, //team id
        required: true
    },
    matchEvents : {
        type: [String], //Match Events id.
        required: false
    },
    lineups: {
        type: [String], //Array of lineups
        required: false
    },
}, { timestamps: true });

module.exports = mongoose.model("Fixture", FixtureSchema);