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
var Url = require('url');

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
});

Httpd.addHandler('get','/numencode', (q,r) => {
    var input = Url.parse(q.url);
    console.log("You asked for: " + input.query);
    r.writeHead(200,{'Content-Type': 'text/plain'});
    r.write('NumEncode: You asked for ' + input.query + '\n');
    var encoded = MeresyNumber.encode(input.query)
    r.write('Encoded to: ' + encoded + '\n');
    r.end('Decoded back to: ' + MeresyNumber.decode(encoded));
});

/**
 * Business end of the stick
 */
Httpd.start(8081);