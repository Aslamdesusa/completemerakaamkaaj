var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var CitySchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },	City: String,
});

const City = mongoose.model('City', CitySchema)

module.exports = City;