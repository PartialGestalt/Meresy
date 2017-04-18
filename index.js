/*!
 * Meresy
 */

'use strict';

/**
 * Application dependencies
 * @private
 */
var MeresyNumber = require('./lib/MeresyNumber');
var Httpd = require('./lib/MeresyHttpd');

/**
 * Add a handler for quitting.
 */
function doExit() {
    Httpd.stop();
    process.exit(0);
}

Httpd.addHandler('get','/quit',function(q,r) {
   setTimeout(100,doExit()); 
});

process.on('exit',()=> {
    console.log("Exiting.");
})

/**
 * Business end of the stick
 */
Httpd.start(8081);