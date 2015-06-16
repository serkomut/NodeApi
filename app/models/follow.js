var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Follow', new Schema({
	fromId : String,
	toId : String,
	Status : Boolean
}));