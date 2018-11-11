// import all the depanding library and modals 
import Hapi from 'hapi';
const db = require('../database').db;
const Joi = require('joi');
const fs = require('fs');
const path = require('path')
const jobsModel = require('../models/postjob');
const ServiceModel = require('../models/service')
const ResumeModel = require('../models/postresume')
const UserModel = require('../models/users')
const AdminModel = require('../models/admin')
const CountryModel =require('../models/addcountry')
const StateModel = require('../models/addstate')
const CityModel = require('../models/addcity')
const JobCategoryModel = require('../models/addjobcategory')
const ServiceModel1 = require('../models/addservice')
const SpecificationModel = require('../models/addspecification')
const visitorModel = require('../models/visitor')
const swal = require('../node_modules/sweetalert')
const nodemailer = require("nodemailer");
const localStorage = require('node-localstorage')
const opn = require('opn');
const AuthCookie = require('hapi-auth-cookie')
var springedge = require('springedge');
const async = require('async');
var ObjectID = require('mongodb').ObjectID
var url = require('url');
// var MongoDataTable = require('mongo-datatable');



import axios from 'axios';


 

import jwt from 'jsonwebtoken';

const routes = [
{
	method: 'GET',
	path: '/get/country-by-id',
	handler: function(request, reply){
		CountryModel.findOne({_id: request.query._id})
		.then(function(result){
			return reply(result)
		})
	}
},
{
	method: 'GET',
	path: '/get/state-by-id',
	handler: function(request, reply){
		StateModel.findOne({_id: request.query._id})
		.then(function(result){
			return reply(result)
		})
	}
},
{
	method: 'GET',
	path: '/get/city-by-id',
	handler: function(request, reply){
		CityModel.findOne({_id: request.query._id})
		.then(function(result){
			return reply(result)
		})
	}
},
{
	method: 'GET',
	path: '/get/category-by-id',
	handler: function(request, reply){
		JobCategoryModel.findOne({_id: request.query._id})
		.then(function(result){
			return reply(result)
		})
	}
},
{
	method: 'GET',
	path: '/get/service-category-by-id',
	handler: function(request, reply){
		ServiceModel1.findOne({_id: request.query._id})
		.then(function(result){
			return reply(result)
		})
	}
},
{
    method: 'POST',
    path: '/submit',
    config: {
    	payload: {
    		output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
    },
    handler: function (request, reply) {
    	var uuid = {};
    	var newUser = new UserModel(request.payload);
    	newUser.save(function (err, data){
    		if (err) {
    			reply('error saving data')
			}else{
				reply({
					message: 'data successfully saved',
					data: data,
				});
				uuid=data;
				var dataa = request.payload;
	            if (dataa.image) {
	                var name = uuid._id + ".jpg";
	                const __dirname = '../completemerakaamkaaj/merakaamkaaj'
	                var path = __dirname + "/uploads/" + name;
	                var file = fs.createWriteStream(path);

	                file.on('error', function (err) { 
	                    console.error('error') 
	                });
	                dataa.image.pipe(file);
	                dataa.image.on('end', function (err) {
	                    var ret = {
	                        filename: uuid._id + ".jpg",
	                        headers: dataa.image.hapi.headers

	                    }
	                });
		        }
			} 

		});

    }
},
{

    method: 'GET',
    path: '/{username}',
    handler: ( request, reply ) => {
        reply.view('workinprogress', {message: 'कार्य प्रगति पर है '});
        console.log(request)
    }



},
// ***************************** Routes for Posting *******************************
{
	method: 'POST',
	path: '/post/job',
	config: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"Posting user details",
         notes:"in this route we can post details of a user jobs",
	},
	handler: (request, reply) => {
		var newJobs = new jobsModel({
			 //Job Details
		    "objectid":request.payload.objectid,
		    "JobID":request.payload.JobID,
		    "Declration": request.payload.Declration,
		    "verifi": "No Active",
		    "jobType":request.payload.jobType,
		    "skills":request.payload.skills,
		    "jobDescription":request.payload.jobDescription,
		    "aVacancy":request.payload.aVacancy,
		    "expiryDate": request.payload.expiryDate, //{ type: Date,required: true, default: Date.now },
		    "country":request.payload.country,
		    "state":request.payload.state,
		    "city":request.payload.city,
		    "jobArea":request.payload.jobArea,
		    "pinCode":request.payload.pinCode,
		    "jobAddress":request.payload.jobAddress,

		    //Professional Details
		    "salary":request.payload.salary,
		    "experience":request.payload.experience,
		    "shift":request.payload.shift,
		    "gender":request.payload.gender,
		    "educations":request.payload.educations,
		    "knownLanguage":request.payload.knownLanguage,

		    //Employer Details
		    "companyName":request.payload.companyName,
		    "nameOfRepresentative":request.payload.nameOfRepresentative,
		    "mobile":request.payload.mobile,
		    "landline":request.payload.landline,
		    "email":request.payload.email,
		    "idCardNumber":request.payload.idCardNumber,
		    "addressOfEmployer":request.payload.addressOfEmployer,
		    "contactTiming":request.payload.contactTiming,
		    "lookingOverseas":request.payload.lookingOverseas,
		});
		newJobs.save(function (err, data){
			if (err) {
				throw err;
				console.log(err);
			}else {
				reply({
					statusCode: 200,
					message: "new job successfully posted",
					data: data
				});
			}
		});
	}
	
},
{
	method: 'POST',
	path: '/post/service/admin',
	config: {
		//include this route in swagger documentation
		tags:['api'],
		description:"Posting services",
		notes:"in this route we can post services",
		payload: {
			output: 'stream',
			parse: true,
			allow: 'multipart/form-data'
		},
	},
	handler: (request, reply) => {
		// console.log(request.payload)
		var uuid = {}
		var newService = new ServiceModel(request.payload);
		newService.save(function (err, data){
			if (err) {
				// console.log(err);
				throw err;
			}else {
				reply.redirect('/forms')
				uuid=data;
				var dataa = request.payload;
	            if (dataa.image) {
	                var name = uuid._id + ".jpg";
	                const __dirname = '../completemerakaamkaaj/merakaamkaaj/uploads'
	                var path = __dirname + "/servicepics/" + name;
	                var file = fs.createWriteStream(path);

	                file.on('error', function (err) { 
	                    console.error('error') 
	                });
	                dataa.image.pipe(file);
	                dataa.image.on('end', function (err) {
	                    var ret = {
	                        filename: uuid._id + ".jpg",
	                        headers: dataa.image.hapi.headers

	                    }
	                });
		        }
			}
		});
	}
},
{
	method: 'POST',
	path: '/post/resume/admin',
	config: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"Posting resume",
         notes:"in this route we can post resume",
         validate: {
         	payload:{
				//Contact Information
				JobCat: Joi.string().required(),
				Name:Joi.string().required(),
				Mobile: Joi.number().required(),
				AlternateNum:Joi.number().allow(null, ''),
				EmailorMobile: Joi.string().allow(null, ''), 
				AdharNo:Joi.string().required(),
				Country:Joi.string().allow(null, ''),
				State:Joi.string().allow(null, ''),
				City:Joi.string().required(),
				Pincode:Joi.number().allow(null, ''),
				Address:Joi.string().allow(null, ''),
				//About My Self
				Gender:Joi.string().required(),
				DOB:Joi.string().required(),
				Religin:Joi.string().allow(null, ''),
				knownLanguage:Joi.string().allow(null, ''),
				//Education Details
				Class:Joi.string().allow(null, ''),
				Degree:Joi.string().allow(null, ''),
				PG:Joi.string().allow(null, ''),
				Diploma:Joi.string().allow(null, ''),
				Course:Joi.string().allow(null, ''),
				CareerObjective:Joi.string().allow(null, ''),
				OtherDetails:Joi.string().allow(null, ''),
				// OtherDetails
				ReferenceName:Joi.string().allow(null, ''),
				ReferenceMobile:Joi.string().allow(null, ''),
				// Looking Overseas?
				LookingOverseas: Joi.string().required(),
				// Please Tick If do you have current Work Details
				NameofImpoloyer:Joi.string().allow(null, ''),
				PositionDesignation:Joi.string().allow(null, ''),
				MainJobCategory:Joi.string().allow(null, ''),
				Skills:Joi.string().allow(null, ''),
				Experience:Joi.string().allow(null, ''),
				currentSalary:Joi.number().allow(null, ''),
				ExpSalary:Joi.number().allow(null, ''),
				PriferredShift:Joi.string().allow(null, ''),
				PriferredJobDescription:Joi.string().allow(null, ''),
				PriferredLocation:Joi.string().allow(null, ''),
				// If do you have past work Details
				NameofImpoloyer1:Joi.string().allow(null, ''),
				PositionDesignation1:Joi.string().allow(null, ''),
				JobCategory1:Joi.string().allow(null, ''),
				State1City1:Joi.string().allow(null, ''),
				Experience1:Joi.string().allow(null, ''),
				shift1:Joi.string().allow(null, ''),
				jobDescription1:Joi.string().allow(null, ''),
				SalaryWithdrawn:Joi.number().allow(null, '') 
			}
		},
	},
	handler: (request, reply) => {
		// console.log(request.payload)
		var newResume = new ResumeModel(request.payload);
		newResume.save(function (err, data){
			if (err) {
				// console.log(err);
				throw err;
			}else {
				reply({
					statusCode: 200,
					message: "new Service successfully posted",
					data: data
				});
			}
		});
	}
	
},

