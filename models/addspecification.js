var mongoose = require('mongoose');
var shortid = require('shortid');


var Schema = mongoose.Schema;

var SpecificationSchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },
	Specification: String,
});

const Specification = mongoose.model('Specification', SpecificationSchema)
module.exports = Specification;


