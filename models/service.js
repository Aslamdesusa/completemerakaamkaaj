var mongoose = require('mongoose');
var shortid = require('shortid');

// const Email = require('mongoose-type-mail');

var Schema = mongoose.Schema;

var PostServiceSchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },
    //Job Details
    userobjectid:String,
    serviceid: String,
    verifi: String,
    TypeOfService: String(),
	Specification: String(),
	ProvideServices: String(),
	ProviderRegistered: String(),
	RegisteredExpiry: String(),
	Country: String(),
	State: String(),
	City: String(),
	Area: String(),
	Agency: String(),
	Representative: String(),
	MobileNumber: Number(),
	LandNumber: String(),
	Timing: String(),
	aadharcard: String(),
	website: String(),
	emailMobile: String(),
	address: String(),
	pincode: Number(),
	information: String(),
	payment: String(),
	termsandcondition: Boolean,
	date: {type: Date, default: Date.now}
});

const PostService = mongoose.model('PostService', PostServiceSchema)

module.exports = PostService;