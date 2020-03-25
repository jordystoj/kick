var mongoose = require("mongoose");

var EventsSchema = new mongoose.Schema({
    elapsed: {
        type: Number,
        required: true,
    }, 
    teamId: {
        type: String,
        required: true,
    },
    playerId: {
        type: String, // If this is a sub then this is the player coming on
        required: true,
    },
    assistId: {
        type: String, // If this is a sub then this is the player coming off
        required: true,
    },
    type: {
        type: String, // substitue, goal, card, offside
        required: true,
    },
    detail: {
        type: String, // yellow card, red card, penalty, in game, free kick
        required: false,
    },
    comments: {
        type: String, // Type of foul committed
        required: false,
    }
}, { timestamps: true });


module.exports = mongoose.model("Events", EventsSchema);

// #root

// <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
// <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
// <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
// script(type="text/babel" src="/scripts/reactCode.js")