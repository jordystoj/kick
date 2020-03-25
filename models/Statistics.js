const mongoose = require("mongoose");

var StatisticsSchema = new mongoose.Schema({
    points: {
        type: Number,
        required: true,
    },
    gamesPlayed: {
        type: Number,
        required: true
    },
    wins: {
        type: [Object],
        required: false
    },
    draws: {
        type: [Object],
        required: false
    },
    losses: {
        type: [Object],
        required: false
    },
    goalsConceeded: {
        type: Number,
        required: false
    },
    goalsScored: {
        type: Number,
        required: false
    },
    goalDifference: {
        type: Number,
        required: false
    }
 });

module.exports = mongoose.model("Statistics", StatisticsSchema);