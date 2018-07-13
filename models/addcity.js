var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var CitySchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },	
    City: String,
    date: {type: Date, default: Date.now}
});

const City = mongoose.model('City', CitySchema)

module.exports = City;