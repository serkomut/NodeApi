var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

var jwt = require("jsonwebtoken");
var config = require("./repository/config");

var Register = require('./app/register/index');
var Authentication = require('./app/authentication/index');
var User = require('./app/models/user');
var ProfileRoute = require('./app/profile/index');

var port = process.env.PORT || 8080;

mongoose.connect(config.database);

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var apiRoutes = express.Router();

Register(app);
Authentication(apiRoutes, app);
ProfileRoute(apiRoutes, app);


//basic
app.get('/', function(req, res){
  res.send('Wellcome http://localhost:'+port+'/v1');
});

app.route('/test').get(function(req, res){
	res.json({message: 'Test route'});
});

apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.use('/v1', apiRoutes);

app.listen(port);
console.log('Start >> http://localhost:'+port);