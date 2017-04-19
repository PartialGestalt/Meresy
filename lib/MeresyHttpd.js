
/**
 * MeresyHttpd -- HTTP-facing frontend for Meresy operations.
 */

/**
 * Module internals
 */
var pathTable = new Array;
var localSocketPath = "/tmp/.meresy_sock";

/**
 * Module dependencies
 * @private
 */
var app = require('express')();
var fs = require('fs');

exports = module.exports = MeresyHttpd;

function MeresyHttpd() {
    console.log('Creating a MeresyHttpd instance.');
    var mTcpServer;
    var mUnixServer;
}

// Expose underlying express framework.
exports.express = app;

// Default root handler.
var defaultHandler = function(req, resp) {
    console.log("Got request: " + req.method + ' ' + req.url + '\n');
    resp.writeHead(200,{'Content-Type': 'text/plain'});
    resp.end('Hello, World: You asked for ' + req.url + '\n');
};

// Silent error handler.
function silentError(err) {
    return;
}

// Start the server
exports.start = function(port) {
    this.mTcpServer = app.listen(port, function() {
        console.log("MeresyHttpd started on port %d",port);
    });

    // Unlink if the socket is already there....
    fs.unlink(localSocketPath,silentError);;
    
    this.mUnixServer = app.listen(localSocketPath, function() {
        console.log("MeresyHttpd started on local Unix socket path: %s\n",localSocketPath);
    });

    exports.addHandler('all','/*',defaultHandler);
}

// Stop the server
exports.stop = function() {
    this.mTcpServer.close();
    this.mUnixServer.close();
}

/**
 * Add a handler function to a path+method 
 * 
 * @param {String} method Method to handle ('get','post', etc.)
 * @param {String} path Path of request
 * @param {function} handler Express-like handler function 
 */
exports.addHandler = function(method,path,handler) {
    app[method](path,handler);
}



