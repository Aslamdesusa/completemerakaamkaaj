var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var JobCategorySchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },
	JobCategory: String,
	date: {type: Date, default: Date.now}
});

const JobCategory = mongoose.model('JobCategory', JobCategorySchema)

module.exports = JobCategory;