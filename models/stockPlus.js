const mongoose = require('mongoose');

var StockPlus = mongoose.model('stockPlus', {
    daty: {
        type: Date
    },
    plus: {
        type: Number
    }
});

module.exports = {
    StockPlus
};