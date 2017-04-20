/*!
 * meresy_number
 *
 * Copyright(c) 2017, Andrew Kephart
 *
 * Handles arbitrarily large numeric values with 
 * compact encoding.
 * 
 * Meresy Numbers are base-N, utilizing the characters from
 * the digitMap variable.
 * 
 */

'use strict';

/**
 * Module dependencies
 * @private
 */
var bigInt = require("big-integer");


/**
 * Module variables
 * @private
 */
var digitMap = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var digitBase = digitMap.length;

/**
 * 
 */
var exports = module.exports = MeresyNumber;

/**
 * Encode a "normal" integer into a MeresyNumber.
 * @param num The number to encode, as a Number or String
 */
function mn_encode(num) {
    var outString = "";
    var numVal = bigInt(num);
    var dm;
    while (numVal.greater(0)) {
        dm = numVal.divmod(digitBase);
        outString = digitMap[dm.remainder] + outString;
        numVal = dm.quotient;
    }
    return outString;
}

/**
 * Decode a MeresyNumber into a string.
 * @param {String} numString 
 */
function mn_decode(numString) {
    if (typeof numString != "string") {
        throw new SyntaxError("Can only decode strings.");
    }
    var numVal = bigInt(0);
    var i,digitVal;
    for (i=0; i< numString.length; i++) {
        digitVal = digitMap.indexOf(numString[i]);
        numVal = numVal.multiply(digitBase).plus(digitVal);
    }
    return numVal.toString();
}

/**
 * Create a MeresyNumber object
 * @param {String} num Initial value.
 * 
 * Meresy number strings are interpreted based on prefix:
 * '0x' --> base 16
 * '
 */
function MeresyNumber() {
    
}

exports.encode = mn_encode;
exports.decode = mn_decode;
