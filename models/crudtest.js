const mongoose = require('mongoose');

var Testcrud = mongoose.model('Testcrud', {
    name: { type: String },
    prenom: { type: String },
    age: { type: Number },
    lieu: { type: String }
});
 
module.exports = {Testcrud };