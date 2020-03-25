var mongoose = require("mongoose");

var TransferSchema = new mongoose.Schema({
    playerId: {
        type: String,
        required: true
    },
    transferDate: {
        type: String,
        required: true
    },
    teamIn: {
        type: String,
        required: true
    },
    teamOut: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("Transfer", TransferSchema);