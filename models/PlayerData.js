const mongoose = require('mongoose');

const PlayerDataSchema = mongoose.Schema({
    username: {
        type: String
    },
    tetris: {
        type: Number,
        default: 0
    },
    tspin: {
        type: Number,
        default: 0
    },
    marathon_level: {
        type: Number,
        default: 0
    },
    marathon_score: {
        type: Number,
        default: 0
    },
    marathon_time: {
        type: Number,
        default: 0
    },
    marathon_count: {
        type: Number,
        default: 0
    },
    sprint40_level: {
        type: Number,
        default: 0
    },
    sprint40_score: {
        type: Number,
        default: 0
    },
    sprint40_time: {
        type: Number,
        default: 0
    },
    sprint40_count: {
        type: Number,
        default: 0
    }
});

module.export = mongoose.model('PlayerData', PlayerDataSchema);