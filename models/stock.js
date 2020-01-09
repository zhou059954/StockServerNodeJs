const mongoose = require('mongoose');

var Stocks = mongoose.model('stocks', {
    image: { type: String },
    nom: { type: String },
    PU:{type: Number},
    total: { type: Number }, 
});

module.exports = { Stocks };