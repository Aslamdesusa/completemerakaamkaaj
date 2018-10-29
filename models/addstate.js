var mongoose = require('mongoose');
// var shortid = require('shortid');

var Schema = mongoose.Schema;

var StateSchema = new Schema({
	State: String,
    Country: String,
	date: {type: Date, default: Date.now}
});

const State = mongoose.model('State', StateSchema)

module.exports = State;