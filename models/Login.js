var mongoose = require("mongoose");

var LoginSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    admin : {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Login", LoginSchema);