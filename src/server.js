import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import jwt from 'jsonwebtoken'
import swal from 'sweetalert';

const fs = require('fs');

const env2 = require('env2') 

const server = new Hapi.Server();
import routes from './routes'
import user from './userapi'
import googleAuth from './googleAuth'


const Url = require('url');

const config = {
    host: '0.0.0.0',
    http: { port: process.env.PORT || 80 },
    https: {
        port: 443,
	ca: fs.readFileSync('/home/completemerakaamkaaj/src/merakaamkaaj_com.ca-bundle'),
        key: fs.readFileSync('/home/completemerakaamkaaj/src/my-server.key.pem'),
        cert: fs.readFileSync('/home/completemerakaamkaaj/src/merakaamkaaj_com.crt')
    }
}


server.connection({
    port: config.https.port,
    routes: {cors: true},
    tls: {
	ca: config.https.ca,
        key: config.https.key,
        cert: config.https.cert
    }
});

// const port = process.env.PORT || 80;

server.connection({ port: config.http.port });

server.ext('onRequest', (request, reply) => {

    if (request.connection.info.port !== config.https.port) {

        return reply.redirect(Url.format({
            protocol: 'https',
            hostname: request.info.hostname,
            pathname: request.url.path,
            port: config.https.port
        }));
    }

    return reply.continue();
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
    redirectTo: '/',
    isSameSite: 'Lax'
  });
});

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
    server.route(googleAuth)

} );

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

handler:{
    directory: {
        path: 'merakaamkaaj',
        listing: true

    }
}

});

server.start(function (){
    console.log('Server running');
});

