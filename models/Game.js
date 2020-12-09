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
    time: {
        type: Number
    },
    level: {
        type: Number,
        default: 0
    },
    lines: {
        type: Number
    },
    combo: {
        type: Number
    },
    tetris: {
        type: Number
    },
    tspin: {
        type: Number
    },
    date_joined: {
        type: Date,
        default: Date.now
    }
});

module.export = mongoose.model('Game', GameSchema);