#!/bin/env node


/**
 * Module dependencies.
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib');
var http = require('http')
  , path = require('path')
  , socket = require('socket.io');

var config = {
    title: 'Real Time Connection PostgreSQL - NodeJS'
}

var App = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.IP_ADDRESS || '';
        self.port      = process.env.PORT || 3000;
    };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.render('index', { title: config.title });
        };

        self.routes['/zxvf'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.render('admin', { title: Date(Date.now())+': Node server started on '+self.ipaddress+' : '+self.port+' ...' });
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express();
        self.app.configure(function(){
          self.app.set('views', __dirname + '/views');
          self.app.set('view engine', 'ejs');
          self.app.use(express.bodyParser());
          self.app.use(express.methodOverride());
          self.app.use(express.cookieParser());
          self.app.use(express.session( {secret: 'rahasia'} ));
          self.app.use(stylus.middleware( {src: __dirname + '/assets', compile: function(str, path) {
                  return stylus(str).set('filename', path).use(nib());
              }
          } ));
          self.app.use(express.static(path.join(__dirname, 'assets')));
        });

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        self.http = http.createServer(self.app).listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now()), self.ipaddress, self.port);
        });
    };

};



/**
 *  main():  Main code.
 */

var zapp = new App();
zapp.initialize();
zapp.start();
 
//start io
var io = socket.listen(zapp.http);
// Delete this row if you want to see debug messages
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
  
    socket.on('hi', function () {
        data = { name: 'Test', message: 'Hi Too!' };
        io.sockets.emit('init', data);
    });
    
    socket.on('pgsql', function (data) {
        //do something with data
        console.log(data);
        socket.broadcast.emit("pgsql", data);
    });
  
    socket.on('disconnect', function () {
        //disconnected users
    });
});