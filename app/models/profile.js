var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Adress = {
		street: String,
		streetNumber:String,
		zipCode: String,
		cityName: String,
		countryCode: String,
		geoCode:{
			latitude:String,
			longtitude:String
		}
	};

var Pictures = {
	isDefault : Boolean,
	imageUrl: String,
	size: Number
};

module.exports = mongoose.model('Profile', new Schema({
	userId: String,
	firstName: String,
	lastName : String,
	birthDay: String,
	pictures: [Pictures],
	adress: Adress
}));