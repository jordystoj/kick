var mongoose = require("mongoose");

var LeagueSchema = new mongoose.Schema({
    leagueName: {
        type: String,
        required: true
    }, //eg npl 1, npl 2, npl 3
    gender: {
        type: String,
        required: true
    }, //womens, mens, youth
    age: {
        type: String,
        required: true
    }, //U16, U18, reserve, first
    state: {
        type: String,
        required: true
    }, // nsw qld
    year: {
        type: String,
        required: true,
        default: "2020"
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    
}, { timestamps: true });


module.exports = mongoose.model("League", LeagueSchema);