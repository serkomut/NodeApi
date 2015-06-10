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
		console.log(req.body.pictures);

		if (token) {
			var userProfile = new Profile({
				userId: userToken.id,
				firstName: req.body.firstName,
				lastName : req.body.lastName,
				birthDay: req.body.birthDay,
				pictures :req.body.pictures,
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

var mock = {
	"firstName": "firstName",
	"lastName": "lastName",
	"birthDay": "birthDay",
	"pictures":mockPiscs,
	"adress":mockAddress
};

var mockPiscs = [{
	"isDefault" : true,
	"imageUrl": "String",
	"size": 240
},
{
	"isDefault" : false,
	"imageUrl": "String",
	"size": 340
}];

var mockAddress = {
	"street": "String",
		"streetNumber":"String",
		"zipCode": "String",
		"cityName": "String",
		"countryCode": "String",
		"geoCode":{
			"latitude":"String",
			"longtitude":"String"
		}
};