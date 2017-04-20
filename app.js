/*!
 * Meresy
 */

'use strict';

/**
 * Choose target based on mode
 */
var mod_getopt = require('posix-getopt');
var parser,option;
var mode="server";

// Even though we only want the mode option, we have to validate others./
parser = new mod_getopt.BasicParser('m:(mode)p:(port)', process.argv);

while ((option = parser.getopt()) !== undefined) {
	switch (option.option) {
        case 'm': 
            mode=option.optarg;
            break;
        default: break;
    }
}

console.log('Starting in mode: %s', mode);