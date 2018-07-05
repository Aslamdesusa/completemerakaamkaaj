var mongoose = require('mongoose');
var shortid = require('shortid');

// const Email = require('mongoose-type-mail');

var Schema = mongoose.Schema;

var PostJobSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
	
    //Job Details
    verifi: String,
    jobType:String,
    skills:{type:String, required:true},
    jobDescription:String,
    aVacancy:{ type: String, required: true },
    expiryDate: String, //{ type: Date,required: true, default: Date.now },
    country:String,
    state:String,
    city:String,
    jobArea:String,
    pinCode:Number,
    jobAddress:String,

    //Professional Details
    salary:Number,
    experience:Number,
    shift:String,
    gender:String,
    educations:String,
    knownLanguage:String,

    //Employer Details
    companyName:String,
    nameOfRepresentative:String,
    mobile:Number,
    landline:Number,
    email:String,
    idCardNumber:String,
    addressOfEmployer:String,
    contactTiming:String,
    lookingOverseas:String,
    paymentPlan:String,
});

const PostJob = mongoose.model('PostJob', PostJobSchema)

module.exports = PostJob;