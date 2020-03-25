var mongoose = require("mongoose");

var LineupSchema = new mongoose.Schema({
    teamId: {
        type: String,
        required: true
    },
    coachId: {
        type: String,
        required: true
    },
    formation: {
        type: String,
        required: true
    },
    startingEleven: {
        playerId: String,
        position: String
    },
    substitutes: {
        playerId: String,
        position: String
    },
}, { timestamps: true });


module.exports = mongoose.model("Lineup", LineupSchema);