var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

var jwt = require("jsonwebtoken");
var config = require("./config");
var User = require('./app/models/user');

var port = process.env.PORT || 8080;

mongoose.connect(config.database);

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/setup', function(req, res){
	var userFirst = new User({
		username : req.body.username,
		password: req.body.password,
		email: req.body.email,
	});
	
	User.findOne({username: userFirst.username},
		function(err, user) {
			if (err) throw err;
			if (!user || err) {
				userFirst.save(function(err){
					if (err) throw err;
					console.log('User saved successfully');
				});
			} else if (user) {
				if (user.username != userFirst.username) {
					res.json({ success: false, message: 'Bu kullanici adiyla zaten bir kayit var.' });
				} else if (user.email == userFirst.email) {
					res.json({ success: false, message: 'Bu kullanici adiyla zaten bir kayit var.' });
				};
			}
		});

});

//basic
app.get('/', function(req, res){
  res.send('Wellcome http://localhost:'+port+'/api');
});

app.route('/test').get(function(req, res){
	res.json({message: 'Test route'});
});

var apiRoutes = express.Router();


apiRoutes.post('/authenticate', function(req, res) {
	User.findOne({username: req.body.username},
		function(err, user) {
			if (err) throw err;
			if (!user) {
				res.json({ success: false, message: 'Kimlik doğrulama başarısız oldu. Kullanıcı bulunamadı.' });
			} else if (user) {
				if (user.password != req.body.password) {
					res.json({ success: false, message: 'Kimlik doğrulama başarısız oldu. Yanlış şifre.' });
				} else {
					var token = jwt.sign(user, app.get('secret'), {
						expiresInMinutes: 1440 // 24 saat
					});
					res.json({
						success: true,
						message: 'Alin size token!',
						token: token
					});
				}
			}
		});
});


apiRoutes.use(function(req, res, next) {
	var token = req.body.token || req.param('access_token') || req.headers['access_token'];
	if (token) {
		jwt.verify(token,
			app.get('secret'), function(err, decoded) {	
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });	
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});


apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('Start >> http://localhost:'+port);