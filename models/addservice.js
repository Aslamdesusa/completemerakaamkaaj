var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },
	Service: String,
});

const Service = mongoose.model('Service', ServiceSchema)

module.exports = Service;