const mongoose = require('mongoose');
//mongodb+srv://zhou059954:<$zhou03$$>@cluster0-iy04h.mongodb.net/test?retryWrites=true&w=majority
//mongoose.connect('mongodb://localhost:27017/stock', (err) => {
    mongoose.connect('mongodb+srv://zhou059954:zhougoupil@cluster0-iy04h.mongodb.net/stock?retryWrites=true&w=majority', (err) => {
    if (!err)
        console.log('Connexion mandea.');
    else
        console.log('Connexion erreur : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;