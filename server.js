var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("./config");

var port = process.env.PORT || 8080;

mongoose.connect(config.database);

app.set('secret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var apiRoutes = express.Router();
require('./routes.js')(apiRoutes, app);
app.use('/v1', apiRoutes);
app.listen(port);
console.log('Start >> http://localhost:' + port);