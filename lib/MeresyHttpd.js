
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

// Silent error handler.
function silentError(err) {
    return;
}

// Start the server
exports.start = function (port) {
    this.mTcpServer = app.listen(port, function () {
            console.log("MeresyHttpd started on port %d", port);
    }).on('error',function(err) {
        console.log("Meresy port listen failure.");
    });

    // Unlink if the socket is already there....
    fs.unlink(localSocketPath, silentError);

    this.mUnixServer = app.listen(localSocketPath, function () {
       console.log("MeresyHttpd started on local Unix socket path: %s\n", localSocketPath); 
    }).on('error',function(err) {
        console.log("MeresyHttpd: ERROR starting server on unix socket.");
    });
}

// Stop the server
exports.stop = function () {
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
exports.addHandler = function (method, path, handler) {
    app[method](path, handler);
}



