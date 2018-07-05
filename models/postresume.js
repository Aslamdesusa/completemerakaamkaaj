var mongoose = require('mongoose');
var shortid = require('shortid');
    
// const Email = require('mongoose-type-mail');

var Schema = mongoose.Schema;

var PostResumeSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
	
    //Contact Information
    JobCat:String,
    Name:{type:String, required:true},
    Mobile: {type: Number, required:true},
    AlternateNum:Number,
    EmailorMobile: String,
    AdharNo:String,
    Country:String,
    State:String,
    City:String,
    Pincode:Number,
    Address:String,

    //About My Self
    Gender:String,
    DOB:String,
    Religin:String,
    knownLanguage:String,
 

    //Education Details
    Class:String,
    Degree:String,
    PG:String,
    Diploma:String,
    Course:String,
    CareerObjective:String,
    OtherDetails:String,

    // OtherDetails
    ReferenceName:String,
    ReferenceMobile:String,

    // Looking Overseas?
    LookingOverseas: String,

     // Please Tick If do you have current Work Details

     NameofImpoloyer:String,
     PositionDesignation:String,
     MainJobCategory:String,
     Skills:String,
     Experience:String,
     currentSalary:Number,
     ExpSalary:Number,
     PriferredShift:String,
     PriferredJobDescription:String,
     PriferredLocation:String,

     // If do you have past work Details
     NameofImpoloyer1:String,
     PositionDesignation1:String,
     JobCategory1:String,
     State1City1:String,
     Experience1:String,
     shift1:String,
     jobDescription1:String,
     SalaryWithdrawn:Number 


});

const PostResume = mongoose.model('PostResume', PostResumeSchema)

module.exports = PostResume;