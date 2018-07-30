import axios from 'axios';
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
const sleep = require('sleep');
const opn = require('opn');
const AuthCookie = require('hapi-auth-cookie')






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
    	
        UserModel.find({emailid: request.payload.emailid, 'password': request.payload.password}, function(err, data){
            if (err){
                reply({
                    'error': err
                });
            } else if (data.length == 0){
                reply.view('error', {message: 'User dose not exists please try with your correct email and password', errormessage: '404 error'})
            } else {
                    request.cookieAuth.set(data[0]);
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
  		console.log(email_id)
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

// ==============================================
]
export default routes;
