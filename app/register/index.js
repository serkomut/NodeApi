var User = require('../models/user');

module.exports = Register;

function Register(app) {
    app.post('/register', function (req, res) {

        if (req.body.roles === undefined) {
            req.body.roles = ['user'];
        };
        
        User.findOne({ username: req.body.username },
            function (err, user) {
                if (err) res.send(err);
                if (!user || err) {
                    User.findOne({ email: req.body.email }, function (err, user) {
                        if (!user || err) {
                            User.create(req.body, function (err) {
                                if (err) res.send(err);
                                res.json(200,{ success: true, message: 'Kayit Basarili' });
                            });
                        } else {
                            return res.status(403).send({
                                success: false,
                                message: 'Bu Email adiyla zaten bir kayit var.'
                            });
                        }
                    });
                } else {
                    return res.status(403).send({
                        success: false,
                        message: 'Bu kullanici adiyla zaten bir kayit var.'
                    });
                }
            });
    });
};