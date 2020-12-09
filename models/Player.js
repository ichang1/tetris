const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
   username: {
       type: String,
       required: true,
       min: 3,
       max: 30
    },
   password: {
       type: String,
       required: true,
       min: 6,
       max: 255
    },
   email: {
       type: String,
       required: true
   },
   sex: {
       type: String,
       default: ''
   },
   date_joined: {
        type: Date,
        default: Date.now
    },
   last_active: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Player', PlayerSchema);  