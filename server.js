var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var database       = require('./config/db');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

require('./app/routes')(app);

app.listen(8080);
console.log("App listening on port 8080");