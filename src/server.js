import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import jwt from 'jsonwebtoken'
import swal from 'sweetalert';



const fs = require('fs');
var twilio = require('twilio');

var accountSid = 'AC96238b59aa712b06782efb300aff3b1b'; // Your Account SID from www.twilio.com/console
var authToken = '11629c5553952f47f29f3465afb3c719';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+918527448428',  // Text this number
    from: '+919205169278' // From a valid Twilio number
})
.then((message) => console.log(message.sid));


const server = new Hapi.Server();
import routes from './routes'

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
    password: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',
    cookie: 'session',
    isSecure: false, 
    redirectTo: '/'
  });
})

server.state('emailid', {
  ttl: 24 * 60 * 1000,
  isHttpOnly: false,
  encoding: 'none',
  // isSecure: process.env.NODE_ENV == 'production',
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
    routes.forEach( ( route ) => {
	    console.log( `attaching ${ route.path }` );
	    server.route( route );
	} );

} );


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
