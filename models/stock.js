const mongoose = require('mongoose');

var Stocks = mongoose.model('stocks', {
    image: { type: String },
    nom: { type: String },
    PU:{type: Number},
    quantite: { type: Number },
});

module.exports = { Stocks };