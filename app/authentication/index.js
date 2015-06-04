var jwt = require("jsonwebtoken");
var User = require('../models/user');

module.exports = Authentication;

function Authentication (apiRoutes, app) {
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
						var date = new Date();
						var userJwtSing = {
							id: user._id,
							username: user.username,
							iss:'http://localhost:8080',
							aud:'http://api.domain.com',
							exp: date.setDate(date.getDate() + 1),
							roles:[]
						};

						var token = jwt.sign(userJwtSing, app.get('secret'), {
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
		var token = req.body.token || req.param('access_token') || req.headers['authentication'];
		token = token.split(' ')[1];
		if (token) {
			jwt.verify(token, app.get('secret'), function(err, decoded) {	
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
}