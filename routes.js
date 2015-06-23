

module.exports = function (app) {

    require('./app/register/index')(app);
    require('./app/authentication/index')(app);
    //require('./app/profile/index')(app);
}