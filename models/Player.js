var mongoose = require("mongoose");

var PlayerSchema = new mongoose.Schema({
    teamid: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    height: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    preferredFoot: {
        type: String,
        required: false,
    },
    nationality: {
        type: String,
        required: false,
    },
    position: {
        type: String,
        required: false,
    },
    jerseyNumber: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        required: false,
    },
    stats: {
        type: [String], // Comes from match event table and id is stored if the player id is in the stat.
        required: false
    }
});


module.exports = mongoose.model("Player", PlayerSchema);