// ***********************************************************

{
	method: 'POST',
	path: '/add/country',
	config: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"Posting country",
         notes:"in this route we can post country",
         validate: {
         	payload:{
				Country: Joi.string().required(),
			}
		},
	},
	handler: (request, reply) => {
		var newCountry = new CountryModel(request.payload);
		newCountry.save(function (err, data){
			if (err) {
				throw err;
			}else {
				reply({country: data, message: 'Country successfully ragistered'})
				return false;
			}
		});
	}
	
},
{
	method: 'POST',
	path: '/add/state',
	config: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"Posting State",
         notes:"in this route we can post State",
         validate: {
         	payload:{
				State: Joi.string().required(),
				Country: Joi.string().required(),
			},
		},
         auth:{
         	strategy: 'restricted',
         },
	},
	handler: (request, reply) => {
		let authenticated_user = request.auth.credentials;
		console.log(authenticated_user)
		var newState = new StateModel({
			"State": request.payload.State,
			"Country": request.payload.Country,
		});
		newState.save(function (err, data){
			if (err) {
				return reply('state already Exists');
			}else {
				reply({state: data})
				return false;
			}
		});
	}
	
},


{
	method: 'POST',
	path: '/add/city',
	config: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"Posting city",
         notes:"in this route we can post city",
         validate: {
         	payload:{
				//Contact Information
				City: Joi.string().required(),
				Country: Joi.string().required(),
				State: Joi.string().required(),
			}
		},
	},
	handler: (request, reply) => {
		// console.log(request.payload)
		var newCity = new CityModel(request.payload);
		newCity.save(function (err, data){
			if (err) {
				// console.log(err);
				throw err;
			}else {
				reply({city: data})
				return false;
			}
		});
	}
	
},
{
    method: 'POST',
    path: '/add/job/category',
    config: {
    	payload: {
    		output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
    },
    handler: function (request, reply) {
    	var uuid = {};
    	var newCategory = new JobCategoryModel(request.payload);
    	newCategory.save(function (err, data){
    		if (err) {
    			reply('error saving data')
			}else{
				reply({message: 'New Job Category successfully saved', data: data})
				uuid=data;
				var dataa = request.payload;
	            if (dataa.image) {
	                var name = uuid._id + ".png";
	                const __dirname = '../completemerakaamkaaj/merakaamkaaj/uploads'
	                var path = __dirname + "/category/" + name;
	                var file = fs.createWriteStream(path);

	                file.on('error', function (err) { 
	                    console.error('error') 
	                });
	                dataa.image.pipe(file);
	                dataa.image.on('end', function (err) {
	                    var ret = {
	                        filename: uuid._id + ".png",
	                        headers: dataa.image.hapi.headers

	                    }
	                });
		        }
			}

		});

    }
},
{
    method: 'POST',
    path: '/add/service',
    config: {
    	payload: {
    		output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
    },
    handler: function (request, reply) {
    	var uuid = {};
    	var newService = new ServiceModel1(request.payload);
		newService.save(function (err, data){
    		if (err) {
    			reply('error saving data')
			}else{
				reply({service: data, message: 'A new Service Has Added successfully'})
				uuid=data;
				console.log('====================================')
				console.log(uuid)
				console.log(uuid._id)
				console.log('======================================')
				var dataa = request.payload;
	            if (dataa.image) {
	                var name = uuid._id + ".png";
	                const __dirname = '../completemerakaamkaaj/merakaamkaaj/uploads'
	                var path = __dirname + "/services/" + name;
	                var file = fs.createWriteStream(path);

	                file.on('error', function (err) { 
	                    console.error('error') 
	                });
	                dataa.image.pipe(file);
	                dataa.image.on('end', function (err) {
	                    var ret = {
	                        filename: uuid._id + ".png",
	                        headers: dataa.image.hapi.headers

	                    }
	                });
		        }
			} 

		});

    }
},
{
	method: 'POST',
	path: '/add/specification',
	config: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"Posting specification",
         notes:"in this route we can post specification",
         validate: {
         	payload:{
				//Contact Information
				Specification: Joi.string().required(),
			}
		},
	},
	handler: (request, reply) => {
		// console.log(request.payload)
		var newSpecification = new SpecificationModel(request.payload);
		newSpecification.save(function (err, data){
			if (err) {
				// console.log(err);
				throw err;
			}else {
				reply.view('sweetalert5', {specification: data}, {layout: 'layout2'})
				return false;
			}
		});
	}
	
},


// ********************************************************?

// getting country

{
	method: 'GET',
	path: '/get/countrys',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting jobs",
         notes:"in this route we are getting all jobs",
         auth:{
         	strategy: 'restricted'
         }
     },
	handler: (request, reply) =>{
		CountryModel.find({},(err, data) => {
			if (err){
				console.log(err);
				throw err;		
			}
			else{
				reply.view('adddetails', {allCountry : data},{layout: 'layout2'});
				// reply.view('adddetails', {allState : data},{layout: 'layout2'});
				console.log(data);
			}
		}); 	   
	}
},
{
	method: 'GET',
	path: '/get/state',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting jobs",
         notes:"in this route we are getting all jobs",
         auth:{
         	strategy: 'restricted'
         }
     },
	handler: (request, reply) =>{
		CountryModel.find({},(err, data) => {
			if (err){
				console.log(err);
				throw err;		
			}
			else{
				reply.view('adddetails', {allState : data},{layout: 'layout2'});
				console.log(data);
			}
		}); 	   
	}
},
{
	method: 'GET',
	path: '/get/details',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting all category data and other data",
         notes:"getting all data which is need in admin page",
         auth:{
	    	strategy: 'restricted',
	    }
     },
     handler: (request, reply) =>{
     	async function getallDetails(){
     		var country;
			var state;
			var city;
			var jobcategory;
			var services;
			var specification;
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		CountryModel.find()
     		.then(function(allCountry){
     			country = allCountry
     			StateModel.find()
     			.then(function(allState){
     				state = allState
     				CityModel.find()
     				.then(function(allCity){
     					city=allCity;
     					JobCategoryModel.find()
     					.then(function(allJobCategory){
     						jobcategory = allJobCategory
     						ServiceModel1.find()
     						.then(function(allService){
     							services=allService;
     							SpecificationModel.find()
     							.then(function(allSpecification){
     								specification=allSpecification
     								return reply.view('adddetails', {allCountry: country, allState: state, allCity: city, alljobcategory: jobcategory, allService: services, allSpecification: specification}, {layout: 'layout2'})	
     							})
     						});
     					});
     				});

     			});
     		});
     	}
     	getallDetails();
     }
},
{
	method: 'GET',
	path: '/posted/job',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		jobsModel.find()
     		.then(function(result){
     			return reply.view('postedJob', {jobs: result}, {layout: 'layout2'}) 
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/posted/Resume',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ResumeModel.find().limit(10).skip(10 * request.query.count)
     		.then(function(result){
     			ResumeModel.count()
     			.then(function(resultCount){
     				console.log(resultCount)
     				return reply.view('postedResume', {resumes: result, numberCount: resultCount}, {layout: 'layout2'}) 
     			})
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/posted/resume/json',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ResumeModel.find().limit(10).skip(10 * request.query.count)
     		.then(function(result){
     			console.log(result)
     			return reply(result)
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/posted/service',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ServiceModel.find().limit(10).skip(10 * request.query.count)
     		.then(function(result){
     			ServiceModel.count()
     			.then(function(resultCount){
     				return reply.view('postedService', {services: result, totoalSer: resultCount}, {layout: 'layout2'}) 
     			});
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/posted/service/josn',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ServiceModel.find().limit(10).skip(10 * request.query.count)
     		.then(function(result){
     			console.log(result)
     			return reply(result)
     		});
     	}
     	getJobCat();
     }
},
// NUMBERS OF ragistered User
{
	method: 'GET',
	path: '/posted/job/users',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		UserModel.find({lookingfor: 'i am looking for right Worker'}).limit(20).exec()
     		.then(function(result){
     			return reply.view('ragisterRightWorker', {lookingforrightworker: result}, {layout: 'layout2'}) 
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/posted/resumes/user',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		UserModel.find({lookingfor: 'i am looking for right job'}).limit(10).skip(10 * request.query.count)
     		.then(function(result){
     			UserModel.find({lookingfor: 'i am looking for right job'}).count()
     			.then(function(resultCount){
     				console.log(resultCount)
     				return reply.view('PostedResumeUser', {lookingforrightjob: result, countUpdate: resultCount}, {layout: 'layout2'}) 
     			})
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/posted/resumes/user/json',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		UserModel.find({lookingfor: 'i am looking for right job'}).limit(10).skip(10 * request.query.count)
     		.then(function(result){
     			return reply(result)
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/service/provider/user',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		UserModel.find({lookingfor: 'i am service provider'}).limit(10).skip(10 * request.query.count)
     		.then(function(result){
     			UserModel.find({lookingfor: 'i am service provider'}).count()
     			.then(function(resultCount){
     				return reply.view('ServiceProviderUser', {prov: result, countUpdate: resultCount}, {layout: 'layout2'}) 	
     			})
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/service/provider/user/json',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		UserModel.find({lookingfor: 'i am service provider'}).limit(10).skip(10 * request.query.count)
     		.then(function(result){
     			return reply(result) 
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/service/seeking/user',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		UserModel.find({lookingfor: 'i am service provider'}).limit(20).exec()
     		.then(function(result){
     			return reply.view('ServiceSeekingUser', null, {layout: 'layout2'}) 
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/resent/search/right/worker',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		UserModel.find({lookingfor: 'i am service provider'}).limit(20).exec()
     		.then(function(result){
     			return reply.view('ResentSearchRightWorker', null, {layout: 'layout2'}) 
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'GET',
	path: '/resent/search/right/job',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data",
         auth:{
         	strategy: 'restricted'
         }
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		UserModel.find({lookingfor: 'i am service provider'}).limit(20).exec()
     		.then(function(result){
     			return reply.view('ResentSearchRightJob', null, {layout: 'layout2'}) 
     		});
     	}
     	getJobCat();
     }
},

{
	method: 'GET',
	path: '/posted/service/provider/user',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting ragistered users details",
         notes:"in this route we are getting all ragistered users details",
         auth:{
	    	strategy: 'restricted',
	    }

     },
	handler: (request, reply) =>{
		var lookingforrightworker = {};
		var iamprovider = {};
		var lookingforrightjob = {};
		var rightserprov = {};
		UserModel.find().limit(500).exec({lookingfor: 'i am looking for right Worker'}, (err, data) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				lookingforrightworker=data;
				// reply.view('table', {jobs: provider}, {layout: 'layout2'})
			}
		})
		UserModel.find().limit(500).exec({lookingfor: 'i am service provider'}, (err, data) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				iamprovider=data;
			}
		})
		UserModel.find().limit(500).exec({lookingfor: 'i am service provider'}, (err, data) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				iamprovider=data;
			}
		})
		UserModel.find().limit(1000).exec({lookingfor: 'i am looking for right job'}, (err, data) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				lookingforrightjob=data;
				console.log(lookingforrightjob)
				reply.view('typo', {lookingforrightworker: lookingforrightworker, lookingforrightjob: lookingforrightjob, prov: iamprovider}, {layout: 'layout2'})

			}
		})	   
	}
},
{
	method: 'GET',
	path: '/',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting home data",
         notes:"getting home data"
     },
     handler: (request, reply) =>{
     	async function getJobCat(){
     		var jobcategory;
     		var services;
     		var recentsers;
     		var recentjobs;
			var recentworkers;
     		console.log('hello')
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		JobCategoryModel.find()
     		.then(function(jobCategoryData){
     			jobcategory = jobCategoryData 
     			ServiceModel1.find()
     			.then(function(servicesCat){
     				services = servicesCat
     				ServiceModel.find({verifi: 'Active'}).limit(10).exec()
     				.then(function(recentservices){
     					recentsers=recentservices;
     					jobsModel.find({verifi: 'Active'}).limit(5).exec()
     					.then(function(recentjob){
     						recentjobs = recentjob
     						ResumeModel.find({verifi: 'Active'}).limit(5).exec()
     						.then(function(recentworker){
     							recentworkers=recentworker;
     							return reply.view('index', {alljobcategory: jobcategory, allService: services, allrecentsers : recentsers, allrecentjobs :recentjobs, allrecentworkers :recentworkers  })
     						});
     					});
     				});

     			});
     		});
     	}
     	getJobCat();
     }
},
{
	method: 'POST',
	path: '/quick/search',
	config:{
		validate:{
		 	payload:{
                Visitorname:Joi.string(),
                visitorcontect:Joi.number(),
                visitorlookingfor:Joi.string()
            }
		}
	},
	handler:(request, h)=>{
		var vis = {}
		var newVisitro = new visitorModel(request.payload);
		newVisitro.save(function (err, data){
			if (err) {
				throw err
			}else{
				vis=data
				if (vis.visitorlookingfor == 'rightjob') {
					return h.redirect('/get/rightjob')
				}
				if (vis.visitorlookingfor == 'rightworker') {
					return h.redirect('/get/rightworkers')
				}
				if (vis.visitorlookingfor == 'rigthservice') {
					return h.redirect('/get/rightservice')
				}
			}
		});
	}
},


// *****************************User and Admin deshboard*************************************

{
    method:'POST',
    path:'/admin/deshboard',
    config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"getting details of a particular user",
        notes:"getting details of particular user",
        validate:{
            payload:{
                emailid:Joi.string(),
                password:Joi.string()
            }
        }
    },
    handler: function(request, reply){
    	
        AdminModel.find({'emailid': request.payload.emailid, 'password': request.payload.password}, function(err, data){
            if (err){
                reply({
                    'error': err
                });
            } else if (data.length == 0){
          		var wrong = 'wrong email and password'
                reply.view('error', {message: 'Admin Dose Not Exists Please Try With Your Correct Email And Password', errormessage: '404 Error'})
            } else {
                if (request.payload.password == data[0]['password']){
                    var emailid = request.payload.emailid;
                    const token = jwt.sign({
                        emailid,
                        userid:data[0]['_id'],

                    },'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
                        algorithm: 'HS256',
                        expiresIn: '1h',
                    });
                    reply.state('emailid', emailid)
					

                    request.cookieAuth.set({ token });

                    return reply.redirect('/admin/deshboard')
                }
            }
        })

    }
},

//***************************logout session***************************************************
{
	method: 'GET',
	path: '/logout',
	handler:(request, h)=>{
		request.cookieAuth.clear();
		return h.redirect('/')

	}
},

// ********************** Routes to get the list of all data ********************
{
	method: 'GET',
	path: '/get/rightjob',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting jobs",
         notes:"in this route we are getting all jobs"
     },
	handler: (request, reply) =>{
 		var jobs;
		var jobcat;
		async function getallDetails(){
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		jobsModel.find({verifi: 'Active'}).limit(20).skip(20 * request.query.count)
     		.then(function(alljobs){
     			if (alljobs == 0) {
     				return reply.view('SearchRightJobs', {message: 'Update Soon'})
     			}else{
     				jobs = alljobs
     				JobCategoryModel.find({})
     				.then(function(allJobCategory){
     					jobcat = allJobCategory
     					console.log(jobs)
     					return reply.view('SearchRightJobs', {allJobs : jobs, jobcategorys: jobcat})
     			});
     			}
     		});
     	}
     	getallDetails() 	   
	}
},
{
	method: 'GET',
	path: '/get/rightworkers',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting Service",
         notes:"in this route we are getting all services"
     },
	handler: (request, reply) =>{
		var resumes;
		var jobCat ;
		async function getallDetails(){
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ResumeModel.find({verifi: 'Active'}).limit(20).skip(20 * request.query.count)
     		.then(function(allResume){
     			resumes = allResume
     			JobCategoryModel.find({})
     			.then(function(allJobCategory){
     				jobCat = allJobCategory
	     			return reply.view('SearchRightWorker', {allResume : resumes, jobcategorys: jobCat, link: '/get/rightworkers'})
     			});
     		});
     	}
     	getallDetails() 	   
	}
},
{
	method: 'GET',
	path: '/get/rightworkers/json',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting Service",
         notes:"in this route we are getting all services"
     },
	handler: (request, reply) =>{
		async function getallDetails(){
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ResumeModel.find({verifi: 'Active'}).limit(20).skip(20 * request.query.count)
     		.then(function(allResume){
     			return reply(allResume)
     			
     		})
     	}
     	getallDetails() 	
     }   
},
{
	method: 'GET',
	path: '/get/rightworkers/with/limit',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting worker",
         notes:"in this route we are getting all worker"
     },
	handler: (request, reply) =>{
		async function getallDetails(){
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ResumeModel.find({verifi: 'Active', JobCat: request.query.JobCat}).limit(20).skip(20 * request.query.count)
     		.then(function(allResume){
     			return reply(allResume)
     		});
     	}
     	getallDetails() 	   
	}
},
{
	method: 'GET',
	path: '/get/rightservice/json',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting worker",
         notes:"in this route we are getting all worker"
     },
	handler: (request, reply) =>{
		async function getallDetails(){
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ServiceModel.find({verifi: 'Active'}).limit(20).skip(20 * request.query.count)
     		.then(function(allService){
     			return reply(allService)
     		});
     	}
     	getallDetails() 	   
	}
},
{
	method: 'GET',
	path: '/get/rightjob/with/limit',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting worker",
         notes:"in this route we are getting all worker"
     },
	handler: (request, reply) =>{
		async function getallDetails(){
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		jobsModel.find({verifi: 'Active', jobType: request.query.jobType}).limit(20).skip(20 * request.query.count)
     		.then(function(allJobs){
     			return reply(allJobs)
     		});
     	}
     	getallDetails() 	   
	}
},
{
	method: 'GET',
	path: '/get/rightservice',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting Service",
         notes:"in this route we are getting all services"
     },
	handler: (request, reply) =>{
		var services = {}
		var allService = {}
		async function getallDetails(){
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     			ServiceModel.find({}).limit(20).skip(20 * request.query.count)
     			.then(function(allService){
     				allService = allService
     				ServiceModel1.find()
     				.then(function(allServiceCat){
     					services = allServiceCat;
     					return reply.view('searchRightService',{allService : allService, services : services,})
     			});
     		});
     	}
     	getallDetails()
	}
},
{
	method: 'GET',
	path: '/post/resume',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting Resume tamplate",
         notes:"in this route we are getting Resume tamplate"
     },
	handler: (request, reply) =>{
		reply.view('PostResume')
	}
},
{
	method: 'GET',
	path: '/post/service',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting service tamplate",
         notes:"in this route we are getting service tamplate"
     },
	handler: (request, reply) =>{
		reply.view('PostService')
	}
},
{
	method: 'GET',
	path: '/post/new/job',
	handler: (request, reply) => {
		reply.view('PostJobs')
	}
},
{
	method: 'GET',
	path: '/plans',
	handler: (request, reply) =>{
		reply.view('plans')
	}
},
{
        method:'GET',
        path:'/search/jobs',
        config:{
            //include this route in swagger documentation
            tags:['api'],
            description:"getting details of a particular user",
            notes:"getting details of particular user",
            validate:{
                params:{
                    jobType:Joi.string(),
                    state:Joi.string()
                }
            },
        },
        handler: function(request, reply){
            async function getallDetails(){
     		var workers;
			var jobcat;
            var query = {$and:[{jobType:{$regex: request.query.jobType, $options: 'i'}},{state:{$regex: request.query.state, $options: 'i'}}]}
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		jobsModel.find(query)
     		.then(function(allJobs){
     			workers = allJobs
     			JobCategoryModel.find({})
     			.then(function(allCatJOb){
     				jobcat = allCatJOb
	     			return reply.view('SearchRightJobs', {allJobs : workers, jobcategorys: jobcat})
     			});
     		});
     	}
     	getallDetails()
        }
    },
    {
		method: 'GET',
		path: '/search/worker',
		config:{
	        //include this route in swagger documentation
	        tags:['api'],
	        description:"getting admin form",
	        notes:"getting form",
	    },
		handler: (request, reply) =>{
			// return reply('dsf')
			async function getallDetails(){
	     		var worker;
				var jobcat;
				var query = {$and:[{JobCat:{$regex: request.query.JobCat, $options: 'i'}}, {State:{$regex: request.query.state, $options: 'i'}}]}
	     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
	     		ResumeModel.find(query).limit(20).skip(20 * request.query.count)
	     		.then(function(allworker){
	     			worker = allworker
	     			JobCategoryModel.find({})
	     			.then(function(allJobCategory){
	     				jobcat = allJobCategory
		     			return reply.view('SearchRightWorker', {allResume : worker, jobcategorys: jobcat})

		     			// return reply({allResume : worker, jobcategorys: jobcat})
	     			});
	     		});
	     	}
	     	getallDetails();
		}
	},
	{
		method: 'GET',
		path: '/search/worker/json',
		config:{
	        //include this route in swagger documentation
	        tags:['api'],
	        description:"getting admin form",
	        notes:"getting form",
	    },
		handler: (request, reply) =>{
			// return reply('dsf')
			async function getallDetails(){
				var query = {$and:[{JobCat:{$regex: request.query.JobCat, $options: 'i'}}, {State:{$regex: request.query.state, $options: 'i'}}]}
	     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
	     		ResumeModel.find(query).limit(20).skip(20 * request.query.count)
	     		.then(function(allworker){
	     			return reply(allworker)
	     		});
	     	}
	     	getallDetails();
		}
	},
	{
        method:'GET',
        path:'/filter/search/worker/gender',
        handler: function(request, reply){
        	var jobcat;
        	 ResumeModel.find({Gender : request.query.gender}).limit(20).exec()
        	 .then(function(result){
        	 	JobCategoryModel.find({})
     			.then(function(allJobCategory){
     				jobcat = allJobCategory
     				if(result.length === 0){
     					return reply.view('SearchRightWorker',{
     						message: 'No Records Found',
     						jobcategorys: jobcat
     					})

     				} else {
     					reply.view('SearchRightWorker',{allResume : result, jobcategorys: jobcat})
     				}
     			});
        	 })       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/worker/gender/json',
        handler: function(request, reply){
        	var jobcat;
        	 ResumeModel.find({Gender : request.query.gender}).limit(20).skip(20 * request.query.count)
        	 .then(function(result){
        	 	return reply(result)
        	 })       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/worker/salary-range',
        handler: function(request, reply){
        	var query = {}
        	var jobcat;
        	var salarygte = request.query.salarygte
            var salarylte = request.query.salarylte
            if( salarygte && salarylte){ 
           		query.ExpSalary = {
            		$gte:salarygte,
            		$lte:salarylte
            	}   	
            }
        	 ResumeModel.find(query).limit(20).exec()
        	 .then(function(result){
        	 	JobCategoryModel.find({})
     			.then(function(allJobCategory){
     				jobcat = allJobCategory
     				if(result.length === 0){
     					return reply.view('SearchRightWorker',{
     						message: 'No Records Found',
     						jobcategorys: jobcat
     					})
     				} else {
     					reply.view('SearchRightWorker',{allResume : result, jobcategorys: jobcat})
     				}
     			});
        	 })       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/worker/salary-range/json',
        handler: function(request, reply){
        	var query = {}
        	var jobcat;
        	var salarygte = request.query.salarygte
            var salarylte = request.query.salarylte
            if( salarygte && salarylte){ 
           		query.ExpSalary = {
            		$gte:salarygte,
            		$lte:salarylte
            	}   	
            }
        	 ResumeModel.find(query).limit(20).skip(20 * request.query.count)
        	 .then(function(result){
        	 	return reply(result)
        	 })       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/worker/worker-id',
        handler: function(request, reply){
        	var jobcat;
        	 ResumeModel.find({pwid: request.query.pwid})
        	 .then(function(result){
        	 	JobCategoryModel.find({})
     			.then(function(allJobCategory){
     				jobcat = allJobCategory
	     				if(result.length === 0){
	                	return reply.view('SearchRightWorker',{message: 'No Records Found', jobcategorys: jobcat})
	                } else {
	                    return reply.view('SearchRightWorker',{allResume : result, jobcategorys: jobcat})
	                }
     			});
        	 })       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/worker/experience',
        handler: function(request, reply){
        	var query = {}
        	var jobcat;
        	var experience = request.query.experience
            if (experience){ 
           		if (typeof(experience) == typeof([])){
                       	var exp=[];
                       	for (var i = experience.length - 1; i >= 0; i--) {
                       	 	var val = experience[i].split('-');
                       	 	exp=exp.concat(val);
                       	} 
                   	}else{
                   		var exp = experience.split("-");
                   	}
                query.Experience = {
            		$gte:Math.min.apply(null, exp),
            		$lte:Math.max.apply(null, exp)
            	}   	
            }
        	 ResumeModel.find(query).limit(20).exec()
        	 .then(function(result){
        	 	JobCategoryModel.find({})
     			.then(function(allJobCategory){
     				jobcat = allJobCategory
	     				if(result.length === 0){
		                	return reply.view('SearchRightWorker',{
		                		message: 'No Records Found',
		                		jobcategorys: jobcat

		                	})
		                } else {
		                    reply.view('SearchRightWorker',{allResume : result, jobcategorys: jobcat})
		                }
     			});
        	 })       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/worker/experience/json',
        handler: function(request, reply){
        	var query = {}
        	var jobcat;
        	var experience = request.query.experience
            if (experience){ 
           		if (typeof(experience) == typeof([])){
                       	var exp=[];
                       	for (var i = experience.length - 1; i >= 0; i--) {
                       	 	var val = experience[i].split('-');
                       	 	exp=exp.concat(val);
                       	} 
                   	}else{
                   		var exp = experience.split("-");
                   	}
                query.Experience = {
            		$gte:Math.min.apply(null, exp),
            		$lte:Math.max.apply(null, exp)
            	}   	
            }
        	 ResumeModel.find(query).limit(20).skip(20 * request.query.count)
        	 .then(function(result){
        	 	return reply(result)
        	 })       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/service-by-area',
        handler: function(request, reply){
        	var services;
        	ServiceModel.find({Area: request.query.Area}).limit(20).exec()
    	 	.then(function(result){
    	 		ServiceModel1.find()
    	 		.then(function(allServiceCat){
    	 			services = allServiceCat;
    	 			if(result.length === 0){
    	 				return reply.view('SearchRightWorker',{
    	 					message: 'No Records Found',
    	 					services : services
    	 				})
    	 			}else{
    	 				return reply.view('searchRightService',{allService : result, services : services,})
    	 			}
 				});
 			})       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/service-by-area/json',
        handler: function(request, reply){
        	ServiceModel.find({Area: request.query.Area}).limit(20).skip(20 * request.query.count)
    	 	.then(function(result){
    	 		return reply(result)
 			})       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/service-by-shift',
        handler: function(request, reply){
        	var services;
        	var query = {}
        	var shift = request.query.shift
            if(shift){query.Timing = {
            	$in:request.query.timing
            }}
        	ServiceModel.find(query).limit(20).exec()
    	 	.then(function(result){
    	 		ServiceModel1.find()
    	 		.then(function(allServiceCat){
    	 			services = allServiceCat;
    	 			if(result.length === 0){
    	 				return reply.view('SearchRightWorker',{
    	 					message: 'No Records Found',
    	 					services : services
    	 				})
    	 			}else{
    	 				return reply.view('searchRightService',{allService : result, services : services,})
    	 			}
 				});
 			})       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/service-by-shift/json',
        handler: function(request, reply){
        	var services;
        	var query = {}
        	var shift = request.query.shift
            if(shift){query.Timing = {
            	$in:request.query.timing
            }}
        	ServiceModel.find(query).limit(20).skip(20 * request.query.count)
    	 	.then(function(result){
    	 		return reply(result)
 			})       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/service-by-id',
        handler: function(request, reply){
        	var services;
        	ServiceModel.find({serviceid: request.query.serviceid})
    	 	.then(function(result){
    	 		ServiceModel1.find()
    	 		.then(function(allServiceCat){
    	 			services = allServiceCat;
    	 			if(result.length === 0){
    	 				return reply.view('SearchRightWorker',{
    	 					message: 'No Records Found',
    	 					services : services
    	 				})
    	 			}else{
    	 				return reply.view('searchRightService',{allService : result, services : services,})
    	 			}
 				});
 			})       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/service-by-id/json',
        handler: function(request, reply){
        	var services;
        	ServiceModel.find({serviceid: request.query.serviceid})
    	 	.then(function(result){
    	 		return reply(result)
 			})       	 
        }
    },
    {
        method:'GET',
        path:'/filter/search/jobs',
        handler: function(request, reply){
        	var query={}
            var experience = request.query.experience
            var salarygte = request.query.salarygte
            var salarylte = request.query.salarylte
            var idsearch = request.query.id 
            var shift = request.query.shift
            var gender =request.query.gender

            if(shift){query.shift = {
            	$in:request.query.timing
            }}
            if (gender) {query.gender = {
	        	$in:request.query.gender
	        }}
            if (experience){ 
           		if (typeof(experience) == typeof([])){
                       	var exp=[];
                       	for (var i = experience.length - 1; i >= 0; i--) {
                       	 	var val = experience[i].split('-');
                       	 	exp=exp.concat(val);
                       	} 
                   	}else{
                   		var exp = experience.split("-");
                   	}
                query.experience = {
            		$gte:Math.min.apply(null, exp),
            		$lte:Math.max.apply(null, exp)
            	}   	
            }
            if( salarygte && salarylte){ 
           		query.salary = {
            		$gte:salarygte,
            		$lte:salarylte
            	}   	
            }
            if(idsearch){
            	query._id = idsearch
            }

            jobsModel.find().limit(100).exec(query,function(err, data){
            	console.log(data)
                if(data.length === 0){
                	return reply.view('SearchRightJobs',{
                		message: 'No Records Found'

                	})
                } else {
                    reply.view('SearchRightJobs',{allJobs : data})
                }
            });
        }
    },
    {
        method:'GET',
        path:'/search/service',
        config:{
            //include this route in swagger documentation
            tags:['api'],
            description:"getting details of a particular user",
            notes:"getting details of particular user",
            validate:{
                params:{
                    TypeOfService:Joi.string(),
                    State:Joi.string()
                }
            },
        },
        handler: function(request, reply){
			async function getallDetails(){
     		var service;
			var serCat;
            var query = {$and:[{TypeOfService:{$regex: request.query.TypeOfService, $options: 'i'}},{State:{$regex: request.query.State, $options: 'i'}}]}
			// var query = {$and:[{JobCat:{$regex: request.query.JobCat, $options: 'i'}}]}
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ServiceModel.find(query).limit(20).skip(20 * request.query.count)
     		.then(function(allService){
     			service = allService
     			ServiceModel1.find({})
     			.then(function(allSerCat){
     				serCat = allSerCat
	     			return reply.view('searchRightService', {allService : service, services: serCat})
     			});
     		});
     	}
     	getallDetails()            
        }
    },
    {
        method:'GET',
        path:'/search/service/json',
        config:{
            //include this route in swagger documentation
            tags:['api'],
            description:"getting details of a particular user",
            notes:"getting details of particular user",
            validate:{
                params:{
                    TypeOfService:Joi.string(),
                    State:Joi.string()
                }
            },
        },
        handler: function(request, reply){
			async function getallDetails(){
            var query = {$and:[{TypeOfService:{$regex: request.query.TypeOfService, $options: 'i'}},{State:{$regex: request.query.State, $options: 'i'}}]}
			// var query = {$and:[{JobCat:{$regex: request.query.JobCat, $options: 'i'}}]}
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ServiceModel.find(query)
     		.then(function(allService){
     			return reply(allService)
     		});
     	}
     	getallDetails()            
        }
    },

// ******************************Admin page******************************

{
	method: 'GET',
	path: '/reset/password',
	handler: (request, reply) =>{
		reply.view('forget-pass')
	}
},
{
	method: 'GET',
	path: '/gallery',
	handler: (request, reply) =>{
		reply.view('gallery')
	}
},
{
	method: 'GET',
	path: '/advertising',
	handler: (request, reply) =>{
		reply.view('advertising')
	}
},
{
	method: 'GET',
	path: '/clients',
	handler: (request, reply) =>{
		reply.view('client')
	}
},
{
	method: 'GET',
	path: '/admin/deshboard',
	config:{
		auth:{
			strategy: "restricted"
		}
	},
	handler: (request, reply) =>{
		reply.view('deshboard', null,{layout: 'layout2'})
	}
},
{
	method: 'GET',
	path: '/forms',
	config:{
            //include this route in swagger documentation
            tags:['api'],
            description:"getting  admin form",
            notes:"getting form",
            validate:{
                params:{
                    TypeOfService:Joi.string(),
                    State:Joi.string()
                }
            },
        auth:{
	    	strategy: 'restricted',
	    }
    },
	handler: (request, reply)=>{
		reply.view('form', null, {layout: 'layout2'})
	}
},
// user can change there password ========================================
{
	method: 'GET',
	path: '/new/password',
	config:{
            //include this route in swagger documentation
            tags:['api'],
            description:"getting new password form",
            notes:"getting new password form",
    },
	handler: (request, reply) =>{
		reply.view('new-password', null,{layout: 'layout-forget-password'})
	}
},
{
	method: 'GET',
	path: '/user/user-account',
	config:{
            //include this route in swagger documentation
            tags:['api'],
            description:"getting new password form",
            notes:"getting new password form",
            auth:{
            	strategy: 'restricted',
            }
    },
	handler: (request, reply) =>{
		var authenticated_user = request.auth.credentials
		reply.view('user-account', {userdata: authenticated_user},{layout: 'layout3'})
	}
},
{
	method: 'GET',
	path: '/forgot/pass',
	config:{
            //include this route in swagger documentation
            tags:['api'],
            description:"getting foret password form",
            notes:"getting forget password form",
    },
	handler: (request, reply) =>{
		return reply.view('forget-pass', null,{layout: 'layout-forget-password'})
	}
},
{
	method: 'GET',
	path: '/confirm/user/{mobile}',
	config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"user can change the password",
        notes:"user can change the password with there email id and may be there password",
        validate:{
            params:{
                mobile:Joi.string()
            }
        },
    },
	handler: (request, reply) =>{
		// password change
		var otp = Math.floor(Math.random() * 90000) + 10000;
		UserModel.find({mobile: request.params.mobile}, function(err, data){
			if (data.length == 0) {
				reply('user dose not Exists Please try with your Correct email and password')
			}else{
				// Generate valid url 
				let changepassword = 'merakaamkaaj.com \n Reset your merakaamkaaj \n password.\n here is your OTP, : \n '+ otp
				axios.request('http://zapsms.co.in/vendorsms/pushsms.aspx?user=merakaamkaaj&password=merakaamkaaj&msisdn='+request.params.mobile+'&sid=MERAKK&msg='+changepassword+'&fl=1&gwid=2')
				  .then(function(result){
				  	var otpdata = {
				  		"mobile": request.params.mobile,
				  		"otp": otp
				  	}
				  	console.log(otpdata)
				  	request.cookieAuth.set(otpdata);
				  	reply('OTP Sent via SMS to your mobile number. Enter the OTP in the required field and click on validate')
				  })
				  .catch(error => {
				    console.log(error);
				  });
			}
		})	
	}
},
{
	method: 'GET',
	path: '/verifi/otp',
	config:{
		auth:{
			strategy: 'restricted'
		},
	},
	handler: function(request, reply){
		var authenticated_OTP = request.auth.credentials;
		if (request.query.otp == authenticated_OTP.otp) {
			return reply({message: 'success', mobile: authenticated_OTP.mobile})
		}else{
			return reply({message: 'invalid otp'})
		}
	}
},
{
	method: 'PUT',
	path: '/change/password/with-secure-link',
	config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"user can change the password",
        notes:"user can change the password with there email id and may be there password",
        // validate:{
        //     params:{
        //         mobile:Joi.string()
        //     }
        // },
    },
	handler: (request, reply) =>{
		// password change
		UserModel.findOneAndUpdate({Status: request.query.Status}, request.payload, function(err, data){
			if (err) {
				throw err
			}else{
				reply('password changed successfully')
			}
		})
	}
},

// Admin can change user passwrod
{
	method: 'PUT',
	path: '/change/password/user',
	config:{
	//include this route in swagger documentation
	    tags:['api'],
	    description:"user can change the password",
	    notes:"user can change the password with there email id and may be there password",
	    auth:{
	    	strategy: 'restricted'
	    },
		handler: (request, reply) =>{
			// password edit with admin
			var newContectInfo = { $set: 
				{
					password: request.payload.password,
				}
			};
			UserModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
				if (err) {
					throw err
				}else{
					reply('password changed successfully')
				}
			})
		}
	}
},
// Edit Country
{
	method: 'PUT',
	path: '/edit/country',
	config:{
	//include this route in swagger documentation
	    tags:['api'],
	    description:"Admin can edit country",
	    notes:"Admin can edit country",
	    auth:{
	    	strategy: 'restricted'
	    },
		handler: (request, reply) =>{
			// password edit with admin
			CountryModel.findOneAndUpdate({_id: request.query._id}, request.payload, function(err, data){
				if (err) {
					throw err
				}else{
					reply('Country Update successfully')
				}
			})
		}
	}
},
{
	method: 'PUT',
	path: '/edit/state',
	config:{
	//include this route in swagger documentation
	    tags:['api'],
	    description:"Admin can edit",
	    notes:"Admin can edit",
	    auth:{
	    	strategy: 'restricted'
	    },
		handler: (request, reply) =>{
			// password edit with admin
			StateModel.findOneAndUpdate({_id: request.query._id}, request.payload, function(err, data){
				if (err) {
					throw err
				}else{
					reply('state Update successfully')
				}
			})
		}
	}
},
{
	method: 'PUT',
	path: '/edit/city',
	config:{
	//include this route in swagger documentation
	    tags:['api'],
	    description:"Admin can edit",
	    notes:"Admin can edit",
	    auth:{
	    	strategy: 'restricted'
	    },
		handler: (request, reply) =>{
			// password edit with admin
			CityModel.findOneAndUpdate({_id: request.query._id}, request.payload, function(err, data){
				if (err) {
					throw err
				}else{
					reply('city Update successfully')
				}
			})
		}
	}
},
{
	method: 'PUT',
	path: '/edit/category',
	config:{
	//include this route in swagger documentation
	    tags:['api'],
	    description:"Admin can edit",
	    notes:"Admin can edit",
	    auth:{
	    	strategy: 'restricted'
	    },
		handler: (request, reply) =>{
			// password edit with admin
			JobCategoryModel.findOneAndUpdate({_id: request.query._id}, request.payload, function(err, data){
				if (err) {
					throw err
				}else{
					reply('category Update successfully')
				}
			})
		}
	}
},
{
	method: 'PUT',
	path: '/edit/services',
	config:{
	//include this route in swagger documentation
	    tags:['api'],
	    description:"Admin can edit",
	    notes:"Admin can edit",
	    auth:{
	    	strategy: 'restricted'
	    },
		handler: (request, reply) =>{
			// password edit with admin
			ServiceModel1.findOneAndUpdate({_id: request.query._id}, request.payload, function(err, data){
				if (err) {
					throw err
				}else{
					reply('service Update successfully')
				}
			})
		}
	}
},
{
	method: 'PUT',
	path: '/edit/specification',
	config:{
	//include this route in swagger documentation
	    tags:['api'],
	    description:"Admin can edit",
	    notes:"Admin can edit",
	    auth:{
	    	strategy: 'restricted'
	    },
		handler: (request, reply) =>{
			// password edit with admin
			SpecificationModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, request.payload, function(err, data){
				if (err) {
					throw err
				}else{
					reply('specification Update successfully')
				}
			})
		}
	}
},
// Edit POSTED Resume 
{
	method: 'PUT',
	path: '/edit/contect-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
				Name: request.payload.Name, 
				Mobile: request.payload.Mobile,
				AlternateNum: request.payload.AlternateNum,
				EmailorMobile: request.payload.EmailorMobile,
				AdharNo: request.payload.AdharNo,
			    Country: request.payload.Country,
			    State: request.payload.State,
			    City: request.payload.City,
			    Area: request.payload.Area,
			    Pincode:request.payload.Pincode,
			    Address: request.payload.Address
			}
		};
		ResumeModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},
{
	method: 'PUT',
	path: '/edit/about-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
				Gender: request.payload.Gender,
			    DOB: request.payload.DOB,
			    Religin: request.payload.Religin,
			    knownLanguage: request.payload.knownLanguage,
			}
		};
		ResumeModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},
{
	method: 'PUT',
	path: '/edit/education-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
				Class: request.payload.Class,
			    Degree: request.payload.Degree,
			    PG: request.payload.PG,
			    Diploma: request.payload.Diploma,
			    Course: request.payload.Course,
			    CareerObjective: request.payload.CareerObjective,
			    OtherDetails: request.payload.OtherDetails
			}
		};
		ResumeModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},
{
	method: 'PUT',
	path: '/edit/other-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
				ReferenceName: request.payload.ReferenceName,
				ReferenceMobile: request.payload.ReferenceMobile,
			}
		};
		ResumeModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},
{
	method: 'PUT',
	path: '/edit/current-work-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
				 NameofImpoloyer: request.payload.NameofImpoloyer,
			     PositionDesignation: request.payload.PositionDesignation,
			     MainJobCategory: request.payload.MainJobCategory,
			     Skills: request.payload.Skills,
			     Experience: request.payload.Experience,
			     currentSalary: request.payload.currentSalary,
			     ExpSalary: request.payload.ExpSalary,
			     PriferredShift: request.payload.PriferredShift,
			     PriferredJobDescription: request.payload.PriferredJobDescription,
			     PriferredLocation: request.payload.PriferredLocation
			}
		};
		ResumeModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},
{
	method: 'PUT',
	path: '/edit/past-work-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
				 NameofImpoloyer1: request.payload.NameofImpoloyer1,
			     PositionDesignation1: request.payload.PositionDesignation1,
			     JobCategory1: request.payload.JobCategory1,
			     State1City1: request.payload.State1City1,
			     Experience1: request.payload.Experience1,
			     shift1: request.payload.shift1,
			     jobDescription1: request.payload.jobDescription1,
			     SalaryWithdrawn: request.payload.SalaryWithdrawn,
			}
		};
		ResumeModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},


