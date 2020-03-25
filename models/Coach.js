var mongoose = require("mongoose");

var CoachSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    teamId: {
        type: String,
        required: false
    },
}, { timestamps: true });


module.exports = mongoose.model("Coach", CoachSchema);