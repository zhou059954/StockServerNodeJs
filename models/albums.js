const mongoose = require('mongoose');

var Albums = mongoose.model('Albums', {
    image: { type: String },
    titre: { type: String },
    annee: { type: String },
    album: { type: String },
    genre: { type: String }
});

module.exports = { Albums };