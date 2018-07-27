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
const sleep = require('sleep');
const opn = require('opn');
const AuthCookie = require('hapi-auth-cookie')

 

import jwt from 'jsonwebtoken';

const routes = [
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
		var newJobs = new jobsModel(request.payload);
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
				reply.view('sweetalert', {country: data}, {layout: 'layout2'})
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
			}
		},
	},
	handler: (request, reply) => {
		var newState = new StateModel(request.payload);
		newState.save(function (err, data){
			if (err) {
				throw err;
			}else {
				reply.view('sweetalert1', {state: data}, {layout: 'layout2'})
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
				reply.view('sweetalert2', {city: data}, {layout: 'layout2'})
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
				reply.view('sweetalert3', {data: data, message: 'New Job Category successfully saved'}, {layout: 'layout2'})
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
				reply.view('sweetalert4', {data: data, message: 'New Service successfully saved',}, {layout: 'layout2'})
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
         notes:"in this route we are getting all jobs"
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
         notes:"in this route we are getting all jobs"
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
		 description:"getting jobs",
         notes:"in this route we are getting all jobs",
         auth:{
	    	strategy: 'restricted',
	    }

     },
	handler: (request, reply) =>{
		var country = {};
		var state = {};
		var city = {};
		var jobcategory = {};
		var services = {};
		var specification = {};
		CountryModel.find({},(err, allCountry) => {
			if (err){
				console.log(err);
				throw err;		
			}else{
				country=allCountry;
			}
		});
		StateModel.find({}, (err, allState) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				state=allState;
			}
		})
		CityModel.find({}, (err, allCity) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				city=allCity;
			}
		})
		JobCategoryModel.find({}, (err, allJobCategory) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				jobcategory=allJobCategory;
			}
		})
		ServiceModel1.find({}, (err, allService) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				services=allService;
			}
		})
		SpecificationModel.find({}, (err, allSpecification) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				specification=allSpecification;
				reply.view('adddetails', {allCountry: country, allState: state, allCity: city, alljobcategory: jobcategory, allService: services, allSpecification: specification}, {layout: 'layout2'})
				console.log(country)
				console.log(state)
				console.log(city)
				console.log(jobcategory)
				console.log(services)
				console.log(specification)
			}
		}) 	   
	}
},
{
	method: 'GET',
	path: '/get/posted/details',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting posted details",
         notes:"in this route we are getting all posted details",
         auth:{
	    	strategy: 'restricted',
	    }

     },
	handler: (request, reply) =>{
		var jobs = {};
		var resumes = {};
		var services = {};
		jobsModel.find({},(err, allJobs) => {
			if (err){
				console.log(err);
				throw err;		
			}else{
				jobs=allJobs;
			}
		});
		ResumeModel.find({}, (err, allResume) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				resumes=allResume;
			}
		})
		ServiceModel.find({}, (err, allService) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				services=allService;
				reply.view('table', {jobs: jobs, resumes: resumes, services: services}, {layout: 'layout2'})
			}
		})	   
	}
},
{
	method: 'GET',
	path: '/ragistered/users',
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
		 description:"getting jobs",
         notes:"in this route we are getting all jobs"
     },
	handler: (request, reply) =>{
		var jobcategory = {};
		var services = {};
		var recentsers = {};	
		var recentjobs = {};
		var recentworkers = {}
		JobCategoryModel.find({}, (err, allJobCategory) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				jobcategory = allJobCategory;
			}
		})
		ServiceModel1.find({}, (err, allService) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				services=allService;
				// console.log(jobcategory)
				// console.log(services)
			}
		})
		ServiceModel.find().limit(10).exec({}, (err, recentservices) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				recentsers=recentservices;
			}
		}) 
		jobsModel.find().limit(5).exec({}, (err, recentjob) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				recentjobs=recentjob;
			}
		})
		ResumeModel.find().limit(5).exec({}, (err, recentworker) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				recentworkers=recentworker;
				return reply.view('index', {alljobcategory: jobcategory, allService: services, allrecentsers : recentsers, allrecentjobs :recentjobs, allrecentworkers :recentworkers  })
				
			}
		});	   
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
		var jobcategory = {}
		var allJobs = {}
		JobCategoryModel.find({}, (err, allJobCategory) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				jobcategory=allJobCategory;
			}
		})
		sleep.sleep(5)
		jobsModel.find({},(err, data) => {
			if (err){
				console.log(err);
				throw err;		
			}
			else{
				allJobs = data
				reply.view('SearchRightJobs', {allJobs : allJobs, jobcategorys: jobcategory})
				console.log(jobcategory)
				console.log(allJobs)
			}
		}); 	   
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
		var jobcategory = {}
		var allResume = {}
		JobCategoryModel.find().limit(100).exec({}, (err, allJobCategory) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				jobcategory=allJobCategory;
			}
		})
		sleep.sleep(5)
		ResumeModel.find().limit(50).exec({},(err, data) => {
			if (err){
				console.log(err);
				throw err;		
			}
			else{
				allResume=data
				reply.view('SearchRightWorker',{allResume : data, jobcategorys: jobcategory})
			}
		}); 	   
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
		ServiceModel1.find().limit(100).exec({}, (err, allService) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				services=allService;
			}
		}) 
		ServiceModel.find().limit(50).exec({},(err, data) => {
			if (err){
				console.log(err);
				throw err;		
			}
			else{
				allService=data
				reply.view('searchRightService',{allService : allService, services : services,})
				sleep.sleep(6)
				console.log(services)
				console.log(allService)
			}
		}); 	   
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
            var query = {$and:[{jobType:{$regex: request.query.jobType, $options: 'i'}},{state:{$regex: request.query.state, $options: 'i'}}]}
            
            jobsModel.find(query,function(err, data){
                if(err){
                    reply({'error':err});
                } else {
                    reply.view('SearchRightJobs',{allJobs : data})
                }
            });
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
                    return reply({'error':err});
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
            var query = {$and:[{TypeOfService:{$regex: request.query.TypeOfService, $options: 'i'}},{State:{$regex: request.query.State, $options: 'i'}}]}
            
            ServiceModel.find(query,function(err, data){
                if(err){
                    reply({'error':err});
                } else {
                	// reply({'data': data})
                    reply.view('searchRightService',{allService : data})
                }
            });
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
	path: '/admin/deshboard',
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
{
	method: 'GET',
	path: '/forgot/pass',
	config:{
            //include this route in swagger documentation
            tags:['api'],
            description:"getting foret password form",
            notes:"getting forget password form",
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
	handler: (request, reply) =>{
		reply.view('forget-pass', null,{layout: 'layout2'})
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
		method: 'GET',
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
				reply.redirect('/get/details')
			}
		});
	}
},
{
		method: 'GET',
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
				reply.redirect('/get/details')
			}
		});
	}
},
{
		method: 'GET',
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
				reply.view('error', {message: 'error in deleting city'}, {layout: 'layout2'})
			}else{
				reply.redirect('/get/details')
			}
		});
	}
},
{
		method: 'GET',
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
				reply.view('error', {message: 'error in deleting job category'}, {layout: 'layout2'})
			}else{
				reply.redirect('/get/details')
			}
		});
	}
},
{
		method: 'GET',
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
				reply.view('error', {message: 'error in deleting service'}, {layout: 'layout2'})
			}else{
				reply.redirect('/get/details')
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
		method: 'GET',
		path: '/delete/registered/user/{uuid}',
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
		UserModel.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply.view('error', {message: 'error in deleting job specification'}, {layout: 'layout2'})
			}else{
				reply.redirect('/ragistered/users')
			}
		});
	}
},
{
		method: 'GET',
		path: '/delete/user/resume/{uuid}',
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
		ResumeModel.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply.view('error', {message: 'error in deleting job specification'}, {layout: 'layout2'})
			}else{
				reply.redirect('/get/posted/details')
			}
		});
	}
},
{
		method: 'GET',
		path: '/delete/user/job/{uuid}',
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
		jobsModel.findOneAndRemove({_id: request.params.uuid}, function (error){
			if(error){
				reply.view('error', {message: 'error in deleting job specification'}, {layout: 'layout2'})
			}else{
				reply.redirect('/get/posted/details')
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
        jobsModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
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
]
export default routes;
