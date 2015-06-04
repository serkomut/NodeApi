var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Profile', new Schema({
	userId: String,
	firstName: String,
	lastName : String,
	birthDay: String,
	picture: String	
}));