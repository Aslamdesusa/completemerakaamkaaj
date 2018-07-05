var mongoose = require('mongoose');
var shortid = require('shortid');
const Email = require('mongoose-type-mail');

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },
    emailid: {type:Email, required:true, unique:true},
    password: {type:String, required:true},
});

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin;