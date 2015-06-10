var jwt = require("jsonwebtoken");

var Profile = require('../models/profile');

module.exports = ProfileRoute;

function ProfileRoute(apiRoutes, app){

	app.param(function(param, option) {
	  return function (req, res, next, val) {
	    if (val == option) {
	      next();
	    }
	    else {
	      res.sendStatus(403);
	    }
	  }
	});

	apiRoutes.post('/profile', function(req, res){
		var token = req.headers['authentication'].split(' ')[1];

		var userToken = jwt.verify(token, app.get('secret'));

		if (token) {
			var userProfile = new Profile({
				userId: userToken.id,
				firstName: req.body.firstName,
				lastName : req.body.lastName,
				birthDay: req.body.birthDay,
				pictures:[req.body.picture],
				adress: req.body.adress
			});
			userProfile.save(function(err){
				if(err) throw err;
				console.log('User Profile saved successfully');
			});
		};
	});

	apiRoutes.get('/profile/:id', function(req, res, next){
		Profile.findOne({userId: req.params.id}, function(err, profile){
			if (err) {
				return res.json({success: false, message: 'Not found profile.'});;
			}else if (profile) {
			 	return res.json(profile);
			}
			//next();
		});
	});
};