// Edit POSTED jobs
{
	method: 'PUT',
	path: '/edit/job/job-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
				JobID: request.payload.JobID,
			    Declration: request.payload.Declration,
			    jobType: request.payload.jobType,
			    skills: request.payload.skills,
			    jobDescription: request.payload.jobDescription,
			    aVacancy: request.payload.aVacancy,
			    expiryDate: request.payload.expiryDate,
			    country: request.payload.country,
			    state: request.payload.state,
			    city: request.payload.city,
			    jobArea: request.payload.jobArea,
			    pinCode: request.payload.pinCode,
			    jobAddress: request.payload.jobAddress,
			}
		};
		jobsModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},
{
	method: 'PUT',
	path: '/edit/job/Professional-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
				salary: request.payload.salary,
			    experience: request.payload.experience,
			    shift: request.payload.shift,
			    gender: request.payload.gender,
			    educations: request.payload.educations,
			    knownLanguage: request.payload.knownLanguage
			}
		};
		jobsModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			console.log('salary')
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},
{
	method: 'PUT',
	path: '/edit/job/contect-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
				companyName: request.payload.companyName,
			    nameOfRepresentative: request.payload.nameOfRepresentative,
			    mobile: request.payload.mobile,
			    landline: request.payload.landline,
			    email: request.payload.email,
			    idCardNumber: request.payload.idCardNumber,
			    addressOfEmployer: request.payload.addressOfEmployer,
			    contactTiming: request.payload.contactTiming,
			    lookingOverseas: request.payload.lookingOverseas,
			}
		};
		jobsModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},
