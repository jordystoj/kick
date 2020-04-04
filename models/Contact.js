var mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema({
    subject: {
        type: String, // subject of message
        required: true
    },
    content: {
        type: String, // what the message says
        required: true
    },
    from: {
        type: String, // Email
        required: true
    }, 
    answered: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });


module.exports = mongoose.model("Contact", ContactSchema);