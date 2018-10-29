import axios from 'axios';
import jwt from 'jsonwebtoken';

// import bson.objectid from 'ObjectId';

const db = require('../database').db;
const Joi = require('joi');
const fs = require('fs');
const path = require('path')
const jobsModel = require('../models/postjob');
const ServiceModel = require('../models/service')
const ResumeModel = require('../models/postresume')
const UserModel = require('../models/users')
const swal = require('../node_modules/sweetalert')
const nodemailer = require("nodemailer");
const localStorage = require('node-localstorage')
const opn = require('opn');
const JobCategoryModel = require('../models/addjobcategory')
const ServiceModel1 = require('../models/addservice')
const AuthCookie = require('hapi-auth-cookie')
const async = require('async');
var ObjectID = require('mongodb').ObjectID






const routes = [
{
    method:'POST',
    path:'/user/login',
    config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"getting details of a particular user",
        notes:"getting details of particular user",
        validate: {
         	payload:{
         		emailid:Joi.string().required(),
         		password:Joi.string().required(),

			}
		},
    },
    handler: function(request, reply){
    	
        UserModel.findOne({emailid: request.payload.emailid, 'password': request.payload.password}, function(err, data){
            if (err){
                reply({
                    'error': err
                });
            } else if (data.length == 0){
	            reply.view('error', {message: 'User dose not exists please try with your correct email and password', errormessage: '404 error'})
	        } 
            else if (data.Status == "SuperAdmin") {
            	var emailid = request.payload.emailid;
            	const token = jwt.sign({
            		emailid,
            		userid:data['_id'],
            	},'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
            		algorithm: 'HS256',
            		expiresIn: '1h',
            	});
            	reply.state('emailid', emailid)
            	request.cookieAuth.set({ token });
            	return reply.redirect('/admin/deshboard')
            }else if (data.Status == "User") {
            	request.cookieAuth.set(data);
                return reply.redirect('/user/deshboard')
            }
        })

    }
},
{
		method: 'GET',
		path: '/user/deshboard',
		config:{
	    //include this route in swagger documentation
	    tags:['api'],
	    description:"getting details of a particular user",
	    notes:"getting details of particular user",
	    auth:{
	    	strategy: 'restricted',
	    }
	},
	handler:(request, h)=>{
  		let authenticated_user = request.auth.credentials;
  		let email_id = authenticated_user.emailid;
  		console.log(authenticated_user)
        UserModel.findOne({emailid: email_id}, function(err, user){
        	if (err) {
        		throw err
        		console.log(err)
        	}else{
        		return h.view('deshboard1', {userdata: user, message: '“It is a great honour to have you in our team. Congratulations and welcome.”',}, {layout: 'layout3'})
        		
        	}
        });
	}

},
{
	method: 'POST',
	path: '/Registere/user',
	config: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"Registere user details",
         notes:"in this route we can post details of a user",
         validate: {
         	payload:{
         		fullname:Joi.string().required(),
         		gender:Joi.string().required(),
         		emailid:Joi.string().required(),
         		password:Joi.string().required(),
    			lookingfor:Joi.string().required(),

			}
		},
	},
	handler: (request, reply) => {
		// console.log(request.payload)
		var newUser = new UserModel(request.payload);
		newUser.save(function (err, data){
			if (err) {
				throw err;
				console.log(err);
			}else {
				reply({
					statusCode: 200,
					message: "new user successfully Registered",
					data: data
				});
			}
		});
	}
	
},
{
	method: 'POST',
	path: '/user/post/service',
	config: {
    	payload: {
    		output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        auth:{
    		strategy: 'restricted',
	    },
    },
	handler: (request, reply) => {
		let authenticated_user = request.auth.credentials.emailid;
  		// let email_id = authenticated_user.emailid;
  		console.log(authenticated_user)
        var uuid = {}
		var service = new ServiceModel({
			 	//service Details
			    "userobjectid": authenticated_user,
			    "verifi": request.payload.verifi,
			    "TypeOfService": request.payload.TypeOfService,
				"Specification": request.payload.specification,
				"ProvideServices": request.payload.ProvideServices,
				"ProviderRegistered": request.payload.ProviderRegistered,
				"RegisteredExpiry": request.payload.RegisteredExpiry,
				"Country": request.payload.Country,
				"State": request.payload.State,
				"City": request.payload.City,
				"Area": request.payload.Area,
				"Agency": request.payload.Agency,
				"Representative": request.payload.Representative,
				"MobileNumber": request.payload.MobileNumber,
				"LandNumber": request.payload.LandNumber,
				"Timing": request.payload.Timing,
				"aadharcard": request.payload.aadharcard,
				"website": request.payload.website,
				"emailMobile": request.payload.emailMobile,
				"address": request.payload.address,
				"pincode": request.payload.pincode,
				"information": request.payload.information,
				"payment": request.payload.payment,
				"isAgreeAdmin": false,
			});
		service.save(function (err, data){
			if (err) {
				// console.log(err);
				throw err;
			}else {

				reply(data)
				uuid=data;
				console.log(uuid._id)
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
	path: '/send/otp',
	handler: function(request, reply){
		var otp = Math.floor(Math.random() * 90000) + 10000;
		var newUser = new UserModel({
			"firstname": request.payload.firstname,
			"lastname": request.payload.lastname,
			"mobile": request.payload.mobile,
			"emailid": request.payload.emailid,
			"password": request.payload.password,
			"address": request.payload.address,
			"state": request.payload.state,
			"city": request.payload.city,
			"pincode": request.payload.pincode,
			"gender": request.payload.gender,
			"lookingfor": request.payload.lookingfor,
			"otp": otp
		});
		request.cookieAuth.set(newUser);
		console.log(newUser)
		let otpmessage = 'merakaamkaaj.com \n Your OTP is:'+otp
		axios.request('http://zapsms.co.in/vendorsms/pushsms.aspx?user=merakaamkaaj&password=merakaamkaaj&msisdn='+request.payload.mobile+'&sid=MERAKK&msg='+otpmessage+'&fl=1&gwid=2')
		  .then(reply => {
		  	console.log('messages sent to your number')
		  })
		  .catch(error => {
		    console.log(error);
		  });
		  return reply.view('confirmemail', {message: "We've sent an OTP to "+request.payload.mobile+". If this is a valid Phone Number, you should receive an OTP within the next few minutes.", successmessage: '200'})
	}
},
{
    method:'POST',
    path:'/verifing/phone/number',
    config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"getting details of a particular user",
        notes:"getting details of particular user",
        auth:{
    		strategy: 'restricted',
	    }
    },
    handler: function(request, reply){
      	var headers = request.auth.credentials;
  		let otp = headers.otp;	
  		console.log(otp)
  		var newUser = new UserModel(headers);
  		if (otp == request.payload.otp) {
  			newUser.save(function(err, data){
  				if (err) {
  					return reply.view('error', {message: 'User Already Exists Please Try With Another Email or Phone Number', errormessage: '400'})
  				}else{
  					let success = 'Registered Successfully Thanks To Be A Member Of Merakaamkaaj.com your ID: '+headers.emailid+' Your Password: '+headers.password+''
  					axios.request('http://zapsms.co.in/vendorsms/pushsms.aspx?user=merakaamkaaj&password=merakaamkaaj&msisdn='+headers.mobile+'&sid=MERAKK&msg='+success+'&fl=0&gwid=2')
  					.then(reply => {
  						console.log("messages sent to your number")
  					})
  					.catch(error => {
  						console.log(error);
  					});
  					return reply.view('error', {errormessage: '200', message:'Your Profile Has Successfully Made By Mera Kaam kaaj Please Login First', message3: 'LOGIN'})
  				}
  			})
  		}else{
  			return reply.view('error', {message: "Wrong OTP Please Try With Correct OTP PIN if you Didn't Get Any Code Please Go Back And Try Again", errormessage: '400'})
  		}
    }
},
{
	method:  'POST',
	path: '/sending/mail',
	config: {
    	payload: {
    		output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
    },
	handler: (request, h) => {
		// var userdata = {}
		var uuid = {}
		var otp = Math.floor(Math.random() * 90000) + 10000;
		var transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
			    user: 'aslam17@navgurukul.org', // generated ethereal user
			    pass: 'aslam#desusa' // generated ethereal password
			}
			});
			// setup email data with unicode symbols
	    	var mailOptions = {
		        from: '"Mera kaam Kaaj " <aslam17@navgurukul.org>', // sender address
		        to: request.payload.emailid,  // list of receivers
		        subject: 'Mera Kaamk Kaaj email verification message', // Subject line
		        text: 'Hello world', // plain text body
		        html: '<div style="width: 100%"><span style="background: #f26136; font-size: 22px; color: white; padding:16px; display: flex; justify-content: center;">Dear Mera Kaam Kaaj.Com  User</span><br><br>We received a request for registration in merakaamkaaj.com through your email address. Your verification CODE is :<br><br> '+otp+'<br><br> Please note for registration. If you did not request this, it is possible that someone else is trying to access the Account in merakaamkaaj.com. <b>Do not forward or give this code to anyone</b>.<br><br>You received this message because this email address is listed for registration in merakaamkaaj.com. Please click <a href="/">here</a> to ACCESS your account in merakaamkaaj.com.<br><br>Sincerely yours,<br><br>The merakaamkaaj.com tea,</div>' // html body
		    };
		// var newUser = new UserModel(request.payload,);
		var newUser = new UserModel({
				"firstname": request.payload.firstname,
				"lastname": request.payload.lastname,
				"mobile": request.payload.mobile,
				"emailid": request.payload.emailid,
				"password": request.payload.password,
				"address": request.payload.address,
				"state": request.payload.state,
				"city": request.payload.city,
				"pincode": request.payload.pincode,
				"lookingfor": request.payload.lookingfor,
				"otp": otp
			});
		UserModel.find({emailid: request.payload.emailid},function(err, docs){
			if (docs.length) {
				return h.view('error', {message: request.payload.emailid+' Already Exists Please Try With Another Email', errormessage: '409'})
						console.log('user already exists')
			}else{
				newUser.save(function(err, data){
					if (err) {
						throw err
					}else{
						uuid=data;
						console.log(uuid._id)
						var dataa = request.payload;
			            if (dataa.image) {
			                var name = uuid._id + ".jpg";
			                const __dirname = '../completemerakaamkaaj/merakaamkaaj/uploads'
			                var path = __dirname + "/profileImage/" + name;
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
						transporter.sendMail(mailOptions, (err, info) => {
							if (err) {
								throw err;
								console.log(err);
							}else{
								h.state('emailid', data.emailid)
								return h.view('confirmemail', {message: "We've sent an email to "+request.payload.emailid+". If this is a valid email address, you should receive an email with your username(s) within the next few minutes.", successmessage: '200'})
							}
						});
					}
				})
			}
		});
	}
},
{
    method:'POST',
    path:'/verifing/email/address',
    config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"getting details of a particular user",
        notes:"getting details of particular user",
    },
    handler: function(request, reply){
      	var headers = request.headers.cookie.split('=')
        var email = headers[1].split(';')[0]
        var params = email
        UserModel.find({'emailid': params, 'otp' : request.payload.otp}, function(err, data){
            if(err){
                return reply.view('error', {message: 'Wrong OTP Please Fill Right OTP', errormessage: '400'})
            } else {
                return reply.view('error', {errormessage: '200', message:'Your Profile successfully Made By Mera Kaam kaaj Please login first', message3: 'LOGIN'})
            }
        });
    }
},
// ============user getting posted details and getting form ==================================
{
		method: 'GET',
		path: '/user/posted/details',
		config:{
		//include this route in swagger documentation
		tags:['api'],
		description:"getting  admin form",
	    notes:"getting form",
	    auth:{
    		strategy: 'restricted',
	    }
    },
	handler: (request, h)=>{
		let authenticated_user = request.auth.credentials;
  		let email_id = authenticated_user.emailid;
        UserModel.findOne({emailid: email_id}, function(err, user){
        	if (err) {
        		throw err
        	}else{
        		console.log(user)
        		return h.view('userposted', {userdata: user,}, {layout: 'layout3'})
        	}
        });
	}
},
{
		method: 'GET',
		path: '/user/forms',
		config:{
		//include this route in swagger documentation
		tags:['api'],
		description:"getting  admin form",
	    notes:"getting form",
	    auth:{
    		strategy: 'restricted',
	    }
    },
	handler: (request, h)=>{
		let authenticated_user = request.auth.credentials;
  		let email_id = authenticated_user.emailid;
        UserModel.findOne({emailid: email_id}, function(err, user){
        	if (err) {
        		throw err
        	}else{
        		console.log(user)
        		return h.view('form1', {userdata: user,}, {layout: 'layout3'})
        	}
        });
	}
},
{
    method:'POST',
    path:'/android/user/login',
    config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"android api",
        notes:"User can login",
        validate: {
         	payload:{
         		emailid:Joi.string().required(),
         		password:Joi.string().required(),

			}
		},
    },
    handler: function(request, reply){
    	
        UserModel.findOne({'emailid': request.payload.emailid, 'password': request.payload.password}, function(err, data){
            if (err){
            	reply({'error': err});
            }else if (!data){
                reply({StatusCode: 404, message: 'User dose not exists please try with your correct email and password'})
            }else{
            	request.cookieAuth.set(data);
            	return reply(data)
            } 
        })

    }
},
{
		method: 'GET',
		path: '/android/user/deshboard',
		config:{
	    //include this route in swagger documentation
	    tags:['api'],
	    description:"getting details of a particular user",
	    notes:"getting details of particular user",
	    auth:{
	    	strategy: 'restricted',
	    }
	},
	handler:(request, h)=>{
  		let authenticated_user = request.auth.credentials;
  		let email_id = authenticated_user.emailid;
  		console.log(email_id)
        UserModel.findOne({emailid: email_id}, function(err, user){
        	if (err) {
        		throw err
        		console.log(err)
        	}else{
        		return h(user)
        		
        	}
        });
	}

},
{
	method: 'POST',
	path: '/android/Registere/user',
	config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"verifing phone number",
        notes:"verifing phone number",
        validate: {
         	payload:{
         		firstname:Joi.string().required(),
         		lastname:Joi.string().required(),
         		mobile:Joi.string().required(),
         		emailid:Joi.string().required(),
         		password:Joi.string().required(),
         		address:Joi.string().required(),
         		state:Joi.string().required(),
         		city:Joi.string().required(),
         		pincode:Joi.number().required(),
         		gender:Joi.string().required(),
         		lookingfor:Joi.string().required(),

			}
		},
    },
	handler: function(request, reply){
		var otp = Math.floor(Math.random() * 90000) + 10000;
		var newUser = new UserModel({
			"firstname": request.payload.firstname,
			"lastname": request.payload.lastname,
			"mobile": request.payload.mobile,
			"emailid": request.payload.emailid,
			"password": request.payload.password,
			"address": request.payload.address,
			"state": request.payload.state,
			"city": request.payload.city,
			"pincode": request.payload.pincode,
			"gender": request.payload.gender,
			"lookingfor": request.payload.lookingfor,
			"otp": otp
		});
		UserModel.findOne({'mobile': request.payload.mobile}, function(err, data){
			if (!data) {
				request.cookieAuth.set(newUser);
				console.log(newUser)
				let otpmessage = 'merakaamkaaj.com \n Your OTP is:'+otp
				axios.request('http://zapsms.co.in/vendorsms/pushsms.aspx?user=merakaamkaaj&password=merakaamkaaj&msisdn='+request.payload.mobile+'&sid=MERAKK&msg='+otpmessage+'&fl=1&gwid=2')
				.then(function(response){
					return reply({StatusCode: 200, message: "We've sent an OTP to "+request.payload.mobile+". If this is a valid Phone Number, you should receive an OTP within the next few minutes."})
				})
				.catch(error => {
					console.log(error);
				});
			}else{
				return reply({StatusCode: 404, message: 'User Already Exists Please Try With Another Email or Phone Number'})
			}
		});
	}
},
{
    method:'POST',
    path:'/android/verifing/phone/number',
    config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"verifing phone number",
        notes:"verifing phone number",
        validate:{
        	payload:{
        		otp:Joi.string().required(),
        	}
        },
        auth:{
    		strategy: 'restricted',
	    }
    },
    handler: function(request, reply){
      	var headers = request.auth.credentials;
  		let otp = headers.otp;	
  		console.log(otp)
  			if (otp == request.payload.otp) {
  				var newUser = new UserModel(headers);
  				newUser.save(function(err, data){
  					if (err) {
  						return reply({StatusCode: 400, message: 'User Already Exists Please Try With Another Email or Phone Number'})
  					}else{
  						let success = 'Registered Successfully Thanks To Be A Member Of Merakaamkaaj.com your ID: '+headers.emailid+' Your Password: '+headers.password+''
  						axios.request('http://zapsms.co.in/vendorsms/pushsms.aspx?user=merakaamkaaj&password=merakaamkaaj&msisdn='+headers.mobile+'&sid=MERAKK&msg='+success+'&fl=0&gwid=2')
  						.then(function(result){
  							return reply({StatusCode: 200, message:'Your Profile Has Successfully Made By Mera Kaam kaaj Please Login First'})
  						})
  						.catch(error => {
  						console.log(error);
  					});
  				}
  			})
  			}else{
  				return reply({StatusCode: 404, message: "Wrong OTP Please Try With Correct OTP PIN if you Didn't Get Any Code Please Go Back And Try Again"})
  			}
    }
},
{
        method:'GET',
        path:'/android/search/jobs',
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
                    reply(err);
                } else {
                    reply(data)
                }
            });
        }
    },
    {
        method:'GET',
        path:'/android/search/service',
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
                    reply(err);
                } else {
                	reply(data)
                    // reply.view('searchRightService',{allService : data})
                }
            });
        }
    },
{
	method: 'GET',
	path: '/android/our/workers',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting workers",
         notes:"in this route we are getting all workers"
     },
	handler: (request, reply) =>{
		JobCategoryModel.find({}, (err, allJobCategory) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				reply({
					messageCode: 200,
					message: 'success',
					data: allJobCategory
				});
			}
		});   
	}
},
{
	method: 'GET',
	path: '/android/our/services',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting jobs",
         notes:"in this route we are getting all jobs"
     },
	handler: (request, reply) =>{
		ServiceModel1.find({}, function(err, data){
			if (err) {
				console.log(err);
				throw err;
			}else{
				reply(data)
				// console.log(jobcategory)
				// console.log(services)
			}
		}); 
	}
},
{
	method: 'GET',
	path: '/android/recent/services',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting jobs",
         notes:"in this route we are getting all jobs"
     },
	handler: (request, reply) =>{
		// var recentsers = {};	
		// var recentjobs = {};
		ServiceModel.find().limit(10).exec({}, (err, data) =>{
			if (err) {
				console.log(err);
				throw err;
			}else{
				reply(data)
			}
		})    
	}
},
{
	method: 'GET',
	path: '/android/recent/right/worker/job',
	config	: {
		 //include this route in swagger documentation
		 tags:['api'],
		 description:"getting jobs",
         notes:"in this route we are getting all jobs"
     },
	handler: (request, reply) =>{	
		var recentjobs = {};
		var recentworkers = {}
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
				reply({
					recentjobs: recentjobs,
					recentworkers: recentworkers,
				});
			}
		});	   
	}
},
// ==============================================
// POST JOB POST RESUME POST SERVICE
{
	method: 'POST',
	path: '/android/user/post/service',
	config: {
        //include this route in swagger documentation
        tags:['api'],
        description:"verifing phone number",
        notes:"verifing phone number",
    	payload: {
    		output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        auth:{
    		strategy: 'restricted',
	    },
    },
	handler: (request, reply) => {
		let authenticated_user = request.auth.credentials.emailid;
  		// let email_id = authenticated_user.emailid;
  		console.log(authenticated_user)
        var uuid = {}
		var service = new ServiceModel({
			 	//service Details
			    "userobjectid": authenticated_user,
			    "verifi": request.payload.verifi,
			    "TypeOfService": request.payload.TypeOfService,
				"Specification": request.payload.specification,
				"ProvideServices": request.payload.ProvideServices,
				"ProviderRegistered": request.payload.ProviderRegistered,
				"RegisteredExpiry": request.payload.RegisteredExpiry,
				"Country": request.payload.Country,
				"State": request.payload.State,
				"City": request.payload.City,
				"Area": request.payload.Area,
				"Agency": request.payload.Agency,
				"Representative": request.payload.Representative,
				"MobileNumber": request.payload.MobileNumber,
				"LandNumber": request.payload.LandNumber,
				"Timing": request.payload.Timing,
				"aadharcard": request.payload.aadharcard,
				"website": request.payload.website,
				"emailMobile": request.payload.emailMobile,
				"address": request.payload.address,
				"pincode": request.payload.pincode,
				"information": request.payload.information,
				"payment": request.payload.payment,
				"isAgreeAdmin": false,
			});
		service.save(function (err, data){
			if (err) {
				// console.log(err);
				reply(err)
			}else {

				reply(data)
				uuid=data;
				console.log(uuid._id)
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
	path: '/android/user/post/resume',
	config: {
        //include this route in swagger documentation
        tags:['api'],
        description:"post resume with image",
        notes:"user can post reumse with there image",
    	payload: {
    		output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        auth:{
    		strategy: 'restricted',
	    },
    },
	handler: (request, reply) => {
		let authenticated_user = request.auth.credentials.emailid;
  		// let email_id = authenticated_user.emailid;
  		console.log(authenticated_user)
        var uuid = {}
		var newResume = new ResumeModel({
			 	//resume Details
		 	    "objectid": authenticated_user,
				"Declration": request.payload.Declration,
				"verifi": "deactive",
				"pwid": request.payload.pwid,
				"JobCat":request.payload.JobCat,
				"Name":request.payload.Name,
				"Mobile": request.payload.Mobile,
				"AlternateNum":request.payload.AlternateNum,
				"EmailorMobile": request.payload.EmailorMobile,
				"AdharNo":request.payload.AdharNo,
				"Country":request.payload.Country,
				"State":request.payload.State,
				"City":request.payload.City,
				"Area":request.payload.Area,
				"Pincode":request.payload.Pincode,
				"Address":request.payload.Address,

				//About My Self
				"Gender":request.payload.Gender,
				"DOB":request.payload.DOB,
				"Religin":request.payload.Religin,
				"knownLanguage":request.payload.knownLanguage,


				//Education Details
				"Class":request.payload.Class,
				"Degree":request.payload.Degree,
				"PG":request.payload.PG,
				"Diploma":request.payload.Diploma,
				"Course":request.payload.Course,
				"CareerObjective":request.payload.CareerObjective,
				"OtherDetails":request.payload.OtherDetails,

				// OtherDetails
				"ReferenceName":request.payload.ReferenceName,
				"ReferenceMobile":request.payload.ReferenceMobile,

				// Looking Overseas?
				"LookingOverseas": request.payload.LookingOverseas,

				// Please Tick If do you have current Work Details

				"NameofImpoloyer":request.payload.NameofImpoloyer,
				"PositionDesignation":request.payload.PositionDesignation,
				"MainJobCategory":request.payload.MainJobCategory,
				"Skills":request.payload.Skills,
				"Experience":request.payload.Experience,
				"currentSalary":request.payload.currentSalary,
				"ExpSalary":request.payload.ExpSalary,
				"PriferredShift":request.payload.PriferredShift,
				"PriferredJobDescription":request.payload.PriferredJobDescription,
				"PriferredLocation":request.payload.PriferredLocation,

				// If do you have past work Details
				"NameofImpoloyer1":request.payload.NameofImpoloyer1,
				"PositionDesignation1":request.payload.PositionDesignation1,
				"JobCategory1":request.payload.JobCategory1,
				"State1City1":request.payload.State1City1,
				'Experience1':request.payload.Experience1,
				"shift1":request.payload.shift1,
				"jobDescription1":request.payload.jobDescription1,
				"SalaryWithdrawn":request.payload.SalaryWithdrawn,
			});
		newResume.save(function (err, data){
			if (err) {
				// console.log(err);
				reply(err)
			}else {

				reply(data)
				uuid=data;
				console.log(uuid._id)
				var dataa = request.payload;
	            if (dataa.image) {
	                var name = uuid._id + ".jpg";
	                const __dirname = '../completemerakaamkaaj/merakaamkaaj/uploads'
	                var path = __dirname + "/resume/" + name;
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
	path: '/android/user/post/job',
	config: {
        //include this route in swagger documentation
        tags:['api'],
        description:"post Job with image",
        notes:"user can post Job with there image",
    	payload: {
    		output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        auth:{
    		strategy: 'restricted',
	    },
    },
	handler: (request, reply) => {
		let authenticated_user = request.auth.credentials.emailid;
  		// let email_id = authenticated_user.emailid;
  		console.log(authenticated_user)
        var uuid = {}
		var newJob = new jobsModel({
			 // Job Object
			 //Job Details
		    "objectid":authenticated_user,
		    "verifi": "deactive",
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
		    "paymentPlan":request.payload.paymentPlan,

			});
		newResume.save(function (err, data){
			if (err) {
				// console.log(err);
				reply(err)
			}else {

				reply(data)
				uuid=data;
				console.log(uuid._id)
				var dataa = request.payload;
	            if (dataa.image) {
	                var name = uuid._id + ".jpg";
	                const __dirname = '../completemerakaamkaaj/merakaamkaaj/uploads'
	                var path = __dirname + "/Jobs/" + name;
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
	path: '/search/right/worker',
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
			var query = {$and:[{JobCat:{$regex: request.query.JobCat, $options: 'i'}}]}
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ResumeModel.find(query)
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
	path: '/search/right/jobs',
	config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"Getting Jobs from pic our workers",
        notes:"Getting Jobs from pic our worker",
    },
	handler: (request, reply) =>{
		// return reply('dsf')
		async function getallDetails(){
     		var jobs;
			var jobcat;
			var query = {$and:[{jobType:{$regex: request.query.jobType, $options: 'i'}}]}
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		jobsModel.find(query)
     		.then(function(allService){
     			console.log(allService)
     			jobs = allService
     			JobCategoryModel.find({})
     			.then(function(allJobCategory){
     				jobcat = allJobCategory
	     			return reply.view('SearchRightJobs', {allJobs : jobs, jobcategorys: jobcat})

	     			// return reply({allResume : worker, jobcategorys: jobcat})
     			});
     		});
     	}
     	getallDetails();
	}
},
{
	method: 'GET',
	path: '/search/right/services',
	config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"Getting Jobs from pic our workers",
        notes:"Getting Jobs from pic our worker",
    },
	handler: (request, reply) =>{
		// return reply('dsf')
		async function getallDetails(){
     		var service;
			var serCat;
			var query = {$and:[{TypeOfService:{$regex: request.query.TypeOfService, $options: 'i'}}]}
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ServiceModel.find(query)
     		.then(function(allService){
     			console.log(allService)
     			service = allService
     			ServiceModel1.find({})
     			.then(function(allserCategory){
     				serCat = allserCategory
	     			return reply.view('searchRightService', {allService : service, services: serCat})
	     			// return reply({allService : service, services: serCat})
     			});
     		});
     	}
     	getallDetails();
	}
},
// {
// 	method: 'GET',
// 	path: '/search/right/worker',
// 	config:{
//         //include this route in swagger documentation
//         tags:['api'],
//         description:"getting admin form",
//         notes:"getting form",
//     },
// 	handler: (request, reply) =>{
// 		// return reply('dsf')
// 		async function getallDetails(){
//      		var worker;
// 			var jobcat;
// 			var query = {$and:[{TypeOfService:{$regex: request.query.TypeOfService, $options: 'i'}}]}
//      		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
//      		ServiceModel.find(query)
//      		.then(function(allService){
//      			worker = allworker
//      			JobCategoryModel.find({})
//      			.then(function(allJobCategory){
//      				jobcat = allJobCategory
// 	     			return reply.view('SearchRightWorker', {allResume : worker, jobcategorys: jobcat})

// 	     			// return reply({allResume : worker, jobcategorys: jobcat})
//      			});
//      		});
//      	}
//      	getallDetails();
// 	}
// },
{
	method: 'GET',
	path: '/world/{worker}',
	config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"getting  admin form",
        notes:"getting form",
        validate:{
            params:{
                worker:Joi.string()
            }
        },
    },
	handler: function(request, reply){
		// return reply('dsf')
		async function getallDetails(){
     		var worker;
			var jobcat;
     		await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
     		ResumeModel.find(query)
     		.then(function(allworker){
     			worker = allworker
     			JobCategoryModel.find()
     			.then(function(allJobCategory){
     				jobcat = allJobCategory
	     			return reply.view('searchRightService', {allResume : worker, jobcategorys: jobcat})
     			});
     		});
     	}
     	getallDetails();
	}
},
{
	method: 'GET',
	path: '/change/status/to/verify/unverify',
	config:{
        //include this route in swagger documentation
        tags:['api'],
        description:"admin can change the status of any data",
        notes:"admin can cahnge the status of any data which is verify of not",
    },
	handler: function(request, reply){
		var unverify = ({
			verifi: "In Active"
		});
		var varify = ({
			verifi: "Active"
		});
		ServiceModel.findOne({_id: ObjectID(request.query._id)}, function(err, result){
			if (result.verifi == "Active") {
				ServiceModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, unverify, function(err, data){
				console.log('got it')
					if (err) {
						throw err
					}else{
						reply({message: "Successfully In Active Service"})
					}
				})
			}else if (result.verifi == "In Active") {
				ServiceModel.findOneAndUpdate({_id: ObjectID(request.query._id)}, varify, function(err, data){
					if (err) {
						throw err
					}else{
						reply({message:'Successfully Active Service'})
					}
				})
			}
		})
	}
},
]
export default routes;
 