// Edit Service
{
	method: 'PUT',
	path: '/edit/service/Service-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
			    Specification: request.payload.Specification,
			    ProvideServices: request.payload.ProvideServices,
			    ProviderRegistered: request.payload.ProviderRegistered,
			    RegisteredExpiry: request.payload.RegisteredExpiry,
			    State: request.payload.State,
			    City: request.payload.City,
			    Area: request.payload.Area,
			}
		};
		ServiceModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},
{
	method: 'PUT',
	path: '/edit/service/Service-provider-info',
	handler: function(request, reply){
		var newContectInfo = { $set: 
			{
			    Agency: request.payload.Agency,
			    Representative: request.payload.Representative,
			    MobileNumber: request.payload.MobileNumber,
			    LandNumber: request.payload.LandNumber,
			    Timing: request.payload.Timing,
			    aadharcard: request.payload.aadharcard,
			    website: request.payload.website,
			    emailMobile: request.payload.emailMobile,
			    address: request.payload.address,
			    pincode: request.payload.pincode,
			    information: request.payload.information,
			}
		};
		ServiceModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, newContectInfo, function(err, data){
			if (err) {
				reply(err)
			}else{
				reply(data)
			}
		})
	}
},



// ******************************user page***************************************

// ***********************Routes for footer html***************************************

