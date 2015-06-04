var User = require('../models/user');

module.exports = Register;

function Register (app) {
	app.post('/register', function(req, res){
		var userFirst = new User({
			username : req.body.username,
			password: req.body.password,
			email: req.body.email,
			roles : req.body.roles
		});
		if (userFirst.roles === undefined) {
			userFirst.roles = ['user'];
		};

		User.findOne({username: userFirst.username},
			function(err, user) {
				if (err) throw err;
				if (!user || err) {
					User.findOne({email: userFirst.email}, function(err, user){
						if (!user || err) {
							userFirst.save(function(err){
								if (err) throw err;
								console.log('User saved successfully');
							});
						}else{
							res.json({ success: false, message: 'Bu mail adiyla zaten bir kayit var.' });
						}
					});
					
				} else {
					res.json({ success: false, message: 'Bu kullanici adiyla zaten bir kayit var.' });
				}
			});

	});
};