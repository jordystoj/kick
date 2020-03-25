var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
    author: {
        id: String,
        firstName: String,
        lastName: String,
    },
    title : {
        type: String,
        required: true
    },
    thumbnail : {
        type: String, // This is an images stored on webserver --> the string is the path name
        required: true,
    },
    postContent: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Post", PostSchema);