{
	method: 'GET',
	path: '/companystory',
	handler: (request, h)=>{
		return h.view('companystory', {layout: 'layout'})
	}
},
{
	method: 'GET',
	path: '/wayofwork',
	handler: (request, h)=>{
		return h.view('wayofwork', {layout: 'layout'})
	}
},
{
	method: 'GET',
	path: '/companyfeture',
	handler: (request, h)=>{
		return h.view('companyfeture', {layout: 'layout'})
	}
},
{
	method: 'GET',
	path: '/contectus',
	handler: (request, h)=>{
		return h.view('contectus', {layout: 'layout'})
	}
},
{
	method: 'GET',
	path: '/policyofcompany',
	handler: (request, h)=>{
		return h.view('policyofcompany', {layout: 'layout'})
	}
},
{
	method: 'GET',
	path: '/termsandconditoin',
	handler: (request, h)=>{
		return h.view('termsandcondition', {layout: 'layout'})
	}
},
{
	method: 'GET',
	path: '/privacypolicy',
	handler: (request, h)=>{
		return h.view('privacypolicy', {layout: 'layout'})
	}
},
{
	method: 'GET',
	path: '/securegetwaypayment',
	handler: (request, h)=>{
		return h.view('securegetway', {layout: 'layout'})
	}
},
// =====================================================
// delete by admin
{
		method: 'DELETE',
		path: '/delete/country/{uuid}',
		config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular country',
		notes: 'In this route we are Deletting of data particular data',

		// Joi api validation
		validate: {
		    params: {
		        uuid: Joi.string().required()
		    }
		}
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		CountryModel.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply.view('error', {message: 'error in deleting country'}, {layout: 'layout2'})
			}else{
				reply({message: 'Country Has Deleted Successfully'})
			}
		});
	}
},
{
		method: 'DELETE',
		path: '/delete/state/{uuid}',
		config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular state',
		notes: 'In this route we are Deletting of data particular data',

		// Joi api validation
		validate: {
		    params: {
		        uuid: Joi.string().required()
		    }
		}
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		StateModel.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply.view('error', {message: 'error in deleting state'}, {layout: 'layout2'})
			}else{
				return reply({message: 'State Has Deleted Successfully'})
			}
		});
	}
},
{
		method: 'DELETE',
		path: '/delete/city/{uuid}',
		config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular city',
		notes: 'In this route we are Deletting of data particular data',

		// Joi api validation
		validate: {
		    params: {
		        uuid: Joi.string().required()
		    }
		}
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		CityModel.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply({message: 'Error Deleting data'})
			}else{
				reply({message: 'Entry Deleted Successfully'})
			}
		});
	}
},
{
		method: 'DELETE',
		path: '/delete/category/{uuid}',
		config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular job category',
		notes: 'In this route we are Deletting of data particular data',

		// Joi api validation
		validate: {
		    params: {
		        uuid: Joi.string().required()
		    }
		}
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		JobCategoryModel.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply({message: 'error in deleting job category'})
			}else{
				reply({message: 'Entry Deleted Successfully'})
			}
		});
	}
},
{
		method: 'DELETE',
		path: '/delete/service/{uuid}',
		config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular service',
		notes: 'In this route we are Deletting of data particular data',

		// Joi api validation
		validate: {
		    params: {
		        uuid: Joi.string().required()
		    }
		}
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		ServiceModel1.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply({message: 'error in deleting service'})
			}else{
				reply({message: 'Entry Deleted Successfully'})
			}
		});
	}
},
{
		method: 'GET',
		path: '/delete/specification/{uuid}',
		config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular job specification',
		notes: 'In this route we are Deletting of data particular data',

		// Joi api validation
		validate: {
		    params: {
		        uuid: Joi.string().required()
		    }
		}
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		SpecificationModel.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply.view('error', {message: 'error in deleting job specification'}, {layout: 'layout2'})
			}else{
				reply.redirect('/get/details')
			}
		});
	}
},
{
		method: 'DELETE',
		path: '/delete/registered/user',
		config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular job specification',
		notes: 'In this route we are Deletting of data particular data',
		// Joi api validation
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		UserModel.findOneAndRemove({_id: ObjectID(request.query._id)}, function (error){
			if(error){
				reply('user already deleted')
			}else{
				reply('user deleted Successfully')
			}
		});
	}
},
{
		method: 'GET',
		path: '/delete/user/resume',
		config: {
		// swager documention fields tags, descrioption and, note
			tags : ['api'],
			description: 'Deletting particular job specification',
			notes: 'In this route we are Deletting of data particular data',
			auth:{
				strategy: 'restricted'	
			}
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		ResumeModel.findOneAndRemove({_id: ObjectID(request.query._id)}, function (error){
			if(error){
				reply('user already deleted')
			}else{
				reply(data)
			}
		});
	}
},
{
	method: 'DELETE',	
	path: '/delete/user/job',
	config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular job specification',
		notes: 'In this route we are Deletting of data particular data',
		// auth:{
		// 	strategy: 'restricted',
		// },
	},
	handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		jobsModel.findOneAndRemove({_id: ObjectID(request.query._id)}, function(err, data){
			if (!data) {
				reply('Job Already Deleted')
			}else{
				reply(data)
			}
		});
	}
},
{
	method: 'DELETE',	
	path: '/delete/user/Service',
	config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular job specification',
		notes: 'In this route we are Deletting of data particular data',
		// auth:{
		// 	strategy: 'restricted',
		// },
	},
	handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		ServiceModel.findOneAndRemove({_id: ObjectID(request.query._id)}, function(err, data){
			if (!data) {
				reply('Services Already Deleted')
			}else{
				reply(data)
			}
		});
	}
},
{
	method: 'GET',	
	path: '/get/user/job',
	config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular job specification',
		notes: 'In this route we are Deletting of data particular data',
		// auth:{
		// 	strategy: 'restricted',
		// },
	},
	handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		jobsModel.findOne({_id: ObjectID(request.query._id)}, function(err, data){
			if (err) {
				throw err
			}else{
				reply(data)
			}
		});
	}
},
{
	method: 'GET',	
	path: '/get/user/service',
	config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular job specification',
		notes: 'In this route we are Deletting of data particular data',
		// auth:{
		// 	strategy: 'restricted',
		// },
	},
	handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		ServiceModel.findOne({_id: ObjectID(request.query._id)}, function(err, data){
			if (err) {
				throw err
			}else{
				reply(data)
			}
		});
	}
},
{
	method: 'GET',	
	path: '/get/user/resume',
	config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular job specification',
		notes: 'In this route we are Deletting of data particular data',
		// auth:{
		// 	strategy: 'restricted',
		// },
	},
	handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		ResumeModel.findOne({_id: ObjectID(request.query._id)}, function(err, data){
			if (err) {
				throw err
			}else{
				console.log(data)
				reply(data)
			}
		});
	}
},
{
		method: 'GET',
		path: '/delete/user/service/{uuid}',
		config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular job specification',
		notes: 'In this route we are Deletting of data particular data',

		// Joi api validation
		validate: {
		    params: {
		        uuid: Joi.string().required()
		    }
		}
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		ServiceModel.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply.view('error', {message: 'error in deleting job specification'}, {layout: 'layout2'})
			}else{
				reply.redirect('/get/posted/details')
			}
		});
	}
},
// **********************Routes for deleting the data by Id **************************** 
{
		method: 'DELETE',
		path: '/delete/job/by/{id}',
		config: {
		// swager documention fields tags, descrioption and, note
		tags : ['api'],
		description: 'Deletting particular user job',
		notes: 'In this route we are Deletting of data particular data',

		// Joi api validation
		validate: {
		    params: {
		        id: Joi.string().required()
		    }
		}
		},
		handler: function(request, reply){
		//find user data from his ID and remove data into databases.
		jobsModel.findOneAndRemove({_id: request.params.id}, function (error){
			if(error){
				reply({
					statusCode: 503,
			      	message: 'Error in Deletting job',
			      	data: error
			      });
			}else{
				reply({
					statusCode: 200,
		      		message: 'job deleted Successfully'
		      	});
			}
		});
	}
},
{
		method:'DELETE',
		path:'/delete/service/by/{id}',
		config:{
			// swagger documentation fields tags, description and, note
			tags: ['api'],
			description: 'Deleting particular user Service',
			notes: 'In this route we are Deleting of data particular data',
			//Joi api validation
			validate:{
				params: {
					id : Joi.string().required()
				}
			}
		},
		handler:(request , reply) => {
			ServiceModel.findOneAndRemove({_id: request.params.id }, (error, data) =>{
				if (error){
					reply({
						statusCode: 503,
						message: 'Error in Deleting service',
						data:error
					});
				}else{
					reply({
						statusCode: 200,
						message: 'service deleted Successfully',
						data: data
					});
				}
			});
		}
},
{
      method: 'PUT',
      path: '/Update/varifi/{id}',
      config: {
        // swager documention fields tags, descrioption and, note
        tags: ['api'],
        description: 'Update specific user job',
        notes: 'Update specific user job',

        // Joi api validation
        validate: {
          params: {
            // `id` is required field and can accepte string data
            id: Joi.string().required()
          },
        payload: {
          		//Job Details
			    verifi:Joi.string(),
          }
        }
      },
      handler: function(request, reply) {
        // find user with his id and update user data
        ServiceModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
          if(error){
            reply({
              statusCode: 503,
              message: 'Failed to get data',
              data: error
            });
          }else{
            reply({
              statusCode: 200,
              message: 'successfully verified',
              data: data
            });
          }
        });
    }
},
{
	method: 'PUT',
	path: '/update/service/{id}',
	config: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description: 'Update specific user service',
        notes: 'Update specific user service',
         validate: {
         	payload:{
         		TypeOfService: Joi.string(),
				Specification: Joi.string(),
				ProvideServices: Joi.string(),
				ProviderRegistered: Joi.string(),
				RegisteredExpiry: Joi.string(),
				Country: Joi.string(),
				State: Joi.string(),
				City: Joi.string(),
				Area: Joi.string(),
				Agency: Joi.string(),
				Representative: Joi.string(),
				MobileNumber: Joi.number(),
				LandNumber: Joi.string(),
				Timing: Joi.string(),
				aadharcard: Joi.string(),
				website: Joi.string(),
				emailMobile: Joi.string(),
				address: Joi.string(),
				pincode: Joi.number(),
				information: Joi.string(),
				payment: Joi.string(),
			}
		},
	},
 handler: function(request, reply) {
        // find user with his id and update user data
        ServiceModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
          if(error){
            reply({
              statusCode: 503,
              message: 'Failed to get data',
              data: error
            });
          }else{
            reply({
              statusCode: 200,
              message: 'Service Update Successfully',
              data: data
            });
          }
        });
    }
},
{
	method: 'GET',
	path: '/send',
	handler: function(request, reply){
		// reply.redirect('https://instantalerts.co/api/web/send/?apikey=6c05481mpqilv3oyy9fl2m835ick34zmr&sender=SEDEMO&to=9205169278&message=Hello Brother+message&format=json')
		var springedge = require('springedge');
 
var params = {
  'sender': 'SEDEMO',
  'apikey': '6c05481mpqilv3oyy9fl2m835ick34zmr',
  'to': [
    '9205169278'  //Moblie Numbers 
  ],
  'message': 'Hi, this is a test message',
  'format': 'json'
};
 
springedge.messages.send(params, 5000, function (err, response) {
  if (err) {
    return console.log(err);
  }
  console.log(response);
});
	}
},


]
export default routes;
