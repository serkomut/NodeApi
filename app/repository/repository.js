var mongoose = require("mongoose");
var config = require("./config");


module.exports = Repository;

var Repository = function(model){

	this.model = mongoose.model(model);
    mongoose.connect(config.database);

	return {
		add: function(){
			return model.save();
		},
		find: function(query, callback){
			return model.findOne(query, function(err, result){
				return callback(result);
			});
		},
		update: function(query, value){
			return model.update(query, { $set: value }, { multi: true });
		},
		remove: function(query){
			return model.findOneAndRemove(query);
		}
	}
};