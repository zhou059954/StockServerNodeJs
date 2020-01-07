const mongoose = require('mongoose');

var Utilisateur = mongoose.model('Utilisateur', {
    nom: { type: String },
    prenom: { type: String },
    date_naissance: { type: String },
    lieu: { type: String },
    email: { type: String },
    mdp: { type: String }
});

module.exports = { Utilisateur };