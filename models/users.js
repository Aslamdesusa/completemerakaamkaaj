var mongoose = require('mongoose');
const Email = require('mongoose-type-mail');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({

	firstname: String,
    lastname: String,
    mobile: {type: Number, required: true, unique: true},
    emailid: {type:Email, required:true, unique:true},
    password: {type:String, required:true},
    address: String,
    state: String,
    city: String,
    pincode: Number,
    lookingfor: String,
    otp: String,
    date: {type: Date, default: Date.now}
});

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users;