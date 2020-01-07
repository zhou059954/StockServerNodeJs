const mongoose = require('mongoose');

var Playlists = mongoose.model('Playlists', {
    playlist: { type: mongoose.Schema.ObjectId, ref: 'Newplaylists' },
    album: { type: mongoose.Schema.ObjectId, ref: 'Albums' },
    titre: { type: String },
    video: { type: String },
    id: { type: String },
});

module.exports = { Playlists };