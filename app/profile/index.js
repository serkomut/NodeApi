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
				firstName: 'String',
				lastName : 'String',
				birthDay: new Date(),
				picture: 'https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/268922_10151649396492682_66898502_n.jpg?oh=b239c5fbf019644f678db1b3440f38f8&oe=55EA5E3D&__gda__=1443000500_10b8039723a8617af285cdec1106a085'	
			});
			userProfile.save(function(err){
				if(err) throw err;
				console.log('User Profile saved successfully');
			});
		};
	});
};