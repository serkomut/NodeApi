var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Adress = new Schema();

var Pictures = new Schema({
	isDefault : Boolean,
	imageUrl: String,
	size: Number
});

module.exports = mongoose.model('Profile', new Schema({
	userId: String,
	firstName: String,
	lastName : String,
	birthDay: String,
	pictures: [Pictures],
	adress: {
		street: String,
		streetNumber:String,
		zipCode: String,
		cityName: String,
		countryCode: String,
		geoCode:{
			latitude:String,
			longtitude:String
		}
	}
}));

