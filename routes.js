var Register = require('./app/register/index');
var Authentication = require('./app/authentication/index');
var User = require('./app/models/user');
var ProfileRoute = require('./app/profile/index');

module.exports = function (apiRoutes, app) {

    Register(app);
    Authentication(apiRoutes, app);
    ProfileRoute(apiRoutes, app);
}