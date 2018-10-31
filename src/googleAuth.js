import axios from 'axios';
const UserModel = require('../models/users')

const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
	"983334721086-0og89te5vlqjq886s8if06vb3laaf8tr.apps.googleusercontent.com",
	"DfJBm1Q7aLNqHFx30uUEkCtp",
	"http://localhost:8000/oauthcallback"
);


// https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=



// generate a url that asks permissions for Google+ and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.me',
	'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  // If you only need one scope you can pass it as a string
  scope: scopes
});



const routes = [
{
    method: 'GET',
    path: '/login',
    handler: function (request, reply) {
    	async function openUrl(){
    		return reply.redirect(url)

		}
    openUrl();
    }
},
{
    method: 'GET',
    path: '/oauthcallback',
    handler: function (request, reply) {
      async function getcode(){
        var code = request.query.code
        const {tokens} = await oauth2Client.getToken(code)
          oauth2Client.setCredentials(tokens)
            request.cookieAuth.set({ tokens });
            if (tokens.refresh_token) {
              // store the refresh_token in my database!
              console.log('refresh_token: '+ tokens.refresh_token);
              axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+tokens.refresh_token)
              .then(function(data){
                console.log(data)
                console.log('data')
                var newUser = new UserModel({
                      "firstname": data.data.given_name,
                      "lastname": data.data.family_name,
                      "mobile": data.data.email,
                      "emailid": data.data.email,
                      "password": "N/A",
                      "address": "N/A",
                      "state": "N/A",
                      "city": "N/A",
                      "pincode": "N/A",
                      "gender": data.data.gender,
                      "lookingfor": "N/A",
                      "Status": "User",
                      "picture": data.data.picture.split('https').join('http')
                    });
                  UserModel.findOne({emailid: data.data.email})
                .then(function(result){
                  console.log(result)
                  console.log('result')
                  if (!result) {
                    request.cookieAuth.set(newUser);
                    return reply.redirect('/homepage/1')
                  }else{
                    request.cookieAuth.set(newUser);
                    return reply.redirect('/user/deshboard')
                  }
                });
              })
              .catch(error => {
                console.log(error);
              });
            }else{
              axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+tokens.access_token)
              .then(function(data){
                console.log(data)
                console.log('data')
                var newUser = new UserModel({
                      "firstname": data.data.given_name,
                      "lastname": data.data.family_name,
                      "mobile": data.data.email,
                      "emailid": data.data.email,
                      "password": "N/A",
                      "address": "N/A",
                      "state": "N/A",
                      "city": "N/A",
                      "pincode": "N/A",
                      "gender": data.data.gender,
                      "lookingfor": "N/A",
                      "Status": "User",
                      "picture": data.data.picture.split('https').join('http')
                    });
                UserModel.findOne({emailid: data.data.email})
                .then(function(result){
                  if (!result) {
                    request.cookieAuth.set(newUser);
                    return reply.redirect('/homepage/1')
                  }else{
                    request.cookieAuth.set(newUser);
                    return reply.redirect('/user/deshboard')
                  }
                });
              })
              .catch(error => {
                console.log(error);
              });
            }
        }
        getcode();
      }
},
{
  method: 'GET',
  path: '/homepage/1',
  config:{
    auth:{
      strategy: 'restricted'
    }
  },
  handler: function(request, reply){
    let authenticated_user = request.auth.credentials;
    var newUser = new UserModel(authenticated_user);
    newUser.save(function(err, data){
      if (err) {
        reply('user already exist please')
      }else{
        return reply.redirect('/user/deshboard')
      }
    })

  }
},
]
export default routes;