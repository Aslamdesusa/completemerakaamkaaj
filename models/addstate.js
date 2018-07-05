var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var StateSchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },
	State: String,
});

const State = mongoose.model('State', StateSchema)

module.exports = State;