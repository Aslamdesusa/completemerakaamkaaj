var mongoose = require('mongoose');
var shortid = require('shortid');
const Email = require('mongoose-type-mail');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },
	fullname: String,
    gender: String,
    emailid: {type:Email, required:true, unique:true},
    password: {type:String, required:true},
    lookingfor: String,
    otp: String,
    postedJob: Array,
    postedServices: Array,
    postedResume: Array,
});

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users;