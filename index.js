const express = require('express');
const bobyParser = require('body-parser');

const {
  mongoose
} = require('./db.js');

var utilisateurController = require('./controllers/utilisateurController.js');
var stocksController = require('./controllers/stockController.js');

var app = express();
app.use(bobyParser.json());

/*app.listen(process.env.PORT || 3000, function () {
    console.log('Your node js server is running port :3000');
});*/
app.set('port', (process.env.PORT || 3000));

// Start node server
app.listen(app.get('port'), function () {
  console.log('Node server is running on port ' + app.get('port'));
});
//https://gf-stock.herokuapp.com/ 
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.append('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', utilisateurController);
app.use('/', stocksController);
app.use('/uploads/images', express.static('uploads/images'));