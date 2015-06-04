var jwt = require("jsonwebtoken");

var Profile = require('../models/profile');

module.exports = ProfileRoute;

function ProfileRoute(apiRoutes, app){
	apiRoutes.post('/profile', function(req, res){
		var token = req.headers['authentication'].split(' ')[1];

		var userToken = jwt.verify(token, app.get('secret'));

		if (token) {
			var userProfile = new Profile({
				userId: userToken.id,
				firstName: req.body.firstName,
				lastName : req.body.lastName,
				birthDay: req.body.birthDay,
				picture: req.body.picture
			});
			userProfile.save(function(err){
				if(err) throw err;
				console.log('User Profile saved successfully');
			});
		};
	});
};