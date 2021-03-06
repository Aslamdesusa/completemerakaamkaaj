var mongoose = require('mongoose');
var shortid = require('shortid');


var Schema = mongoose.Schema;

var CountrySchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },
	Country: String,
	date: {type: Date, default: Date.now}
});

const Country = mongoose.model('Country', CountrySchema)

module.exports = Country;