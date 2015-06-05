var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Profile', new Schema({
	userId: String,
	firstName: String,
	lastName : String,
	birthDay: String,
	pictures: [Pictures],
	adress: Adress
}));

var Adress = new Schema({
	street: String,
	streetNumber:String,
	zipCode: String,
	cityName: String,
	countryCode: String,
	geoCode:{
		latitude:String,
		longtitude:String
	}
});

var Pictures = new Schema({
	isDefault : Boolean,
	imageUrl: String,
});