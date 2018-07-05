var mongoose = require('mongoose');
var shortid = require('shortid');
    
// const Email = require('mongoose-type-mail');

var Schema = mongoose.Schema;

var UserOtpSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
	
    //Contact Information
    emailid:String,
    otp:{type:String, required:true},
});

const UserOtp = mongoose.model('UserOtp', UserOtpSchema)

module.exports = UserOtp;