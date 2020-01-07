const mongoose = require('mongoose');

var Videos = mongoose.model('Videos', {
    album: { type: mongoose.Schema.ObjectId, ref: 'Albums' },
    titre: { type: String },
    video: { type: String }
});

module.exports = { Videos };