const mongoose = require('mongoose');

var Newplaylist = mongoose.model('Newplaylist', {
    utilisateur: { type: mongoose.Schema.ObjectId, ref: 'Utilisateurs' },
    nom: { type: String },
    date_playlist: { type: String },
    heure_playlist: { type: String }
});

module.exports = { Newplaylist };