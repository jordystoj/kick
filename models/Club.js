var mongoose = require("mongoose");

var ClubSchema = new mongoose.Schema({
    clubName: {
        type: String,
        required: true,
    },
    venueName: {
        type: String,
        required: true,
    },
    venueAddress: {
        type: String,
        required: false,
    },
    venueCapacity: {
        type: Number,
        required: false,
    },
    logo: {
        type: String,
        required: true,
    },
    primaryColor: {
        type: String,
        required: false,
    },
    secondaryColor: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    contactName: {
        type: String,
        required: false,
    },
    officeAddress: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("Club", ClubSchema);