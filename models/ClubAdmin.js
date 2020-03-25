var mongoose = require("mongoose");

var ClubAdminSchema = new mongoose.Schema({
    clubId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    active : {
        type: Boolean,
        required: true,
        default: false // App Admin approves and makes true
    },
    startedRole: {
        type: String,
        required: false
    }

}, { timestamps: true });


module.exports = mongoose.model("ClubAdmin", ClubAdminSchema);