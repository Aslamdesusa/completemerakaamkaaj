import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import jwt from 'jsonwebtoken'
import swal from 'sweetalert';

const env2 = require('env2') 

const server = new Hapi.Server();
import routes from './routes'
import user from './userapi'

const port = process.env.PORT || 8080;

server.connection( {
    port: port,
    routes: { cors: true }
});

server.register([
    Inert,
    Vision,
    {
        register:require('hapi-swagger')
    }],
    function(err){
    if(err){
        server.log(['error'], 'hapi-swagger load error: ' + err)
    }
    else{
    }
        server.log(['start'], "hapi-swagger interface loaded!")
});

server.register(require('hapi-auth-cookie'), (err)=>{
  server.auth.strategy('restricted', 'cookie',{
    ttl: 24 * 60 * 60 * 1000, 
    password: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',
    cookie: 'merakaamkaaj-cookie',
    isSecure: false, 
    redirectTo: '/'
  });
})

server.state('emailid', {
  ttl: 24 * 60 * 60 * 1000,
  isHttpOnly: false,
  encoding: 'none',
  isSecure: process.env.NODE_ENV == 'production',
  path: '/',
  strictHeader: true
});

server.register( require( 'hapi-auth-jwt' ), ( err ) => {
    server.auth.strategy( 'token', 'jwt', {

        key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

        verifyOptions: {
            algorithms: [ 'HS256' ],
        }

    } );
    // We move this in the callback because we want to make sure that the authentication module has loaded before we attach the routes. It will throw an error, otherwise.
    server.route(routes)
    server.route(user)

} );


var assert = require('assert');
// require('env2')('env2');
console.log(process.env);
// var Hapi = require('hapi');
// var server = new Hapi.Server();
// server.connection({
//     host: 'localhost',
//     port: Number(process.env.PORT)
// });

var opts = {
  REDIRECT_URL: '/googleauth',  // must match google app redirect URI
  handler: require('./google_oauth_handler.js'), // your handler
  access_type: 'offline', // options: offline, online
  approval_prompt: 'auto', // options: always, auto
  scope: 'https://www.googleapis.com/auth/plus.profile.emails.read' // profile
};

var hapi_auth_google = require('../lib');

server.register([{ register: require('../lib'), options:opts }], function (err) {
  // handle the error if the plugin failed to load:
  assert(!err, "FAILED TO LOAD PLUGIN!!! :-("); // fatal error
});

server.route({
  method: 'GET',
  path: '/login',
  handler: function(req, reply) {
    var url = server.generate_google_oauth2_url();
        var imgsrc = 'https://developers.google.com/accounts/images/sign-in-with-google.png';
        var btn = '<a href="' + url +'"><img src="' +imgsrc +'" alt="Login With Google"></a>'
    reply(btn);
  }
});


module.exports = server;


server.views({
    engines: {
        html: require('handlebars')
    },
    path: 'merakaamkaaj',
    layout: 'layout'
})



server.route({
path: '/{path*}',
method: "GET",

handler: {
    directory: {
        path: 'merakaamkaaj',
        listing: true,

    }
}

});


server.start(err => {

    if (err) {

        console.error( 'Error was handled!' );
        // console.error( err );

    }
    console.log('hapi-auth-cookie successfully registered') 
    console.log( `Server started at ${ server.info.uri }` );

});
