const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    playedBy: {
        type: String
    },
    mode: {
       type: String
    },
    score: {
        type: Number
    },
    level: {
        type: Number,
        default: 0
    },
    lines: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', GameSchema);