const mongoose = require('mongoose');

var Stocks = mongoose.model('stocks', {
    image: { type: String },
    nom: { type: String },
    total: { type: Number }
});

module.exports = { Albums };